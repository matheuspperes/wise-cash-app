const ACTIVE_OWNER_SCOPE_KEY = "wise-cash-owner-scope";
const ANONYMOUS_SCOPE = "anonymous";

export function getAnonymousOwnerScope() {
  return ANONYMOUS_SCOPE;
}

export function getActiveOwnerScope() {
  if (typeof window === "undefined") {
    return ANONYMOUS_SCOPE;
  }

  const storedScope = window.localStorage.getItem(ACTIVE_OWNER_SCOPE_KEY)?.trim();
  return storedScope || ANONYMOUS_SCOPE;
}

export function setActiveOwnerScope(ownerScope: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ACTIVE_OWNER_SCOPE_KEY, ownerScope.trim() || ANONYMOUS_SCOPE);
}
