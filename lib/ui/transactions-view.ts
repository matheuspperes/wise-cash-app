export type TransactionsView = "history" | "new";

export function parseTransactionsView(value: string | null | undefined): TransactionsView {
  if (!value) {
    return "history";
  }

  return value === "new" ? "new" : "history";
}

export function shouldResetTemporaryLaunches(previousView: TransactionsView | null, nextView: TransactionsView): boolean {
  return previousView === "new" && nextView !== "new";
}
