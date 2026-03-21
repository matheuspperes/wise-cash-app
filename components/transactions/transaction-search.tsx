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

  return <input className="w-full rounded-xl border bg-white p-3 shadow-sm" placeholder="Buscar por nome, categoria ou notas" value={local} onChange={(e) => setLocal(e.target.value)} />;
}
