export type DashboardViewMode = "historico" | "previsoes";

export const DASHBOARD_VIEW_MODE_DEFAULT: DashboardViewMode = "historico";

export function isDashboardViewMode(value: string): value is DashboardViewMode {
  return value === "historico" || value === "previsoes";
}
