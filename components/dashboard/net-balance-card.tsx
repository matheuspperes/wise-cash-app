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
    <article className="w-full rounded-2xl border border-border bg-surface px-6 py-5 shadow-card md:px-6 md:py-5">
      <div className="flex min-h-[7.25rem] flex-col justify-center gap-3 text-left">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted md:text-base">{uiText.netBalance}</p>
          {isFetching ? <span className="text-xs text-muted">Atualizando...</span> : null}
        </div>
        <p className={cn("break-words text-3xl font-bold md:text-4xl", positive ? "text-emerald-400" : "text-danger")}>{formatCurrencyBRL(value)}</p>
      </div>
    </article>
  );
}
