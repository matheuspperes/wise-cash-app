import { getStore, Transaction } from "@/lib/repositories/in-memory-db";

type ListParams = {
  from?: string;
  to?: string;
  type?: "income" | "expense";
  categoryId?: string;
};

export function listTransactions(params: ListParams = {}) {
  const store = getStore();

  return store.transactions
    .filter((tx) => tx.status === "active")
    .filter((tx) => (params.type ? tx.type === params.type : true))
    .filter((tx) => (params.categoryId ? tx.categoryId === params.categoryId : true))
    .filter((tx) => (params.from ? tx.transactionDate >= params.from : true))
    .filter((tx) => (params.to ? tx.transactionDate <= params.to : true))
    .sort((a, b) => (a.transactionDate < b.transactionDate ? 1 : -1));
}

export function createTransaction(tx: Transaction) {
  const store = getStore();
  store.transactions.unshift(tx);
  return tx;
}

export function findTransactionById(id: string) {
  const store = getStore();
  return store.transactions.find((tx) => tx.id === id && tx.status === "active") ?? null;
}

export function updateTransaction(id: string, patch: Partial<Transaction>) {
  const store = getStore();
  const current = store.transactions.find((tx) => tx.id === id && tx.status === "active");
  if (!current) {
    return null;
  }

  Object.assign(current, patch, { updatedAt: new Date().toISOString() });
  return current;
}

export function softDeleteTransaction(id: string) {
  return updateTransaction(id, { status: "deleted" });
}
