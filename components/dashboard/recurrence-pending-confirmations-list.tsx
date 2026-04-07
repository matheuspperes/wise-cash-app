"use client";

import { Button } from "@/components/ui/button";
import { formatCurrencyBRL, formatDateBR } from "@/lib/formatting/ptbr";
import { RecurrencePendingConfirmationRow } from "@/lib/ui/dashboard-history-types";

type Props = {
  isSubmitting: boolean;
  items: RecurrencePendingConfirmationRow[];
  onCancel: (id: string) => Promise<void>;
  onConfirm: (id: string) => Promise<void>;
};

export function RecurrencePendingConfirmationsList({ isSubmitting, items, onCancel, onConfirm }: Props) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-border bg-surface p-4 shadow-card">
      <div className="mb-3">
        <h2 className="text-base font-semibold">Confirmações pendentes de recorrência</h2>
        <p className="text-sm text-muted">Confirme ou cancele as pendências antes da efetivação no histórico.</p>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <article className="flex flex-col gap-2 rounded-xl border border-border bg-surface-alt/50 p-3 md:flex-row md:items-center md:justify-between" key={item.id}>
            <div>
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-muted">
                {item.categoryName} • {formatDateBR(item.dueDate)} • {item.type === "income" ? "Receita" : "Despesa"}
              </p>
              <p className="text-sm">{formatCurrencyBRL(item.amount)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                disabled={isSubmitting}
                onClick={() => {
                  void onCancel(item.id);
                }}
                size="sm"
                type="button"
                variant="secondary"
              >
                Cancelar
              </Button>
              <Button
                disabled={isSubmitting}
                onClick={() => {
                  void onConfirm(item.id);
                }}
                size="sm"
                type="button"
              >
                Confirmar
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
