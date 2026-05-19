"use client";

import { listLocalTransactions } from "@/lib/services/local-transactions-gateway";
import { getDexieDb } from "@/lib/storage/dexie-db";
import { getActiveOwnerScope } from "@/lib/storage/scoped-db";
import { assertLocalStorageAvailable } from "@/lib/storage/local-storage-health";
import { RecurrenceRuleRecord } from "@/lib/repositories/local-finance-contracts";

const MODEL_HEADERS = [
  "Nome",
  "Tipo",
  "Categoria",
  "Valor",
  "Data",
  "Observacoes",
  "Recorrencia Ativa",
  "Dia da Recorrencia",
  "Tipo da Recorrencia",
  "Quantidade de Meses",
  "Modo da Recorrencia",
];

function escapeCsvValue(value: string | number | null | undefined) {
  const str = value === null || value === undefined ? "" : String(value);
  return `"${str.replace(/"/g, "\"\"")}"`;
}

function formatAmount(value: number) {
  return Number(value).toFixed(2);
}

function mapTypeToLabel(value: "income" | "expense") {
  return value === "income" ? "Receita" : "Despesa";
}

function mapRecurrenceType(type: string | null) {
  if (type === "limited") return "Limitada";
  if (type === "unlimited") return "Ilimitada";
  return "";
}

function mapRecurrenceMode(mode: string | null) {
  if (mode === "automatic") return "Automatica";
  if (mode === "manual") return "Manual";
  return "";
}

export function buildCsvTemplateHeader() {
  return MODEL_HEADERS.slice();
}

export async function exportCsvTemplate(params?: { from?: string; to?: string }) {
  assertLocalStorageAvailable();
  const ownerScope = getActiveOwnerScope();
  const { items } = await listLocalTransactions({
    from: params?.from,
    to: params?.to,
  });

  const db = getDexieDb();
  const rules = await db.recurrenceRules.toArray();
  const ruleMap = new Map<string, RecurrenceRuleRecord>();
  for (const rule of rules) {
    if (rule.ownerScope === ownerScope) {
      ruleMap.set(rule.id, rule);
    }
  }

  const headerRow = MODEL_HEADERS.map(escapeCsvValue).join(",");
  const rows = (items ?? []).map((tx) => {
    const rule = tx.recurrenceRuleId ? ruleMap.get(tx.recurrenceRuleId) : undefined;
    const recurrenceActive = Boolean(rule && rule.isActive);

    const recurrenceType = recurrenceActive ? mapRecurrenceType(rule?.recurrenceType ?? null) : "";
    const recurrenceMode = recurrenceActive ? mapRecurrenceMode(rule?.unlimitedMode ?? null) : "";

    const row = [
      tx.name,
      mapTypeToLabel(tx.type),
      tx.categoryName || tx.categoryId,
      formatAmount(tx.amount),
      tx.transactionDate,
      tx.notes ?? "",
      recurrenceActive ? "Sim" : "Nao",
      recurrenceActive ? String(rule?.dayOfMonth ?? "") : "",
      recurrenceType,
      recurrenceActive && rule?.recurrenceType === "limited" ? String(rule?.maxCycles ?? "") : "",
      recurrenceActive && rule?.recurrenceType === "unlimited" ? recurrenceMode : "",
    ];

    return row.map(escapeCsvValue).join(",");
  });

  return [headerRow, ...rows].join("\n");
}

export function downloadCsvFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function buildEmptyCsvTemplate() {
  const headerRow = MODEL_HEADERS.map(escapeCsvValue).join(",");
  return `${headerRow}\n`;
}
