import { Suspense } from "react";

import TransactionsPageClient from "@/components/transactions/transactions-page-client";

export default function TransactionsPage() {
  return (
    <Suspense fallback={<main className="mx-auto flex max-w-[76.8rem] flex-col gap-5 p-5 text-sm text-muted">Carregando transações...</main>}>
      <TransactionsPageClient />
    </Suspense>
  );
}
