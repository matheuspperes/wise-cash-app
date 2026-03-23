import { formatCurrencyBRL } from "@/lib/formatting/ptbr";
import { uiText } from "@/lib/i18n/ui-text";
import { cn } from "@/lib/utils";
import { HistoricalTotalBalance } from "@/lib/ui/dashboard-history-types";

type Props = {
  balance: HistoricalTotalBalance;
  isFetching?: boolean;
};

export function HistoricalTotalBalanceCard({ balance, isFetching = false }: Props) {
  const positive = balance.netTotal >= 0;

  return (
    <article className="w-full rounded-2xl border border-border bg-surface p-4 text-right shadow-card md:justify-self-end">
      <div className="mb-2 flex items-center justify-end gap-3">
        <p className="text-sm text-muted">{uiText.historicalNetBalance}</p>
        {isFetching ? <span className="text-xs text-muted">{uiText.syncStatus}</span> : null}
      </div>
      <p className={cn("text-2xl font-bold md:text-[1.75rem]", positive ? "text-emerald-400" : "text-danger")}>{formatCurrencyBRL(balance.netTotal)}</p>
    </article>
  );
}
