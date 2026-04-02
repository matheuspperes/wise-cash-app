import { TransactionListParams, TransactionRecord } from "@/lib/repositories/local-finance-contracts";
import { normalizeTextForSearch } from "@/lib/repositories/text-normalization";
import Dexie from "dexie";
import { getDexieDb } from "@/lib/storage/dexie-db";
import { assertLocalStorageAvailable } from "@/lib/storage/local-storage-health";
import { getActiveOwnerScope } from "@/lib/storage/scoped-db";

function byDateDesc(left: TransactionRecord, right: TransactionRecord) {
  return left.transactionDate < right.transactionDate ? 1 : -1;
}

export async function listTransactions(params: TransactionListParams = {}, ownerScope = getActiveOwnerScope()) {
  assertLocalStorageAvailable();
  const db = getDexieDb();
  const items = await db.transactions
    .where("[ownerScope+status+transactionDate]")
    .between([ownerScope, "active", Dexie.minKey], [ownerScope, "active", Dexie.maxKey])
    .toArray();

  return items
    .filter((tx) => (params.type ? tx.type === params.type : true))
    .filter((tx) => (params.categoryId ? tx.categoryId === params.categoryId : true))
    .filter((tx) => (params.from ? tx.transactionDate >= params.from : true))
    .filter((tx) => (params.to ? tx.transactionDate <= params.to : true))
    .sort(byDateDesc);
}

export async function createTransaction(tx: Omit<TransactionRecord, "nameNormalized" | "categoryNameNormalized" | "notesNormalized">) {
  assertLocalStorageAvailable();
  const db = getDexieDb();

  const record: TransactionRecord = {
    ...tx,
    nameNormalized: normalizeTextForSearch(tx.name),
    categoryNameNormalized: normalizeTextForSearch(tx.categoryName),
    notesNormalized: normalizeTextForSearch(tx.notes),
  };

  await db.transactions.put(record);
  return record;
}

export async function findTransactionById(id: string, ownerScope = getActiveOwnerScope()) {
  assertLocalStorageAvailable();
  const db = getDexieDb();
  const tx = await db.transactions.get(id);
  if (!tx || tx.ownerScope !== ownerScope || tx.status !== "active") {
    return null;
  }

  return tx;
}

export async function updateTransaction(id: string, patch: Partial<TransactionRecord>, ownerScope = getActiveOwnerScope()) {
  assertLocalStorageAvailable();
  const db = getDexieDb();
  const current = await findTransactionById(id, ownerScope);
  if (!current) {
    return null;
  }

  const next: TransactionRecord = {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  next.nameNormalized = normalizeTextForSearch(next.name);
  next.categoryNameNormalized = normalizeTextForSearch(next.categoryName);
  next.notesNormalized = normalizeTextForSearch(next.notes);

  await db.transactions.put(next);
  return next;
}

export async function softDeleteTransaction(id: string, ownerScope = getActiveOwnerScope()) {
  return updateTransaction(id, { status: "deleted" }, ownerScope);
}
