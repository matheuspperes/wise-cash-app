"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Point = {
  month: string;
  income: number;
  expense: number;
  net: number;
};

type Props = {
  data: Point[];
  isFetching?: boolean;
};

type TooltipPayload = {
  color: string;
  name: string;
  value: number;
};

function CustomTooltip({ active, label, payload }: { active?: boolean; label?: string; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border bg-surface px-3 py-2 text-xs shadow-card"
      initial={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.16 }}
    >
      <p className="mb-1 font-semibold text-foreground">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(entry.value)}
        </p>
      ))}
    </motion.div>
  );
}

function AreaHistoryChartInner({ data, isFetching = false }: Props) {
  if (!data.length) {
    return <div className="rounded-xl border border-border bg-surface p-4 text-sm text-muted shadow-card">Sem dados historicos.</div>;
  }

  return (
    <div className="h-72 rounded-xl border border-border bg-surface p-4 shadow-card">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm text-muted">Historico mensal</p>
        {isFetching ? <span className="text-xs text-muted">Sincronizando...</span> : null}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#66ffc3" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#66ffc3" stopOpacity={0.06} />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#ff9aac" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#ff9aac" stopOpacity={0.08} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(170, 182, 220, 0.15)" strokeDasharray="3 6" />
          <XAxis axisLine={false} dataKey="month" tick={{ fill: "#9ca7c5", fontSize: 12 }} tickLine={false} />
          <YAxis axisLine={false} tick={{ fill: "#9ca7c5", fontSize: 12 }} tickFormatter={(value) => `${Math.round(Number(value) / 1000)}k`} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(124, 140, 255, 0.4)" }} />
          <Area animationDuration={420} animationEasing="ease-out" dataKey="income" fill="url(#incomeGradient)" name="Receitas" stroke="#66ffc3" strokeWidth={2} type="monotone" />
          <Area animationDuration={420} animationEasing="ease-out" dataKey="expense" fill="url(#expenseGradient)" name="Despesas" stroke="#ff9aac" strokeWidth={2} type="monotone" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export const AreaHistoryChart = memo(AreaHistoryChartInner);
