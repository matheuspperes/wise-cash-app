import { MonthlyPoint } from "@/lib/repositories/monthly-summary-repository";
import { groupMonthlyTransactionHistory } from "@/lib/services/monthly-expense-history";
import { Transaction } from "@/lib/repositories/in-memory-db";
import { CurrentMonthTransactionRow, HistoricalTotalBalance, MonthlyExpenseHistoryGroup, MonthlyExpenseHistoryRow, MonthlyTransactionHistoryGroup, MonthlyTransactionHistoryRow } from "@/lib/ui/dashboard-history-types";

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

export function buildMonthlyTransactionHistoryGroups(rows: MonthlyTransactionHistoryRow[]): MonthlyTransactionHistoryGroup[] {
  return groupMonthlyTransactionHistory(rows);
}

// Legacy alias retained for compatibility with existing consumer naming.
export function buildMonthlyExpenseHistoryGroups(rows: MonthlyExpenseHistoryRow[]): MonthlyExpenseHistoryGroup[] {
  return buildMonthlyTransactionHistoryGroups(rows);
}

export function mapTransactionToCurrentMonthRow(tx: Transaction): CurrentMonthTransactionRow {
  return {
    date: tx.transactionDate,
    description: tx.name,
    category: tx.categoryName,
    type: tx.type,
    value: tx.amount,
  };
}
