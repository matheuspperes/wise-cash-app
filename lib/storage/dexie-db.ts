import Dexie, { type Table } from "dexie";

import { MetaRecord, RecurrenceRuleRecord, TransactionRecord } from "@/lib/repositories/local-finance-contracts";

class WiseCashDexieDatabase extends Dexie {
  transactions!: Table<TransactionRecord, string>;

  recurrenceRules!: Table<RecurrenceRuleRecord, string>;

  meta!: Table<MetaRecord, string>;

  constructor() {
    super("wise-cash-db");

    this.version(1).stores({
      transactions: "id,[ownerScope+status+transactionDate],[ownerScope+type+transactionDate],[ownerScope+categoryId+transactionDate],[ownerScope+status+updatedAt],[ownerScope+nameNormalized],[ownerScope+categoryNameNormalized]",
      recurrenceRules: "id,[ownerScope+isActive],[ownerScope+dayOfMonth]",
      meta: "key,[ownerScope+key]",
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
