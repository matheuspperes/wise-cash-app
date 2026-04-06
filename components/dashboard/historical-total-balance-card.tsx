import { formatCurrencyBRL } from "@/lib/formatting/ptbr";
import { uiText } from "@/lib/i18n/ui-text";
import { cn } from "@/lib/utils";
import { HistoricalTotalBalance } from "@/lib/ui/dashboard-history-types";

type Props = {
  balance: HistoricalTotalBalance;
  label?: string;
  isFetching?: boolean;
};

export function HistoricalTotalBalanceCard({ balance, label = uiText.historicalNetBalance, isFetching = false }: Props) {
  const positive = balance.netTotal >= 0;

  return (
    <article className="w-full rounded-2xl border border-border bg-surface px-5 py-4 shadow-card md:px-6 md:py-5">
      <div className="flex min-h-[7.25rem] flex-col justify-center gap-3 text-left">
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted md:text-sm">{label}</p>
          {isFetching ? <span className="text-xs text-muted">{uiText.syncStatus}</span> : null}
        </div>
        <p className={cn("break-words text-2xl font-bold md:text-[1.9rem]", positive ? "text-emerald-400" : "text-danger")}>{formatCurrencyBRL(balance.netTotal)}</p>
      </div>
    </article>
  );
}
