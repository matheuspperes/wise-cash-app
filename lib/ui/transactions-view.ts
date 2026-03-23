export type TransactionsView = "history" | "new";

export function parseTransactionsView(value: string | null | undefined): TransactionsView {
  if (!value) {
    return "history";
  }

  return value === "new" ? "new" : "history";
}
