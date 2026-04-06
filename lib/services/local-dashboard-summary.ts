import { getMonthlySummaryContext, listCurrentMonthTransactions, listFullTransactionsHistoryRows } from "@/lib/repositories/monthly-summary-repository";
import { buildHistoricalTotalBalance, buildMonthlyTransactionHistoryGroups } from "@/lib/services/dashboard-history-mapper";
import { listPendingRecurrenceInstances, reconcileRecurrence } from "@/lib/services/recurrence-service";
import { clearLocalFunctionalData } from "@/lib/storage/dexie-db";
import { StorageUnavailableError, assertLocalStorageAvailable } from "@/lib/storage/local-storage-health";
import { getActiveOwnerScope } from "@/lib/storage/scoped-db";

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

export async function getLocalDashboardSummary(months: number) {
  try {
    assertLocalStorageAvailable();
    const ownerScope = getActiveOwnerScope();
    await reconcileRecurrence(ownerScope);
    const summaryContext = await getMonthlySummaryContext(months, ownerScope);
    const areaSeries = summaryContext.series;
    const latest = summaryContext.latest;
    const historicalBalance = buildHistoricalTotalBalance(areaSeries);
    const currentMonthTransactions = await listCurrentMonthTransactions(new Date(), ownerScope);
    const fullTransactionsHistoryRows = await listFullTransactionsHistoryRows(ownerScope);
    const recurrencePendingConfirmations = await listPendingRecurrenceInstances(ownerScope);
    const fullTransactionsHistoryGroups = buildMonthlyTransactionHistoryGroups(fullTransactionsHistoryRows);

    return {
      currentMonth: latest.month,
      netBalance: latest.net,
      totals: { income: latest.income, expense: latest.expense },
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
