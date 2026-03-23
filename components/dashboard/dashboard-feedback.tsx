import { Button } from "@/components/ui/button";
import { uiText } from "@/lib/i18n/ui-text";

type ErrorProps = {
  message: string;
  onRetry: () => void;
};

export function DashboardError({ message, onRetry }: ErrorProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <p className="text-base text-danger">{message}</p>
      <Button className="mt-4" onClick={onRetry} size="sm" variant="secondary">
        {uiText.retry}
      </Button>
    </div>
  );
}

export function DashboardEmpty() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 text-base text-muted shadow-card">
      {uiText.emptyDashboard}
    </div>
  );
}
