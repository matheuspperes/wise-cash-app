import { parseLocalDateLike, toCivilDate } from "@/lib/formatting/civil-date";

type TransactionWithDate = {
  transactionDate: string;
};

function normalizeCivilDate(value: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const parsed = parseLocalDateLike(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return toCivilDate(parsed);
}

export function migrateTransactionCivilDate<T extends TransactionWithDate>(record: T): T {
  return {
    ...record,
    transactionDate: normalizeCivilDate(record.transactionDate),
  };
}

export function migrateTransactionsCivilDates<T extends TransactionWithDate>(records: T[]) {
  return records.map(migrateTransactionCivilDate);
}

export function ensureCivilDateMigration<T extends TransactionWithDate>(records: T[] = []) {
  return migrateTransactionsCivilDates(records);
}

export function runCivilDateMigration<T extends TransactionWithDate>(records: T[] = []) {
  return ensureCivilDateMigration(records);
}

export async function ensureCivilDateNormalization(_ownerScope?: string): Promise<void> {
  return;
}

export default {};
