"use client";

import * as Dialog from "@radix-ui/react-dialog";

import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { extractDigits, formatBrlFromDigits, parseBrlDisplayToAmount } from "@/lib/formatting/brl-currency-mask";
import { getCategoryPresetsByType } from "@/lib/ui/transaction-category-presets";
import { MonthlyTransactionHistoryRow } from "@/lib/ui/dashboard-history-types";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type EditPayload = {
  transactionDate: string;
  description: string;
  categoryId: string;
  type: "income" | "expense";
  amount: number;
  notes?: string;
};

type FormData = {
  transactionDate: string;
  description: string;
  categoryId: string;
  type: "income" | "expense";
  amount: string;
  notes: string;
};

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: MonthlyTransactionHistoryRow | null;
  onSave: (payload: EditPayload) => Promise<void>;
  isSaving?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
};

function amountToMaskValue(value: number) {
  return formatBrlFromDigits(String(Math.round(value * 100)));
}

export function TransactionHistoryEditDrawer({
  isOpen,
  onOpenChange,
  transaction,
  onSave,
  isSaving = false,
  errorMessage,
  successMessage,
}: Props) {
  const {
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<FormData>({
    defaultValues: {
      transactionDate: "",
      description: "",
      categoryId: "",
      type: "expense",
      amount: "",
      notes: "",
    },
  });

  const type = watch("type");

  useEffect(() => {
    if (!transaction) {
      return;
    }

    reset({
      transactionDate: transaction.date,
      description: transaction.description,
      categoryId: transaction.category,
      type: transaction.type,
      amount: amountToMaskValue(transaction.amount),
      notes: transaction.notes ?? "",
    });
  }, [transaction, reset]);

  async function submit(data: FormData) {
    const parsedAmount = parseBrlDisplayToAmount(data.amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("amount", { message: "Informe um valor numérico válido." });
      return;
    }

    await onSave({
      transactionDate: data.transactionDate,
      description: data.description,
      categoryId: data.categoryId,
      type: data.type,
      amount: parsedAmount,
      notes: data.notes || undefined,
    });
  }

  const expenseOptions = getCategoryPresetsByType("expense");
  const incomeOptions = getCategoryPresetsByType("income");
  const options = type === "income" ? incomeOptions : expenseOptions;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-border bg-surface p-5 shadow-card">
          <Dialog.Title className="text-lg font-semibold">Editar transação</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-muted">
            Ajuste os dados do lançamento e salve para atualizar histórico e dashboard.
          </Dialog.Description>

          <form className="mt-4 grid gap-3" onSubmit={handleSubmit(submit)}>
            <Input type="date" {...register("transactionDate", { required: "Data obrigatória" })} />
            {errors.transactionDate ? <p className="text-xs text-danger">{errors.transactionDate.message}</p> : null}

            <Input placeholder="Descrição" {...register("description", { required: "Descrição obrigatória" })} />
            {errors.description ? <p className="text-xs text-danger">{errors.description.message}</p> : null}

            <Select
              {...register("type")}
              onChange={(event) => {
                setValue("type", event.target.value as "income" | "expense", { shouldDirty: true });
                setValue("categoryId", "", { shouldDirty: true });
              }}
            >
              <option value="expense">Despesa</option>
              <option value="income">Receita</option>
            </Select>

            <Select {...register("categoryId", { required: "Categoria obrigatória" })}>
              <option value="">Selecione a categoria</option>
              {options.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>
            {errors.categoryId ? <p className="text-xs text-danger">{errors.categoryId.message}</p> : null}

            <Controller
              control={control}
              name="amount"
              render={({ field }) => (
                <Input
                  inputMode="numeric"
                  onBlur={field.onBlur}
                  onChange={(event) => {
                    const digits = extractDigits(event.target.value);
                    field.onChange(formatBrlFromDigits(digits));
                  }}
                  placeholder="Valor"
                  value={field.value}
                />
              )}
              rules={{ required: "Valor obrigatório" }}
            />
            {errors.amount ? <p className="text-xs text-danger">{errors.amount.message}</p> : null}

            <Input placeholder="Observação / notas" {...register("notes")} />

            {errorMessage ? <p className="text-sm text-danger">{errorMessage}</p> : null}
            {successMessage ? <p className="text-sm text-emerald-400">{successMessage}</p> : null}

            <div className="mt-2 flex items-center justify-end gap-2">
              <Button
                className="border border-border/80 bg-surface-alt text-foreground hover:bg-surface"
                onClick={() => onOpenChange(false)}
                size="sm"
                type="button"
                variant="secondary"
              >
                Fechar
              </Button>
              <Button disabled={isSaving} size="sm" type="submit">
                {isSaving ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
