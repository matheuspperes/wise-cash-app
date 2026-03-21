import { formatCurrencyBRL } from "@/lib/formatting/ptbr";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  isFetching?: boolean;
};

export function NetBalanceCard({ value, isFetching = false }: Props) {
  const positive = value >= 0;

  return (
    <article className="rounded-xl border border-border bg-surface p-5 shadow-card">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm text-muted">Saldo liquido atual</p>
        {isFetching ? <span className="text-xs text-muted">Atualizando...</span> : null}
      </div>
      <p className={cn("text-3xl font-bold", positive ? "text-emerald-400" : "text-danger")}>{formatCurrencyBRL(value)}</p>
    </article>
  );
}
