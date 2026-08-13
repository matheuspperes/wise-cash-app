"use client";

import { Input } from "@/components/ui/input";

type Props = {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isParsing: boolean;
  error?: string | null;
};

export function ImportCard({ onFileChange, isParsing, error }: Props) {
  return (
    <section className="flex h-full flex-col rounded-2xl border border-border bg-surface p-4 shadow-card">
      <h2 className="text-base font-semibold">Importar CSV</h2>
      <p className="text-sm text-muted-foreground">
        Selecione o arquivo no modelo unico para validar antes de confirmar.
      </p>
      <div className="mt-3">
        <label className="text-xs text-muted-foreground" htmlFor="csv-file-input">Arquivo CSV</label>
        <Input id="csv-file-input" type="file" accept=".csv" onChange={onFileChange} />
      </div>
      {isParsing ? <p className="mt-3 text-sm">Lendo arquivo...</p> : null}
      {error ? <p className="mt-3 text-sm text-red-500" role="status">{error}</p> : null}
    </section>
  );
}
