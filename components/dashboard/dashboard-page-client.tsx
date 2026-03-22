"use client";

import { DashboardEmpty, DashboardError } from "@/components/dashboard/dashboard-feedback";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardLoading } from "@/components/dashboard/dashboard-loading";
import { AreaHistoryChart } from "@/components/dashboard/area-history-chart";
import { CurrentMonthExpensesTable } from "@/components/dashboard/current-month-expenses-table";
import { HistoricalTotalBalanceCard } from "@/components/dashboard/historical-total-balance-card";
import { NetBalanceCard } from "@/components/dashboard/net-balance-card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";
import { uiText } from "@/lib/i18n/ui-text";
import { CurrentMonthExpenseRow, HistoricalTotalBalance } from "@/lib/ui/dashboard-history-types";
import { parseDemoMode, withDemoMode } from "@/lib/ui/demo-mode";
import { getVisualDataState } from "@/lib/ui/data-state";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Summary = {
  currentMonth: string;
  netBalance: number;
  areaSeries: Array<{ month: string; income: number; expense: number; net: number; demoIncome?: number; demoExpense?: number }>;
  historicalBalance: HistoricalTotalBalance;
  currentMonthExpenses: CurrentMonthExpenseRow[];
  totals?: { income: number; expense: number };
  demoMode?: boolean;
  hasDemoSeries?: boolean;
};

export function DashboardPageClient() {
  const [months, setMonths] = useState(12);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setDemoMode(parseDemoMode(params.get("demo")));
  }, []);

  const query = useQuery<Summary>({
    queryKey: ["dashboard-summary", months, demoMode],
    queryFn: async () => {
      const response = await fetch(`/api/dashboard/summary?months=${months}&demo=${demoMode ? "1" : "0"}`);
      if (!response.ok) {
        throw new Error(uiText.loadingError);
      }

      return response.json();
    },
  });

  function handleToggleDemo() {
    const nextDemo = !demoMode;
    setDemoMode(nextDemo);
    const current = new URLSearchParams(window.location.search);
    const nextParams = withDemoMode(current, nextDemo);
    const queryString = nextParams.toString();
    const nextUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ""}`;
    window.history.replaceState({}, "", nextUrl);
  }

  const visualState = getVisualDataState({
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    hasData: Boolean(query.data?.areaSeries?.length),
  });

  const summary = useMemo<Summary>(
    () =>
      query.data ?? {
        currentMonth: "",
        netBalance: 0,
        areaSeries: [],
        historicalBalance: { periodStart: "", periodEnd: "", totalIncome: 0, totalExpense: 0, netTotal: 0 },
        currentMonthExpenses: [],
        totals: { income: 0, expense: 0 },
      },
    [query.data],
  );

  return (
    <main className="mx-auto flex max-w-[76.8rem] flex-col gap-5 px-5 pb-28 pt-5 md:pb-5">
      <DashboardHeader demoMode={demoMode} onToggleDemo={handleToggleDemo} />

      <div className="flex items-center justify-between gap-3 md:hidden">
        <Button className="rounded-lg px-4" onClick={handleToggleDemo} size="sm" type="button" variant={demoMode ? "primary" : "secondary"}>
          {demoMode ? "Demo ON" : "Demo OFF"}
        </Button>
        <div className="flex items-center gap-3">
          <Select className="w-40" value={months} onChange={(e) => setMonths(Number(e.target.value))}>
            <option value={3}>3 meses</option>
            <option value={6}>6 meses</option>
            <option value={12}>12 meses</option>
          </Select>
        </div>
      </div>

      <div className="hidden items-center justify-end gap-4 md:flex">
        <Select className="w-40" value={months} onChange={(e) => setMonths(Number(e.target.value))}>
          <option value={3}>3 meses</option>
          <option value={6}>6 meses</option>
          <option value={12}>12 meses</option>
        </Select>
        <Button asChild className="h-10 w-10 rounded-full bg-[var(--primary-cta)] p-0 text-[1.4rem] leading-none text-white shadow-elevated hover:brightness-110" size="ctaIcon">
          <Link aria-label="Nova transação" href="/transactions">+</Link>
        </Button>
      </div>

      {visualState === "loading" ? <DashboardLoading /> : null}
      {visualState === "error" ? <DashboardError message={uiText.loadingError} onRetry={() => query.refetch()} /> : null}
      {visualState === "empty" ? <DashboardEmpty demoMode={demoMode} /> : null}

      {visualState === "ready" || visualState === "fetching" ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5"
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <div className="grid gap-4 md:grid-cols-[1fr_0.8fr]">
            <NetBalanceCard isFetching={query.isFetching} value={summary.netBalance} />
            <HistoricalTotalBalanceCard balance={summary.historicalBalance} isFetching={query.isFetching} />
          </div>
          <AreaHistoryChart data={summary.areaSeries} demoMode={demoMode} isFetching={query.isFetching} />
          <CurrentMonthExpensesTable isFetching={query.isFetching} rows={summary.currentMonthExpenses} />
        </motion.div>
      ) : null}

      <Button asChild className="fixed bottom-6 right-6 z-20 h-[3.125rem] w-[3.125rem] rounded-full bg-[var(--primary-cta)] p-0 text-[2rem] leading-none text-white shadow-elevated md:hidden" size="ctaIcon">
        <Link aria-label="Nova transação" href="/transactions">+</Link>
      </Button>
    </main>
  );
}
