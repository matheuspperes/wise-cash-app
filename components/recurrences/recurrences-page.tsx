"use client";

import { RecurrencePendingConfirmationsList } from "@/components/dashboard/recurrence-pending-confirmations-list";
import { RecurrenceEditDrawer } from "@/components/recurrences/recurrence-edit-drawer";
import { RecurrencesList } from "@/components/recurrences/recurrences-list";
import {
  RECURRENCES_PENDING_EMPTY_LABEL,
  RECURRENCES_PENDING_SECTION_DESCRIPTION,
  RECURRENCES_PENDING_SECTION_TITLE,
  RECURRENCES_RULES_SECTION_DESCRIPTION,
  RECURRENCES_RULES_SECTION_TITLE,
} from "@/lib/ui/recurrence-tooltip-content";
import { RecurrencePendingConfirmationRow, RecurrenceListRow } from "@/lib/ui/dashboard-history-types";
import { useMemo, useState } from "react";

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
  onSaveEditRecurrence: (id: string, payload: RecurrenceEditPayload) => Promise<boolean>;
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

  const editingItem = useMemo(
    () => recurrenceItems.find((item) => item.id === editingId) ?? null,
    [editingId, recurrenceItems],
  );

  const shouldRenderPendingBlock = isLoading || pendingItems.length > 0;

  return (
    <div className="space-y-4">
      {errorMessage ? <p className="text-sm text-danger">{errorMessage}</p> : null}

      {shouldRenderPendingBlock ? (
        isLoading || !pendingItems.length ? (
          <section className="rounded-2xl border border-border bg-surface p-4 shadow-card">
            <div className="mb-3">
              <h2 className="text-base font-semibold">{RECURRENCES_PENDING_SECTION_TITLE}</h2>
              <p className="text-sm text-muted">{RECURRENCES_PENDING_SECTION_DESCRIPTION}</p>
            </div>
            {isLoading ? <p className="text-sm text-muted">Carregando pendências...</p> : null}
            {!isLoading && !pendingItems.length ? <p className="text-sm text-muted">{RECURRENCES_PENDING_EMPTY_LABEL}</p> : null}
          </section>
        ) : (
          <RecurrencePendingConfirmationsList
            isSubmitting={isSubmitting}
            items={pendingItems}
            onCancel={onCancelPending}
            onConfirm={onConfirmPending}
          />
        )
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

      <RecurrenceEditDrawer
        errorMessage={editErrorMessage}
        isOpen={Boolean(editingItem)}
        isSaving={isSavingEdit}
        onOpenChange={(open) => {
          if (!open) {
            setEditingId(null);
          }
        }}
        onSave={onSaveEditRecurrence}
        recurrence={editingItem}
      />
    </div>
  );
}
