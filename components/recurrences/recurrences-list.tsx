"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { formatCurrencyBRL, formatDateBR } from "@/lib/formatting/ptbr";
import { cn } from "@/lib/utils";
import { RecurrenceListRow } from "@/lib/ui/dashboard-history-types";

type Props = {
  isSubmitting: boolean;
  items: RecurrenceListRow[];
  editingId: string | null;
  onDelete: (id: string) => Promise<void>;
  onDeleteCancel?: () => void;
  onEdit: (id: string) => void;
};

export function RecurrencesList({ isSubmitting, items, editingId, onDelete, onDeleteCancel, onEdit }: Props) {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  if (!items.length) {
    return <p className="text-sm text-muted">Nenhuma recorrência cadastrada.</p>;
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <article
          className={cn(
            "flex flex-col gap-3 rounded-xl border border-border bg-surface-alt/50 p-3 md:flex-row md:items-center md:justify-between",
            editingId === item.id ? "recurrence-item-editing" : null,
          )}
          key={item.id}
        >
          <div className="space-y-1">
            <p className="text-sm font-semibold">{item.name}</p>
            <p className="text-xs text-muted">
              {item.categoryName} • Dia {item.dayOfMonth} • Próxima: {formatDateBR(item.nextScheduledDate)}
            </p>
            <p className="text-xs text-muted">
              {item.type === "income" ? "Receita" : "Despesa"} • {item.statusLabel}
            </p>
            <p className="text-sm">{formatCurrencyBRL(item.amount)}</p>
          </div>
          <div className="flex items-center gap-2">
            {pendingDeleteId === item.id ? (
              <div className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-surface-alt px-2 py-1">
                <button
                  className="rounded px-2 py-1 text-xs font-semibold text-foreground hover:bg-surface"
                  disabled={isSubmitting}
                  onClick={async () => {
                    await onDelete(item.id);
                    setPendingDeleteId(null);
                  }}
                  type="button"
                >
                  Confirmar
                </button>
                <button
                  className="rounded px-2 py-1 text-xs text-muted hover:bg-surface"
                  disabled={isSubmitting}
                  onClick={() => {
                    setPendingDeleteId(null);
                    onDeleteCancel?.();
                  }}
                  type="button"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1">
                <span className="sr-only" id={`recurrence-edit-help-${item.id}`}>Editar recorrência {item.name}</span>
                <span className="sr-only" id={`recurrence-delete-help-${item.id}`}>Remover recorrência {item.name}</span>
                <button
                  aria-describedby={`recurrence-edit-help-${item.id}`}
                  aria-label="Editar recorrência"
                  className="rounded-md border border-border/70 p-1.5 text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
                  disabled={isSubmitting}
                  onClick={() => {
                    onEdit(item.id);
                  }}
                  type="button"
                >
                  <Pencil size={14} />
                </button>
                <button
                  aria-describedby={`recurrence-delete-help-${item.id}`}
                  aria-label="Remover recorrência"
                  className="rounded-md border border-border/70 p-1.5 text-muted transition-colors hover:bg-surface-alt hover:text-danger"
                  disabled={isSubmitting}
                  onClick={() => {
                    setPendingDeleteId(item.id);
                  }}
                  type="button"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
