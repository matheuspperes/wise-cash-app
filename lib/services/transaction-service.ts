import { createTransaction, findTransactionById, updateTransaction } from "@/lib/repositories/transaction-repository";
import { Transaction } from "@/lib/repositories/in-memory-db";
import { createRecurrenceRule, generateNextRecurrence } from "@/lib/services/recurrence-service";
import { normalizeAmount } from "@/lib/validation/amount-normalization";
import { TransactionInput } from "@/lib/validation/transaction-schema";

export function createTransactionFromInput(input: TransactionInput) {
  const recurrenceRuleId =
    input.recurrence?.enabled && input.recurrence.dayOfMonth
      ? createRecurrenceRule(input.recurrence.dayOfMonth).id
      : null;

  const transaction: Transaction = {
    id: crypto.randomUUID(),
    name: input.name,
    type: input.type,
    categoryId: input.categoryId,
    categoryName: input.categoryId,
    amount: normalizeAmount(input.amount),
    transactionDate: input.transactionDate,
    recurrenceRuleId,
    notes: input.notes,
    source: "manual",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const created = createTransaction(transaction);
  if (created.recurrenceRuleId) {
    generateNextRecurrence(created);
  }

  return created;
}

export function applyRecurrenceForTransaction(id: string) {
  const tx = findTransactionById(id);
  if (!tx) {
    return null;
  }

  return generateNextRecurrence(tx);
}

export function patchTransaction(id: string, patch: Partial<TransactionInput>) {
  const nextPatch: Partial<Transaction> = {};
  if (patch.name !== undefined) nextPatch.name = patch.name;
  if (patch.type !== undefined) nextPatch.type = patch.type;
  if (patch.categoryId !== undefined) {
    nextPatch.categoryId = patch.categoryId;
    nextPatch.categoryName = patch.categoryId;
  }
  if (patch.amount !== undefined) nextPatch.amount = normalizeAmount(patch.amount);
  if (patch.transactionDate !== undefined) nextPatch.transactionDate = patch.transactionDate;
  if (patch.notes !== undefined) nextPatch.notes = patch.notes;

  return updateTransaction(id, nextPatch);
}
