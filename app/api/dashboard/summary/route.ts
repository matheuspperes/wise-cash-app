import { getMonthlySummary } from "@/lib/repositories/monthly-summary-repository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const months = Number(url.searchParams.get("months") ?? "12");
  const areaSeries = getMonthlySummary(Number.isFinite(months) ? months : 12);
  const latest = areaSeries[areaSeries.length - 1] ?? { income: 0, expense: 0, net: 0, month: "" };

  return NextResponse.json({
    currentMonth: latest.month,
    netBalance: latest.net,
    totals: { income: latest.income, expense: latest.expense },
    areaSeries,
  });
}
