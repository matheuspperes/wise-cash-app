"use client";

import { Input, Select } from "@/components/ui/input";

type FilterState = {
  type?: "income" | "expense";
  categoryId?: string;
  from?: string;
  to?: string;
};

type Props = {
  value: FilterState;
  onChange: (next: FilterState) => void;
};

export function TransactionFilters({ value, onChange }: Props) {
  return (
    <div className="grid gap-3 rounded-2xl border border-border bg-surface p-4 shadow-card md:grid-cols-4">
      <Select
        value={value.type ?? ""}
        onChange={(e) => onChange({ ...value, type: (e.target.value || undefined) as "income" | "expense" | undefined })}
      >
        <option value="">Tipo</option>
        <option value="income">Receita</option>
        <option value="expense">Despesa</option>
      </Select>
      <Input placeholder="Categoria" value={value.categoryId ?? ""} onChange={(e) => onChange({ ...value, categoryId: e.target.value || undefined })} />
      <Input type="date" value={value.from ?? ""} onChange={(e) => onChange({ ...value, from: e.target.value || undefined })} />
      <Input type="date" value={value.to ?? ""} onChange={(e) => onChange({ ...value, to: e.target.value || undefined })} />
    </div>
  );
}
