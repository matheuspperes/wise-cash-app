export type TxType = "income" | "expense";

export type RecurrenceType = "limited" | "unlimited";

export type RecurrenceUnlimitedMode = "automatic" | "manual";

export type RecurrenceInstanceStatus = "pending" | "confirmed" | "canceled";

export type Transaction = {
  id: string;
  name: string;
  type: TxType;
  categoryId: string;
  categoryName: string;
  amount: number;
  transactionDate: string;
  recurrenceRuleId: string | null;
  notes?: string;
  source: "manual" | "recurrence_generated";
  status: "active" | "deleted";
  createdAt: string;
  updatedAt: string;
};

export type RecurrenceRule = {
  id: string;
  ownerScope: string;
  dayOfMonth: number;
  recurrenceType: RecurrenceType;
  unlimitedMode: RecurrenceUnlimitedMode | null;
  maxCycles: number | null;
  generatedCycles: number;
  lastProcessedMonthRef: string | null;
  projectionUntilMonthRef: string | null;
  templateName: string;
  templateType: TxType;
  templateCategoryId: string;
  templateCategoryName: string;
  templateAmount: number;
  templateNotes?: string;
  startDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type RecurrenceInstance = {
  id: string;
  ownerScope: string;
  recurrenceRuleId: string;
  monthRef: string;
  status: RecurrenceInstanceStatus;
  dueDate: string;
  snapshotName: string;
  snapshotType: TxType;
  snapshotCategoryId: string;
  snapshotCategoryName: string;
  snapshotAmount: number;
  snapshotNotes?: string;
  transactionId: string | null;
  createdAt: string;
  updatedAt: string;
};

type Store = {
  transactions: Transaction[];
  recurrenceRules: RecurrenceRule[];
  recurrenceInstances: RecurrenceInstance[];
};

const seedStore = (): Store => ({
  transactions: [],
  recurrenceRules: [],
  recurrenceInstances: [],
});

const globalStore = globalThis as typeof globalThis & { __wiseCashStore?: Store };

export function getStore() {
  if (!globalStore.__wiseCashStore) {
    globalStore.__wiseCashStore = seedStore();
  }
  return globalStore.__wiseCashStore;
}
