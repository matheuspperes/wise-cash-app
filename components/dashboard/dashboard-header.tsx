"use client";

import { uiText } from "@/lib/i18n/ui-text";
import { ReactNode } from "react";

type Props = {
  controls?: ReactNode;
};

export function DashboardHeader({ controls }: Props) {
  return (
    <header className="rounded-2xl border border-border bg-surface/80 px-5 py-4 shadow-card backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-muted">{uiText.brand}</p>
          <h1 className="text-[1.9rem] font-bold leading-tight">{uiText.dashboard}</h1>
        </div>
        {controls ? <div className="flex w-full justify-end md:w-auto">{controls}</div> : null}
      </div>
    </header>
  );
}
