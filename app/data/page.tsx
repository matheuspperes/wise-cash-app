"use client";

import { useState } from "react";
import { parseCsvTemplate, confirmCsvImport, CsvImportPreview } from "@/lib/services/csv-import-service";
import { TransactionInput } from "@/lib/validation/transaction-schema";
import { ImportCard } from "@/components/data/import-card";
import { ImportPreview } from "@/components/data/import-preview";
import { ExportCard } from "@/components/data/export-card";
import { ModelDownloadCard } from "@/components/data/model-download";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { buildEmptyCsvTemplate, downloadCsvFile, exportCsvTemplate } from "@/lib/services/csv-export-service";
import { normalizeTextForSearch } from "@/lib/repositories/text-normalization";
import { StorageUnavailableError } from "@/lib/storage/local-storage-health";

export default function DataImportPage() {
  const [preview, setPreview] = useState<CsvImportPreview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isDownloadingModel, setIsDownloadingModel] = useState(false);
  const [importResult, setImportResult] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    setError(null);
    setImportResult(null);
    setImportError(null);
    try {
      const text = await file.text();
      const parsed = await parseCsvTemplate(text);
      setPreview(parsed);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Falha ao ler o CSV";
      setError(message);
      setPreview(null);
    } finally {
      setIsParsing(false);
    }
  };

  const onConfirm = async () => {
    if (!preview) return;
    setIsConfirming(true);
    setImportError(null);
    try {
      const result = await confirmCsvImport(preview);
      setImportResult(`Importacao concluida: ${result.created} criadas, ${result.skipped} ignoradas.`);
      setPreview(null);
    } catch (err: unknown) {
      if (err instanceof StorageUnavailableError) {
        setImportError("Armazenamento local indisponivel. Verifique as permissoes do navegador.");
      } else {
        setImportError("Nao foi possivel concluir a importacao.");
      }
    } finally {
      setIsConfirming(false);
    }
  };

  const onApplyCategoryMapping = (mapping: Record<string, string>) => {
    if (!preview) return;
    const normalizedMap = new Map<string, string>();
    Object.entries(mapping).forEach(([raw, mapped]) => {
      const key = normalizeTextForSearch(raw);
      if (key && mapped.trim()) {
        normalizedMap.set(key, mapped.trim());
      }
    });

    const movedRows: { lineNumber: number; input: TransactionInput }[] = [];
    const remainingPending: typeof preview.pendingCategoryRows = [];
    const mappedLineNumbers = new Set<number>();

    preview.pendingCategoryRows.forEach((row) => {
      const key = normalizeTextForSearch(row.rawCategory);
      const mapped = key ? normalizedMap.get(key) : undefined;
      if (mapped) {
        movedRows.push({ lineNumber: row.lineNumber, input: { ...row.input, categoryId: mapped } });
        mappedLineNumbers.add(row.lineNumber);
      } else {
        remainingPending.push(row);
      }
    });

    const cleanedErrors = preview.errors.filter((err) => !(err.field === "Categoria" && mappedLineNumbers.has(err.lineNumber)));

    const invalidLineSet = new Set(cleanedErrors.map((err) => err.lineNumber));

    setPreview({
      ...preview,
      validRows: [...preview.validRows, ...movedRows],
      pendingCategoryRows: remainingPending,
      errors: cleanedErrors,
      validLines: preview.validRows.length + movedRows.length,
      invalidLines: invalidLineSet.size,
    });
  };

  const onExport = async (params?: { from?: string; to?: string }) => {
    setIsExporting(true);
    const csv = await exportCsvTemplate(params);
    downloadCsvFile("transacoes.csv", csv);
    setIsExporting(false);
  };

  const onDownloadModel = async () => {
    setIsDownloadingModel(true);
    const csv = buildEmptyCsvTemplate();
    downloadCsvFile("modelo-transacoes.csv", csv);
    setIsDownloadingModel(false);
  };

  return (
    <main className="mx-auto flex max-w-[76.8rem] flex-col gap-5 px-5 pb-20 pt-5">
      <DashboardHeader title="Dados" />

      <div className="grid items-stretch gap-4 md:grid-cols-2">
        <div className="flex h-full flex-col gap-4">
          <ImportCard onFileChange={onFileChange} isParsing={isParsing} error={error} />

          {preview ? (
            <ImportPreview
              preview={preview}
              onConfirm={onConfirm}
              onApplyCategoryMapping={onApplyCategoryMapping}
              importResult={importResult}
              importError={importError}
              isConfirming={isConfirming}
            />
          ) : null}
        </div>

        <div className="flex h-full flex-col gap-4">
          <ExportCard onExport={onExport} isExporting={isExporting} />
        </div>
      </div>

      <div className="flex h-full flex-col">
        <ModelDownloadCard onDownload={onDownloadModel} isDownloading={isDownloadingModel} />
      </div>
    </main>
  );
}
