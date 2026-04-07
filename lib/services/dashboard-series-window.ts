import { MonthlyPoint } from "@/lib/repositories/monthly-summary-repository";
import { DashboardViewMode } from "@/lib/ui/dashboard-view-mode";

function toMonthRef(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().slice(0, 7);
}

function monthRefToDate(monthRef: string) {
  const [year, month] = monthRef.split("-").map((item) => Number(item));
  return new Date(year, month - 1, 1);
}

function shiftMonthRef(monthRef: string, delta: number) {
  const date = monthRefToDate(monthRef);
  date.setMonth(date.getMonth() + delta);
  return toMonthRef(date);
}

export function selectSeriesWindowByMode(series: MonthlyPoint[], months: number, mode: DashboardViewMode, referenceDate = new Date()) {
  const safeMonths = Math.max(1, Math.floor(months));
  const currentMonthRef = toMonthRef(referenceDate);

  const from = mode === "historico" ? shiftMonthRef(currentMonthRef, -(safeMonths - 1)) : currentMonthRef;
  const to = mode === "historico" ? currentMonthRef : shiftMonthRef(currentMonthRef, safeMonths - 1);

  return series
    .filter((point) => point.monthRef >= from && point.monthRef <= to)
    .sort((left, right) => (left.monthRef > right.monthRef ? 1 : -1));
}
