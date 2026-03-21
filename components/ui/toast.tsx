"use client";

import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import * as Toast from "@radix-ui/react-toast";
import { type ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";

type ToastPayload = {
  title: string;
  description?: string;
};

type ToastContextValue = {
  pushToast: (payload: ToastPayload) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside Toaster");
  return ctx;
}

export function Toaster({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<ToastPayload | null>(null);

  const pushToast = useCallback((next: ToastPayload) => {
    setPayload(next);
    setOpen(false);
    requestAnimationFrame(() => setOpen(true));
  }, []);

  const value = useMemo(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      <Toast.Provider swipeDirection="right" duration={3000}>
        {children}
        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className={cn(
            "rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] shadow-card",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
          )}
        >
          <Toast.Title className="font-semibold">{payload?.title}</Toast.Title>
          {payload?.description ? <Toast.Description className="text-[var(--muted)]">{payload.description}</Toast.Description> : null}
        </Toast.Root>
        <Toast.Viewport className="fixed right-4 top-4 z-50 flex w-80 max-w-[90vw] flex-col gap-2" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}

export const DialogRoot = Dialog.Root;
export const DialogTrigger = Dialog.Trigger;
export const DialogPortal = Dialog.Portal;

export function DialogContent({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <DialogPortal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60" />
      <Dialog.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-elevated",
          className,
        )}
      >
        {children}
      </Dialog.Content>
    </DialogPortal>
  );
}
