import { listTransactions } from "@/lib/repositories/transaction-repository";

type SearchParams = {
  q?: string;
  from?: string;
  to?: string;
  type?: "income" | "expense";
  categoryId?: string;
};

export function searchTransactions(params: SearchParams) {
  const base = listTransactions(params);
  if (!params.q) {
    return base;
  }

  const q = params.q.toLocaleLowerCase("pt-BR");
  return base.filter((tx) => {
    const notes = tx.notes?.toLocaleLowerCase("pt-BR") ?? "";
    return (
      tx.name.toLocaleLowerCase("pt-BR").includes(q) ||
      tx.categoryName.toLocaleLowerCase("pt-BR").includes(q) ||
      notes.includes(q)
    );
  });
}
