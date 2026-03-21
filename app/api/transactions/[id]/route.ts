import { badRequest, notFound } from "@/lib/api/error-response";
import { softDeleteTransaction } from "@/lib/repositories/transaction-repository";
import { patchTransaction } from "@/lib/services/transaction-service";
import { transactionSchema } from "@/lib/validation/transaction-schema";
import { NextRequest, NextResponse } from "next/server";

type Ctx = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const body = await req.json();
  const parsed = transactionSchema.partial().safeParse(body);
  if (!parsed.success) {
    return badRequest("Campos invalidos", parsed.error.flatten());
  }

  const updated = patchTransaction(id, parsed.data);
  if (!updated) {
    return notFound("Transacao nao encontrada");
  }

  return NextResponse.json({ transaction: updated });
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const deleted = softDeleteTransaction(id);
  if (!deleted) {
    return notFound("Transacao nao encontrada");
  }

  return new NextResponse(null, { status: 204 });
}
