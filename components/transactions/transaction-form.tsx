"use client";

import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { uiText } from "@/lib/i18n/ui-text";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  type: z.enum(["income", "expense"]),
  categoryId: z.string().min(1, "Categoria obrigatória"),
  amount: z.string().min(1, "Valor obrigatório"),
  transactionDate: z.string().min(10, "Data obrigatória"),
  observation: z.string().max(500).optional(),
});

type FormData = z.infer<typeof formSchema>;

export type SavedTransactionPayload = {
  id: string;
  name: string;
  type: "income" | "expense";
  categoryName: string;
  amount: number;
  transactionDate: string;
};

type Props = {
  onSaved?: (transaction: SavedTransactionPayload) => void | Promise<void>;
};

const today = new Date().toISOString().slice(0, 10);

export function TransactionForm({ onSaved }: Props) {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "expense",
      categoryId: "geral",
      amount: "",
      transactionDate: today,
      observation: "",
    },
  });

  async function onSubmit(data: FormData) {
    const amount = Number(data.amount.replace(",", "."));
    if (!Number.isFinite(amount) || amount <= 0) {
      setError("amount", { message: "Informe um valor numérico válido." });
      return;
    }

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...data, notes: data.observation, amount }),
    });

    if (!res.ok) {
      setError("name", { message: "Não foi possível salvar a transação." });
      return;
    }

    const json = await res.json();
    const saved = json?.transaction as SavedTransactionPayload | undefined;
    if (!saved) {
      setError("name", { message: "Resposta inválida ao salvar transação." });
      return;
    }

    reset({ name: "", type: data.type, categoryId: data.categoryId, amount: "", transactionDate: data.transactionDate, observation: "" });
    await onSaved?.(saved);
  }

  return (
    <section className="rounded-2xl border border-border bg-surface p-5 shadow-card">
      <h2 className="mb-4 text-xl font-semibold">Nova transação</h2>
      <form className="grid gap-3 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input placeholder="Nome" {...register("name")} />
          {errors.name ? <p className="mt-1 text-xs text-danger">{errors.name.message}</p> : null}
        </div>

        <div>
          <Select {...register("type")}>
            <option value="income">Ganho</option>
            <option value="expense">Gasto</option>
          </Select>
        </div>

        <div>
          <Input placeholder={uiText.category} {...register("categoryId")} />
          {errors.categoryId ? <p className="mt-1 text-xs text-danger">{errors.categoryId.message}</p> : null}
        </div>

        <div>
          <Input inputMode="decimal" placeholder="Valor" {...register("amount")} />
          {errors.amount ? <p className="mt-1 text-xs text-danger">{errors.amount.message}</p> : null}
        </div>

        <div>
          <Input type="date" {...register("transactionDate")} />
          {errors.transactionDate ? <p className="mt-1 text-xs text-danger">{errors.transactionDate.message}</p> : null}
        </div>

        <div>
          <Input placeholder={uiText.observation} {...register("observation")} />
          {errors.observation ? <p className="mt-1 text-xs text-danger">{errors.observation.message}</p> : null}
        </div>

        <Button className="md:col-span-2 md:max-w-40" disabled={isSubmitting} size="sm" type="submit">
          {isSubmitting ? "Salvando..." : uiText.save}
        </Button>
      </form>
    </section>
  );
}
