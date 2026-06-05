import { TransactionListParams, TransactionRecord } from "@/lib/repositories/local-finance-contracts";
import { normalizeTextForSearch } from "@/lib/repositories/text-normalization";
import { normalizeCivilDateString } from "@/lib/formatting/civil-date";
import { categoryMatchesFilter, correctCategoryLabel } from "@/lib/ui/category-label-corrections";
import Dexie from "dexie";
import { getDexieDb } from "@/lib/storage/dexie-db";
import { assertLocalStorageAvailable } from "@/lib/storage/local-storage-health";
import { getActiveOwnerScope } from "@/lib/storage/scoped-db";
import { ensureCivilDateNormalization } from "@/lib/services/civil-date-migration";

function byDateDesc(left: TransactionRecord, right: TransactionRecord) {
  return left.transactionDate < right.transactionDate ? 1 : -1;
}

function withCorrectedCategory(record: TransactionRecord): TransactionRecord {
  const correctedCategory = correctCategoryLabel(record.categoryName || record.categoryId);
  return {
    ...record,
    categoryName: correctedCategory,
    categoryNameNormalized: normalizeTextForSearch(correctedCategory),
  };
}

export async function listTransactions(params: TransactionListParams = {}, ownerScope = getActiveOwnerScope()) {
  assertLocalStorageAvailable();
  await ensureCivilDateNormalization(ownerScope);
  const db = getDexieDb();
  const items = await db.transactions
    .where("[ownerScope+status+transactionDate]")
    .between([ownerScope, "active", Dexie.minKey], [ownerScope, "active", Dexie.maxKey])
    .toArray();

  return items
    .map(withCorrectedCategory)
    .filter((tx) => (params.type ? tx.type === params.type : true))
    .filter((tx) => (params.categoryId ? categoryMatchesFilter(tx.categoryId, tx.categoryName, params.categoryId) : true))
    .filter((tx) => (params.from ? tx.transactionDate >= params.from : true))
    .filter((tx) => (params.to ? tx.transactionDate <= params.to : true))
    .sort(byDateDesc);
}

export async function createTransaction(tx: Omit<TransactionRecord, "nameNormalized" | "categoryNameNormalized" | "notesNormalized">) {
  assertLocalStorageAvailable();
  const db = getDexieDb();

  const correctedCategory = correctCategoryLabel(tx.categoryName || tx.categoryId);
  const transactionDate = normalizeCivilDateString(tx.transactionDate);
  const record: TransactionRecord = {
    ...tx,
    transactionDate,
    categoryName: correctedCategory,
    nameNormalized: normalizeTextForSearch(tx.name),
    categoryNameNormalized: normalizeTextForSearch(correctedCategory),
    notesNormalized: normalizeTextForSearch(tx.notes),
  };

  await db.transactions.put(record);
  return record;
}

export async function findTransactionById(id: string, ownerScope = getActiveOwnerScope()) {
  assertLocalStorageAvailable();
  await ensureCivilDateNormalization(ownerScope);
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

  if (patch.transactionDate !== undefined) {
    next.transactionDate = normalizeCivilDateString(patch.transactionDate);
  }

  next.categoryName = correctCategoryLabel(next.categoryName || next.categoryId);

  next.nameNormalized = normalizeTextForSearch(next.name);
  next.categoryNameNormalized = normalizeTextForSearch(next.categoryName);
  next.notesNormalized = normalizeTextForSearch(next.notes);

  await db.transactions.put(next);
  return next;
}

export async function softDeleteTransaction(id: string, ownerScope = getActiveOwnerScope()) {
  return updateTransaction(id, { status: "deleted" }, ownerScope);
}
