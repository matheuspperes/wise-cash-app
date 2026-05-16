function toTwoDigits(value: number) {
  return String(value).padStart(2, "0");
}

export function isValidDate(value: Date) {
  return !Number.isNaN(value.getTime());
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
    return new Date(year, month - 1, day);
  }

  const monthRefMatch = value.match(/^(\d{4})-(\d{2})$/);
  if (monthRefMatch) {
    const year = Number(monthRefMatch[1]);
    const month = Number(monthRefMatch[2]);
    return new Date(year, month - 1, 1);
  }

  return new Date(value);
}

export function toCivilDate(value: string | Date) {
  const date = parseLocalDateLike(value);
  return `${date.getFullYear()}-${toTwoDigits(date.getMonth() + 1)}-${toTwoDigits(date.getDate())}`;
}

export function toMonthRef(value: string | Date) {
  const date = parseLocalDateLike(value);
  return `${date.getFullYear()}-${toTwoDigits(date.getMonth() + 1)}`;
}

export function monthRefToDate(monthRef: string) {
  const [year, month] = monthRef.split("-").map((item) => Number(item));
  return new Date(year, month - 1, 1);
}

export function shiftMonthRef(monthRef: string, delta: number) {
  const date = monthRefToDate(monthRef);
  date.setMonth(date.getMonth() + delta);
  return toMonthRef(date);
}
