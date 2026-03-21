"use client";

import { useEffect, useState } from "react";

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

export function TransactionSearch({ value = "", onChange }: Props) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => onChange(local), 250);
    return () => clearTimeout(handle);
  }, [local, onChange]);

  return (
    <input
      className="w-full rounded-xl border border-border bg-surface p-3 text-sm text-foreground shadow-card placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onChange={(e) => setLocal(e.target.value)}
      placeholder="Buscar por nome, categoria ou notas"
      value={local}
    />
  );
}
