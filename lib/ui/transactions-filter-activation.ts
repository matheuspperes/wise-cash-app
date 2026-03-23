export type TransactionsFilterState = {
  type?: "income" | "expense";
  categoryId?: string;
  from?: string;
  to?: string;
};

export function hasActiveFilterCriteria(filters: TransactionsFilterState, query: string): boolean {
  return Boolean(filters.type || filters.categoryId || filters.from || filters.to || query.trim());
}

export function hasFilterStateChanged(previous: TransactionsFilterState, next: TransactionsFilterState): boolean {
  return (
    previous.type !== next.type
    || previous.categoryId !== next.categoryId
    || previous.from !== next.from
    || previous.to !== next.to
  );
}
