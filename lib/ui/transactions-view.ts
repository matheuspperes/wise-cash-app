export type TransactionsView = "history" | "new" | "recurrences";

export function parseTransactionsView(value: string | null | undefined): TransactionsView {
  if (!value) {
    return "history";
  }

  if (value === "new") {
    return "new";
  }

  if (value === "recurrences") {
    return "recurrences";
  }

  return "history";
}

export function shouldResetTemporaryLaunches(previousView: TransactionsView | null, nextView: TransactionsView): boolean {
  return previousView === "new" && nextView !== "new";
}
