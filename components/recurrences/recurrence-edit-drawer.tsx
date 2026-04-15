"use client";

import * as Dialog from "@radix-ui/react-dialog";

import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { formatBrlFromDigits, parseBrlDisplayToAmount } from "@/lib/formatting/brl-currency-mask";
import { RecurrenceListRow } from "@/lib/ui/dashboard-history-types";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type RecurrenceEditPayload = {
  dayOfMonth: number;
  recurrenceType: "limited" | "unlimited";
  maxCycles?: number;
  amount: number;
};

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  recurrence: RecurrenceListRow | null;
  isSaving?: boolean;
  errorMessage?: string | null;
  onSave: (id: string, payload: RecurrenceEditPayload) => Promise<boolean>;
};

export function RecurrenceEditDrawer({
  isOpen,
  onOpenChange,
  recurrence,
  isSaving = false,
  errorMessage,
  onSave,
}: Props) {
  const [dayOfMonthInput, setDayOfMonthInput] = useState("");
  const [recurrenceType, setRecurrenceType] = useState<"limited" | "unlimited">("unlimited");
  const [maxCyclesInput, setMaxCyclesInput] = useState("");
  const [amountDisplay, setAmountDisplay] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (!recurrence) {
      return;
    }

    setDayOfMonthInput(String(recurrence.dayOfMonth));
    setRecurrenceType(recurrence.recurrenceType);
    setMaxCyclesInput(String(recurrence.maxCycles ?? Math.max(recurrence.monthsRemaining ?? 1, 1)));
    setAmountDisplay(formatBrlFromDigits(String(Math.round(recurrence.amount * 100))));
    setValidationError(null);
  }, [recurrence]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!recurrence) {
      return;
    }

    const parsedDayOfMonth = Number(dayOfMonthInput);
    if (!Number.isInteger(parsedDayOfMonth) || parsedDayOfMonth < 1 || parsedDayOfMonth > 31) {
      setValidationError("Informe um dia do mês válido entre 1 e 31.");
      return;
    }

    let parsedMaxCycles: number | undefined;
    if (recurrenceType === "limited") {
      parsedMaxCycles = Number(maxCyclesInput);
      if (!Number.isInteger(parsedMaxCycles) || parsedMaxCycles < 1) {
        setValidationError("Informe um número de ciclos maior ou igual a 1.");
        return;
      }
    }

    const parsedAmount = parseBrlDisplayToAmount(amountDisplay);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setValidationError("Informe um valor numérico válido.");
      return;
    }

    const wasSaved = await onSave(recurrence.id, {
      dayOfMonth: parsedDayOfMonth,
      recurrenceType,
      maxCycles: recurrenceType === "limited" ? parsedMaxCycles : undefined,
      amount: parsedAmount,
    });

    if (wasSaved) {
      onOpenChange(false);
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-border bg-surface p-5 shadow-card">
          <Dialog.Title className="text-lg font-semibold">Editar recorrência</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-muted">
            Ajuste os dados da recorrência e salve para atualizar os próximos ciclos.
          </Dialog.Description>
          {recurrence ? <p className="mt-2 text-sm font-medium">{recurrence.name}</p> : null}

          <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
            <Input
              max={31}
              min={1}
              onChange={(event) => {
                setDayOfMonthInput(event.target.value);
                setValidationError(null);
              }}
              type="number"
              value={dayOfMonthInput}
            />
            <Input
              inputMode="numeric"
              onChange={(event) => {
                const digits = event.target.value.replace(/\D/g, "");
                setAmountDisplay(formatBrlFromDigits(digits));
                setValidationError(null);
              }}
              placeholder="Valor"
              value={amountDisplay}
            />
            <Select
              onChange={(event) => {
                const value = event.target.value === "limited" ? "limited" : "unlimited";
                setRecurrenceType(value);
                setValidationError(null);
              }}
              value={recurrenceType}
            >
              <option value="unlimited">Ilimitada</option>
              <option value="limited">Limitada</option>
            </Select>
            {recurrenceType === "limited" ? (
              <Input
                min={1}
                onChange={(event) => {
                  setMaxCyclesInput(event.target.value);
                  setValidationError(null);
                }}
                type="number"
                value={maxCyclesInput}
              />
            ) : null}

            {validationError ? <p className="text-sm text-danger">{validationError}</p> : null}
            {errorMessage ? <p className="text-sm text-danger">{errorMessage}</p> : null}

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
