"use client";

import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { TransactionHistoryEditDrawer } from "@/components/transactions/transaction-history-edit-drawer";
import { SavedTransactionPayload, TransactionForm } from "@/components/transactions/transaction-form";
import { MonthlyExpenseHistoryAccordion } from "@/components/transactions/monthly-expense-history-accordion";
import { TransactionSearch } from "@/components/transactions/transaction-search";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { formatCurrencyBRL, formatDateBR } from "@/lib/formatting/ptbr";
import { uiText } from "@/lib/i18n/ui-text";
import { getLocalDashboardSummary } from "@/lib/services/local-dashboard-summary";
import { listLocalTransactions, patchLocalTransaction, removeLocalTransaction } from "@/lib/services/local-transactions-gateway";
import { StorageUnavailableError } from "@/lib/storage/local-storage-health";
import { MonthlyExpenseHistoryGroup, MonthlyTransactionHistoryRow } from "@/lib/ui/dashboard-history-types";
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

export default function TransactionsPageClient() {
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
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [rowActionError, setRowActionError] = useState<string | null>(null);
  const [editingRow, setEditingRow] = useState<MonthlyTransactionHistoryRow | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [editSuccessMessage, setEditSuccessMessage] = useState<string | null>(null);
  const [editErrorMessage, setEditErrorMessage] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<TransactionsFilterState>({});

  const historyViewHref = "/transactions?view=history";
  const newViewHref = "/transactions?view=new";

  const historyStyleBase = "h-10 border border-border/80 bg-surface-alt text-foreground shadow-card hover:bg-surface";

  const load = useCallback(async () => {
    try {
      const response = await listLocalTransactions({
        q: q || undefined,
        type: filters.type,
        categoryId: filters.categoryId,
        from: filters.from,
        to: filters.to,
      });
      setItems(response.items ?? []);
      setHistoryError(null);
    } catch (error) {
      if (error instanceof StorageUnavailableError) {
        setHistoryError("Armazenamento local indisponível. Não foi possível carregar as transações.");
        setItems([]);
        return;
      }

      setHistoryError("Não foi possível carregar as transações.");
      setItems([]);
    }
  }, [q, filters]);

  const loadMonthlyHistory = useCallback(async () => {
    setIsLoadingMonthlyHistory(true);
    try {
      const json = await getLocalDashboardSummary(12);
      setMonthlyExpenseGroups(json.fullTransactionsHistoryGroups ?? json.fullExpenseHistoryGroups ?? []);
      setHistoryError(null);
    } catch (error) {
      if (error instanceof StorageUnavailableError) {
        setHistoryError("Armazenamento local indisponível. Não foi possível carregar o histórico mensal.");
      } else {
        setHistoryError("Não foi possível carregar o histórico mensal.");
      }
      setMonthlyExpenseGroups([]);
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

  useEffect(() => {
    const onLocalReset = () => {
      setTemporaryLaunches([]);
      setEditingRow(null);
      setEditSuccessMessage(null);
      setEditErrorMessage(null);
      void Promise.all([load(), loadMonthlyHistory()]);
    };

    window.addEventListener("wisecash:local-reset", onLocalReset);
    return () => {
      window.removeEventListener("wisecash:local-reset", onLocalReset);
    };
  }, [load, loadMonthlyHistory]);

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
      window.dispatchEvent(new Event("wisecash:transactions-mutated"));
    },
    [load, loadMonthlyHistory],
  );

  const handleDelete = useCallback(
    async (row: MonthlyTransactionHistoryRow) => {
      try {
        await removeLocalTransaction(row.id);
        if (editingRow?.id === row.id) {
          setEditingRow(null);
        }
        await Promise.all([load(), loadMonthlyHistory()]);
        setRowActionError(null);
        window.dispatchEvent(new Event("wisecash:transactions-mutated"));
      } catch (error) {
        if (error instanceof StorageUnavailableError) {
          setRowActionError("Armazenamento local indisponível. Não foi possível excluir a transação.");
          return;
        }

        setRowActionError("Não foi possível excluir a transação.");
      }
    },
    [editingRow?.id, load, loadMonthlyHistory],
  );

  const handleEditSave = useCallback(
    async (payload: {
      transactionDate: string;
      description: string;
      categoryId: string;
      type: "income" | "expense";
      amount: number;
      notes?: string;
    }) => {
      if (!editingRow) {
        return;
      }

      setIsSavingEdit(true);
      setEditSuccessMessage(null);
      setEditErrorMessage(null);
      try {
        await patchLocalTransaction(editingRow.id, {
          transactionDate: payload.transactionDate,
          name: payload.description,
          categoryId: payload.categoryId,
          type: payload.type,
          amount: payload.amount,
          notes: payload.notes,
        });

        await Promise.all([load(), loadMonthlyHistory()]);
        setEditSuccessMessage("Transação atualizada com sucesso.");
        window.dispatchEvent(new Event("wisecash:transactions-mutated"));
      } catch (error) {
        if (error instanceof StorageUnavailableError) {
          setEditErrorMessage("Armazenamento local indisponível. Não foi possível salvar a edição.");
        } else {
          setEditErrorMessage("Não foi possível salvar a edição.");
        }
      } finally {
        setIsSavingEdit(false);
      }
    },
    [editingRow, load, loadMonthlyHistory],
  );

  const renderTransactionRows = useCallback(
    (rows: Tx[] | SavedTransactionPayload[], showActions = false) => rows.map((item) => (
      <tr className="text-sm" key={item.id}>
        <td className="whitespace-nowrap py-2 pr-4">{formatDateBR(item.transactionDate)}</td>
        <td className="py-2 pr-4">{item.name}</td>
        <td className="py-2 pr-4">{item.categoryName}</td>
        <td className="whitespace-nowrap py-2 pr-4">{item.type === "income" ? uiText.typeIncome : uiText.typeExpense}</td>
        <td className={item.type === "income" ? "whitespace-nowrap py-2 text-right font-semibold text-emerald-400" : "whitespace-nowrap py-2 text-right font-semibold text-danger"}>
          {item.type === "income" ? "+" : "-"}{formatCurrencyBRL(item.amount)}
        </td>
        {showActions ? (
          <td className="whitespace-nowrap py-2 text-right">
            <button
              className="rounded-md border border-border/70 px-2 py-1 text-xs text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
                onClick={() => {
                  void handleDelete({
                    id: item.id,
                    date: item.transactionDate,
                    description: item.name,
                    category: item.categoryName,
                    type: item.type,
                    amount: item.amount,
                    notes: "",
                  });
                }}
              type="button"
            >
              Excluir
            </button>
          </td>
        ) : null}
      </tr>
    )),
    [handleDelete],
  );

  return (
    <main className="mx-auto flex max-w-[76.8rem] flex-col gap-5 p-5">
      <DashboardHeader
        controls={(
          <Button asChild className={historyStyleBase} size="md" variant="secondary">
            <Link href="/">Voltar ao Dashboard</Link>
          </Button>
        )}
        title={uiText.transactions}
      />

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
            <Button asChild className={historyStyleBase} size="md" variant="secondary">
              <Link href={historyViewHref}>Ver histórico de transações</Link>
            </Button>
          </div>
        </>
      ) : null}

      {showHistory ? (
        <>
          <TransactionSearch value={q} onChange={onSearchChange} />
          <TransactionFilters value={filters} onChange={onFilterChange} />
          {historyError ? <p className="text-sm text-danger">{historyError}</p> : null}
          {rowActionError ? <p className="text-sm text-danger">{rowActionError}</p> : null}
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
                        <th className="py-2 pl-4 text-right font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/70">{renderTransactionRows(items, true)}</tbody>
                  </table>
                </div>
              )}
            </section>
          ) : null}
          <MonthlyExpenseHistoryAccordion
            groups={monthlyExpenseGroups}
            isLoading={isLoadingMonthlyHistory}
            onDeleteRow={handleDelete}
            onEditRow={(row) => {
              setEditingRow(row);
              setEditErrorMessage(null);
              setEditSuccessMessage(null);
            }}
          />
          <div className="pt-1 text-right">
            <Button asChild className="h-10 bg-[var(--primary-cta)] px-4 text-sm text-white shadow-elevated hover:brightness-110" size="md">
              <Link href={newViewHref}>Nova Transação</Link>
            </Button>
          </div>

          <TransactionHistoryEditDrawer
            errorMessage={editErrorMessage}
            isOpen={Boolean(editingRow)}
            isSaving={isSavingEdit}
            onOpenChange={(open) => {
              if (!open) {
                setEditingRow(null);
                setEditErrorMessage(null);
                setEditSuccessMessage(null);
              }
            }}
            onSave={handleEditSave}
            successMessage={editSuccessMessage}
            transaction={editingRow}
          />
        </>
      ) : null}
    </main>
  );
}
