import { getMonthlySummary } from "@/lib/repositories/monthly-summary-repository";
import { parseDemoMode } from "@/lib/ui/demo-mode";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const months = Number(url.searchParams.get("months") ?? "12");
  const demoMode = parseDemoMode(url.searchParams.get("demo"));
  const areaSeries = getMonthlySummary(Number.isFinite(months) ? months : 12, { demoMode });
  const latest = areaSeries[areaSeries.length - 1] ?? { income: 0, expense: 0, net: 0, month: "" };

  return NextResponse.json({
    currentMonth: latest.month,
    netBalance: latest.net,
    totals: { income: latest.income, expense: latest.expense },
    demoMode,
    hasDemoSeries: areaSeries.some((point) => (point.demoIncome ?? 0) > 0 || (point.demoExpense ?? 0) > 0),
    areaSeries,
  });
}
