import { DashboardViewMode } from "@/lib/ui/dashboard-view-mode";

export function getNetBalanceLabelByMode(mode: DashboardViewMode) {
  return mode === "previsoes" ? "Saldo liquido previsto" : "Saldo liquido historico";
}
