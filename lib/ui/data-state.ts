export type QueryState = {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  hasData: boolean;
};

export type VisualDataState = "loading" | "fetching" | "error" | "empty" | "ready";

export function getVisualDataState(state: QueryState): VisualDataState {
  if (state.isLoading) return "loading";
  if (state.isError) return "error";
  if (!state.hasData) return "empty";
  if (state.isFetching) return "fetching";
  return "ready";
}
