import { DemoTransactionItem } from "@/lib/repositories/demo-chart-data";

export type ChartSeriesPoint = {
  monthRef: string;
  month: string;
  income: number;
  expense: number;
  net: number;
  demoIncome?: number;
  demoExpense?: number;
};

export function mergeRealAndDemoSeries(realSeries: ChartSeriesPoint[], demoItems: DemoTransactionItem[]) {
  const bucket = new Map<string, ChartSeriesPoint>();

  for (const point of realSeries) {
    bucket.set(point.monthRef, { ...point, demoIncome: 0, demoExpense: 0 });
  }

  for (const item of demoItems) {
    if (!bucket.has(item.monthRef)) {
      bucket.set(item.monthRef, {
        monthRef: item.monthRef,
        month: item.monthRef,
        income: 0,
        expense: 0,
        net: 0,
        demoIncome: 0,
        demoExpense: 0,
      });
    }

    const point = bucket.get(item.monthRef)!;
    if (item.type === "income") {
      point.demoIncome = (point.demoIncome ?? 0) + item.amount;
    } else {
      point.demoExpense = (point.demoExpense ?? 0) + item.amount;
    }
  }

  return Array.from(bucket.values()).sort((a, b) => (a.monthRef > b.monthRef ? 1 : -1));
}
