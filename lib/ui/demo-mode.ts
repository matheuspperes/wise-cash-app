export function parseDemoMode(value: string | null | undefined) {
  if (!value) {
    return false;
  }

  return value === "1" || value.toLowerCase() === "true";
}

export function withDemoMode(searchParams: URLSearchParams, enabled: boolean) {
  const next = new URLSearchParams(searchParams);
  next.set("demo", enabled ? "1" : "0");
  return next;
}
