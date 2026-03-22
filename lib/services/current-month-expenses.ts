import { listTransactions } from "@/lib/repositories/transaction-repository";
import { CurrentMonthExpenseRow } from "@/lib/ui/dashboard-history-types";

function monthKeyFromDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function listCurrentMonthExpenseRows(referenceDate: Date = new Date()): CurrentMonthExpenseRow[] {
  const currentMonth = monthKeyFromDate(referenceDate);

  return listTransactions({ type: "expense" })
    .filter((tx) => tx.transactionDate.startsWith(currentMonth))
    .sort((a, b) => (a.transactionDate < b.transactionDate ? 1 : -1))
    .map((tx) => ({
      date: tx.transactionDate,
      description: tx.name,
      category: tx.categoryName,
      amount: tx.amount,
    }));
}
