import { getMonthlySummaryContext, listCurrentMonthTransactions, listFullExpenseHistoryRows } from "@/lib/repositories/monthly-summary-repository";
import { buildHistoricalTotalBalance, buildMonthlyExpenseHistoryGroups } from "@/lib/services/dashboard-history-mapper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const months = Number(url.searchParams.get("months") ?? "12");
  // Legacy compatibility: ignore deprecated demo query parameter.
  url.searchParams.get("demo");
  const summaryContext = getMonthlySummaryContext(Number.isFinite(months) ? months : 12);
  const areaSeries = summaryContext.series;
  const latest = summaryContext.latest;
  const historicalBalance = buildHistoricalTotalBalance(areaSeries);
  const currentMonthTransactions = listCurrentMonthTransactions();
  const fullExpenseHistoryRows = listFullExpenseHistoryRows();
  const fullExpenseHistoryGroups = buildMonthlyExpenseHistoryGroups(fullExpenseHistoryRows);

  return NextResponse.json({
    currentMonth: latest.month,
    netBalance: latest.net,
    totals: { income: latest.income, expense: latest.expense },
    historicalBalance,
    currentMonthTransactions,
    // Legacy payload retained temporarily for compatibility.
    currentMonthExpenses: currentMonthTransactions,
    fullExpenseHistoryGroups,
    areaSeries,
  });
}
