export type TransactionType = "expense" | "income";

export const expenseCategoryPresets = [
  "Casa",
  "Carro",
  "Comida",
  "Educacao",
  "Mercado",
  "Outros",
  "Recreacao",
  "Roupa",
  "Saude",
  "Servicos",
  "Taxas",
  "Transferencias",
  "Transporte",
] as const;

export const incomeCategoryPresets = [
  "Bonus",
  "Investimento",
  "Outros",
  "Presente",
  "Salario",
  "Vale",
] as const;

export type PresetCategory = (typeof expenseCategoryPresets)[number] | (typeof incomeCategoryPresets)[number];

export const categoryPresetsByType: Record<TransactionType, readonly PresetCategory[]> = {
  expense: expenseCategoryPresets,
  income: incomeCategoryPresets,
};

export function getCategoryPresetsByType(type: TransactionType): readonly PresetCategory[] {
  return categoryPresetsByType[type];
}
