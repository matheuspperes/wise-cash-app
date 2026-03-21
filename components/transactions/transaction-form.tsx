"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

type FormData = {
  name: string;
  type: "income" | "expense";
  categoryId: string;
  amount: string;
  transactionDate: string;
  notes: string;
};

type Props = {
  onSaved?: () => void;
};

const today = new Date().toISOString().slice(0, 10);

export function TransactionForm({ onSaved }: Props) {
  const [data, setData] = useState<FormData>({
    name: "",
    type: "expense",
    categoryId: "geral",
    amount: "",
    transactionDate: today,
    notes: "",
  });
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    if (!data.name || !data.amount || !data.transactionDate || !data.categoryId) {
      setError("Preencha todos os campos obrigatorios.");
      return;
    }

    const amount = Number(data.amount.replace(",", "."));
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...data, amount }),
    });

    if (!res.ok) {
      setError("Nao foi possivel salvar a transacao.");
      return;
    }

    setData((prev) => ({ ...prev, name: "", amount: "", notes: "" }));
    onSaved?.();
  }

  return (
    <section className="rounded-xl bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">Nova transacao</h2>
      <div className="grid gap-2 md:grid-cols-2">
        <input className="rounded border p-2" placeholder="Nome" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
        <select className="rounded border p-2" value={data.type} onChange={(e) => setData({ ...data, type: e.target.value as "income" | "expense" })}>
          <option value="income">Ganho</option>
          <option value="expense">Gasto</option>
        </select>
        <input className="rounded border p-2" placeholder="Categoria" value={data.categoryId} onChange={(e) => setData({ ...data, categoryId: e.target.value })} />
        <input className="rounded border p-2" placeholder="Valor" value={data.amount} onChange={(e) => setData({ ...data, amount: e.target.value })} />
        <input className="rounded border p-2" type="date" value={data.transactionDate} onChange={(e) => setData({ ...data, transactionDate: e.target.value })} />
        <input className="rounded border p-2" placeholder="Notas" value={data.notes} onChange={(e) => setData({ ...data, notes: e.target.value })} />
      </div>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      <Button className="mt-3" onClick={submit} type="button">
        Salvar
      </Button>
    </section>
  );
}
