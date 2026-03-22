import { listTransactions } from "@/lib/repositories/transaction-repository";
import { mapTransactionToCurrentMonthRow } from "@/lib/services/dashboard-history-mapper";
import { CurrentMonthTransactionRow } from "@/lib/ui/dashboard-history-types";

function monthKeyFromDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function listCurrentMonthTransactionRows(referenceDate: Date = new Date()): CurrentMonthTransactionRow[] {
  const currentMonth = monthKeyFromDate(referenceDate);

  return listTransactions()
    .filter((tx) => tx.transactionDate.startsWith(currentMonth))
    .sort((a, b) => (a.transactionDate < b.transactionDate ? 1 : -1))
    .map(mapTransactionToCurrentMonthRow);
}

// Legacy alias retained for compatibility with existing imports.
export const listCurrentMonthExpenseRows = listCurrentMonthTransactionRows;
