import { listTransactions } from "@/lib/repositories/transaction-repository";
import { listCurrentMonthTransactionRows } from "@/lib/services/current-month-expenses";
import { formatMonthYearLabel } from "@/lib/formatting/ptbr";
import { CurrentMonthTransactionRow, MonthlyExpenseHistoryRow, MonthlyTransactionHistoryRow } from "@/lib/ui/dashboard-history-types";

export type MonthlyPoint = {
  monthRef: string;
  month: string;
  income: number;
  expense: number;
  net: number;
};

export type MonthlySummaryContext = {
  series: MonthlyPoint[];
  latest: MonthlyPoint;
};

export function getMonthlySummary(months = 12) {
  const txs = listTransactions();
  const bucket = new Map<string, MonthlyPoint>();

  for (const tx of txs) {
    const month = tx.transactionDate.slice(0, 7);
    if (!bucket.has(month)) {
      bucket.set(month, { monthRef: month, month, income: 0, expense: 0, net: 0 });
    }

    const ref = bucket.get(month)!;
    if (tx.type === "income") {
      ref.income += tx.amount;
    } else {
      ref.expense += tx.amount;
    }
    ref.net = ref.income - ref.expense;
  }

  const realSeries = Array.from(bucket.values())
    .sort((a, b) => (a.monthRef > b.monthRef ? 1 : -1))
    .slice(-months);

  return realSeries.map((point) => ({ ...point, month: formatMonthYearLabel(point.monthRef) }));
}

export function getMonthlySummaryContext(months = 12): MonthlySummaryContext {
  const series = getMonthlySummary(months);
  const latest = series[series.length - 1] ?? { monthRef: "", month: "", income: 0, expense: 0, net: 0 };

  return {
    series,
    latest,
  };
}

export function listFullTransactionsHistoryRows(): MonthlyTransactionHistoryRow[] {
  return listTransactions()
    .sort((a, b) => (a.transactionDate < b.transactionDate ? 1 : -1))
    .map((tx) => ({
      date: tx.transactionDate,
      description: tx.name,
      category: tx.categoryName,
      type: tx.type,
      amount: tx.amount,
    }));
}

// Legacy alias retained for compatibility with existing references.
export function listFullExpenseHistoryRows(): MonthlyExpenseHistoryRow[] {
  return listFullTransactionsHistoryRows();
}

export function listCurrentMonthTransactions(referenceDate: Date = new Date()): CurrentMonthTransactionRow[] {
  return listCurrentMonthTransactionRows(referenceDate);
}
