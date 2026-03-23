"use client";

import { formatMonthYearLabel } from "@/lib/formatting/ptbr";
import { uiText } from "@/lib/i18n/ui-text";
import { buildDynamicChartAxisProfile, formatAxisTickLabel } from "@/lib/services/chart-axis-profile";
import { Select } from "@/components/ui/input";
import { motion } from "framer-motion";
import { memo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Point = {
  monthRef?: string;
  month: string;
  income: number;
  expense: number;
  net: number;
};

type Props = {
  data: Point[];
  months: number;
  onMonthsChange: (value: number) => void;
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
      <p className="mb-1 font-semibold text-foreground">{label ? formatMonthYearLabel(label) : ""}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(entry.value)}
        </p>
      ))}
    </motion.div>
  );
}

function AreaHistoryChartInner({ data, months, onMonthsChange, isFetching = false }: Props) {
  if (!data.length) {
    return <div className="rounded-2xl border border-border bg-surface p-5 text-base text-muted shadow-card">Sem dados históricos.</div>;
  }

  const yAxisProfile = buildDynamicChartAxisProfile(data.flatMap((point) => [point.income, point.expense]));

  return (
    <div className="flex h-80 flex-col rounded-2xl border border-border bg-surface p-5 shadow-card">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-base text-muted">{uiText.chartHistorical}</p>
        <div className="flex items-center gap-3">
          {isFetching ? <span className="text-sm text-muted">{uiText.syncStatus}</span> : null}
        </div>
      </div>
      <div className="mb-2 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex min-w-0 flex-nowrap items-center gap-3 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-2 w-2 rounded-full bg-[#66ffc3]" />
            Receitas
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-2 w-2 rounded-full bg-[#ff9aac]" />
            Despesas
          </span>
        </div>
        <Select className="w-[7.25rem] min-w-[6.5rem] sm:w-32" value={months} onChange={(e) => onMonthsChange(Number(e.target.value))}>
          <option value={3}>3 meses</option>
          <option value={6}>6 meses</option>
          <option value={12}>12 meses</option>
        </Select>
      </div>
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 14, right: 18, top: 4, bottom: 22 }}>
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
          <XAxis
            axisLine={false}
            dataKey="month"
            padding={{ left: 8, right: 8 }}
            tickMargin={14}
            tick={{ fill: "#9ca7c5", fontSize: 14 }}
            tickFormatter={(value) => formatMonthYearLabel(String(value))}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            domain={[0, yAxisProfile.axisMax]}
            ticks={yAxisProfile.ticks}
            tick={{ fill: "#9ca7c5", fontSize: 14 }}
            tickCount={yAxisProfile.tickCount}
            tickFormatter={(value) => formatAxisTickLabel(Number(value))}
            tickLine={false}
          />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(124, 140, 255, 0.4)" }} />
            <Area animationDuration={420} animationEasing="ease-out" dataKey="income" fill="url(#incomeGradient)" name="Receitas" stroke="#66ffc3" strokeWidth={2} type="monotone" />
            <Area animationDuration={420} animationEasing="ease-out" dataKey="expense" fill="url(#expenseGradient)" name="Despesas" stroke="#ff9aac" strokeWidth={2} type="monotone" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export const AreaHistoryChart = memo(AreaHistoryChartInner);
