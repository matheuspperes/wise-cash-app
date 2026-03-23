export function normalizeAmount(value: number): number {
  const normalized = Math.round((value + Number.EPSILON) * 100) / 100;
  if (!Number.isFinite(normalized) || normalized <= 0) {
    throw new Error("Valor monetario invalido");
  }

  return normalized;
}
