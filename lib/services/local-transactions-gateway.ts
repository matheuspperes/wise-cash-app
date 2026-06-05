import { softDeleteTransaction } from "@/lib/repositories/transaction-repository";
import { searchTransactions } from "@/lib/repositories/transaction-search";
import { getLocalDashboardSummary, reconcileAfterRecurrenceMutation } from "@/lib/services/local-dashboard-summary";
import {
  cancelPendingRecurrenceInstance,
  confirmPendingRecurrenceInstance,
  deactivateRecurrenceRule,
  filterPendingRecurrenceItemsForCurrentMonth,
  listPendingRecurrenceInstances,
  listRecurrenceRules,
  updateRecurrenceRuleForFutureCycles,
} from "@/lib/services/recurrence-service";
import { StorageUnavailableError, assertLocalStorageAvailable } from "@/lib/storage/local-storage-health";
import { getActiveOwnerScope } from "@/lib/storage/scoped-db";
import { patchTransaction, createTransactionFromInput } from "@/lib/services/transaction-service";
import { TransactionInput } from "@/lib/validation/transaction-schema";

type QueryParams = {
  from?: string;
  to?: string;
  type?: "income" | "expense";
  categoryId?: string;
  q?: string;
};

function mapStorageError(error: unknown): never {
  if (error instanceof StorageUnavailableError) {
    throw error;
  }

  throw new Error("Não foi possível acessar os dados locais de transações.");
}

export async function listLocalTransactions(params: QueryParams) {
  try {
    assertLocalStorageAvailable();
    const ownerScope = getActiveOwnerScope();
    const items = await searchTransactions(params, ownerScope);
    return { items, pagination: { page: 1, pageSize: items.length, total: items.length } };
  } catch (error) {
    return mapStorageError(error);
  }
}

export async function createLocalTransaction(input: TransactionInput) {
  try {
    assertLocalStorageAvailable();
    const ownerScope = getActiveOwnerScope();
    const transaction = await createTransactionFromInput(input, ownerScope);
    await reconcileAfterRecurrenceMutation(ownerScope);
    return { transaction };
  } catch (error) {
    return mapStorageError(error);
  }
}

export async function bulkCreateFromCsv(inputs: TransactionInput[]) {
  try {
    assertLocalStorageAvailable();
    const ownerScope = getActiveOwnerScope();
    let created = 0;
    let skipped = 0;

    for (const input of inputs) {
      try {
        await createTransactionFromInput(input, ownerScope);
        created += 1;
      } catch {
        skipped += 1;
      }
    }

    await reconcileAfterRecurrenceMutation(ownerScope);
    return { created, skipped };
  } catch (error) {
    return mapStorageError(error);
  }
}

export async function patchLocalTransaction(id: string, patch: Partial<TransactionInput>) {
  try {
    assertLocalStorageAvailable();
    const ownerScope = getActiveOwnerScope();
    const transaction = await patchTransaction(id, patch, ownerScope);
    if (!transaction) {
      throw new Error("Transação não encontrada.");
    }

    await reconcileAfterRecurrenceMutation(ownerScope);

    return { transaction };
  } catch (error) {
    return mapStorageError(error);
  }
}

export async function removeLocalTransaction(id: string) {
  try {
    assertLocalStorageAvailable();
    const ownerScope = getActiveOwnerScope();
    const deleted = await softDeleteTransaction(id, ownerScope);
    if (!deleted) {
      throw new Error("Transação não encontrada.");
    }

    await reconcileAfterRecurrenceMutation(ownerScope);

    return { transaction: deleted };
  } catch (error) {
    return mapStorageError(error);
  }
}

export async function loadLocalFinanceViews(params: QueryParams, months = 12) {
  const [transactions, summary] = await Promise.all([
    listLocalTransactions(params),
    getLocalDashboardSummary(months),
  ]);

  return {
    transactions,
    summary,
  };
}

export async function listLocalRecurrencePendingConfirmations() {
  try {
    assertLocalStorageAvailable();
    const ownerScope = getActiveOwnerScope();
    await reconcileAfterRecurrenceMutation(ownerScope);
    const items = await listPendingRecurrenceInstances(ownerScope);
    return { items: filterPendingRecurrenceItemsForCurrentMonth(items) };
  } catch (error) {
    return mapStorageError(error);
  }
}

export async function confirmLocalRecurrencePending(id: string) {
  try {
    assertLocalStorageAvailable();
    const ownerScope = getActiveOwnerScope();
    const instance = await confirmPendingRecurrenceInstance(id, ownerScope);
    await reconcileAfterRecurrenceMutation(ownerScope);
    return { instance };
  } catch (error) {
    return mapStorageError(error);
  }
}

export async function cancelLocalRecurrencePending(id: string) {
  try {
    assertLocalStorageAvailable();
    const ownerScope = getActiveOwnerScope();
    const instance = await cancelPendingRecurrenceInstance(id, ownerScope);
    await reconcileAfterRecurrenceMutation(ownerScope);
    return { instance };
  } catch (error) {
    return mapStorageError(error);
  }
}

export async function listLocalRecurrences() {
  try {
    assertLocalStorageAvailable();
    const ownerScope = getActiveOwnerScope();
    await reconcileAfterRecurrenceMutation(ownerScope);
    const items = await listRecurrenceRules(ownerScope);
    return { items };
  } catch (error) {
    return mapStorageError(error);
  }
}

export async function updateLocalRecurrence(
  id: string,
  patch: {
    dayOfMonth?: number;
    recurrenceType?: "limited" | "unlimited";
    unlimitedMode?: "automatic" | "manual";
    maxCycles?: number;
    template?: {
      name?: string;
      type?: "income" | "expense";
      categoryId?: string;
      categoryName?: string;
      amount?: number;
      notes?: string;
    };
  },
) {
  try {
    assertLocalStorageAvailable();
    const ownerScope = getActiveOwnerScope();
    const recurrence = await updateRecurrenceRuleForFutureCycles(id, patch, ownerScope);
    await reconcileAfterRecurrenceMutation(ownerScope);
    return { recurrence };
  } catch (error) {
    return mapStorageError(error);
  }
}

export async function deactivateLocalRecurrence(id: string) {
  try {
    assertLocalStorageAvailable();
    const ownerScope = getActiveOwnerScope();
    const recurrence = await deactivateRecurrenceRule(id, ownerScope);
    await reconcileAfterRecurrenceMutation(ownerScope);
    return { recurrence };
  } catch (error) {
    return mapStorageError(error);
  }
}
