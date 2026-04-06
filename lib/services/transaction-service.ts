import { createTransaction, findTransactionById, updateTransaction } from "@/lib/repositories/transaction-repository";
import { TransactionRecord } from "@/lib/repositories/local-finance-contracts";
import { createRecurrenceRule, reconcileRecurrence } from "@/lib/services/recurrence-service";
import { correctCategoryLabel } from "@/lib/ui/category-label-corrections";
import { normalizeAmount } from "@/lib/validation/amount-normalization";
import { TransactionInput } from "@/lib/validation/transaction-schema";
import { getActiveOwnerScope } from "@/lib/storage/scoped-db";

export async function createTransactionFromInput(input: TransactionInput, ownerScope = getActiveOwnerScope()) {
  const correctedCategory = correctCategoryLabel(input.categoryId);
  const amount = normalizeAmount(input.amount);

  const recurrenceRuleId =
    input.recurrence?.enabled && input.recurrence.dayOfMonth && input.recurrence.recurrenceType
      ? (
          await createRecurrenceRule(
            {
              dayOfMonth: input.recurrence.dayOfMonth,
              recurrenceType: input.recurrence.recurrenceType,
              unlimitedMode: input.recurrence.unlimitedMode,
              maxCycles: input.recurrence.maxCycles,
              template: {
                name: input.name,
                type: input.type,
                categoryId: input.categoryId,
                categoryName: correctedCategory,
                amount,
                notes: input.notes,
                startDate: input.transactionDate,
              },
            },
            ownerScope,
          )
        ).id
      : null;

  const transaction: Omit<TransactionRecord, "nameNormalized" | "categoryNameNormalized" | "notesNormalized"> = {
    id: crypto.randomUUID(),
    ownerScope,
    name: input.name,
    type: input.type,
    categoryId: input.categoryId,
    categoryName: correctedCategory,
    amount,
    transactionDate: input.transactionDate,
    recurrenceRuleId,
    notes: input.notes,
    source: "manual",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const created = await createTransaction(transaction);
  await reconcileRecurrence(ownerScope);

  return created;
}

export async function applyRecurrenceForTransaction(id: string, ownerScope = getActiveOwnerScope()) {
  const tx = await findTransactionById(id, ownerScope);
  if (!tx) {
    return null;
  }

  await reconcileRecurrence(ownerScope);
  return tx;
}

export async function patchTransaction(id: string, patch: Partial<TransactionInput>, ownerScope = getActiveOwnerScope()) {
  const nextPatch: Partial<TransactionRecord> = {};
  if (patch.name !== undefined) nextPatch.name = patch.name;
  if (patch.type !== undefined) nextPatch.type = patch.type;
  if (patch.categoryId !== undefined) {
    nextPatch.categoryId = patch.categoryId;
    nextPatch.categoryName = correctCategoryLabel(patch.categoryId);
  }
  if (patch.amount !== undefined) nextPatch.amount = normalizeAmount(patch.amount);
  if (patch.transactionDate !== undefined) nextPatch.transactionDate = patch.transactionDate;
  if (patch.notes !== undefined) nextPatch.notes = patch.notes;

  return updateTransaction(id, nextPatch, ownerScope);
}
