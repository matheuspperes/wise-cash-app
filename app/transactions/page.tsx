"use client";

import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { SavedTransactionPayload, TransactionForm } from "@/components/transactions/transaction-form";
import { MonthlyExpenseHistoryAccordion } from "@/components/transactions/monthly-expense-history-accordion";
import { TransactionSearch } from "@/components/transactions/transaction-search";
import { formatCurrencyBRL, formatDateBR } from "@/lib/formatting/ptbr";
import { uiText } from "@/lib/i18n/ui-text";
import { MonthlyExpenseHistoryGroup } from "@/lib/ui/dashboard-history-types";
import { hasActiveFilterCriteria, hasFilterStateChanged, TransactionsFilterState } from "@/lib/ui/transactions-filter-activation";
import { parseTransactionsView, shouldResetTemporaryLaunches, TransactionsView } from "@/lib/ui/transactions-view";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Tx = {
  id: string;
  name: string;
  type: "income" | "expense";
  categoryName: string;
  amount: number;
  transactionDate: string;
};

export default function TransactionsPage() {
  const searchParams = useSearchParams();
  const view = parseTransactionsView(searchParams.get("view"));
  const previousViewRef = useRef<TransactionsView | null>(view);
  const showHistory = view === "history";
  const showNew = view === "new";

  const [items, setItems] = useState<Tx[]>([]);
  const [hasUserEditedFilter, setHasUserEditedFilter] = useState(false);
  const [temporaryLaunches, setTemporaryLaunches] = useState<SavedTransactionPayload[]>([]);
  const [monthlyExpenseGroups, setMonthlyExpenseGroups] = useState<MonthlyExpenseHistoryGroup[]>([]);
  const [isLoadingMonthlyHistory, setIsLoadingMonthlyHistory] = useState(false);
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<TransactionsFilterState>({});

  const load = useCallback(async () => {
    const query = new URLSearchParams();
    if (q) query.set("q", q);
    if (filters.type) query.set("type", filters.type);
    if (filters.categoryId) query.set("categoryId", filters.categoryId);
    if (filters.from) query.set("from", filters.from);
    if (filters.to) query.set("to", filters.to);

    const res = await fetch(`/api/transactions?${query.toString()}`);
    const json = await res.json();
    setItems(json.items ?? []);
  }, [q, filters]);

  const loadMonthlyHistory = useCallback(async () => {
    setIsLoadingMonthlyHistory(true);
    try {
      const res = await fetch("/api/dashboard/summary?months=12");
      const json = await res.json();
      setMonthlyExpenseGroups(json.fullTransactionsHistoryGroups ?? json.fullExpenseHistoryGroups ?? []);
    } finally {
      setIsLoadingMonthlyHistory(false);
    }
  }, []);

  useEffect(() => {
    const previousView = previousViewRef.current;
    if (shouldResetTemporaryLaunches(previousView, view)) {
      setTemporaryLaunches([]);
    }
    previousViewRef.current = view;
  }, [view]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    loadMonthlyHistory();
  }, [loadMonthlyHistory]);

  const hasActiveFilters = useMemo(() => hasActiveFilterCriteria(filters, q), [filters, q]);
  const shouldShowFilteredResults = hasUserEditedFilter && hasActiveFilters;

  const onFilterChange = useCallback((next: TransactionsFilterState) => {
    setFilters((current) => {
      if (hasFilterStateChanged(current, next)) {
        setHasUserEditedFilter(true);
      }
      return next;
    });
  }, []);

  const onSearchChange = useCallback((next: string) => {
    setQ(next);
    setHasUserEditedFilter(true);
  }, []);

  const handleSaved = useCallback(
    async (transaction: SavedTransactionPayload) => {
      setTemporaryLaunches((current) => [transaction, ...current]);
      await Promise.all([load(), loadMonthlyHistory()]);
    },
    [load, loadMonthlyHistory],
  );

  const renderTransactionRows = useCallback(
    (rows: Tx[] | SavedTransactionPayload[]) => rows.map((item) => (
      <tr className="text-sm" key={item.id}>
        <td className="whitespace-nowrap py-2 pr-4">{formatDateBR(item.transactionDate)}</td>
        <td className="py-2 pr-4">{item.name}</td>
        <td className="py-2 pr-4">{item.categoryName}</td>
        <td className="whitespace-nowrap py-2 pr-4">{item.type === "income" ? "Ganho" : "Gasto"}</td>
        <td className={item.type === "income" ? "whitespace-nowrap py-2 text-right font-semibold text-emerald-400" : "whitespace-nowrap py-2 text-right font-semibold text-danger"}>
          {item.type === "income" ? "+" : "-"}{formatCurrencyBRL(item.amount)}
        </td>
      </tr>
    )),
    [],
  );

  return (
    <main className="mx-auto flex max-w-[76.8rem] flex-col gap-5 p-5">
      <h1 className="text-[1.9rem] font-bold">Transações</h1>

      {showNew ? (
        <>
          <TransactionForm
            onSaved={handleSaved}
          />

          {temporaryLaunches.length ? (
            <section className="rounded-2xl border border-border bg-surface p-5 shadow-card">
              <h2 className="mb-4 text-xl font-semibold">{uiText.temporaryLaunchesTitle}</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border text-left">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-muted">
                      <th className="py-2 pr-4 font-medium">{uiText.columnDate}</th>
                      <th className="py-2 pr-4 font-medium">{uiText.columnDescription}</th>
                      <th className="py-2 pr-4 font-medium">{uiText.columnCategory}</th>
                      <th className="py-2 pr-4 font-medium">{uiText.columnType}</th>
                      <th className="py-2 text-right font-medium">{uiText.columnValue}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/70">{renderTransactionRows(temporaryLaunches)}</tbody>
                </table>
              </div>
            </section>
          ) : null}

          <div className="-mt-1 text-right text-sm text-muted">
            <Link className="underline hover:text-foreground" href="/transactions?view=history">
              Ver histórico de transações
            </Link>
          </div>
        </>
      ) : null}

      {showHistory ? (
        <>
          <TransactionSearch value={q} onChange={onSearchChange} />
          <TransactionFilters value={filters} onChange={onFilterChange} />
          {shouldShowFilteredResults ? (
            <section className="rounded-2xl border border-border bg-surface p-5 shadow-card">
              <h2 className="mb-4 text-xl font-semibold">{uiText.filteredResultsTitle}</h2>
              {!items.length ? (
                <p className="text-sm text-muted">{uiText.filteredResultsEmpty}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border text-left">
                    <thead>
                      <tr className="text-xs uppercase tracking-wide text-muted">
                        <th className="py-2 pr-4 font-medium">{uiText.columnDate}</th>
                        <th className="py-2 pr-4 font-medium">{uiText.columnDescription}</th>
                        <th className="py-2 pr-4 font-medium">{uiText.columnCategory}</th>
                        <th className="py-2 pr-4 font-medium">{uiText.columnType}</th>
                        <th className="py-2 text-right font-medium">{uiText.columnValue}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/70">{renderTransactionRows(items)}</tbody>
                  </table>
                </div>
              )}
            </section>
          ) : null}
          <MonthlyExpenseHistoryAccordion groups={monthlyExpenseGroups} isLoading={isLoadingMonthlyHistory} />
        </>
      ) : null}
    </main>
  );
}
