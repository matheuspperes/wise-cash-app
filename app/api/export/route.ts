import { badRequest } from "@/lib/api/error-response";
import { searchTransactions } from "@/lib/repositories/transaction-search";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const format = url.searchParams.get("format");
  if (!format || !["csv", "json"].includes(format)) {
    return badRequest("Formato de exportacao invalido");
  }

  const items = await searchTransactions({
    from: url.searchParams.get("from") ?? undefined,
    to: url.searchParams.get("to") ?? undefined,
  });

  if (format === "json") {
    return NextResponse.json(items, {
      headers: {
        "content-disposition": "attachment; filename=transacoes.json",
      },
    });
  }

  const header = [
    "Nome",
    "Tipo",
    "Categoria",
    "Valor",
    "Data",
    "Observacoes",
    "Recorrencia Ativa",
    "Dia da Recorrencia",
    "Tipo da Recorrencia",
    "Quantidade de Meses",
    "Modo da Recorrencia",
  ].join(",");

  const rows = items.map((item) => {
    const tipo = item.type === "income" ? "Receita" : "Despesa";
    const row = [
      item.name,
      tipo,
      item.categoryName,
      Number(item.amount).toFixed(2),
      item.transactionDate,
      item.notes ?? "",
      "Nao",
      "",
      "",
      "",
      "",
    ];

    return row.map((v) => `\"${String(v).replace(/\"/g, "\"\"")}\"`).join(",");
  });
  const csv = [header, ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": "attachment; filename=transacoes.csv",
    },
  });
}
