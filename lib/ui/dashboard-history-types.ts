export type HistoricalTotalBalance = {
  periodStart: string;
  periodEnd: string;
  totalIncome: number;
  totalExpense: number;
  netTotal: number;
};

export type CurrentMonthExpenseRow = {
  date: string;
  description: string;
  category: string;
  amount: number;
};

export type MonthlyExpenseHistoryRow = {
  date: string;
  description: string;
  category: string;
  amount: number;
};

export type MonthlyExpenseHistoryGroup = {
  monthRef: string;
  monthLabel: string;
  isCollapsedByDefault: boolean;
  rows: MonthlyExpenseHistoryRow[];
};
