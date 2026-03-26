"use client";

import { DashboardEmpty, DashboardError } from "@/components/dashboard/dashboard-feedback";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardLoading } from "@/components/dashboard/dashboard-loading";
import { AreaHistoryChart } from "@/components/dashboard/area-history-chart";
import { CurrentMonthExpensesTable } from "@/components/dashboard/current-month-expenses-table";
import { HistoricalTotalBalanceCard } from "@/components/dashboard/historical-total-balance-card";
import { NetBalanceCard } from "@/components/dashboard/net-balance-card";
import { Button } from "@/components/ui/button";
import { uiText } from "@/lib/i18n/ui-text";
import { getLocalDashboardSummary } from "@/lib/services/local-dashboard-summary";
import { StorageUnavailableError } from "@/lib/storage/local-storage-health";
import { resolveDashboardInitialMonths } from "@/lib/ui/dashboard-period-default";
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
  const [months, setMonths] = useState(() => resolveDashboardInitialMonths());

  const query = useQuery<Summary>({
    queryKey: ["dashboard-summary", months],
    queryFn: async () => {
      try {
        return await getLocalDashboardSummary(months);
      } catch (error) {
        if (error instanceof StorageUnavailableError) {
          throw new Error("Armazenamento local indisponível. Verifique as permissões do navegador.");
        }

        throw new Error(uiText.loadingError);
      }
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

  const transactionsHistoryHref = useMemo(() => "/transactions?view=history", []);
  const transactionsCreateHref = useMemo(() => "/transactions?view=new", []);
  const ctaPaddingClasses = "h-10 px-4 py-2 text-sm";

  return (
    <main className="mx-auto flex max-w-[76.8rem] flex-col gap-5 px-5 pb-28 pt-5 md:pb-5">
      <DashboardHeader
        controls={(
          <div className="flex w-full flex-wrap items-center justify-end gap-2 md:w-auto md:gap-3">
            <Button
              asChild
              className={`${ctaPaddingClasses} border border-[rgba(59,130,246,0.25)] bg-[rgba(59,130,246,0.12)] text-[var(--primary-cta)] shadow-card hover:bg-[rgba(59,130,246,0.18)]`}
              size="md"
              variant="secondary"
            >
              <Link aria-label="Transações" href={transactionsHistoryHref}>Transações</Link>
            </Button>
            <Button asChild className={`${ctaPaddingClasses} bg-[var(--primary-cta)] text-white shadow-elevated hover:brightness-110`} size="md">
              <Link aria-label="Nova Transação" href={transactionsCreateHref}>Nova Transação</Link>
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
          <div className="grid items-stretch gap-4 md:grid-cols-2">
            <NetBalanceCard isFetching={query.isFetching} value={summary.netBalance} />
            <HistoricalTotalBalanceCard balance={summary.historicalBalance} isFetching={query.isFetching} />
          </div>
          <div className="-mt-1">
            <AreaHistoryChart data={summary.areaSeries} isFetching={query.isFetching} months={months} onMonthsChange={setMonths} />
          </div>
          <CurrentMonthExpensesTable isFetching={query.isFetching} rows={summary.currentMonthTransactions} />
        </motion.div>
      ) : null}
    </main>
  );
}
