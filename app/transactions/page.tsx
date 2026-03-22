"use client";

import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { TransactionSearch } from "@/components/transactions/transaction-search";
import { formatCurrencyBRL, formatDateBR } from "@/lib/formatting/ptbr";
import { useCallback, useEffect, useMemo, useState } from "react";

type Tx = {
  id: string;
  name: string;
  type: "income" | "expense";
  categoryName: string;
  amount: number;
  transactionDate: string;
};

export default function TransactionsPage() {
  const [items, setItems] = useState<Tx[]>([]);
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<{ type?: "income" | "expense"; categoryId?: string; from?: string; to?: string }>({});

  const load = useCallback(async () => {
    const query = new URLSearchParams();
    if (q) query.set("q", q);
    if (filters.type) query.set("type", filters.type);
    if (filters.categoryId) query.set("categoryId", filters.categoryId);
    if (filters.from) query.set("from", filters.from);
    if (filters.to) query.set("to", filters.to);

    const res = await fetch(`/api/transactions?${query.toString()}`);
    const json = await res.json();
    setItems(json.items ?? []);
  }, [q, filters]);

  useEffect(() => {
    load();
  }, [load]);

  const renderedItems = useMemo(
    () =>
      items.map((item) => (
        <li className="flex items-center justify-between py-2" key={item.id}>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-muted">{item.categoryName} - {formatDateBR(item.transactionDate)}</p>
          </div>
          <p className={item.type === "income" ? "font-semibold text-emerald-400" : "font-semibold text-danger"}>
            {item.type === "income" ? "+" : "-"} {formatCurrencyBRL(item.amount)}
          </p>
        </li>
      )),
    [items],
  );

  return (
    <main className="mx-auto flex max-w-[76.8rem] flex-col gap-5 p-5">
      <h1 className="text-[1.9rem] font-bold">Transações</h1>
      <TransactionForm onSaved={load} />
      <TransactionSearch value={q} onChange={setQ} />
      <TransactionFilters value={filters} onChange={setFilters} />
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-card">
        <h2 className="mb-4 text-xl font-semibold">Lançamentos</h2>
        <ul className="divide-y">{renderedItems}</ul>
      </section>
    </main>
  );
}
