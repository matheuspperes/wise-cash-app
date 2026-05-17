import Dexie, { type Table } from "dexie";

import { toLocalCivilDateString } from "@/lib/formatting/civil-date";
import { MetaRecord, RecurrenceInstanceRecord, RecurrenceRuleRecord, TransactionRecord } from "@/lib/repositories/local-finance-contracts";

class WiseCashDexieDatabase extends Dexie {
  transactions!: Table<TransactionRecord, string>;

  recurrenceRules!: Table<RecurrenceRuleRecord, string>;

  recurrenceInstances!: Table<RecurrenceInstanceRecord, string>;

  meta!: Table<MetaRecord, string>;

  constructor() {
    super("wise-cash-db");

    this.version(1).stores({
      transactions: "id,[ownerScope+status+transactionDate],[ownerScope+type+transactionDate],[ownerScope+categoryId+transactionDate],[ownerScope+status+updatedAt],[ownerScope+nameNormalized],[ownerScope+categoryNameNormalized]",
      recurrenceRules: "id,[ownerScope+isActive],[ownerScope+dayOfMonth]",
      meta: "key,[ownerScope+key]",
    });

    this.version(2)
      .stores({
        transactions: "id,[ownerScope+status+transactionDate],[ownerScope+type+transactionDate],[ownerScope+categoryId+transactionDate],[ownerScope+status+updatedAt],[ownerScope+nameNormalized],[ownerScope+categoryNameNormalized],[ownerScope+recurrenceRuleId+transactionDate]",
        recurrenceRules: "id,[ownerScope+isActive],[ownerScope+dayOfMonth],[ownerScope+recurrenceType+isActive],[ownerScope+unlimitedMode+isActive]",
        recurrenceInstances: "id,[ownerScope+status+monthRef],[ownerScope+recurrenceRuleId+monthRef],[recurrenceRuleId+monthRef]",
        meta: "key,[ownerScope+key]",
      })
      .upgrade(async (tx) => {
        await tx.table<RecurrenceRuleRecord>("recurrenceRules").toCollection().modify((rule) => {
          rule.recurrenceType = rule.recurrenceType ?? "unlimited";
          rule.unlimitedMode = rule.unlimitedMode ?? "automatic";
          rule.maxCycles = rule.maxCycles ?? null;
          rule.generatedCycles = rule.generatedCycles ?? 0;
          rule.lastProcessedMonthRef = rule.lastProcessedMonthRef ?? null;
          rule.projectionUntilMonthRef = rule.projectionUntilMonthRef ?? null;
          rule.templateName = rule.templateName ?? "Transacao recorrente";
          rule.templateType = rule.templateType ?? "expense";
          rule.templateCategoryId = rule.templateCategoryId ?? "Outros";
          rule.templateCategoryName = rule.templateCategoryName ?? "Outros";
          rule.templateAmount = rule.templateAmount ?? 0;
          rule.startDate = rule.startDate ?? toLocalCivilDateString();
          rule.updatedAt = new Date().toISOString();
        });
      });
  }
}

const globalDexie = globalThis as typeof globalThis & {
  __wiseCashDexie?: WiseCashDexieDatabase;
};

export function getDexieDb() {
  if (!globalDexie.__wiseCashDexie) {
    globalDexie.__wiseCashDexie = new WiseCashDexieDatabase();
  }

  return globalDexie.__wiseCashDexie;
}

export async function clearLocalFunctionalData() {
  const db = getDexieDb();
  await db.transaction("rw", [db.transactions, db.recurrenceRules, db.recurrenceInstances, db.meta], async () => {
    await db.transactions.clear();
    await db.recurrenceRules.clear();
    await db.recurrenceInstances.clear();
    await db.meta.clear();
  });
}
