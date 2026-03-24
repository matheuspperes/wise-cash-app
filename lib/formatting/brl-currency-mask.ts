const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function extractDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatBrlFromDigits(digits: string): string {
  const normalizedDigits = digits.replace(/^0+(?=\d)/, "") || "0";
  const cents = Number.parseInt(normalizedDigits, 10);
  if (!Number.isFinite(cents) || cents <= 0) {
    return "";
  }

  return formatter.format(cents / 100);
}

export function parseBrlDisplayToAmount(displayValue: string): number {
  const digits = extractDigits(displayValue);
  if (!digits) {
    return 0;
  }

  return Number.parseInt(digits, 10) / 100;
}
