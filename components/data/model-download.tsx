"use client";

import { Button } from "@/components/ui/button";

type Props = {
  onDownload: () => Promise<void> | void;
  isDownloading?: boolean;
};

export function ModelDownloadCard({ onDownload, isDownloading }: Props) {
  return (
    <section className="flex h-full flex-col rounded-2xl border border-border bg-surface p-4 shadow-card">
      <h3 className="text-base font-semibold">Baixar modelo CSV</h3>
      <p className="text-sm text-muted-foreground">
        Use o modelo para preencher suas transações e garantir a importação correta.
      </p>
      <Button className="mt-4" variant="secondary" onClick={onDownload} disabled={isDownloading}>
        {isDownloading ? "Gerando..." : "Baixar modelo"}
      </Button>
    </section>
  );
}
