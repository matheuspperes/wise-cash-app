export type OwnershipContext = {
  mode: "single-session-v1" | "multi-user-future";
  ownerId?: string;
};

export function getOwnershipContext(): OwnershipContext {
  return { mode: "single-session-v1" };
}
