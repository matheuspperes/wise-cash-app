"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { formatCurrencyBRL, formatDateBR } from "@/lib/formatting/ptbr";
import { uiText } from "@/lib/i18n/ui-text";
import { correctCategoryLabel } from "@/lib/ui/category-label-corrections";
import { MonthlyExpenseHistoryGroup, MonthlyTransactionHistoryRow } from "@/lib/ui/dashboard-history-types";

type Props = {
  groups: MonthlyExpenseHistoryGroup[];
  isLoading?: boolean;
  onEditRow?: (row: MonthlyTransactionHistoryRow) => void;
  onDeleteRow?: (row: MonthlyTransactionHistoryRow) => Promise<void>;
  onDeleteCancel?: () => void;
};

export function MonthlyExpenseHistoryAccordion({ groups, isLoading = false, onEditRow, onDeleteRow, onDeleteCancel }: Props) {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  return (
    <section className="rounded-2xl border border-border bg-surface p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{uiText.fullHistoryTitle}</h2>
        {isLoading ? <span className="text-sm text-muted">Sincronizando...</span> : null}
      </div>

      {!groups.length ? (
        <p className="text-sm text-muted">{uiText.fullHistoryEmpty}</p>
      ) : (
        <div className="space-y-3">
          {groups.map((group) => (
            <details className="rounded-xl border border-border bg-surface-alt/30" key={group.monthRef} open={!group.isCollapsedByDefault}>
              <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold tracking-wide text-foreground">
                <div className="flex items-center justify-between gap-3">
                  <span>{group.monthLabel}</span>
                  <span className="text-xs font-medium text-muted">{group.rows.length} lançamentos</span>
                </div>
              </summary>

              <div className="overflow-x-auto border-t border-border px-4 pb-3 pt-2">
                <table className="min-w-full divide-y divide-border text-left">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-muted">
                      <th className="py-2 pr-4 font-medium">Data</th>
                      <th className="py-2 pr-4 font-medium">Descrição</th>
                      <th className="py-2 pr-4 font-medium">Categoria</th>
                      <th className="py-2 pr-4 font-medium">Tipo</th>
                      <th className="py-2 text-right font-medium">Valor</th>
                      <th className="py-2 pl-4 text-right font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/70 text-sm">
                    {group.rows.map((row) => (
                      <tr key={row.id}>
                        <td className="whitespace-nowrap py-2 pr-4">{formatDateBR(row.date)}</td>
                        <td className="py-2 pr-4">{row.description}</td>
                        <td className="py-2 pr-4">{correctCategoryLabel(row.category)}</td>
                        <td className="whitespace-nowrap py-2 pr-4">{row.type === "income" ? uiText.typeIncome : uiText.typeExpense}</td>
                        <td className={row.type === "income" ? "whitespace-nowrap py-2 text-right font-semibold text-emerald-400" : "whitespace-nowrap py-2 text-right font-semibold text-danger"}>
                          {row.type === "income" ? "+" : "-"}{formatCurrencyBRL(row.amount)}
                        </td>
                        <td className="whitespace-nowrap py-2 pl-4 text-right">
                          {pendingDeleteId === row.id ? (
                            <div className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-surface-alt px-2 py-1">
                              <button
                                className="rounded px-2 py-1 text-xs font-semibold text-foreground hover:bg-surface"
                                onClick={async () => {
                                  await onDeleteRow?.(row);
                                  setPendingDeleteId(null);
                                }}
                                type="button"
                              >
                                Confirmar
                              </button>
                              <button
                                className="rounded px-2 py-1 text-xs text-muted hover:bg-surface"
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
                              <button
                                aria-label="Editar lançamento"
                                className="rounded-md border border-border/70 p-1.5 text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
                                onClick={() => onEditRow?.(row)}
                                type="button"
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                aria-label="Remover lançamento"
                                className="rounded-md border border-border/70 p-1.5 text-muted transition-colors hover:bg-surface-alt hover:text-danger"
                                onClick={() => setPendingDeleteId(row.id)}
                                type="button"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}
