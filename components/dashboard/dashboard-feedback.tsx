import { Button } from "@/components/ui/button";

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

export function DashboardEmpty() {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 text-sm text-muted shadow-card">
      Ainda nao existem dados reais para montar o dashboard.
    </div>
  );
}
