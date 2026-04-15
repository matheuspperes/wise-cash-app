"use client";

import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { TransactionHistoryEditDrawer } from "@/components/transactions/transaction-history-edit-drawer";
import { SavedTransactionPayload, TransactionForm } from "@/components/transactions/transaction-form";
import { MonthlyExpenseHistoryAccordion } from "@/components/transactions/monthly-expense-history-accordion";
import { TransactionSearch } from "@/components/transactions/transaction-search";
import { RecurrencesPage } from "@/components/recurrences/recurrences-page";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { formatCurrencyBRL, formatDateBR } from "@/lib/formatting/ptbr";
import { uiText } from "@/lib/i18n/ui-text";
import { getLocalDashboardSummary } from "@/lib/services/local-dashboard-summary";
import {
  cancelLocalRecurrencePending,
  confirmLocalRecurrencePending,
  deactivateLocalRecurrence,
  listLocalRecurrencePendingConfirmations,
  listLocalRecurrences,
  listLocalTransactions,
  patchLocalTransaction,
  removeLocalTransaction,
  updateLocalRecurrence,
} from "@/lib/services/local-transactions-gateway";
import { StorageUnavailableError } from "@/lib/storage/local-storage-health";
import {
  MonthlyExpenseHistoryGroup,
  MonthlyTransactionHistoryRow,
  RecurrenceListRow,
  RecurrencePendingConfirmationRow,
} from "@/lib/ui/dashboard-history-types";
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

type DeleteTelemetryScope = "history" | "recurrences";
type DeleteTelemetryAction = "confirm" | "cancel";

function getRecurrenceStatusLabel(item: { recurrenceType: "limited" | "unlimited"; monthsRemaining: number | null }) {
  if (item.recurrenceType === "unlimited") {
    return "Ilimitada";
  }

  const remaining = Math.max(item.monthsRemaining ?? 0, 0);
  if (remaining === 0) {
    return "Sem ciclos restantes";
  }

  if (remaining === 1) {
    return "1 mês faltante";
  }

  return `${remaining} meses faltantes`;
}

export default function TransactionsPageClient() {
  const searchParams = useSearchParams();
  const view = parseTransactionsView(searchParams.get("view"));
  const previousViewRef = useRef<TransactionsView | null>(view);
  const showHistory = view === "history";
  const showNew = view === "new";
  const showRecurrences = view === "recurrences";

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
  const [recurrenceItems, setRecurrenceItems] = useState<RecurrenceListRow[]>([]);
  const [recurrencePendingItems, setRecurrencePendingItems] = useState<RecurrencePendingConfirmationRow[]>([]);
  const [isLoadingRecurrences, setIsLoadingRecurrences] = useState(false);
  const [isSubmittingRecurrence, setIsSubmittingRecurrence] = useState(false);
  const [isSavingRecurrenceEdit, setIsSavingRecurrenceEdit] = useState(false);
  const [recurrenceError, setRecurrenceError] = useState<string | null>(null);
  const [recurrenceEditError, setRecurrenceEditError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<TransactionsFilterState>({});

  const historyViewHref = "/transactions?view=history";
  const newViewHref = "/transactions?view=new";
  const recurrencesViewHref = "/transactions?view=recurrences";

  const historyStyleBase = "h-10 border border-border/80 bg-surface-alt text-foreground shadow-card hover:bg-surface";

  const emitDeleteTelemetry = useCallback((scope: DeleteTelemetryScope, action: DeleteTelemetryAction) => {
    window.dispatchEvent(new CustomEvent("wisecash:delete-action", { detail: { scope, action } }));
  }, []);

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

  const loadRecurrences = useCallback(async () => {
    setIsLoadingRecurrences(true);
    try {
      const [recurrencesResponse, pendingResponse] = await Promise.all([
        listLocalRecurrences(),
        listLocalRecurrencePendingConfirmations(),
      ]);

      setRecurrenceItems((recurrencesResponse.items ?? []).map((item) => ({
        id: item.id,
        name: item.name,
        categoryName: item.categoryName,
        type: item.type,
        amount: item.amount,
        dayOfMonth: item.dayOfMonth,
        nextScheduledDate: item.nextScheduledDate,
        recurrenceType: item.recurrenceType,
        isActive: item.isActive,
        maxCycles: item.maxCycles,
        generatedCycles: item.generatedCycles,
        monthsRemaining: item.monthsRemaining,
        statusLabel: getRecurrenceStatusLabel(item),
      })));
      setRecurrencePendingItems(pendingResponse.items ?? []);
      setRecurrenceError(null);
    } catch (error) {
      if (error instanceof StorageUnavailableError) {
        setRecurrenceError("Armazenamento local indisponível. Não foi possível carregar as recorrências.");
      } else {
        setRecurrenceError("Não foi possível carregar as recorrências.");
      }
      setRecurrenceItems([]);
      setRecurrencePendingItems([]);
    } finally {
      setIsLoadingRecurrences(false);
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
    loadRecurrences();
  }, [loadRecurrences]);

  useEffect(() => {
    const onLocalReset = () => {
      setTemporaryLaunches([]);
      setEditingRow(null);
      setEditSuccessMessage(null);
      setEditErrorMessage(null);
      setRecurrenceEditError(null);
      void Promise.all([load(), loadMonthlyHistory(), loadRecurrences()]);
    };

    window.addEventListener("wisecash:local-reset", onLocalReset);
    return () => {
      window.removeEventListener("wisecash:local-reset", onLocalReset);
    };
  }, [load, loadMonthlyHistory, loadRecurrences]);

  useEffect(() => {
    const onTransactionsMutated = () => {
      void loadRecurrences();
    };

    window.addEventListener("wisecash:transactions-mutated", onTransactionsMutated);
    return () => {
      window.removeEventListener("wisecash:transactions-mutated", onTransactionsMutated);
    };
  }, [loadRecurrences]);

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
      emitDeleteTelemetry("history", "confirm");
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
    [editingRow?.id, emitDeleteTelemetry, load, loadMonthlyHistory],
  );

  const handleDeleteHistoryCancel = useCallback(() => {
    emitDeleteTelemetry("history", "cancel");
  }, [emitDeleteTelemetry]);

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

  const handleConfirmPendingRecurrence = useCallback(
    async (id: string) => {
      setIsSubmittingRecurrence(true);
      try {
        await confirmLocalRecurrencePending(id);
        await Promise.all([loadRecurrences(), loadMonthlyHistory()]);
        setRecurrenceError(null);
        window.dispatchEvent(new Event("wisecash:transactions-mutated"));
      } catch (error) {
        if (error instanceof StorageUnavailableError) {
          setRecurrenceError("Armazenamento local indisponível. Não foi possível confirmar a pendência.");
        } else {
          setRecurrenceError("Não foi possível confirmar a pendência.");
        }
      } finally {
        setIsSubmittingRecurrence(false);
      }
    },
    [loadRecurrences, loadMonthlyHistory],
  );

  const handleCancelPendingRecurrence = useCallback(
    async (id: string) => {
      setIsSubmittingRecurrence(true);
      try {
        await cancelLocalRecurrencePending(id);
        await Promise.all([loadRecurrences(), loadMonthlyHistory()]);
        setRecurrenceError(null);
        window.dispatchEvent(new Event("wisecash:transactions-mutated"));
      } catch (error) {
        if (error instanceof StorageUnavailableError) {
          setRecurrenceError("Armazenamento local indisponível. Não foi possível cancelar a pendência.");
        } else {
          setRecurrenceError("Não foi possível cancelar a pendência.");
        }
      } finally {
        setIsSubmittingRecurrence(false);
      }
    },
    [loadRecurrences, loadMonthlyHistory],
  );

  const handleDeleteRecurrence = useCallback(
    async (id: string) => {
      emitDeleteTelemetry("recurrences", "confirm");
      setIsSubmittingRecurrence(true);
      try {
        await deactivateLocalRecurrence(id);
        await Promise.all([loadRecurrences(), loadMonthlyHistory()]);
        setRecurrenceError(null);
        window.dispatchEvent(new Event("wisecash:transactions-mutated"));
      } catch (error) {
        if (error instanceof StorageUnavailableError) {
          setRecurrenceError("Armazenamento local indisponível. Não foi possível desativar a recorrência.");
        } else {
          setRecurrenceError("Não foi possível desativar a recorrência.");
        }
      } finally {
        setIsSubmittingRecurrence(false);
      }
    },
    [emitDeleteTelemetry, loadRecurrences, loadMonthlyHistory],
  );

  const handleDeleteRecurrenceCancel = useCallback(() => {
    emitDeleteTelemetry("recurrences", "cancel");
  }, [emitDeleteTelemetry]);

  const handleSaveRecurrenceEdit = useCallback(
    async (
      id: string,
      payload: {
        dayOfMonth: number;
        recurrenceType: "limited" | "unlimited";
        maxCycles?: number;
        amount: number;
      },
    ) => {
      setIsSavingRecurrenceEdit(true);
      setRecurrenceEditError(null);
      try {
        await updateLocalRecurrence(id, {
          dayOfMonth: payload.dayOfMonth,
          recurrenceType: payload.recurrenceType,
          maxCycles: payload.recurrenceType === "limited" ? payload.maxCycles : undefined,
          template: {
            amount: payload.amount,
          },
        });
        await Promise.all([loadRecurrences(), loadMonthlyHistory()]);
        window.dispatchEvent(new Event("wisecash:transactions-mutated"));
      } catch (error) {
        if (error instanceof StorageUnavailableError) {
          setRecurrenceEditError("Armazenamento local indisponível. Não foi possível salvar a recorrência.");
        } else {
          setRecurrenceEditError("Não foi possível salvar a recorrência.");
        }
      } finally {
        setIsSavingRecurrenceEdit(false);
      }
    },
    [loadRecurrences, loadMonthlyHistory],
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
          <div className="flex w-full flex-wrap items-center justify-end gap-2 md:w-auto md:gap-3">
            <Button asChild className={historyStyleBase} size="md" variant="secondary">
              <Link href="/">Voltar ao Dashboard</Link>
            </Button>
            <Button asChild className={historyStyleBase} size="md" variant="secondary">
              <Link href={historyViewHref}>Histórico</Link>
            </Button>
            <Button asChild className={historyStyleBase} size="md" variant="secondary">
              <Link href={recurrencesViewHref}>Recorrências</Link>
            </Button>
            <Button asChild className="h-10 bg-[var(--primary-cta)] px-4 text-sm text-white shadow-elevated hover:brightness-110" size="md">
              <Link href={newViewHref}>Nova Transação</Link>
            </Button>
          </div>
        )}
        title={uiText.transactions}
      />

      {showRecurrences ? (
        <RecurrencesPage
          editErrorMessage={recurrenceEditError}
          errorMessage={recurrenceError}
          isLoading={isLoadingRecurrences}
          isSavingEdit={isSavingRecurrenceEdit}
          isSubmitting={isSubmittingRecurrence}
          onCancelPending={handleCancelPendingRecurrence}
          onConfirmPending={handleConfirmPendingRecurrence}
          onDeleteRecurrenceCancel={handleDeleteRecurrenceCancel}
          onDeleteRecurrence={handleDeleteRecurrence}
          onSaveEditRecurrence={handleSaveRecurrenceEdit}
          pendingItems={recurrencePendingItems}
          recurrenceItems={recurrenceItems}
        />
      ) : null}

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
            onDeleteCancel={handleDeleteHistoryCancel}
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
