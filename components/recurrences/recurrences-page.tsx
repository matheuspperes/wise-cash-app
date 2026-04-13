"use client";

import { RecurrencePendingConfirmationsList } from "@/components/dashboard/recurrence-pending-confirmations-list";
import { RecurrencesList } from "@/components/recurrences/recurrences-list";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { RecurrencePendingConfirmationRow, RecurrenceListRow } from "@/lib/ui/dashboard-history-types";
import { useEffect, useMemo, useState } from "react";

type RecurrenceEditPayload = {
  dayOfMonth: number;
  recurrenceType: "limited" | "unlimited";
  maxCycles?: number;
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
  onSaveEditRecurrence,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [recurrenceType, setRecurrenceType] = useState<"limited" | "unlimited">("unlimited");
  const [maxCycles, setMaxCycles] = useState(1);

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
  }, [editingItem]);

  return (
    <div className="space-y-4">
      {errorMessage ? <p className="text-sm text-danger">{errorMessage}</p> : null}

      <section className="rounded-2xl border border-border bg-surface p-4 shadow-card">
        <div className="mb-3">
          <h2 className="text-base font-semibold">Pendências</h2>
          <p className="text-sm text-muted">Confirme ou cancele recorrências em modo manual.</p>
        </div>
        {isLoading ? <p className="text-sm text-muted">Carregando pendências...</p> : null}
        {!isLoading && !pendingItems.length ? <p className="text-sm text-muted">Sem confirmações pendentes.</p> : null}
        {!isLoading && pendingItems.length ? (
          <RecurrencePendingConfirmationsList
            isSubmitting={isSubmitting}
            items={pendingItems}
            onCancel={onCancelPending}
            onConfirm={onConfirmPending}
          />
        ) : null}
      </section>

      <section className="rounded-2xl border border-border bg-surface p-4 shadow-card">
        <div className="mb-3">
          <h2 className="text-base font-semibold">Recorrências</h2>
          <p className="text-sm text-muted">Gerencie regras recorrentes e ajuste ciclos futuros.</p>
        </div>
        {isLoading ? <p className="text-sm text-muted">Carregando recorrências...</p> : null}
        {!isLoading ? (
          <RecurrencesList
            isSubmitting={isSubmitting}
            items={recurrenceItems}
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
            className="grid gap-3 md:grid-cols-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (!editingId) {
                return;
              }

              void onSaveEditRecurrence(editingId, {
                dayOfMonth,
                recurrenceType,
                maxCycles: recurrenceType === "limited" ? maxCycles : undefined,
              }).then(() => {
                setEditingId(null);
              });
            }}
          >
            <Input
              max={31}
              min={1}
              onChange={(event) => {
                setDayOfMonth(Number(event.target.value));
              }}
              type="number"
              value={dayOfMonth}
            />
            <Select
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
              {editErrorMessage ? <p className="text-sm text-danger">{editErrorMessage}</p> : null}
            </div>
          </form>
        </section>
      ) : null}
    </div>
  );
}
