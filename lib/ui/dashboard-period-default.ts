const FALLBACK_MONTHS = 3;
const PERSISTED_KEYS = ["dashboard.summary.months", "dashboard-months", "months"] as const;

type StorageReader = Pick<Storage, "getItem">;

export function parsePersistedDashboardMonths(rawValue: string | null): number | null {
  if (!rawValue) {
    return null;
  }

  const parsedValue = Number.parseInt(rawValue, 10);
  if (Number.isNaN(parsedValue) || parsedValue <= 0) {
    return null;
  }

  return parsedValue;
}

export function readPersistedDashboardMonths(storage: StorageReader): number | null {
  for (const key of PERSISTED_KEYS) {
    const persistedValue = parsePersistedDashboardMonths(storage.getItem(key));
    if (persistedValue !== null) {
      return persistedValue;
    }
  }

  return null;
}

export function resolveDashboardInitialMonths(): number {
  if (typeof window === "undefined") {
    return FALLBACK_MONTHS;
  }

  // Keep persisted preference when present; otherwise default to 3 months.
  return readPersistedDashboardMonths(window.localStorage) ?? FALLBACK_MONTHS;
}
