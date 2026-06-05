"use client";

import { Button } from "@/components/ui/button";
import { CategoryMapModal } from "@/components/data/category-map-modal";
import { CsvImportPreview } from "@/lib/services/csv-import-service";
import { useMemo, useState } from "react";

type Props = {
  preview: CsvImportPreview;
  onConfirm: () => Promise<void> | void;
  onApplyCategoryMapping: (mapping: Record<string, string>) => void;
  importResult?: string | null;
  importError?: string | null;
  isConfirming?: boolean;
};

export function ImportPreview({ preview, onConfirm, onApplyCategoryMapping, importResult, importError, isConfirming }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const unknownCategories = useMemo(() => {
    const unique = new Set<string>();
    preview.pendingCategoryRows.forEach((row) => unique.add(row.rawCategory));
    return Array.from(unique.values());
  }, [preview.pendingCategoryRows]);

  return (
    <section className="rounded-2xl border border-border bg-surface p-4 shadow-card">
      <h3 className="text-base font-semibold">Preview</h3>
      <p className="text-sm text-muted-foreground">
        Linhas validas: {preview.validLines} | Linhas invalidas: {preview.invalidLines}
      </p>

      {preview.errors.length > 0 ? (
        <div className="mt-3" aria-live="polite">
          <p className="text-sm font-medium">Erros:</p>
          <ul className="mt-1 text-sm text-red-500">
            {preview.errors.slice(0, 12).map((err, idx) => (
              <li key={`${err.lineNumber}-${idx}`}>Linha {err.lineNumber}: {err.field} - {err.message}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {unknownCategories.length > 0 ? (
        <div className="mt-4 rounded-lg border border-amber-300/50 bg-amber-50/60 p-3 text-sm text-amber-900">
          <p className="font-medium">Categorias desconhecidas detectadas.</p>
          <p className="mt-1">Mapeie antes de confirmar a importacao.</p>
          <Button className="mt-3" variant="secondary" onClick={() => setModalOpen(true)}>
            Mapear categorias
          </Button>
        </div>
      ) : null}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button onClick={onConfirm} disabled={preview.validLines === 0 || preview.invalidLines > 0 || isConfirming}>
          {isConfirming ? "Importando..." : "Confirmar importacao"}
        </Button>
        {importResult ? <p className="text-sm text-muted-foreground" aria-live="polite">{importResult}</p> : null}
        {importError ? <p className="text-sm text-red-500" aria-live="polite">{importError}</p> : null}
      </div>

      <CategoryMapModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        unknownCategories={unknownCategories}
        knownCategories={preview.knownCategories}
        onApply={onApplyCategoryMapping}
      />
    </section>
  );
}
