"use client";

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
    <div className="grid gap-2 rounded-xl bg-white p-3 shadow-sm md:grid-cols-4">
      <select
        className="rounded border p-2"
        value={value.type ?? ""}
        onChange={(e) => onChange({ ...value, type: (e.target.value || undefined) as "income" | "expense" | undefined })}
      >
        <option value="">Tipo</option>
        <option value="income">Ganho</option>
        <option value="expense">Gasto</option>
      </select>
      <input className="rounded border p-2" placeholder="Categoria" value={value.categoryId ?? ""} onChange={(e) => onChange({ ...value, categoryId: e.target.value || undefined })} />
      <input className="rounded border p-2" type="date" value={value.from ?? ""} onChange={(e) => onChange({ ...value, from: e.target.value || undefined })} />
      <input className="rounded border p-2" type="date" value={value.to ?? ""} onChange={(e) => onChange({ ...value, to: e.target.value || undefined })} />
    </div>
  );
}
