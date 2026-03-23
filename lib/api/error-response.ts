import { NextResponse } from "next/server";

export function badRequest(message: string, details?: unknown) {
  return NextResponse.json({ error: message, details }, { status: 400 });
}

export function notFound(message = "Recurso nao encontrado") {
  return NextResponse.json({ error: message }, { status: 404 });
}

export function internalError(message = "Erro interno") {
  return NextResponse.json({ error: message }, { status: 500 });
}
