export type TxType = "income" | "expense";

export type RecurrenceType = "limited" | "unlimited";

export type RecurrenceUnlimitedMode = "automatic" | "manual";

export type RecurrenceInstanceStatus = "pending" | "confirmed" | "canceled";

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

export type RecurrenceInstanceRecord = {
  id: string;
  ownerScope: OwnerScope;
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
