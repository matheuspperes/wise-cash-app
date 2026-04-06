import { softDeleteTransaction } from "@/lib/repositories/transaction-repository";
import { searchTransactions } from "@/lib/repositories/transaction-search";
import { getLocalDashboardSummary } from "@/lib/services/local-dashboard-summary";
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
    return { transaction };
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
