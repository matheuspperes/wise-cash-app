"use client";

import { cn } from "@/lib/utils";
import { useEffect, useId, useRef, useState } from "react";

type Props = {
  label: string;
  lines: readonly string[];
  className?: string;
  size?: "default" | "compact";
  id?: string;
};

export function SimpleTooltip({ label, lines, className, size = "default", id }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const generatedTooltipId = useId();
  const tooltipId = id ?? generatedTooltipId;
  const tooltipPanelId = `${tooltipId}-panel`;

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      if (!rootRef.current) {
        return;
      }

      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocumentClick);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onDocumentClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className={cn("relative inline-flex", className)} ref={rootRef}>
      <span className="sr-only" id={tooltipId}>{lines.join(" ")}</span>
      <button
        aria-controls={tooltipPanelId}
        aria-expanded={open}
        aria-label={label}
        className={cn(
          "inline-flex items-center justify-center rounded-full border border-border bg-surface-alt font-semibold text-muted transition-colors hover:bg-surface",
          size === "compact" ? "h-4 w-4 text-[0.62rem]" : "h-5 w-5 text-[0.7rem]",
        )}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        ?
      </button>

      {open ? (
        <div
          className="absolute right-0 top-7 z-20 min-w-64 max-w-72 rounded-lg border border-border bg-surface p-3 text-xs text-foreground shadow-card"
          id={tooltipPanelId}
          role="tooltip"
        >
          {lines.map((line, index) => (
            <p className={index > 0 ? "mt-2" : undefined} key={`${tooltipId}-${index}`}>
              {line}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
