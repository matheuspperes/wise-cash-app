"use client";

import { parseCsvText } from "@/lib/services/csv-parser";
import { csvTemplateRowSchema, CsvTemplateRow } from "@/lib/validation/csv-schema";
import { normalizeCsvToTransactionInput, normalizeText } from "@/lib/formatting/csv-normalization";
import { transactionSchema, TransactionInput } from "@/lib/validation/transaction-schema";
import { bulkCreateFromCsv, listLocalTransactions } from "@/lib/services/local-transactions-gateway";
import { getCategoryPresetsByType } from "@/lib/ui/transaction-category-presets";
import { normalizeTextForSearch } from "@/lib/repositories/text-normalization";
import { correctCategoryLabel } from "@/lib/ui/category-label-corrections";

type CsvImportError = { lineNumber: number; field: string; message: string; value?: string };

export type CsvImportPreview = {
  totalLines: number;
  validLines: number;
  invalidLines: number;
  errors: CsvImportError[];
  validRows: { lineNumber: number; input: TransactionInput }[];
  pendingCategoryRows: { lineNumber: number; input: TransactionInput; rawCategory: string }[];
  knownCategories: string[];
};

const MODEL_HEADERS = [
  'Nome',
  'Tipo',
  'Categoria',
  'Valor',
  'Data',
  'Observacoes',
  'Recorrencia Ativa',
  'Dia da Recorrencia',
  'Tipo da Recorrencia',
  'Quantidade de Meses',
  'Modo da Recorrencia',
];

export async function parseCsvTemplate(text: string): Promise<CsvImportPreview> {
  const { headers, rows } = parseCsvText(text);

  // Verify header equality (order and exact text)
  const headerMismatch = headers.length !== MODEL_HEADERS.length || headers.some((h, i) => h !== MODEL_HEADERS[i]);
  if (headerMismatch) {
    throw new Error(`CSV header inválido. Esperado: ${MODEL_HEADERS.join(', ')}`);
  }

  const errors: CsvImportError[] = [];
  const validRows: { lineNumber: number; input: TransactionInput }[] = [];
  const pendingCategoryRows: { lineNumber: number; input: TransactionInput; rawCategory: string }[] = [];

  const knownCategories = new Map<string, string>();
  const presets = [...getCategoryPresetsByType("expense"), ...getCategoryPresetsByType("income")];
  for (const preset of presets) {
    const label = correctCategoryLabel(preset);
    const key = normalizeTextForSearch(label);
    if (key && !knownCategories.has(key)) {
      knownCategories.set(key, label);
    }
  }

  const existing = await listLocalTransactions();
  const existingItems = existing.items ?? [];
  const existingKeySet = new Set<string>();
  for (const tx of existingItems) {
    const categoryLabel = correctCategoryLabel(tx.categoryName || tx.categoryId || "");
    const categoryKey = normalizeTextForSearch(categoryLabel);
    if (categoryKey && !knownCategories.has(categoryKey)) {
      knownCategories.set(categoryKey, categoryLabel);
    }

    const key = `${tx.name.trim().toLowerCase()}|${tx.type}|${String(tx.amount)}|${tx.transactionDate}|${categoryLabel.trim().toLowerCase()}`;
    existingKeySet.add(key);
  }

  rows.forEach((rowValues, idx) => {
    const lineNumber = idx + 2; // account for header row
    // Map values to object by header
    const rowObj: Record<string, string> = {};
    MODEL_HEADERS.forEach((h, i) => {
      rowObj[h] = rowValues[i] ?? '';
    });

    // Validate raw row using csv schema
    const result = csvTemplateRowSchema.safeParse(rowObj as CsvTemplateRow);
    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push({ lineNumber, field: issue.path[0] as string || 'row', message: issue.message, value: rowObj[issue.path[0] as string] });
      }
      return;
    }

    // Normalize to TransactionInput
    const input = normalizeCsvToTransactionInput(rowObj);
    if (!input) {
      errors.push({ lineNumber, field: 'row', message: 'Falha na normalizacao da linha', value: JSON.stringify(rowObj) });
      return;
    }

    const rawCategory = normalizeText(rowObj['Categoria']);
    if (!rawCategory) {
      errors.push({ lineNumber, field: 'Categoria', message: 'Categoria obrigatoria.', value: rawCategory });
      return;
    }

    const categoryKey = normalizeTextForSearch(rawCategory);
    if (categoryKey && !knownCategories.has(categoryKey)) {
      pendingCategoryRows.push({ lineNumber, input, rawCategory });
      errors.push({ lineNumber, field: 'Categoria', message: 'Categoria nao reconhecida; mapeie para continuar.', value: rawCategory });
      return;
    }

    // Validate TransactionInput against transactionSchema
    const txCheck = transactionSchema.safeParse(input);
    if (!txCheck.success) {
      for (const issue of txCheck.error.issues) {
        const key = String(issue.path[0]);
        const value = key && Object.prototype.hasOwnProperty.call(input, key)
          ? (input as Record<string, unknown>)[key]
          : undefined;
        errors.push({ lineNumber, field: String(issue.path.join('.')) || 'row', message: issue.message, value: value as string | undefined });
      }
      return;
    }

    // Duplicate detection
    const key = `${input.name.trim().toLowerCase()}|${input.type}|${String(input.amount)}|${input.transactionDate}|${input.categoryId.trim().toLowerCase()}`;
    if (existingKeySet.has(key)) {
      errors.push({ lineNumber, field: 'duplicate', message: 'Linha duplicada: transacao ja existe', value: `${input.name}` });
      return;
    }

    validRows.push({ lineNumber, input });
  });

  const invalidLineSet = new Set(errors.map((err) => err.lineNumber));

  return {
    totalLines: rows.length,
    validLines: validRows.length,
    invalidLines: invalidLineSet.size,
    errors,
    validRows,
    pendingCategoryRows,
    knownCategories: Array.from(knownCategories.values()).sort((a, b) => a.localeCompare(b, "pt-BR")),
  };
}

export async function confirmCsvImport(preview: CsvImportPreview) {
  let duplicateSkipped = 0;
  const existing = await listLocalTransactions();
  const existingItems = existing.items ?? [];
  const existingKeySet = new Set<string>();
  for (const tx of existingItems) {
    const key = `${tx.name.trim().toLowerCase()}|${tx.type}|${String(tx.amount)}|${tx.transactionDate}|${(tx.categoryName || tx.categoryId || '').trim().toLowerCase()}`;
    existingKeySet.add(key);
  }

  const toCreate = preview.validRows
    .map((row) => row.input)
    .filter((input) => {
      const key = `${input.name.trim().toLowerCase()}|${input.type}|${String(input.amount)}|${input.transactionDate}|${input.categoryId.trim().toLowerCase()}`;
      if (existingKeySet.has(key)) {
        duplicateSkipped += 1;
        return false;
      }
      return true;
    });

  const result = await bulkCreateFromCsv(toCreate);
  const created = result.created;
  const skipped = result.skipped + duplicateSkipped;

  // notify app of mutation
  try {
    window.dispatchEvent(new Event('wisecash:transactions-mutated'));
  } catch {
    // ignore in non-browser contexts
  }

  return { created, skipped };
}
