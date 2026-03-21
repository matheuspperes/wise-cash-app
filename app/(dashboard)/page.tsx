"use client";

import { AreaHistoryChart } from "@/components/dashboard/area-history-chart";
import { NetBalanceCard } from "@/components/dashboard/net-balance-card";
import { useEffect, useState } from "react";

type Summary = {
  currentMonth: string;
  netBalance: number;
  areaSeries: Array<{ month: string; income: number; expense: number; net: number }>;
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary>({ currentMonth: "", netBalance: 0, areaSeries: [] });
  const [months, setMonths] = useState(12);

  useEffect(() => {
    fetch(`/api/dashboard/summary?months=${months}`)
      .then((res) => res.json())
      .then((data) => setSummary(data));
  }, [months]);

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-4 p-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <select className="rounded border bg-white p-2" value={months} onChange={(e) => setMonths(Number(e.target.value))}>
          <option value={3}>3 meses</option>
          <option value={6}>6 meses</option>
          <option value={12}>12 meses</option>
        </select>
      </div>
      <NetBalanceCard value={summary.netBalance} />
      <AreaHistoryChart data={summary.areaSeries} />
    </main>
  );
}
