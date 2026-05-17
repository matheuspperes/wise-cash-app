import {
  RecurrenceInstanceRecord,
  RecurrenceRuleRecord,
  RecurrenceType,
  RecurrenceUnlimitedMode,
  TransactionRecord,
  TxType,
} from "@/lib/repositories/local-finance-contracts";
import { createTransaction, updateTransaction } from "@/lib/repositories/transaction-repository";
import { ensureCivilDateNormalization } from "@/lib/services/civil-date-migration";
import { buildCivilDateFromParts as buildCivilDateString, buildCivilMonthRefFromParts as buildCivilMonthRefString, normalizeCivilDateString, toLocalCivilDate, toLocalCivilMonthRef } from "@/lib/formatting/civil-date";
import { getDexieDb } from "@/lib/storage/dexie-db";
import { assertLocalStorageAvailable } from "@/lib/storage/local-storage-health";
import { getActiveOwnerScope } from "@/lib/storage/scoped-db";

export type RecurrenceRuleInput = {
  dayOfMonth: number;
  recurrenceType: RecurrenceType;
  unlimitedMode?: RecurrenceUnlimitedMode;
  maxCycles?: number;
  template: {
    name: string;
    type: TxType;
    categoryId: string;
    categoryName: string;
    amount: number;
    notes?: string;
    startDate: string;
  };
};

export type RecurrencePendingItem = {
  id: string;
  recurrenceRuleId: string;
  monthRef: string;
  dueDate: string;
  name: string;
  type: TxType;
  categoryName: string;
  amount: number;
  notes?: string;
};

export type RecurrenceRuleListItem = {
  id: string;
  name: string;
  categoryName: string;
  type: TxType;
  amount: number;
  dayOfMonth: number;
  nextScheduledDate: string;
  recurrenceType: RecurrenceType;
  isActive: boolean;
  maxCycles: number | null;
  generatedCycles: number;
  monthsRemaining: number | null;
};

export type RecurrenceRuleUpdateInput = {
  dayOfMonth?: number;
  recurrenceType?: RecurrenceType;
  unlimitedMode?: RecurrenceUnlimitedMode;
  maxCycles?: number;
  template?: {
    name?: string;
    type?: TxType;
    categoryId?: string;
    categoryName?: string;
    amount?: number;
    notes?: string;
  };
  isActive?: boolean;
};

type PendingLike = Pick<RecurrencePendingItem, "id" | "dueDate" | "monthRef">;

function buildMonthRefFromParts(year: number, monthIndex: number) {
  return buildCivilMonthRefString(year, monthIndex);
}

function toMonthRef(value: Date | string) {
  return toLocalCivilMonthRef(value);
}

function shiftMonthRef(monthRef: string, delta: number) {
  const [year, month] = monthRef.split("-").map((item) => Number(item));
  const totalMonths = year * 12 + (month - 1) + delta;
  const nextYear = Math.floor(totalMonths / 12);
  const nextMonthIndex = ((totalMonths % 12) + 12) % 12;
  return buildMonthRefFromParts(nextYear, nextMonthIndex);
}

function compareMonthRef(left: string, right: string) {
  return left.localeCompare(right);
}

function parseLocalDateLike(value: string | Date) {
  return toLocalCivilDate(value);
}

function isValidDate(value: Date) {
  return Number.isFinite(value.getTime());
}

export function normalizeRecurrenceCivilDate(value: string | Date) {
  return normalizeCivilDateString(value);
}

export function isSameLocalMonthYear(dateLike: string | Date, referenceDate = new Date()) {
  const date = parseLocalDateLike(dateLike);
  if (!isValidDate(date)) {
    return false;
  }

  return date.getFullYear() === referenceDate.getFullYear() && date.getMonth() === referenceDate.getMonth();
}

export function comparePendingRecurrenceItems(left: PendingLike, right: PendingLike) {
  const leftDate = parseLocalDateLike(left.dueDate);
  const rightDate = parseLocalDateLike(right.dueDate);

  if (isValidDate(leftDate) && isValidDate(rightDate)) {
    const timeDelta = leftDate.getTime() - rightDate.getTime();
    if (timeDelta !== 0) {
      return timeDelta;
    }
  }

  const monthDelta = compareMonthRef(left.monthRef, right.monthRef);
  if (monthDelta !== 0) {
    return monthDelta;
  }

  return left.id.localeCompare(right.id);
}

export function filterPendingRecurrenceItemsForCurrentMonth(
  items: RecurrencePendingItem[],
  referenceDate = new Date(),
) {
  return items
    .filter((item) => isSameLocalMonthYear(item.dueDate, referenceDate))
    .sort(comparePendingRecurrenceItems);
}

function getLastDayOfMonth(year: number, monthIndex: number) {
  if (monthIndex === 1) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    return isLeapYear ? 29 : 28;
  }

  const monthLengths = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return monthLengths[monthIndex];
}

function resolveDueDate(monthRef: string, dayOfMonth: number) {
  const [year, month] = monthRef.split("-").map((item) => Number(item));
  const monthIndex = month - 1;
  const lastDay = getLastDayOfMonth(year, monthIndex);
  const resolvedDay = Math.min(dayOfMonth, lastDay);
  return buildCivilDateString(year, monthIndex, resolvedDay);
}

function toEffectiveMonthRef(date = new Date()) {
  return shiftMonthRef(toMonthRef(date), 1);
}

function getProjectionHorizon(referenceDate: Date) {
  const currentMonthRef = toMonthRef(referenceDate);
  const endOfYearMonthRef = `${referenceDate.getFullYear()}-12`;
  const oneYearAheadMonthRef = shiftMonthRef(currentMonthRef, 12);
  return compareMonthRef(endOfYearMonthRef, oneYearAheadMonthRef) >= 0 ? endOfYearMonthRef : oneYearAheadMonthRef;
}

function getStartMonthRef(rule: RecurrenceRuleRecord) {
  return shiftMonthRef(toMonthRef(rule.startDate), 1);
}

function getMonthsRemaining(rule: RecurrenceRuleRecord) {
  if (rule.recurrenceType !== "limited") {
    return null;
  }

  const maxCycles = rule.maxCycles ?? 0;
  return Math.max(maxCycles - rule.generatedCycles, 0);
}

function getNextScheduledDate(rule: RecurrenceRuleRecord, referenceDate = new Date()) {
  const startMonthRef = getStartMonthRef(rule);
  const effectiveMonthRef = toEffectiveMonthRef(referenceDate);
  let candidateMonthRef = compareMonthRef(startMonthRef, effectiveMonthRef) > 0 ? startMonthRef : effectiveMonthRef;

  if (rule.recurrenceType === "limited") {
    const maxCycles = rule.maxCycles ?? 1;
    const limitedEndMonthRef = getLimitedEndMonth(startMonthRef, maxCycles);
    if (compareMonthRef(candidateMonthRef, limitedEndMonthRef) > 0) {
      candidateMonthRef = limitedEndMonthRef;
    }
  }

  return resolveDueDate(candidateMonthRef, rule.dayOfMonth);
}

async function findGeneratedTransactionByRuleAndDate(ownerScope: string, recurrenceRuleId: string, transactionDate: string) {
  const db = getDexieDb();
  return db.transactions
    .where("[ownerScope+recurrenceRuleId+transactionDate]")
    .equals([ownerScope, recurrenceRuleId, transactionDate])
    .first();
}

async function listRuleTransactions(ownerScope: string, recurrenceRuleId: string) {
  const db = getDexieDb();
  return db.transactions
    .where("[ownerScope+recurrenceRuleId+transactionDate]")
    .between([ownerScope, recurrenceRuleId, ""], [ownerScope, recurrenceRuleId, "9999-12-31"])
    .toArray();
}

async function findInstanceByRuleAndMonth(ownerScope: string, recurrenceRuleId: string, monthRef: string) {
  const db = getDexieDb();
  return db.recurrenceInstances
    .where("[ownerScope+recurrenceRuleId+monthRef]")
    .equals([ownerScope, recurrenceRuleId, monthRef])
    .first();
}

function buildGeneratedTransactionFromRule(rule: RecurrenceRuleRecord, dueDate: string): Omit<TransactionRecord, "nameNormalized" | "categoryNameNormalized" | "notesNormalized"> {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    ownerScope: rule.ownerScope,
    name: rule.templateName,
    type: rule.templateType,
    categoryId: rule.templateCategoryId,
    categoryName: rule.templateCategoryName,
    amount: rule.templateAmount,
    transactionDate: dueDate,
    recurrenceRuleId: rule.id,
    notes: rule.templateNotes,
    source: "recurrence_generated",
    status: "active",
    createdAt: now,
    updatedAt: now,
  };
}

async function ensureAutomaticOrLimitedOccurrence(rule: RecurrenceRuleRecord, monthRef: string) {
  const dueDate = resolveDueDate(monthRef, rule.dayOfMonth);
  const existing = await findGeneratedTransactionByRuleAndDate(rule.ownerScope, rule.id, dueDate);
  if (existing) {
    return;
  }

  const payload = buildGeneratedTransactionFromRule(rule, dueDate);
  await createTransaction(payload);
}

async function ensureManualPendingOccurrence(rule: RecurrenceRuleRecord, monthRef: string) {
  const db = getDexieDb();
  const existingInstance = await findInstanceByRuleAndMonth(rule.ownerScope, rule.id, monthRef);
  if (existingInstance) {
    return;
  }

  const now = new Date().toISOString();
  await db.recurrenceInstances.put({
    id: crypto.randomUUID(),
    ownerScope: rule.ownerScope,
    recurrenceRuleId: rule.id,
    monthRef,
    status: "pending",
    dueDate: resolveDueDate(monthRef, rule.dayOfMonth),
    snapshotName: rule.templateName,
    snapshotType: rule.templateType,
    snapshotCategoryId: rule.templateCategoryId,
    snapshotCategoryName: rule.templateCategoryName,
    snapshotAmount: rule.templateAmount,
    snapshotNotes: rule.templateNotes,
    transactionId: null,
    createdAt: now,
    updatedAt: now,
  });
}

function getLimitedEndMonth(startMonthRef: string, maxCycles: number) {
  return shiftMonthRef(startMonthRef, Math.max(maxCycles - 1, 0));
}

async function updateRuleProgress(rule: RecurrenceRuleRecord) {
  const db = getDexieDb();
  const generated = await listRuleTransactions(rule.ownerScope, rule.id);
  const generatedCycles = generated.filter((tx) => tx.source === "recurrence_generated").length;

  const nextRule: RecurrenceRuleRecord = {
    ...rule,
    generatedCycles,
    updatedAt: new Date().toISOString(),
  };

  if (rule.recurrenceType === "limited" && rule.maxCycles && generatedCycles >= rule.maxCycles) {
    nextRule.isActive = false;
  }

  await db.recurrenceRules.put(nextRule);
  return nextRule;
}

export async function createRecurrenceRule(input: RecurrenceRuleInput, ownerScope = getActiveOwnerScope()): Promise<RecurrenceRuleRecord> {
  assertLocalStorageAvailable();
  await ensureCivilDateNormalization(ownerScope);

  const now = new Date().toISOString();
  const db = getDexieDb();
  const rule: RecurrenceRuleRecord = {
    id: crypto.randomUUID(),
    ownerScope,
    dayOfMonth: input.dayOfMonth,
    recurrenceType: input.recurrenceType,
    unlimitedMode: input.recurrenceType === "unlimited" ? (input.unlimitedMode ?? "automatic") : null,
    maxCycles: input.recurrenceType === "limited" ? (input.maxCycles ?? 1) : null,
    generatedCycles: 0,
    lastProcessedMonthRef: null,
    projectionUntilMonthRef: null,
    templateName: input.template.name,
    templateType: input.template.type,
    templateCategoryId: input.template.categoryId,
    templateCategoryName: input.template.categoryName,
    templateAmount: input.template.amount,
    templateNotes: input.template.notes,
    startDate: normalizeRecurrenceCivilDate(input.template.startDate),
    isActive: true,
    createdAt: now,
    updatedAt: now,
  };

  await db.recurrenceRules.put(rule);
  return rule;
}

export async function reconcileRecurrence(ownerScope = getActiveOwnerScope(), referenceDate = new Date()) {
  assertLocalStorageAvailable();
  await ensureCivilDateNormalization(ownerScope);
  const db = getDexieDb();
  const activeRules = await db.recurrenceRules
    .toCollection()
    .filter((rule) => rule.ownerScope === ownerScope && rule.isActive)
    .toArray();

  const projectionHorizon = getProjectionHorizon(referenceDate);

  for (const rule of activeRules) {
    const startMonthRef = getStartMonthRef(rule);
    if (compareMonthRef(startMonthRef, projectionHorizon) > 0) {
      continue;
    }

    let endMonthRef = projectionHorizon;
    if (rule.recurrenceType === "limited") {
      const maxCycles = rule.maxCycles ?? 1;
      endMonthRef = getLimitedEndMonth(startMonthRef, maxCycles);
    }

    for (let cursor = startMonthRef; compareMonthRef(cursor, endMonthRef) <= 0; cursor = shiftMonthRef(cursor, 1)) {
      if (rule.recurrenceType === "unlimited" && rule.unlimitedMode === "manual") {
        await ensureManualPendingOccurrence(rule, cursor);
      } else {
        await ensureAutomaticOrLimitedOccurrence(rule, cursor);
      }
    }

    const updatedRule: RecurrenceRuleRecord = {
      ...rule,
      projectionUntilMonthRef: projectionHorizon,
      lastProcessedMonthRef: endMonthRef,
      updatedAt: new Date().toISOString(),
    };

    await db.recurrenceRules.put(updatedRule);

    await updateRuleProgress(updatedRule);
  }
}

export async function listRecurrenceRules(ownerScope = getActiveOwnerScope(), referenceDate = new Date()): Promise<RecurrenceRuleListItem[]> {
  assertLocalStorageAvailable();
  await ensureCivilDateNormalization(ownerScope);
  const db = getDexieDb();
  const rules = await db.recurrenceRules
    .toCollection()
    .filter((rule) => rule.ownerScope === ownerScope && rule.isActive)
    .toArray();

  return rules
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
    .map((rule) => ({
      id: rule.id,
      name: rule.templateName,
      categoryName: rule.templateCategoryName,
      type: rule.templateType,
      amount: rule.templateAmount,
      dayOfMonth: rule.dayOfMonth,
      nextScheduledDate: getNextScheduledDate(rule, referenceDate),
      recurrenceType: rule.recurrenceType,
      isActive: rule.isActive,
      maxCycles: rule.maxCycles,
      generatedCycles: rule.generatedCycles,
      monthsRemaining: getMonthsRemaining(rule),
    }));
}

export async function listPendingRecurrenceInstances(ownerScope = getActiveOwnerScope()): Promise<RecurrencePendingItem[]> {
  assertLocalStorageAvailable();
  await ensureCivilDateNormalization(ownerScope);
  const db = getDexieDb();
  const pending = await db.recurrenceInstances
    .where("[ownerScope+status+monthRef]")
    .between([ownerScope, "pending", ""], [ownerScope, "pending", "9999-12"])
    .toArray();

  const mapped = pending.map((item) => ({
      id: item.id,
      recurrenceRuleId: item.recurrenceRuleId,
      monthRef: item.monthRef,
      dueDate: item.dueDate,
      name: item.snapshotName,
      type: item.snapshotType,
      categoryName: item.snapshotCategoryName,
      amount: item.snapshotAmount,
      notes: item.snapshotNotes,
    }));

  return mapped.sort(comparePendingRecurrenceItems);
}

export async function confirmPendingRecurrenceInstance(id: string, ownerScope = getActiveOwnerScope()) {
  assertLocalStorageAvailable();
  await ensureCivilDateNormalization(ownerScope);
  const db = getDexieDb();

  return await db.transaction("rw", [db.recurrenceInstances, db.transactions], async () => {
    const instance = await db.recurrenceInstances.get(id);
    if (!instance || instance.ownerScope !== ownerScope) {
      throw new Error("Pendencia nao encontrada.");
    }

    if (instance.status !== "pending") {
      return instance;
    }

    const now = new Date().toISOString();
    const transactionPayload: Omit<TransactionRecord, "nameNormalized" | "categoryNameNormalized" | "notesNormalized"> = {
      id: crypto.randomUUID(),
      ownerScope,
      name: instance.snapshotName,
      type: instance.snapshotType,
      categoryId: instance.snapshotCategoryId,
      categoryName: instance.snapshotCategoryName,
      amount: instance.snapshotAmount,
      transactionDate: instance.dueDate,
      recurrenceRuleId: instance.recurrenceRuleId,
      notes: instance.snapshotNotes,
      source: "recurrence_generated",
      status: "active",
      createdAt: now,
      updatedAt: now,
    };

    const created = await createTransaction(transactionPayload);
    const next: RecurrenceInstanceRecord = {
      ...instance,
      status: "confirmed",
      transactionId: created.id,
      updatedAt: now,
    };

    await db.recurrenceInstances.put(next);
    return next;
  });
}

export async function cancelPendingRecurrenceInstance(id: string, ownerScope = getActiveOwnerScope()) {
  assertLocalStorageAvailable();
  await ensureCivilDateNormalization(ownerScope);
  const db = getDexieDb();

  return await db.transaction("rw", db.recurrenceInstances, async () => {
    const instance = await db.recurrenceInstances.get(id);
    if (!instance || instance.ownerScope !== ownerScope) {
      throw new Error("Pendencia nao encontrada.");
    }

    if (instance.status !== "pending") {
      return instance;
    }

    const next: RecurrenceInstanceRecord = {
      ...instance,
      status: "canceled",
      updatedAt: new Date().toISOString(),
    };

    await db.recurrenceInstances.put(next);
    return next;
  });
}

export async function updateRecurrenceRuleForFutureCycles(
  recurrenceRuleId: string,
  input: RecurrenceRuleUpdateInput,
  ownerScope = getActiveOwnerScope(),
  effectiveFromMonthRef = toEffectiveMonthRef(),
) {
  assertLocalStorageAvailable();
  await ensureCivilDateNormalization(ownerScope);
  const db = getDexieDb();
  const current = await db.recurrenceRules.get(recurrenceRuleId);
  if (!current || current.ownerScope !== ownerScope) {
    throw new Error("Regra de recorrencia nao encontrada.");
  }

  const nextRecurrenceType = input.recurrenceType ?? current.recurrenceType;
  const nextRule: RecurrenceRuleRecord = {
    ...current,
    dayOfMonth: input.dayOfMonth ?? current.dayOfMonth,
    recurrenceType: nextRecurrenceType,
    unlimitedMode:
      nextRecurrenceType === "unlimited"
        ? (input.unlimitedMode ?? current.unlimitedMode ?? "automatic")
        : null,
    maxCycles: nextRecurrenceType === "limited" ? (input.maxCycles ?? current.maxCycles ?? 1) : null,
    templateName: input.template?.name ?? current.templateName,
    templateType: input.template?.type ?? current.templateType,
    templateCategoryId: input.template?.categoryId ?? current.templateCategoryId,
    templateCategoryName: input.template?.categoryName ?? current.templateCategoryName,
    templateAmount: input.template?.amount ?? current.templateAmount,
    templateNotes: input.template?.notes ?? current.templateNotes,
    isActive: input.isActive ?? current.isActive,
    updatedAt: new Date().toISOString(),
  };

  await db.recurrenceRules.put(nextRule);

  // Existing manual pending instances keep their snapshot unchanged by design.
  const generatedTransactions = await listRuleTransactions(ownerScope, recurrenceRuleId);
  const futureTransactions = generatedTransactions.filter((tx) => {
    const txMonthRef = toMonthRef(tx.transactionDate);
    return compareMonthRef(txMonthRef, effectiveFromMonthRef) >= 0;
  });

  for (const tx of futureTransactions) {
    const txMonthRef = toMonthRef(tx.transactionDate);
    const nextDueDate = resolveDueDate(txMonthRef, nextRule.dayOfMonth);
    await updateTransaction(
      tx.id,
      {
        name: nextRule.templateName,
        type: nextRule.templateType,
        categoryId: nextRule.templateCategoryId,
        categoryName: nextRule.templateCategoryName,
        amount: nextRule.templateAmount,
        notes: nextRule.templateNotes,
        transactionDate: nextDueDate,
      },
      ownerScope,
    );
  }

  await reconcileRecurrence(ownerScope);
  return nextRule;
}

export async function deactivateRecurrenceRule(
  recurrenceRuleId: string,
  ownerScope = getActiveOwnerScope(),
) {
  return updateRecurrenceRuleForFutureCycles(recurrenceRuleId, { isActive: false }, ownerScope);
}
