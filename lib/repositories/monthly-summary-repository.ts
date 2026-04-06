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

export async function getMonthlySummary(months = 12, ownerScope?: string) {
  const txs = await listTransactions({}, ownerScope);
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

export async function getMonthlySummaryContext(months = 12, ownerScope?: string): Promise<MonthlySummaryContext> {
  const series = await getMonthlySummary(months, ownerScope);
  const latest = series[series.length - 1] ?? { monthRef: "", month: "", income: 0, expense: 0, net: 0 };

  return {
    series,
    latest,
  };
}

export async function listFullTransactionsHistoryRows(ownerScope?: string): Promise<MonthlyTransactionHistoryRow[]> {
  return (await listTransactions({}, ownerScope))
    .sort((a, b) => (a.transactionDate < b.transactionDate ? 1 : -1))
    .map((tx) => ({
      id: tx.id,
      date: tx.transactionDate,
      description: tx.name,
      category: tx.categoryName,
      type: tx.type,
      amount: tx.amount,
      notes: tx.notes,
      source: tx.source,
      recurrenceRuleId: tx.recurrenceRuleId,
    }));
}

// Legacy alias retained for compatibility with existing references.
export async function listFullExpenseHistoryRows(ownerScope?: string): Promise<MonthlyExpenseHistoryRow[]> {
  return listFullTransactionsHistoryRows(ownerScope);
}

export async function listCurrentMonthTransactions(referenceDate: Date = new Date(), ownerScope?: string): Promise<CurrentMonthTransactionRow[]> {
  return listCurrentMonthTransactionRows(referenceDate, ownerScope);
}
