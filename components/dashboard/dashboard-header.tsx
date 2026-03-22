"use client";

import { uiText } from "@/lib/i18n/ui-text";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  demoMode: boolean;
  onToggleDemo: () => void;
};

const navItems = [
  { label: uiText.transactions, href: "/transactions" },
];

export function DashboardHeader({ demoMode, onToggleDemo }: Props) {
  const pathname = usePathname();

  return (
    <header className="rounded-2xl border border-border bg-surface/80 px-5 py-4 shadow-card backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-muted">{uiText.brand}</p>
          <h1 className="text-[1.9rem] font-bold leading-tight">{uiText.dashboard}</h1>
        </div>

        <div className="flex items-center gap-3">
          <nav aria-label="Navegação principal" className="flex items-center gap-1 rounded-xl border border-border bg-surface-alt/60 p-1.5">
            {navItems.map((item) => (
              <Link
                className={cn(
                  "rounded-lg px-4 py-2 text-base transition",
                  pathname === item.href ? "bg-surface text-foreground shadow-card" : "text-muted hover:text-foreground",
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            aria-label={demoMode ? "Desativar modo demonstração" : "Ativar modo demonstração"}
            className={cn(
              "rounded-lg border border-border px-4 py-2 text-sm font-semibold transition",
              demoMode ? "bg-primary text-white" : "bg-surface-alt text-foreground hover:bg-surface",
            )}
            onClick={onToggleDemo}
            type="button"
          >
            {demoMode ? "Demo ON" : "Demo OFF"}
          </button>
        </div>
      </div>
    </header>
  );
}
