import { TransactionInput } from "@/lib/validation/transaction-schema";

export function normalizeText(value: string | undefined) {
  return (value || '').trim();
}

export function mapTipo(value: string) {
  const v = normalizeText(value).toLowerCase();
  if (v === 'receita') return 'income';
  if (v === 'despesa') return 'expense';
  return null;
}

export function mapRecorrenciaAtiva(value: string) {
  const v = normalizeText(value).toLowerCase();
  if (v === 'sim') return true;
  if (v === 'nao' || v === 'não') return false;
  return null;
}

export function mapTipoRecorrencia(value: string) {
  const v = normalizeText(value).toLowerCase();
  if (v === 'limitada') return 'limited';
  if (v === 'ilimitada') return 'unlimited';
  return null;
}

export function mapModoRecorrencia(value: string) {
  const v = normalizeText(value).toLowerCase();
  if (v === 'automatica' || v === 'automática') return 'automatic';
  if (v === 'manual') return 'manual';
  return null;
}

export function parseValorToNumber(value: string) {
  const v = normalizeText(value);
  // Accept only dot decimal
  const num = Number(v);
  if (!Number.isFinite(num)) return null;
  if (num <= 0) return null;
  return num;
}

export function normalizeCsvToTransactionInput(row: Record<string, string>): TransactionInput | null {
  const tipo = mapTipo(row['Tipo']);
  if (!tipo) return null;

  const amount = parseValorToNumber(row['Valor']);
  if (amount === null) return null;

  const date = normalizeText(row['Data']);

  const recurrenceActive = mapRecorrenciaAtiva(row['Recorrencia Ativa'] || 'Nao') ?? false;

  const recurrence = recurrenceActive
    ? {
        enabled: true,
        dayOfMonth: row['Dia da Recorrencia'] ? Number(row['Dia da Recorrencia']) : undefined,
        recurrenceType: row['Tipo da Recorrencia'] ? mapTipoRecorrencia(row['Tipo da Recorrencia']) : undefined,
        maxCycles: row['Quantidade de Meses'] ? Number(row['Quantidade de Meses']) : undefined,
        unlimitedMode: row['Modo da Recorrencia'] ? mapModoRecorrencia(row['Modo da Recorrencia']) : undefined,
      }
    : { enabled: false };

  const notes = normalizeText(row['Observacoes'] || '');

  const input: TransactionInput = {
    name: normalizeText(row['Nome']),
    type: tipo as 'income' | 'expense',
    categoryId: normalizeText(row['Categoria'] || ''),
    amount: amount,
    transactionDate: date,
    notes: notes ? notes : undefined,
    recurrence,
  };

  return input;
}
