export type TransactionType = "expense" | "income";

export const expenseCategoryPresets = [
  "Carro",
  "Casa",
  "Comida",
  "Educação",
  "Mercado",
  "Outros",
  "Recreação",
  "Roupa",
  "Saúde",
  "Serviços",
  "Taxas",
  "Transferências",
  "Transporte",
] as const;

export const incomeCategoryPresets = [
  "Bônus",
  "Investimento",
  "Outros",
  "Presente",
  "Salário",
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
