import { getMonthlySummaryContext, listCurrentMonthTransactions, listFullTransactionsHistoryRows } from "@/lib/repositories/monthly-summary-repository";
import { buildHistoricalTotalBalance, buildMonthlyTransactionHistoryGroups } from "@/lib/services/dashboard-history-mapper";
import { selectSeriesWindowByMode } from "@/lib/services/dashboard-series-window";
import { listPendingRecurrenceInstances, reconcileRecurrence } from "@/lib/services/recurrence-service";
import { clearLocalFunctionalData } from "@/lib/storage/dexie-db";
import { StorageUnavailableError, assertLocalStorageAvailable } from "@/lib/storage/local-storage-health";
import { getActiveOwnerScope } from "@/lib/storage/scoped-db";
import { DASHBOARD_VIEW_MODE_DEFAULT, DashboardViewMode } from "@/lib/ui/dashboard-view-mode";

function toMonthRef(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().slice(0, 7);
}

function mapStorageError(error: unknown): never {
  if (error instanceof StorageUnavailableError) {
    throw error;
  }

  throw new Error("Não foi possível acessar o resumo local do dashboard.");
}

export type DashboardRefreshContract = {
  invalidateMonthlySummary: true;
  invalidateHistory: true;
};

export function getDashboardRefreshContract(): DashboardRefreshContract {
  return {
    invalidateMonthlySummary: true,
    invalidateHistory: true,
  };
}

export async function reconcileAfterRecurrenceMutation(ownerScope = getActiveOwnerScope()) {
  try {
    assertLocalStorageAvailable();
    await reconcileRecurrence(ownerScope);
  } catch (error) {
    return mapStorageError(error);
  }
}

export async function getLocalDashboardSummary(months: number, mode: DashboardViewMode = DASHBOARD_VIEW_MODE_DEFAULT) {
  try {
    assertLocalStorageAvailable();
    const ownerScope = getActiveOwnerScope();
    await reconcileRecurrence(ownerScope);
    const summaryContext = await getMonthlySummaryContext(null, ownerScope);
    const currentMonthRef = toMonthRef(new Date());
    const currentMonthPoint = summaryContext.series.find((point) => point.monthRef === currentMonthRef) ?? {
      monthRef: currentMonthRef,
      month: "",
      income: 0,
      expense: 0,
      net: 0,
    };
    const areaSeries = selectSeriesWindowByMode(summaryContext.series, months, mode);
    const historicalBalance = buildHistoricalTotalBalance(areaSeries);
    const currentMonthTransactions = await listCurrentMonthTransactions(new Date(), ownerScope);
    const fullTransactionsHistoryRows = await listFullTransactionsHistoryRows(ownerScope);
    const recurrencePendingConfirmations = await listPendingRecurrenceInstances(ownerScope);
    const fullTransactionsHistoryGroups = buildMonthlyTransactionHistoryGroups(fullTransactionsHistoryRows);

    return {
      currentMonth: currentMonthPoint.month,
      netBalance: currentMonthPoint.net,
      totals: { income: currentMonthPoint.income, expense: currentMonthPoint.expense },
      historicalBalance,
      currentMonthTransactions,
      currentMonthExpenses: currentMonthTransactions,
      recurrencePendingConfirmations,
      fullTransactionsHistoryGroups,
      fullExpenseHistoryGroups: fullTransactionsHistoryGroups,
      areaSeries,
    };
  } catch (error) {
    return mapStorageError(error);
  }
}

export async function resetLocalFunctionalData() {
  try {
    assertLocalStorageAvailable();
    await clearLocalFunctionalData();
  } catch (error) {
    return mapStorageError(error);
  }
}
