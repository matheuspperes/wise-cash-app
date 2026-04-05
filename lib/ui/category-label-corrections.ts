import { normalizeTextForSearch } from "@/lib/repositories/text-normalization";

const CORRECTIONS: Record<string, string> = {
  bonus: "Bônus",
  salario: "Salário",
  educacao: "Educação",
  recreacao: "Recreação",
  saude: "Saúde",
  servicos: "Serviços",
  transferencias: "Transferências",
};

export function correctCategoryLabel(raw: string | null | undefined): string {
  const value = (raw ?? "").trim();
  if (!value) {
    return "Outros";
  }

  const key = normalizeTextForSearch(value);
  return CORRECTIONS[key] ?? value;
}

export function categoryMatchesFilter(categoryId: string, categoryName: string, filterValue: string): boolean {
  const filterKey = normalizeTextForSearch(filterValue);
  if (!filterKey) {
    return true;
  }

  return (
    normalizeTextForSearch(categoryId) === filterKey ||
    normalizeTextForSearch(categoryName) === filterKey
  );
}
