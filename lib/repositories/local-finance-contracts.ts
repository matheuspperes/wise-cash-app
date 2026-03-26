export type TxType = "income" | "expense";

export type OwnerScope = string;

export type TransactionRecord = {
  id: string;
  ownerScope: OwnerScope;
  name: string;
  nameNormalized: string;
  type: TxType;
  categoryId: string;
  categoryName: string;
  categoryNameNormalized: string;
  amount: number;
  transactionDate: string;
  recurrenceRuleId: string | null;
  notes?: string;
  notesNormalized: string;
  source: "manual" | "recurrence_generated";
  status: "active" | "deleted";
  createdAt: string;
  updatedAt: string;
};

export type RecurrenceRuleRecord = {
  id: string;
  ownerScope: OwnerScope;
  dayOfMonth: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MetaRecord = {
  key: string;
  ownerScope: OwnerScope;
  value: string;
  updatedAt: string;
};

export type TransactionListParams = {
  from?: string;
  to?: string;
  type?: TxType;
  categoryId?: string;
};

export type TransactionSearchParams = TransactionListParams & {
  q?: string;
};
