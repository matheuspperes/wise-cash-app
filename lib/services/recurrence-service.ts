import { getStore, RecurrenceRule, Transaction } from "@/lib/repositories/in-memory-db";

function getLastDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function createRecurrenceRule(dayOfMonth: number): RecurrenceRule {
  const store = getStore();
  const rule: RecurrenceRule = {
    id: crypto.randomUUID(),
    dayOfMonth,
    isActive: true,
  };
  store.recurrenceRules.push(rule);
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

export function generateNextRecurrence(transaction: Transaction) {
  if (!transaction.recurrenceRuleId) {
    return null;
  }

  const store = getStore();
  const rule = store.recurrenceRules.find((r) => r.id === transaction.recurrenceRuleId && r.isActive);
  if (!rule) {
    return null;
  }

  const nextTx: Transaction = {
    ...transaction,
    id: crypto.randomUUID(),
    transactionDate: computeNextRecurrenceDate(transaction.transactionDate, rule.dayOfMonth),
    source: "recurrence_generated",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.transactions.unshift(nextTx);
  return nextTx;
}
