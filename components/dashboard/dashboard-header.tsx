"use client";

import { uiText } from "@/lib/i18n/ui-text";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: uiText.transactions, href: "/transactions?view=history" },
];

export function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="rounded-2xl border border-border bg-surface/80 px-5 py-4 shadow-card backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-muted">{uiText.brand}</p>
          <h1 className="text-[1.9rem] font-bold leading-tight">{uiText.dashboard}</h1>
        </div>

        <nav aria-label="Navegação principal" className="flex items-center gap-1 rounded-xl border border-border bg-surface-alt/60 p-1.5">
          {navItems.map((item) => (
            <Link
              className={cn(
                "rounded-lg px-4 py-2 text-base transition",
                pathname === "/transactions" ? "bg-surface text-foreground shadow-card" : "text-muted hover:text-foreground",
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
