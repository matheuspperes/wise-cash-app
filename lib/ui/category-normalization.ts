export function normalizeCategoryName(value: string): string {
  return value.trim().toLocaleLowerCase("pt-BR");
}

export function hasDuplicateNormalizedCategory(name: string, existingCategories: readonly string[]): boolean {
  const normalized = normalizeCategoryName(name);
  if (!normalized) {
    return false;
  }

  return existingCategories.some((category) => normalizeCategoryName(category) === normalized);
}
