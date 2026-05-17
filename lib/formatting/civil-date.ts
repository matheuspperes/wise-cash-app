function pad2(value: number) {
  return String(value).padStart(2, "0");
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
    const month = Number(ymd[2]) - 1;
    const day = Number(ymd[3]);
    return new Date(year, month, day);
  }

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return new Date(NaN);
  }

  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

export function toLocalCivilDateString(value?: string | Date) {
  const d = toLocalCivilDate(value);
  return buildCivilDateFromParts(d.getFullYear(), d.getMonth(), d.getDate());
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

export default {};
