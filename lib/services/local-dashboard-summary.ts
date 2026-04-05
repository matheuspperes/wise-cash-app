import { getMonthlySummaryContext, listCurrentMonthTransactions, listFullTransactionsHistoryRows } from "@/lib/repositories/monthly-summary-repository";
import { buildHistoricalTotalBalance, buildMonthlyTransactionHistoryGroups } from "@/lib/services/dashboard-history-mapper";
import { clearLocalFunctionalData } from "@/lib/storage/dexie-db";
import { StorageUnavailableError, assertLocalStorageAvailable } from "@/lib/storage/local-storage-health";
import { getActiveOwnerScope } from "@/lib/storage/scoped-db";

function mapStorageError(error: unknown): never {
  if (error instanceof StorageUnavailableError) {
    throw error;
  }

  throw new Error("Não foi possível acessar o resumo local do dashboard.");
}

export async function getLocalDashboardSummary(months: number) {
  try {
    assertLocalStorageAvailable();
    const ownerScope = getActiveOwnerScope();
    const summaryContext = await getMonthlySummaryContext(months, ownerScope);
    const areaSeries = summaryContext.series;
    const latest = summaryContext.latest;
    const historicalBalance = buildHistoricalTotalBalance(areaSeries);
    const currentMonthTransactions = await listCurrentMonthTransactions(new Date(), ownerScope);
    const fullTransactionsHistoryRows = await listFullTransactionsHistoryRows(ownerScope);
    const fullTransactionsHistoryGroups = buildMonthlyTransactionHistoryGroups(fullTransactionsHistoryRows);

    return {
      currentMonth: latest.month,
      netBalance: latest.net,
      totals: { income: latest.income, expense: latest.expense },
      historicalBalance,
      currentMonthTransactions,
      currentMonthExpenses: currentMonthTransactions,
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
