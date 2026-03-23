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
import { CurrentMonthTransactionRow, HistoricalTotalBalance, MonthlyExpenseHistoryGroup } from "@/lib/ui/dashboard-history-types";
import { getVisualDataState } from "@/lib/ui/data-state";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

type Summary = {
  currentMonth: string;
  netBalance: number;
  areaSeries: Array<{ month: string; income: number; expense: number; net: number }>;
  historicalBalance: HistoricalTotalBalance;
  currentMonthTransactions: CurrentMonthTransactionRow[];
  currentMonthExpenses?: CurrentMonthTransactionRow[];
  fullTransactionsHistoryGroups?: MonthlyExpenseHistoryGroup[];
  fullExpenseHistoryGroups?: MonthlyExpenseHistoryGroup[];
  totals?: { income: number; expense: number };
};

export function DashboardPageClient() {
  const [months, setMonths] = useState(12);

  const query = useQuery<Summary>({
    queryKey: ["dashboard-summary", months],
    queryFn: async () => {
      const response = await fetch(`/api/dashboard/summary?months=${months}`);
      if (!response.ok) {
        throw new Error(uiText.loadingError);
      }

      return response.json();
    },
  });

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
        currentMonthTransactions: [],
        totals: { income: 0, expense: 0 },
      },
    [query.data],
  );

  const transactionsCreateHref = useMemo(() => "/transactions?view=new", []);

  return (
    <main className="mx-auto flex max-w-[76.8rem] flex-col gap-5 px-5 pb-28 pt-5 md:pb-5">
      <DashboardHeader
        controls={(
          <div className="flex w-full items-center justify-end gap-3 md:w-auto md:gap-4">
            <Select className="w-40" value={months} onChange={(e) => setMonths(Number(e.target.value))}>
              <option value={3}>3 meses</option>
              <option value={6}>6 meses</option>
              <option value={12}>12 meses</option>
            </Select>
            <Button asChild className="h-10 w-10 rounded-full bg-[var(--primary-cta)] p-0 text-[1.4rem] leading-none text-white shadow-elevated hover:brightness-110" size="ctaIcon">
              <Link aria-label="Nova transação" href={transactionsCreateHref}>+</Link>
            </Button>
          </div>
        )}
      />

      {visualState === "loading" ? <DashboardLoading /> : null}
      {visualState === "error" ? <DashboardError message={uiText.loadingError} onRetry={() => query.refetch()} /> : null}
      {visualState === "empty" ? <DashboardEmpty /> : null}

      {visualState === "ready" || visualState === "fetching" ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5"
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <div className="grid items-stretch gap-4 md:grid-cols-[1fr_0.56fr]">
            <NetBalanceCard isFetching={query.isFetching} value={summary.netBalance} />
            <HistoricalTotalBalanceCard balance={summary.historicalBalance} isFetching={query.isFetching} />
          </div>
          <div className="-mt-1">
            <AreaHistoryChart data={summary.areaSeries} isFetching={query.isFetching} />
          </div>
          <CurrentMonthExpensesTable isFetching={query.isFetching} rows={summary.currentMonthTransactions} />
        </motion.div>
      ) : null}
    </main>
  );
}
