export type HistoricalTotalBalance = {
  periodStart: string;
  periodEnd: string;
  totalIncome: number;
  totalExpense: number;
  netTotal: number;
};

export type HistoryTransactionType = "income" | "expense";

export type CurrentMonthTransactionRow = {
  date: string;
  description: string;
  category: string;
  type: "income" | "expense";
  value: number;
};

// Legacy alias retained for compatibility with existing component naming.
export type CurrentMonthExpenseRow = CurrentMonthTransactionRow;

export type MonthlyTransactionHistoryRow = {
  date: string;
  description: string;
  category: string;
  type: HistoryTransactionType;
  amount: number;
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
