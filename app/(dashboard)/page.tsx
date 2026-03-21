"use client";

import { DashboardEmpty, DashboardError } from "@/components/dashboard/dashboard-feedback";
import { DashboardLoading } from "@/components/dashboard/dashboard-loading";
import { AreaHistoryChart } from "@/components/dashboard/area-history-chart";
import { NetBalanceCard } from "@/components/dashboard/net-balance-card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";
import { getVisualDataState } from "@/lib/ui/data-state";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

type Summary = {
  currentMonth: string;
  netBalance: number;
  areaSeries: Array<{ month: string; income: number; expense: number; net: number }>;
  totals?: { income: number; expense: number };
};

export default function DashboardPage() {
  const [months, setMonths] = useState(12);

  const query = useQuery<Summary>({
    queryKey: ["dashboard-summary", months],
    queryFn: async () => {
      const response = await fetch(`/api/dashboard/summary?months=${months}`);
      if (!response.ok) {
        throw new Error("Nao foi possivel carregar o resumo do dashboard.");
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
    () => query.data ?? { currentMonth: "", netBalance: 0, areaSeries: [], totals: { income: 0, expense: 0 } },
    [query.data],
  );

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-4 px-4 pb-24 pt-4 md:pb-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted">Visao financeira com carregamento suave</p>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Select className="w-32" value={months} onChange={(e) => setMonths(Number(e.target.value))}>
            <option value={3}>3 meses</option>
            <option value={6}>6 meses</option>
            <option value={12}>12 meses</option>
          </Select>
          <Button asChild className="shadow-elevated" size="lg">
            <Link href="/transactions">Adicionar transacao</Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 md:hidden">
        <Select className="max-w-[10rem]" value={months} onChange={(e) => setMonths(Number(e.target.value))}>
          <option value={3}>3 meses</option>
          <option value={6}>6 meses</option>
          <option value={12}>12 meses</option>
        </Select>
      </div>

      {visualState === "loading" ? <DashboardLoading /> : null}
      {visualState === "error" ? <DashboardError message="Falha ao carregar os dados." onRetry={() => query.refetch()} /> : null}
      {visualState === "empty" ? <DashboardEmpty /> : null}

      {visualState === "ready" || visualState === "fetching" ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <NetBalanceCard isFetching={query.isFetching} value={summary.netBalance} />
          <AreaHistoryChart data={summary.areaSeries} isFetching={query.isFetching} />
        </motion.div>
      ) : null}

      <Button asChild className="fixed bottom-4 left-4 right-4 z-20 md:hidden" size="lg">
        <Link href="/transactions">Adicionar transacao</Link>
      </Button>
    </main>
  );
}
