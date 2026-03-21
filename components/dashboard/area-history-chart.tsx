"use client";

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
};

function AreaHistoryChartInner({ data }: Props) {
  if (!data.length) {
    return <div className="rounded-xl bg-white p-4 text-sm text-slate-500 shadow-sm">Sem dados historicos.</div>;
  }

  return (
    <div className="h-72 rounded-xl bg-white p-4 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#059669" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#dc2626" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="income" stroke="#059669" fill="url(#incomeGradient)" />
          <Area type="monotone" dataKey="expense" stroke="#dc2626" fill="url(#expenseGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export const AreaHistoryChart = memo(AreaHistoryChartInner);
