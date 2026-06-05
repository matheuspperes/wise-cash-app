function pad2(value: number) {
  return String(value).padStart(2, "0");
}

function isSameDateParts(date: Date, year: number, monthIndex: number, day: number) {
  return date.getFullYear() === year && date.getMonth() === monthIndex && date.getDate() === day;
}

export function isValidDate(value: Date) {
  return Number.isFinite(value.getTime());
}

export function buildCivilDateFromParts(year: number, monthIndex: number, day: number) {
  return `${year}-${pad2(monthIndex + 1)}-${pad2(day)}`;
}

export function buildCivilMonthRefFromParts(year: number, monthIndex: number) {
  return `${year}-${pad2(monthIndex + 1)}`;
}

export function toLocalCivilDate(value?: string | Date): Date {
  if (value === undefined) {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  if (value instanceof Date) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }

  const raw = value.trim();
  const ymd = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (ymd) {
    const year = Number(ymd[1]);
    const monthIndex = Number(ymd[2]) - 1;
    const day = Number(ymd[3]);
    const parsed = new Date(year, monthIndex, day);
    return isSameDateParts(parsed, year, monthIndex, day) ? parsed : new Date(NaN);
  }

  const ym = raw.match(/^(\d{4})-(\d{2})$/);
  if (ym) {
    const year = Number(ym[1]);
    const monthIndex = Number(ym[2]) - 1;
    const parsed = new Date(year, monthIndex, 1);
    return isSameDateParts(parsed, year, monthIndex, 1) ? parsed : new Date(NaN);
  }

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return new Date(NaN);
  }

  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

export function parseLocalDateLike(value: string | Date) {
  return toLocalCivilDate(value);
}

export function toLocalCivilDateString(value?: string | Date) {
  const d = toLocalCivilDate(value);
  return buildCivilDateFromParts(d.getFullYear(), d.getMonth(), d.getDate());
}

export function toCivilDate(value: string | Date) {
  const date = parseLocalDateLike(value);
  if (!isValidDate(date)) {
    throw new Error("Data inválida para civil-date.");
  }

  return buildCivilDateFromParts(date.getFullYear(), date.getMonth(), date.getDate());
}

export function toLocalCivilMonthRef(value?: string | Date) {
  if (value === undefined) {
    const now = new Date();
    return buildCivilMonthRefFromParts(now.getFullYear(), now.getMonth());
  }

  if (value instanceof Date) {
    return buildCivilMonthRefFromParts(value.getFullYear(), value.getMonth());
  }

  const raw = value.trim();
  const ym = raw.match(/^(\d{4})-(\d{2})$/);
  if (ym) {
    const year = Number(ym[1]);
    const month = Number(ym[2]);
    return buildCivilMonthRefFromParts(year, month - 1);
  }

  const ymd = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (ymd) {
    const year = Number(ymd[1]);
    const month = Number(ymd[2]) - 1;
    return buildCivilMonthRefFromParts(year, month);
  }

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return raw;
  }

  return buildCivilMonthRefFromParts(parsed.getFullYear(), parsed.getMonth());
}

export function toMonthRef(value: string | Date) {
  const date = parseLocalDateLike(value);
  if (!isValidDate(date)) {
    throw new Error("Data inválida para monthRef.");
  }

  return buildCivilMonthRefFromParts(date.getFullYear(), date.getMonth());
}

export function normalizeCivilDateString(value: string | Date) {
  if (value instanceof Date) {
    return toLocalCivilDateString(value);
  }

  const raw = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return raw;
  }

  return toLocalCivilDateString(raw);
}

export function monthRefToDate(monthRef: string) {
  const match = monthRef.match(/^(\d{4})-(\d{2})$/);
  if (!match) {
    throw new Error("monthRef inválido.");
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const date = new Date(year, month - 1, 1);

  if (!isSameDateParts(date, year, month - 1, 1)) {
    throw new Error("monthRef inválido.");
  }

  return date;
}

export function shiftMonthRef(monthRef: string, delta: number) {
  const date = monthRefToDate(monthRef);
  date.setMonth(date.getMonth() + delta);
  return toMonthRef(date);
}

const civilDateFormatting = {};

export default civilDateFormatting;
