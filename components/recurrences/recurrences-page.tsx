"use client";

import { RecurrencePendingConfirmationsList } from "@/components/dashboard/recurrence-pending-confirmations-list";
import { RecurrencesList } from "@/components/recurrences/recurrences-list";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { formatBrlFromDigits, parseBrlDisplayToAmount } from "@/lib/formatting/brl-currency-mask";
import {
  RECURRENCES_PENDING_EMPTY_LABEL,
  RECURRENCES_PENDING_SECTION_DESCRIPTION,
  RECURRENCES_PENDING_SECTION_TITLE,
  RECURRENCES_RULES_SECTION_DESCRIPTION,
  RECURRENCES_RULES_SECTION_TITLE,
} from "@/lib/ui/recurrence-tooltip-content";
import { RecurrencePendingConfirmationRow, RecurrenceListRow } from "@/lib/ui/dashboard-history-types";
import { useEffect, useMemo, useState } from "react";

type RecurrenceEditPayload = {
  dayOfMonth: number;
  recurrenceType: "limited" | "unlimited";
  maxCycles?: number;
  amount: number;
};

type Props = {
  isLoading: boolean;
  isSubmitting: boolean;
  isSavingEdit: boolean;
  pendingItems: RecurrencePendingConfirmationRow[];
  recurrenceItems: RecurrenceListRow[];
  errorMessage: string | null;
  editErrorMessage: string | null;
  onCancelPending: (id: string) => Promise<void>;
  onConfirmPending: (id: string) => Promise<void>;
  onDeleteRecurrence: (id: string) => Promise<void>;
  onDeleteRecurrenceCancel: () => void;
  onSaveEditRecurrence: (id: string, payload: RecurrenceEditPayload) => Promise<void>;
};

export function RecurrencesPage({
  isLoading,
  isSavingEdit,
  isSubmitting,
  pendingItems,
  recurrenceItems,
  errorMessage,
  editErrorMessage,
  onCancelPending,
  onConfirmPending,
  onDeleteRecurrence,
  onDeleteRecurrenceCancel,
  onSaveEditRecurrence,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [recurrenceType, setRecurrenceType] = useState<"limited" | "unlimited">("unlimited");
  const [maxCycles, setMaxCycles] = useState(1);
  const [amountDisplay, setAmountDisplay] = useState("");
  const [editValidationError, setEditValidationError] = useState<string | null>(null);

  const editingItem = useMemo(
    () => recurrenceItems.find((item) => item.id === editingId) ?? null,
    [editingId, recurrenceItems],
  );

  useEffect(() => {
    if (!editingItem) {
      return;
    }

    setDayOfMonth(editingItem.dayOfMonth);
    setRecurrenceType(editingItem.recurrenceType);
    setMaxCycles(editingItem.maxCycles ?? Math.max(editingItem.monthsRemaining ?? 1, 1));
    setAmountDisplay(formatBrlFromDigits(String(Math.round(editingItem.amount * 100))));
    setEditValidationError(null);
  }, [editingItem]);

  const shouldRenderPendingBlock = isLoading || pendingItems.length > 0;

  return (
    <div className="space-y-4">
      {errorMessage ? <p className="text-sm text-danger">{errorMessage}</p> : null}

      {shouldRenderPendingBlock ? (
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-card">
          <div className="mb-3">
            <h2 className="text-base font-semibold">{RECURRENCES_PENDING_SECTION_TITLE}</h2>
            <p className="text-sm text-muted">{RECURRENCES_PENDING_SECTION_DESCRIPTION}</p>
          </div>
          {isLoading ? <p className="text-sm text-muted">Carregando pendências...</p> : null}
          {!isLoading && !pendingItems.length ? <p className="text-sm text-muted">{RECURRENCES_PENDING_EMPTY_LABEL}</p> : null}
          {!isLoading && pendingItems.length ? (
            <RecurrencePendingConfirmationsList
              isSubmitting={isSubmitting}
              items={pendingItems}
              onCancel={onCancelPending}
              onConfirm={onConfirmPending}
            />
          ) : null}
        </section>
      ) : null}

      <section className="rounded-2xl border border-border bg-surface p-4 shadow-card">
        <div className="mb-3">
          <h2 className="text-base font-semibold">{RECURRENCES_RULES_SECTION_TITLE}</h2>
          <p className="text-sm text-muted">{RECURRENCES_RULES_SECTION_DESCRIPTION}</p>
        </div>
        {isLoading ? <p className="text-sm text-muted">Carregando recorrências...</p> : null}
        {!isLoading ? (
          <RecurrencesList
            editingId={editingId}
            isSubmitting={isSubmitting}
            items={recurrenceItems}
            onDeleteCancel={onDeleteRecurrenceCancel}
            onDelete={onDeleteRecurrence}
            onEdit={(id) => {
              setEditingId(id);
            }}
          />
        ) : null}
      </section>

      {editingItem ? (
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-card">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold">Editar recorrência: {editingItem.name}</h3>
            <Button
              onClick={() => {
                setEditingId(null);
              }}
              size="sm"
              type="button"
              variant="secondary"
            >
              Fechar
            </Button>
          </div>
          <form
            className="transaction-recurrence-grid grid gap-3 md:grid-cols-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (!editingId) {
                return;
              }

              const parsedAmount = parseBrlDisplayToAmount(amountDisplay);
              if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
                setEditValidationError("Informe um valor numérico válido.");
                return;
              }

              void onSaveEditRecurrence(editingId, {
                dayOfMonth,
                recurrenceType,
                maxCycles: recurrenceType === "limited" ? maxCycles : undefined,
                amount: parsedAmount,
              }).then(() => {
                setEditingId(null);
              });
            }}
          >
            <Input
              className="transaction-recurrence-control"
              max={31}
              min={1}
              onChange={(event) => {
                setDayOfMonth(Number(event.target.value));
              }}
              type="number"
              value={dayOfMonth}
            />
            <Input
              className="transaction-recurrence-control"
              inputMode="numeric"
              onChange={(event) => {
                const digits = event.target.value.replace(/\D/g, "");
                setAmountDisplay(formatBrlFromDigits(digits));
                setEditValidationError(null);
              }}
              placeholder="Valor"
              value={amountDisplay}
            />
            <Select
              className="transaction-recurrence-control"
              onChange={(event) => {
                const value = event.target.value === "limited" ? "limited" : "unlimited";
                setRecurrenceType(value);
              }}
              value={recurrenceType}
            >
              <option value="unlimited">Ilimitada</option>
              <option value="limited">Limitada</option>
            </Select>
            {recurrenceType === "limited" ? (
              <Input
                className="transaction-recurrence-control"
                min={1}
                onChange={(event) => {
                  setMaxCycles(Number(event.target.value));
                }}
                type="number"
                value={maxCycles}
              />
            ) : (
              <div />
            )}
            <div className="md:col-span-3 flex items-center gap-2">
              <Button disabled={isSavingEdit} size="sm" type="submit">
                {isSavingEdit ? "Salvando..." : "Salvar"}
              </Button>
              {editValidationError ? <p className="text-sm text-danger">{editValidationError}</p> : null}
              {editErrorMessage ? <p className="text-sm text-danger">{editErrorMessage}</p> : null}
            </div>
          </form>
        </section>
      ) : null}
    </div>
  );
}
