export type DemoTransactionItem = {
  id: string;
  type: "income" | "expense";
  description: string;
  category: string;
  amount: number;
  transactionDate: string;
  monthRef: "2026-02" | "2026-03";
  sourceOrMethod: string;
  observation: string;
};

const DEMO_DATASET: DemoTransactionItem[] = [
  {
    id: "demo-income-feb",
    type: "income",
    description: "Projeto Freelancer",
    category: "Renda Extra",
    amount: 1800,
    transactionDate: "2026-02-08",
    monthRef: "2026-02",
    sourceOrMethod: "PIX",
    observation: "Recebimento de projeto curto.",
  },
  {
    id: "demo-expense-feb",
    type: "expense",
    description: "Supermercado",
    category: "Alimentacao",
    amount: 620,
    transactionDate: "2026-02-16",
    monthRef: "2026-02",
    sourceOrMethod: "Cartao",
    observation: "Compra mensal de abastecimento.",
  },
  {
    id: "demo-income-mar",
    type: "income",
    description: "Bono de Performance",
    category: "Salario",
    amount: 950,
    transactionDate: "2026-03-05",
    monthRef: "2026-03",
    sourceOrMethod: "Transferencia",
    observation: "Pagamento adicional trimestral.",
  },
  {
    id: "demo-expense-mar",
    type: "expense",
    description: "Assinaturas Digitais",
    category: "Servicos",
    amount: 280,
    transactionDate: "2026-03-21",
    monthRef: "2026-03",
    sourceOrMethod: "Debito",
    observation: "Renovacao de ferramentas de trabalho.",
  },
];

export function listDemoTransactions() {
  return DEMO_DATASET.map((item) => ({ ...item }));
}
