"use client";

import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Nome obrigatorio"),
  type: z.enum(["income", "expense"]),
  categoryId: z.string().min(1, "Categoria obrigatoria"),
  amount: z.string().min(1, "Valor obrigatorio"),
  transactionDate: z.string().min(10, "Data obrigatoria"),
  notes: z.string().max(500).optional(),
});

type FormData = z.infer<typeof formSchema>;

type Props = {
  onSaved?: () => void;
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
      notes: "",
    },
  });

  async function onSubmit(data: FormData) {
    const amount = Number(data.amount.replace(",", "."));
    if (!Number.isFinite(amount) || amount <= 0) {
      setError("amount", { message: "Informe um valor numerico valido." });
      return;
    }

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...data, amount }),
    });

    if (!res.ok) {
      setError("name", { message: "Nao foi possivel salvar a transacao." });
      return;
    }

    reset({ name: "", type: data.type, categoryId: data.categoryId, amount: "", transactionDate: data.transactionDate, notes: "" });
    onSaved?.();
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-card">
      <h2 className="mb-3 text-lg font-semibold">Nova transacao</h2>
      <form className="grid gap-2 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
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
          <Input placeholder="Categoria" {...register("categoryId")} />
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
          <Input placeholder="Notas" {...register("notes")} />
          {errors.notes ? <p className="mt-1 text-xs text-danger">{errors.notes.message}</p> : null}
        </div>

        <Button className="md:col-span-2" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </section>
  );
}
