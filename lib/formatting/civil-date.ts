function toTwoDigits(value: number) {
  return String(value).padStart(2, "0");
}

export function isValidDate(value: Date) {
  return !Number.isNaN(value.getTime());
}

function isSameDateParts(date: Date, year: number, monthIndex: number, day: number) {
  return date.getFullYear() === year && date.getMonth() === monthIndex && date.getDate() === day;
}

export function parseLocalDateLike(value: string | Date) {
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  const civilDateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (civilDateMatch) {
    const year = Number(civilDateMatch[1]);
    const month = Number(civilDateMatch[2]);
    const day = Number(civilDateMatch[3]);
    const date = new Date(year, month - 1, day);
    return isSameDateParts(date, year, month - 1, day) ? date : new Date(Number.NaN);
  }

  const monthRefMatch = value.match(/^(\d{4})-(\d{2})$/);
  if (monthRefMatch) {
    const year = Number(monthRefMatch[1]);
    const month = Number(monthRefMatch[2]);
    if (!Number.isInteger(year) || month < 1 || month > 12) {
      return new Date(Number.NaN);
    }

    return new Date(year, month - 1, 1);
  }

  return new Date(value);
}

export function toCivilDate(value: string | Date) {
  const date = parseLocalDateLike(value);
  if (!isValidDate(date)) {
    throw new Error("Data inválida para civil-date.");
  }

  return `${date.getFullYear()}-${toTwoDigits(date.getMonth() + 1)}-${toTwoDigits(date.getDate())}`;
}

export function toMonthRef(value: string | Date) {
  const date = parseLocalDateLike(value);
  if (!isValidDate(date)) {
    throw new Error("Data inválida para monthRef.");
  }

  return `${date.getFullYear()}-${toTwoDigits(date.getMonth() + 1)}`;
}

export function monthRefToDate(monthRef: string) {
  const match = monthRef.match(/^(\d{4})-(\d{2})$/);
  if (!match) {
    throw new Error("monthRef inválido.");
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  if (!Number.isInteger(year) || month < 1 || month > 12) {
    throw new Error("monthRef inválido.");
  }

  return new Date(year, month - 1, 1);
}

export function shiftMonthRef(monthRef: string, delta: number) {
  const date = monthRefToDate(monthRef);
  date.setMonth(date.getMonth() + delta);
  return toMonthRef(date);
}
