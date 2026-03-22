import { formatMonthRefLabel, toMonthRef } from "@/lib/formatting/ptbr";
import { MonthlyExpenseHistoryGroup, MonthlyExpenseHistoryRow } from "@/lib/ui/dashboard-history-types";

export function sortExpenseRowsByDateDesc(rows: MonthlyExpenseHistoryRow[]): MonthlyExpenseHistoryRow[] {
  return [...rows].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function groupMonthlyExpenseHistory(rows: MonthlyExpenseHistoryRow[]): MonthlyExpenseHistoryGroup[] {
  const sortedRows = sortExpenseRowsByDateDesc(rows);
  const bucket = new Map<string, MonthlyExpenseHistoryRow[]>();

  for (const row of sortedRows) {
    const monthRef = toMonthRef(row.date);
    const rowsInMonth = bucket.get(monthRef) ?? [];
    rowsInMonth.push(row);
    bucket.set(monthRef, rowsInMonth);
  }

  return Array.from(bucket.entries())
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([monthRef, groupedRows]) => ({
      monthRef,
      monthLabel: formatMonthRefLabel(monthRef),
      isCollapsedByDefault: true,
      rows: groupedRows,
    }));
}
