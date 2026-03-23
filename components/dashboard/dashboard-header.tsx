"use client";

import { uiText } from "@/lib/i18n/ui-text";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: uiText.transactions, href: "/transactions?view=history" },
];

type Props = {
  controls?: ReactNode;
};

export function DashboardHeader({ controls }: Props) {
  const pathname = usePathname();

  return (
    <header className="rounded-2xl border border-border bg-surface/80 px-5 py-4 shadow-card backdrop-blur">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-muted">{uiText.brand}</p>
            <h1 className="text-[1.9rem] font-bold leading-tight">{uiText.dashboard}</h1>
          </div>
          {controls ? <div className="flex w-full justify-end md:w-auto">{controls}</div> : null}
        </div>

        <nav aria-label="Navegacao principal" className="flex items-center gap-1 rounded-xl border border-border bg-surface-alt/60 p-1.5">
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
