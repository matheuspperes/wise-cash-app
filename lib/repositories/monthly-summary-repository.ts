import { listDemoTransactions } from "@/lib/repositories/demo-chart-data";
import { listTransactions } from "@/lib/repositories/transaction-repository";
import { mergeRealAndDemoSeries } from "@/lib/services/chart-demo-series";
import { formatMonthYearLabel } from "@/lib/formatting/ptbr";
import { MonthlyExpenseHistoryRow } from "@/lib/ui/dashboard-history-types";

export type MonthlyPoint = {
  monthRef: string;
  month: string;
  income: number;
  expense: number;
  net: number;
  demoIncome?: number;
  demoExpense?: number;
};

type SummaryOptions = {
  demoMode?: boolean;
};

export type MonthlySummaryContext = {
  series: MonthlyPoint[];
  latest: MonthlyPoint;
};

export function getMonthlySummary(months = 12, options: SummaryOptions = {}) {
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

  if (!options.demoMode) {
    return realSeries.map((point) => ({ ...point, month: formatMonthYearLabel(point.monthRef) }));
  }

  return mergeRealAndDemoSeries(realSeries, listDemoTransactions())
    .slice(-months)
    .map((point) => ({ ...point, month: formatMonthYearLabel(point.monthRef) }));
}

export function getMonthlySummaryContext(months = 12, options: SummaryOptions = {}): MonthlySummaryContext {
  const series = getMonthlySummary(months, options);
  const latest = series[series.length - 1] ?? { monthRef: "", month: "", income: 0, expense: 0, net: 0 };

  return {
    series,
    latest,
  };
}

export function listFullExpenseHistoryRows(): MonthlyExpenseHistoryRow[] {
  return listTransactions({ type: "expense" })
    .sort((a, b) => (a.transactionDate < b.transactionDate ? 1 : -1))
    .map((tx) => ({
      date: tx.transactionDate,
      description: tx.name,
      category: tx.categoryName,
      amount: tx.amount,
    }));
}
