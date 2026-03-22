import { MonthlyPoint } from "@/lib/repositories/monthly-summary-repository";
import { groupMonthlyExpenseHistory } from "@/lib/services/monthly-expense-history";
import { HistoricalTotalBalance, MonthlyExpenseHistoryGroup, MonthlyExpenseHistoryRow } from "@/lib/ui/dashboard-history-types";

export function buildHistoricalTotalBalance(series: MonthlyPoint[]): HistoricalTotalBalance {
  if (!series.length) {
    return {
      periodStart: "",
      periodEnd: "",
      totalIncome: 0,
      totalExpense: 0,
      netTotal: 0,
    };
  }

  const totalIncome = series.reduce((acc, point) => acc + point.income, 0);
  const totalExpense = series.reduce((acc, point) => acc + point.expense, 0);

  return {
    periodStart: series[0].monthRef,
    periodEnd: series[series.length - 1].monthRef,
    totalIncome,
    totalExpense,
    netTotal: totalIncome - totalExpense,
  };
}

export function buildMonthlyExpenseHistoryGroups(rows: MonthlyExpenseHistoryRow[]): MonthlyExpenseHistoryGroup[] {
  return groupMonthlyExpenseHistory(rows);
}
