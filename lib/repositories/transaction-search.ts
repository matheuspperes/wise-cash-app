import { listTransactions } from "@/lib/repositories/transaction-repository";
import { TransactionSearchParams } from "@/lib/repositories/local-finance-contracts";
import { normalizeTextForSearch } from "@/lib/repositories/text-normalization";

export async function searchTransactions(params: TransactionSearchParams, ownerScope?: string) {
  const base = await listTransactions(params, ownerScope);
  if (!params.q) {
    return base;
  }

  const q = normalizeTextForSearch(params.q);
  return base.filter((tx) => {
    const notes = tx.notesNormalized;
    return (
      tx.nameNormalized.includes(q) ||
      tx.categoryNameNormalized.includes(q) ||
      notes.includes(q)
    );
  });
}
