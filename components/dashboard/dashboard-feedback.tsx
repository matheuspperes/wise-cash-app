import { Button } from "@/components/ui/button";
import { uiText } from "@/lib/i18n/ui-text";

type ErrorProps = {
  message: string;
  onRetry: () => void;
};

export function DashboardError({ message, onRetry }: ErrorProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
      <p className="text-sm text-danger">{message}</p>
      <Button className="mt-3" onClick={onRetry} size="sm" variant="secondary">
        Tentar novamente
      </Button>
    </div>
  );
}

type EmptyProps = {
  demoMode?: boolean;
};

export function DashboardEmpty({ demoMode = false }: EmptyProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 text-sm text-muted shadow-card">
      {demoMode
        ? "Modo demonstracao ativo: dados demo e reais nao geraram historico para o periodo selecionado."
        : uiText.emptyDashboard}
    </div>
  );
}
