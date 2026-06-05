"use client";

import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { SimpleTooltip } from "@/components/ui/simple-tooltip";
import { extractDigits, formatBrlFromDigits, parseBrlDisplayToAmount } from "@/lib/formatting/brl-currency-mask";
import { toLocalCivilDateString } from "@/lib/formatting/civil-date";
import { uiText } from "@/lib/i18n/ui-text";
import { createLocalTransaction } from "@/lib/services/local-transactions-gateway";
import { StorageUnavailableError } from "@/lib/storage/local-storage-health";
import { hasDuplicateNormalizedCategory } from "@/lib/ui/category-normalization";
import { RECURRENCE_MODE_TOOLTIP_LINES, RECURRENCE_SECTION_TOOLTIP_LINES, RECURRENCE_TYPE_TOOLTIP_LINES } from "@/lib/ui/recurrence-tooltip-content";
import { getCategoryPresetsByType, TransactionType } from "@/lib/ui/transaction-category-presets";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useId, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().min(1, "Nome obrigatório"),
    type: z.enum(["income", "expense"]),
    categoryId: z.string().min(1, "Categoria obrigatória"),
    amount: z.string().min(1, "Valor obrigatório"),
    transactionDate: z.string().min(10, "Data obrigatória"),
    observation: z.string().max(500).optional(),
    recurrenceEnabled: z.boolean(),
    recurrenceDayOfMonth: z.number().int().min(1).max(31).optional(),
    recurrenceType: z.enum(["limited", "unlimited"]).optional(),
    recurrenceMaxCycles: z.number().int().positive().optional(),
    recurrenceUnlimitedMode: z.enum(["automatic", "manual"]).optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.recurrenceEnabled) {
      return;
    }

    if (!value.recurrenceDayOfMonth) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Dia da recorrência é obrigatório.", path: ["recurrenceDayOfMonth"] });
    }

    if (!value.recurrenceType) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Tipo de recorrência é obrigatório.", path: ["recurrenceType"] });
      return;
    }

    if (value.recurrenceType === "limited" && !value.recurrenceMaxCycles) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Quantidade de meses é obrigatória.", path: ["recurrenceMaxCycles"] });
    }

    if (value.recurrenceType === "unlimited" && !value.recurrenceUnlimitedMode) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Modo da recorrência é obrigatório.", path: ["recurrenceUnlimitedMode"] });
    }
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

const today = toLocalCivilDateString();
const CREATE_NEW_OPTION_VALUE = "__create_new_category__";

type CustomCategoriesByType = Record<TransactionType, string[]>;

function mergeAndSortCategories(preset: readonly string[], custom: readonly string[]) {
  return Array.from(new Set([...preset, ...custom])).sort((left, right) => left.localeCompare(right, "pt-BR"));
}

function RecurrenceField({
  tooltipLabel,
  tooltipLines,
  tooltipId,
  children,
}: {
  tooltipLabel: string;
  tooltipLines: readonly string[];
  tooltipId: string;
  children: ReactNode;
}) {
  return (
    <div className="transaction-recurrence-field">
      <div className="min-w-0 flex-1">{children}</div>
      <SimpleTooltip className="transaction-recurrence-tooltip" id={tooltipId} label={tooltipLabel} lines={tooltipLines} size="compact" />
    </div>
  );
}

export function TransactionForm({ onSaved }: Props) {
  const formId = useId();
  const recurrenceDayId = `tx-recurrence-day-${formId}`;
  const recurrenceTypeId = `tx-recurrence-type-${formId}`;
  const recurrenceTypeTooltipId = `tx-recurrence-type-tooltip-${formId}`;
  const recurrenceMaxCyclesId = `tx-recurrence-maxcycles-${formId}`;
  const recurrenceModeId = `tx-recurrence-mode-${formId}`;
  const recurrenceModeTooltipId = `tx-recurrence-mode-tooltip-${formId}`;

  const [customCategoriesByType, setCustomCategoriesByType] = useState<CustomCategoriesByType>({
    expense: [],
    income: [],
  });
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const expenseCategories = useMemo(
    () => mergeAndSortCategories(getCategoryPresetsByType("expense"), customCategoriesByType.expense),
    [customCategoriesByType.expense],
  );
  const incomeCategories = useMemo(
    () => mergeAndSortCategories(getCategoryPresetsByType("income"), customCategoriesByType.income),
    [customCategoriesByType.income],
  );

  const defaultCategoryByType = useMemo(
    () => ({
      expense: expenseCategories[0] ?? "Outros",
      income: incomeCategories[0] ?? "Outros",
    }),
    [expenseCategories, incomeCategories],
  );

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    clearErrors,
    register,
    reset,
    setValue,
    setError,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "expense",
      categoryId: defaultCategoryByType.expense,
      amount: "",
      transactionDate: today,
      observation: "",
      recurrenceEnabled: false,
      recurrenceDayOfMonth: undefined,
      recurrenceType: undefined,
      recurrenceMaxCycles: undefined,
      recurrenceUnlimitedMode: undefined,
    },
  });

  const selectedCategoryId = watch("categoryId");
  const recurrenceEnabled = watch("recurrenceEnabled");
  const recurrenceType = watch("recurrenceType");

  async function onSubmit(data: FormData) {
    const amount = parseBrlDisplayToAmount(data.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setError("amount", { message: "Informe um valor numérico válido." });
      return;
    }

    const currentCategories = data.type === "expense" ? expenseCategories : incomeCategories;
    let resolvedCategoryId = data.categoryId;

    if (isCreatingCategory) {
      const candidateName = newCategoryName.trim();
      if (!candidateName) {
        setError("categoryId", { message: "Informe um nome para a nova categoria." });
        return;
      }

      if (hasDuplicateNormalizedCategory(candidateName, currentCategories)) {
        setError("categoryId", { message: "Essa categoria já existe." });
        return;
      }

      resolvedCategoryId = candidateName;
      setCustomCategoriesByType((current) => ({
        ...current,
        [data.type]: [...current[data.type], candidateName],
      }));
      setIsCreatingCategory(false);
      setNewCategoryName("");
      setValue("categoryId", resolvedCategoryId, { shouldDirty: true, shouldValidate: true });
    }

    if (!resolvedCategoryId.trim()) {
      setError("categoryId", { message: "Categoria obrigatória." });
      return;
    }

    if (resolvedCategoryId === CREATE_NEW_OPTION_VALUE) {
      setError("categoryId", { message: "Informe um nome para a nova categoria." });
      return;
    }

    let saved: SavedTransactionPayload | undefined;
    try {
      const response = await createLocalTransaction({
        ...data,
        categoryId: resolvedCategoryId,
        notes: data.observation,
        amount,
        recurrence: data.recurrenceEnabled
          ? {
              enabled: true,
              dayOfMonth: data.recurrenceDayOfMonth,
              recurrenceType: data.recurrenceType,
              maxCycles: data.recurrenceType === "limited" ? data.recurrenceMaxCycles : undefined,
              unlimitedMode: data.recurrenceType === "unlimited" ? data.recurrenceUnlimitedMode : undefined,
            }
          : { enabled: false },
      });
      saved = response.transaction as SavedTransactionPayload | undefined;
    } catch (error) {
      if (error instanceof StorageUnavailableError) {
        setError("name", { message: "Armazenamento local indisponível. Verifique as permissões do navegador." });
        return;
      }

      setError("name", { message: "Não foi possível salvar a transação." });
      return;
    }

    if (!saved) {
      setError("name", { message: "Resposta inválida ao salvar transação." });
      return;
    }

    reset({
      name: "",
      type: data.type,
      categoryId: resolvedCategoryId,
      amount: "",
      transactionDate: data.transactionDate,
      observation: "",
      recurrenceEnabled: data.recurrenceEnabled,
      recurrenceDayOfMonth: data.recurrenceDayOfMonth,
      recurrenceType: data.recurrenceType,
      recurrenceMaxCycles: data.recurrenceMaxCycles,
      recurrenceUnlimitedMode: data.recurrenceUnlimitedMode,
    });
    await onSaved?.(saved);
  }

  function handleTypeSelection(nextType: TransactionType) {
    setValue("type", nextType, { shouldDirty: true, shouldValidate: true });
    const nextDefaultCategory = defaultCategoryByType[nextType];
    const availableInSelectedType = nextType === "expense" ? expenseCategories : incomeCategories;
    if (!availableInSelectedType.includes(selectedCategoryId)) {
      setValue("categoryId", nextDefaultCategory, { shouldDirty: true, shouldValidate: true });
    }
    setIsCreatingCategory(false);
    setNewCategoryName("");
    clearErrors("categoryId");
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
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-1 rounded-lg border border-border bg-surface-alt/60 p-0">
                <button
                  aria-pressed={field.value === "expense"}
                  className={field.value === "expense"
                    ? "rounded-md px-3 py-2 text-sm font-semibold text-red-200 transition-colors duration-200 bg-[rgba(239,68,68,0.2)]"
                    : "rounded-md px-3 py-2 text-sm font-semibold text-muted transition-colors duration-200 hover:bg-surface"
                  }
                  onClick={() => handleTypeSelection("expense")}
                  type="button"
                >
                  Despesa
                </button>
                <button
                  aria-pressed={field.value === "income"}
                  className={field.value === "income"
                    ? "rounded-md px-3 py-2 text-sm font-semibold text-emerald-200 transition-colors duration-200 bg-[rgba(34,197,94,0.2)]"
                    : "rounded-md px-3 py-2 text-sm font-semibold text-muted transition-colors duration-200 hover:bg-surface"
                  }
                  onClick={() => handleTypeSelection("income")}
                  type="button"
                >
                  Receita
                </button>
              </div>
            )}
          />
        </div>

        <div>
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <Select
                onChange={(event) => {
                  if (event.target.value === CREATE_NEW_OPTION_VALUE) {
                    setIsCreatingCategory(true);
                    setNewCategoryName("");
                    field.onChange(CREATE_NEW_OPTION_VALUE);
                    clearErrors("categoryId");
                    return;
                  }

                  setIsCreatingCategory(false);
                  setNewCategoryName("");
                  clearErrors("categoryId");
                  field.onChange(event.target.value);
                }}
                value={isCreatingCategory ? CREATE_NEW_OPTION_VALUE : field.value}
              >
                <optgroup label="Despesa">
                  {expenseCategories.map((category) => (
                    <option key={`expense-${category}`} value={category}>{category}</option>
                  ))}
                </optgroup>
                <optgroup label="Receita">
                  {incomeCategories.map((category) => (
                    <option key={`income-${category}`} value={category}>{category}</option>
                  ))}
                </optgroup>
                <option value={CREATE_NEW_OPTION_VALUE}>Criar nova categoria...</option>
              </Select>
            )}
          />
          {isCreatingCategory ? (
            <Input
              className="mt-2"
              onChange={(event) => {
                setNewCategoryName(event.target.value);
                if (event.target.value.trim()) {
                  clearErrors("categoryId");
                }
              }}
              placeholder="Nome da nova categoria"
              value={newCategoryName}
            />
          ) : null}
          {errors.categoryId ? <p className="mt-1 text-xs text-danger">{errors.categoryId.message}</p> : null}
        </div>

        <div>
          <Controller
            control={control}
            name="amount"
            render={({ field }) => (
              <Input
                inputMode="numeric"
                onBlur={field.onBlur}
                onChange={(event) => {
                  const digits = extractDigits(event.target.value);
                  const masked = formatBrlFromDigits(digits);
                  field.onChange(masked);
                }}
                placeholder="Valor"
                value={field.value}
              />
            )}
          />
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

        <div className="md:col-span-2 rounded-xl border border-border bg-surface-alt/40 p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">Recorrência</p>
              <SimpleTooltip label="Ajuda da recorrência" lines={RECURRENCE_SECTION_TOOLTIP_LINES} size="compact" />
            </div>
            <Controller
              control={control}
              name="recurrenceEnabled"
              render={({ field }) => (
                <Button
                  className={`rounded-md px-3 py-2 text-sm font-semibold ${field.value ? "recurrence-toggle-on" : "recurrence-toggle-off"}`}
                  onClick={() => {
                    const nextEnabled = !field.value;
                    field.onChange(nextEnabled);
                    if (!nextEnabled) {
                      setValue("recurrenceDayOfMonth", undefined, { shouldValidate: true });
                      setValue("recurrenceType", undefined, { shouldValidate: true });
                      setValue("recurrenceMaxCycles", undefined, { shouldValidate: true });
                      setValue("recurrenceUnlimitedMode", undefined, { shouldValidate: true });
                    }
                  }}
                  size="sm"
                  type="button"
                  variant={field.value ? "primary" : "secondary"}
                >
                  {field.value ? "Ligado" : "Desligado"}
                </Button>
              )}
            />
          </div>

          {recurrenceEnabled ? (
            <div className="transaction-recurrence-grid mt-3 grid gap-3 md:grid-cols-2">
              <div>
                <Controller
                  control={control}
                  name="recurrenceDayOfMonth"
                  render={({ field }) => (
                    <Input
                      className="transaction-recurrence-control"
                      id={recurrenceDayId}
                      aria-describedby={errors.recurrenceDayOfMonth ? `${recurrenceDayId}-error` : undefined}
                      max={31}
                      min={1}
                      onChange={(event) => {
                        const next = Number(event.target.value);
                        field.onChange(Number.isFinite(next) && next > 0 ? next : undefined);
                      }}
                      placeholder="Dia do mês (1-31)"
                      type="number"
                      value={field.value ?? ""}
                    />
                  )}
                />
                {errors.recurrenceDayOfMonth ? <p className="mt-1 text-xs text-danger" id={`${recurrenceDayId}-error`}>{errors.recurrenceDayOfMonth.message}</p> : null}
              </div>

              <div>
                <RecurrenceField
                  tooltipId={recurrenceTypeTooltipId}
                  tooltipLabel="Explicação do tipo de recorrência"
                  tooltipLines={RECURRENCE_TYPE_TOOLTIP_LINES}
                >
                  <Controller
                    control={control}
                    name="recurrenceType"
                    render={({ field }) => (
                      <Select
                        id={recurrenceTypeId}
                        aria-describedby={[
                          recurrenceTypeTooltipId,
                          errors.recurrenceType ? `${recurrenceTypeId}-error` : null,
                        ].filter(Boolean).join(" ")}
                        className="transaction-recurrence-control w-full min-w-0 flex-1"
                        onChange={(event) => {
                          const raw = event.target.value;
                          const nextType = raw === "" ? undefined : raw as "limited" | "unlimited";
                          field.onChange(nextType);
                          if (nextType === "limited") {
                            setValue("recurrenceUnlimitedMode", undefined, { shouldValidate: true });
                          }
                          if (nextType === "unlimited") {
                            setValue("recurrenceMaxCycles", undefined, { shouldValidate: true });
                          }
                        }}
                        value={field.value ?? ""}
                      >
                        <option value="">Tipo de recorrência</option>
                        <option value="limited">Limitada</option>
                        <option value="unlimited">Ilimitada</option>
                      </Select>
                    )}
                  />
                </RecurrenceField>
                {errors.recurrenceType ? <p className="mt-1 text-xs text-danger" id={`${recurrenceTypeId}-error`}>{errors.recurrenceType.message}</p> : null}
              </div>

              {recurrenceType === "limited" ? (
                <div>
                  <Controller
                    control={control}
                    name="recurrenceMaxCycles"
                    render={({ field }) => (
                      <Input
                        className="transaction-recurrence-control"
                        id={recurrenceMaxCyclesId}
                        aria-describedby={errors.recurrenceMaxCycles ? `${recurrenceMaxCyclesId}-error` : undefined}
                        min={1}
                        onChange={(event) => {
                          const next = Number(event.target.value);
                          field.onChange(Number.isFinite(next) && next > 0 ? next : undefined);
                        }}
                        placeholder="Quantidade de meses"
                        type="number"
                        value={field.value ?? ""}
                      />
                    )}
                  />
                  {errors.recurrenceMaxCycles ? <p className="mt-1 text-xs text-danger" id={`${recurrenceMaxCyclesId}-error`}>{errors.recurrenceMaxCycles.message}</p> : null}
                </div>
              ) : null}

              {recurrenceType === "unlimited" ? (
                <div>
                  <RecurrenceField
                    tooltipId={recurrenceModeTooltipId}
                    tooltipLabel="Explicação do modo de recorrência"
                    tooltipLines={RECURRENCE_MODE_TOOLTIP_LINES}
                  >
                    <Controller
                      control={control}
                      name="recurrenceUnlimitedMode"
                      render={({ field }) => (
                        <Select className="transaction-recurrence-control w-full min-w-0 flex-1" onChange={(event) => {
                          const raw = event.target.value;
                          field.onChange(raw === "" ? undefined : raw as "automatic" | "manual");
                        }} value={field.value ?? ""} id={recurrenceModeId} aria-describedby={[
                          recurrenceModeTooltipId,
                          errors.recurrenceUnlimitedMode ? `${recurrenceModeId}-error` : null,
                        ].filter(Boolean).join(" ")}>
                          <option value="">Modo da recorrência</option>
                          <option value="automatic">Automática</option>
                          <option value="manual">Manual</option>
                        </Select>
                      )}
                    />
                  </RecurrenceField>
                  {errors.recurrenceUnlimitedMode ? <p className="mt-1 text-xs text-danger" id={`${recurrenceModeId}-error`}>{errors.recurrenceUnlimitedMode.message}</p> : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <Button className="md:col-span-2 md:max-w-40" disabled={isSubmitting} size="sm" type="submit">
          {isSubmitting ? "Salvando..." : uiText.save}
        </Button>
      </form>
    </section>
  );
}
