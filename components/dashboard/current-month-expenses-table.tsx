import { formatCurrencyBRL, formatDateBR } from "@/lib/formatting/ptbr";
import { uiText } from "@/lib/i18n/ui-text";
import { correctCategoryLabel } from "@/lib/ui/category-label-corrections";
import { CurrentMonthTransactionRow } from "@/lib/ui/dashboard-history-types";
import { cn } from "@/lib/utils";

type Props = {
  rows: CurrentMonthTransactionRow[];
  isFetching?: boolean;
};

export function CurrentMonthExpensesTable({ rows, isFetching = false }: Props) {
  const sortedRows = [...rows].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="rounded-2xl border border-border bg-surface p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{uiText.currentMonthExpensesTitle}</h2>
        {isFetching ? <span className="text-sm text-muted">{uiText.syncStatus}</span> : null}
      </div>

      {!sortedRows.length ? (
        <p className="text-sm text-muted">{uiText.currentMonthExpensesEmpty}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border text-left">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-muted">
                <th className="py-2 pr-4 font-medium">{uiText.columnDate}</th>
                <th className="py-2 pr-4 font-medium">{uiText.columnDescription}</th>
                <th className="py-2 pr-4 font-medium">{uiText.columnCategory}</th>
                <th className="py-2 text-right font-medium">{uiText.columnValue}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70 text-sm">
              {sortedRows.map((row, index) => (
                <tr key={`${row.date}-${row.description}-${index}`}>
                  <td className="whitespace-nowrap py-2 pr-4">{formatDateBR(row.date)}</td>
                  <td className="py-2 pr-4">{row.description}</td>
                  <td className="py-2 pr-4">{correctCategoryLabel(row.category)}</td>
                  <td className={cn("whitespace-nowrap py-2 text-right font-semibold", row.type === "income" ? "text-emerald-400" : "text-danger")}>
                    {row.type === "income" ? "+" : "-"}
                    {formatCurrencyBRL(row.value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
