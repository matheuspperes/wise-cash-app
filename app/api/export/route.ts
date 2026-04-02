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

  const header = "id,name,type,categoryName,amount,transactionDate,notes";
  const rows = items.map((item) =>
    [item.id, item.name, item.type, item.categoryName, item.amount, item.transactionDate, item.notes ?? ""]
      .map((v) => `\"${String(v).replace(/\"/g, "\"\"")}\"`)
      .join(","),
  );
  const csv = [header, ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": "attachment; filename=transacoes.csv",
    },
  });
}
