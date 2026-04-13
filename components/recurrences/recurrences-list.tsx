"use client";

import { Button } from "@/components/ui/button";
import { formatCurrencyBRL, formatDateBR } from "@/lib/formatting/ptbr";
import { RecurrenceListRow } from "@/lib/ui/dashboard-history-types";

type Props = {
  isSubmitting: boolean;
  items: RecurrenceListRow[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string) => void;
};

export function RecurrencesList({ isSubmitting, items, onDelete, onEdit }: Props) {
  if (!items.length) {
    return <p className="text-sm text-muted">Nenhuma recorrência cadastrada.</p>;
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <article className="flex flex-col gap-3 rounded-xl border border-border bg-surface-alt/50 p-3 md:flex-row md:items-center md:justify-between" key={item.id}>
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
            <Button
              disabled={isSubmitting}
              onClick={() => {
                onEdit(item.id);
              }}
              size="sm"
              type="button"
              variant="secondary"
            >
              Editar
            </Button>
            <Button
              disabled={isSubmitting}
              onClick={() => {
                void onDelete(item.id);
              }}
              size="sm"
              type="button"
              variant="secondary"
            >
              Excluir
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
