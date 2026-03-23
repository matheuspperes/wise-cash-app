export type TxType = "income" | "expense";

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
  dayOfMonth: number;
  isActive: boolean;
};

type Store = {
  transactions: Transaction[];
  recurrenceRules: RecurrenceRule[];
};

const seedStore = (): Store => ({
  transactions: [],
  recurrenceRules: [],
});

const globalStore = globalThis as typeof globalThis & { __wiseCashStore?: Store };

export function getStore() {
  if (!globalStore.__wiseCashStore) {
    globalStore.__wiseCashStore = seedStore();
  }
  return globalStore.__wiseCashStore;
}
