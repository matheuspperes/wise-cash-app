import { RecurrenceRuleRecord, TransactionRecord } from "@/lib/repositories/local-finance-contracts";
import { createTransaction } from "@/lib/repositories/transaction-repository";
import { getDexieDb } from "@/lib/storage/dexie-db";
import { assertLocalStorageAvailable } from "@/lib/storage/local-storage-health";
import { getActiveOwnerScope } from "@/lib/storage/scoped-db";

function getLastDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export async function createRecurrenceRule(dayOfMonth: number, ownerScope = getActiveOwnerScope()): Promise<RecurrenceRuleRecord> {
  assertLocalStorageAvailable();
  const db = getDexieDb();
  const now = new Date().toISOString();
  const rule: RecurrenceRuleRecord = {
    id: crypto.randomUUID(),
    ownerScope,
    dayOfMonth,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  };

  await db.recurrenceRules.put(rule);
  return rule;
}

export function computeNextRecurrenceDate(referenceDate: string, dayOfMonth: number) {
  const date = new Date(referenceDate);
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const lastDay = getLastDayOfMonth(nextMonth);
  const resolvedDay = Math.min(dayOfMonth, lastDay);
  const resolved = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), resolvedDay);
  return resolved.toISOString().slice(0, 10);
}

export async function generateNextRecurrence(transaction: TransactionRecord, ownerScope = getActiveOwnerScope()) {
  if (!transaction.recurrenceRuleId) {
    return null;
  }

  assertLocalStorageAvailable();
  const db = getDexieDb();
  const rule = await db.recurrenceRules.get(transaction.recurrenceRuleId);
  if (!rule) {
    return null;
  }

  if (!rule.isActive || rule.ownerScope !== ownerScope) {
    return null;
  }

  const nextTx: Omit<TransactionRecord, "nameNormalized" | "categoryNameNormalized" | "notesNormalized"> = {
    ...transaction,
    id: crypto.randomUUID(),
    ownerScope,
    transactionDate: computeNextRecurrenceDate(transaction.transactionDate, rule.dayOfMonth),
    source: "recurrence_generated",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return createTransaction(nextTx);
}
