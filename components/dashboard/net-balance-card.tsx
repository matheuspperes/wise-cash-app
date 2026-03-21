import { formatCurrencyBRL } from "@/lib/formatting/ptbr";

type Props = {
  value: number;
};

export function NetBalanceCard({ value }: Props) {
  const positive = value >= 0;

  return (
    <article className="rounded-xl bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">Saldo liquido atual</p>
      <p className={`text-3xl font-bold ${positive ? "text-emerald-700" : "text-red-700"}`}>{formatCurrencyBRL(value)}</p>
    </article>
  );
}
