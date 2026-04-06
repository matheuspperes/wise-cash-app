"use client";

import * as Dialog from "@radix-ui/react-dialog";

import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { getCategoryPresetsByType } from "@/lib/ui/transaction-category-presets";
import { MonthlyTransactionHistoryRow } from "@/lib/ui/dashboard-history-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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

function amountToInputValue(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function parseAmount(input: string) {
  const normalized = input.trim();

  if (!normalized) {
    return NaN;
  }

  const sanitized = normalized.replace(/[^\d.,-]/g, "");
  const lastComma = sanitized.lastIndexOf(",");
  const lastDot = sanitized.lastIndexOf(".");
  const decimalSeparatorIndex = Math.max(lastComma, lastDot);

  if (decimalSeparatorIndex === -1) {
    return Number(sanitized.replace(/[^\d-]/g, ""));
  }

  const integerPart = sanitized
    .slice(0, decimalSeparatorIndex)
    .replace(/[^\d-]/g, "");
  const decimalPart = sanitized
    .slice(decimalSeparatorIndex + 1)
    .replace(/[^\d]/g, "");

  return Number(`${integerPart}.${decimalPart}`);
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
      amount: amountToInputValue(transaction.amount),
      notes: transaction.notes ?? "",
    });
  }, [transaction, reset]);

  async function submit(data: FormData) {
    const parsedAmount = parseAmount(data.amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("amount", { message: "Informe um valor numerico valido." });
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
          <Dialog.Title className="text-lg font-semibold">Editar transacao</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-muted">
            Ajuste os dados do lancamento e salve para atualizar historico e dashboard.
          </Dialog.Description>

          <form className="mt-4 grid gap-3" onSubmit={handleSubmit(submit)}>
            <Input type="date" {...register("transactionDate", { required: "Data obrigatoria" })} />
            {errors.transactionDate ? <p className="text-xs text-danger">{errors.transactionDate.message}</p> : null}

            <Input placeholder="Descricao" {...register("description", { required: "Descricao obrigatoria" })} />
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

            <Select {...register("categoryId", { required: "Categoria obrigatoria" })}>
              <option value="">Selecione a categoria</option>
              {options.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>
            {errors.categoryId ? <p className="text-xs text-danger">{errors.categoryId.message}</p> : null}

            <Input inputMode="decimal" placeholder="Valor" {...register("amount", { required: "Valor obrigatorio" })} />
            {errors.amount ? <p className="text-xs text-danger">{errors.amount.message}</p> : null}

            <Input placeholder="Observacao / notas" {...register("notes")} />

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
