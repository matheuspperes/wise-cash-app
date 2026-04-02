import { badRequest, internalError } from "@/lib/api/error-response";
import { searchTransactions } from "@/lib/repositories/transaction-search";
import { createTransactionFromInput } from "@/lib/services/transaction-service";
import { transactionSchema } from "@/lib/validation/transaction-schema";
import { NextRequest, NextResponse } from "next/server";

function normalizePayload(body: unknown) {
  if (!body || typeof body !== "object") {
    return body;
  }

  const payload = body as Record<string, unknown>;
  const observation = payload.observation;
  const notes = payload.notes;

  return {
    ...payload,
    notes: typeof notes === "string" ? notes : typeof observation === "string" ? observation : undefined,
  };
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const params = {
    from: url.searchParams.get("from") ?? undefined,
    to: url.searchParams.get("to") ?? undefined,
    type: (url.searchParams.get("type") as "income" | "expense" | null) ?? undefined,
    categoryId: url.searchParams.get("categoryId") ?? undefined,
    q: url.searchParams.get("q") ?? undefined,
  };

  const items = await searchTransactions(params);
  return NextResponse.json({ items, pagination: { page: 1, pageSize: items.length, total: items.length } });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = transactionSchema.safeParse(normalizePayload(body));
    if (!parsed.success) {
      return badRequest("Campos da transacao invalidos", parsed.error.flatten());
    }

    const transaction = await createTransactionFromInput(parsed.data);
    return NextResponse.json({ transaction }, { status: 201 });
  } catch {
    return internalError("Nao foi possivel salvar a transacao no momento.");
  }
}
