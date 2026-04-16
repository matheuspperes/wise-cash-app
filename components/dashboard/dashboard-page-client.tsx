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
import { getNetBalanceLabelByMode } from "@/lib/services/dashboard-net-balance-label";
import { getLocalDashboardSummary, resetLocalFunctionalData } from "@/lib/services/local-dashboard-summary";
import { StorageUnavailableError } from "@/lib/storage/local-storage-health";
import { DASHBOARD_VIEW_MODE_DEFAULT, DashboardViewMode } from "@/lib/ui/dashboard-view-mode";
import { resolveDashboardInitialMonths } from "@/lib/ui/dashboard-period-default";
import { CurrentMonthTransactionRow, HistoricalTotalBalance, MonthlyExpenseHistoryGroup, RecurrencePendingConfirmationRow } from "@/lib/ui/dashboard-history-types";
import { getVisualDataState } from "@/lib/ui/data-state";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Summary = {
  currentMonth: string;
  netBalance: number;
  areaSeries: Array<{ month: string; income: number; expense: number; net: number }>;
  historicalBalance: HistoricalTotalBalance;
  currentMonthTransactions: CurrentMonthTransactionRow[];
  currentMonthExpenses?: CurrentMonthTransactionRow[];
  fullTransactionsHistoryGroups?: MonthlyExpenseHistoryGroup[];
  fullExpenseHistoryGroups?: MonthlyExpenseHistoryGroup[];
  recurrencePendingConfirmations?: RecurrencePendingConfirmationRow[];
  totals?: { income: number; expense: number };
};

export function DashboardPageClient() {
  const [months, setMonths] = useState(3);
  const [viewMode, setViewMode] = useState<DashboardViewMode>(DASHBOARD_VIEW_MODE_DEFAULT);
  const [isResetting, setIsResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [resetError, setResetError] = useState<string | null>(null);

  const query = useQuery<Summary>({
    queryKey: ["dashboard-summary", months, viewMode],
    queryFn: async () => {
      try {
        return await getLocalDashboardSummary(months, viewMode);
      } catch (error) {
        if (error instanceof StorageUnavailableError) {
          throw new Error("Armazenamento local indisponível. Verifique as permissões do navegador.");
        }

        throw new Error(uiText.loadingError);
      }
    },
  });

  const secondaryBalanceLabel = useMemo(() => getNetBalanceLabelByMode(viewMode), [viewMode]);
  const chartTitle = useMemo(() => (viewMode === "previsoes" ? "Previsões mensais" : uiText.chartHistorical), [viewMode]);

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
        recurrencePendingConfirmations: [],
        totals: { income: 0, expense: 0 },
      },
    [query.data],
  );

  const transactionsHistoryHref = useMemo(() => "/transactions?view=history", []);
  const recurrencesViewHref = useMemo(() => "/transactions?view=recurrences", []);
  const transactionsCreateHref = useMemo(() => "/transactions?view=new", []);
  const showGlobalActions = true;
  const showBackToDashboard = false;
  const ctaPaddingClasses = "h-10 px-4 py-2 text-sm";

  useEffect(() => {
    // Keep first SSR/client render deterministic; apply persisted preference after mount.
    const persistedMonths = resolveDashboardInitialMonths();
    setMonths((current) => (current === persistedMonths ? current : persistedMonths));
  }, []);

  useEffect(() => {
    const onTransactionsMutated = () => {
      void query.refetch();
    };

    window.addEventListener("wisecash:transactions-mutated", onTransactionsMutated);
    return () => {
      window.removeEventListener("wisecash:transactions-mutated", onTransactionsMutated);
    };
  }, [query]);

  useEffect(() => {
    if (!resetMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setResetMessage(null);
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [resetMessage]);

  const handleFullReset = async () => {
    const confirmed = window.confirm("Remover todos os dados locais da aplicação (usuário e anônimo)?");
    if (!confirmed) {
      return;
    }

    setIsResetting(true);
    setResetMessage(null);
    setResetError(null);

    try {
      await resetLocalFunctionalData();
      await query.refetch();
      setResetMessage(`Dados locais removidos com sucesso.`);
      window.dispatchEvent(new Event("wisecash:local-reset"));
    } catch (error) {
      if (error instanceof StorageUnavailableError) {
        setResetError("Armazenamento local indisponível. Verifique as permissões do navegador.");
      } else {
        setResetError("Não foi possível remover os dados locais. Tente novamente.");
      }
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <main className="mx-auto flex max-w-[76.8rem] flex-col gap-5 px-5 pb-28 pt-5 md:pb-5">
      <DashboardHeader
        controls={(
          <div className="flex w-full flex-wrap items-center justify-end gap-2 md:w-auto md:gap-3">
            {showGlobalActions ? (
              <>
                <Button
                  asChild
                  className={`${ctaPaddingClasses} btn-visual-secondary`}
                  size="md"
                  variant="secondary"
                >
                  <Link aria-label="Recorrências" href={recurrencesViewHref}>Recorrências</Link>
                </Button>
                <Button
                  asChild
                  className={`${ctaPaddingClasses} btn-visual-secondary`}
                  size="md"
                  variant="secondary"
                >
                  <Link aria-label="Transações" href={transactionsHistoryHref}>Transações</Link>
                </Button>
                <Button asChild className={`${ctaPaddingClasses} bg-[var(--primary-cta)] text-white shadow-elevated hover:brightness-110`} size="md">
                  <Link aria-label="Nova Transação" href={transactionsCreateHref}>Nova Transação</Link>
                </Button>
              </>
            ) : null}
            {showBackToDashboard ? (
              <Button
                asChild
                className={`${ctaPaddingClasses} btn-visual-secondary`}
                size="md"
                variant="secondary"
              >
                <Link aria-label="Voltar ao Dashboard" href="/">Voltar ao Dashboard</Link>
              </Button>
            ) : null}
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
            <HistoricalTotalBalanceCard balance={summary.historicalBalance} isFetching={query.isFetching} label={secondaryBalanceLabel} />
          </div>
          <div className="-mt-1">
            <AreaHistoryChart
              data={summary.areaSeries}
              isFetching={query.isFetching}
              months={months}
              onMonthsChange={setMonths}
              onViewModeChange={setViewMode}
              title={chartTitle}
              viewMode={viewMode}
            />
          </div>
          <CurrentMonthExpensesTable isFetching={query.isFetching} rows={summary.currentMonthTransactions} />
        </motion.div>
      ) : null}

      <section className="rounded-2xl border border-border bg-surface p-4 shadow-card">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-semibold">Limpeza de dados locais</h2>
            <p className="text-sm text-muted">Remove transações, recorrências, instâncias de recorrência e metadados locais.</p>
          </div>
          <Button
            className="h-10 bg-danger px-4 text-sm text-white hover:brightness-110"
            disabled={isResetting}
            onClick={() => {
              void handleFullReset();
            }}
            size="md"
            type="button"
          >
            {isResetting ? "Limpando..." : "Limpar dados locais"}
          </Button>
        </div>
        {resetMessage ? <p className="mt-2 text-sm text-emerald-400">{resetMessage}</p> : null}
        {resetError ? <p className="mt-2 text-sm text-danger">{resetError}</p> : null}
      </section>
    </main>
  );
}
