export type HistoricalTotalBalance = {
  periodStart: string;
  periodEnd: string;
  totalIncome: number;
  totalExpense: number;
  netTotal: number;
};

export type SecondaryBalanceCardContext = {
  label: string;
  value: number;
};

export type HistoryTransactionType = "income" | "expense";

export type CurrentMonthTransactionRow = {
  date: string;
  description: string;
  category: string;
  type: "income" | "expense";
  value: number;
};

export type RecurrencePendingConfirmationRow = {
  id: string;
  recurrenceRuleId: string;
  monthRef: string;
  dueDate: string;
  name: string;
  type: "income" | "expense";
  categoryName: string;
  amount: number;
  notes?: string;
};

export type RecurrenceListRow = {
  id: string;
  name: string;
  categoryName: string;
  type: "income" | "expense";
  amount: number;
  dayOfMonth: number;
  nextScheduledDate: string;
  recurrenceType: "limited" | "unlimited";
  isActive: boolean;
  maxCycles: number | null;
  generatedCycles: number;
  monthsRemaining: number | null;
  statusLabel: string;
};

// Legacy alias retained for compatibility with existing component naming.
export type CurrentMonthExpenseRow = CurrentMonthTransactionRow;

export type MonthlyTransactionHistoryRow = {
  id: string;
  date: string;
  description: string;
  category: string;
  type: HistoryTransactionType;
  amount: number;
  notes?: string;
  source?: "manual" | "recurrence_generated";
  recurrenceRuleId?: string | null;
};

export type MonthlyTransactionHistoryGroup = {
  monthRef: string;
  monthLabel: string;
  isCollapsedByDefault: boolean;
  rows: MonthlyTransactionHistoryRow[];
};

// Legacy aliases retained for transitional compatibility with existing imports.
export type MonthlyExpenseHistoryRow = MonthlyTransactionHistoryRow;
export type MonthlyExpenseHistoryGroup = MonthlyTransactionHistoryGroup;
