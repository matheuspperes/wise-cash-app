"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Props = {
  onExport: (params?: { from?: string; to?: string }) => Promise<void> | void;
  isExporting?: boolean;
};

export function ExportCard({ onExport, isExporting }: Props) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleExport = () => {
    const params = {
      from: from || undefined,
      to: to || undefined,
    };
    onExport(params);
  };

  return (
    <section className="rounded-2xl border border-border bg-surface p-4 shadow-card">
      <h3 className="text-base font-semibold">Exportar CSV</h3>
      <p className="text-sm text-muted-foreground">
        Gere um arquivo no mesmo formato do modelo. Se quiser, filtre por periodo.
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div>
          <label className="text-xs text-muted-foreground">De</label>
          <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Ate</label>
          <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
      </div>
      <Button className="mt-4" onClick={handleExport} disabled={isExporting}>
        {isExporting ? "Exportando..." : "Exportar"}
      </Button>
    </section>
  );
}
