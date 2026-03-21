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
    <div className="grid gap-2 rounded-xl border border-border bg-surface p-3 shadow-card md:grid-cols-4">
      <Select
        value={value.type ?? ""}
        onChange={(e) => onChange({ ...value, type: (e.target.value || undefined) as "income" | "expense" | undefined })}
      >
        <option value="">Tipo</option>
        <option value="income">Ganho</option>
        <option value="expense">Gasto</option>
      </Select>
      <Input placeholder="Categoria" value={value.categoryId ?? ""} onChange={(e) => onChange({ ...value, categoryId: e.target.value || undefined })} />
      <Input type="date" value={value.from ?? ""} onChange={(e) => onChange({ ...value, from: e.target.value || undefined })} />
      <Input type="date" value={value.to ?? ""} onChange={(e) => onChange({ ...value, to: e.target.value || undefined })} />
    </div>
  );
}
