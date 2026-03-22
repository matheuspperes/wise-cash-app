import { formatCurrencyBRL } from "@/lib/formatting/ptbr";
import { uiText } from "@/lib/i18n/ui-text";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  isFetching?: boolean;
};

export function NetBalanceCard({ value, isFetching = false }: Props) {
  const positive = value >= 0;

  return (
    <article className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-base text-muted">{uiText.netBalance}</p>
        {isFetching ? <span className="text-sm text-muted">Atualizando...</span> : null}
      </div>
      <p className={cn("text-4xl font-bold", positive ? "text-emerald-400" : "text-danger")}>{formatCurrencyBRL(value)}</p>
    </article>
  );
}
