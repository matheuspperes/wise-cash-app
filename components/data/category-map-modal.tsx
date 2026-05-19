"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  unknownCategories: string[];
  knownCategories: string[];
  onApply: (mapping: Record<string, string>) => void;
};

export function CategoryMapModal({ open, onClose, unknownCategories, knownCategories, onApply }: Props) {
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const dataListId = useMemo(() => `known-categories-${Math.random().toString(36).slice(2)}`, []);

  useEffect(() => {
    if (open) {
      const initial: Record<string, string> = {};
      unknownCategories.forEach((cat) => {
        initial[cat] = "";
      });
      setMapping(initial);
    }
  }, [open, unknownCategories]);

  if (!open) {
    return null;
  }

  const handleApply = () => {
    const cleaned: Record<string, string> = {};
    Object.entries(mapping).forEach(([key, value]) => {
      const trimmed = value.trim();
      if (trimmed) {
        cleaned[key] = trimmed;
      }
    });
    onApply(cleaned);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-4 shadow-card">
        <h4 className="text-base font-semibold">Mapear categorias</h4>
        <p className="text-sm text-muted-foreground">
          Para continuar, mapeie as categorias desconhecidas para uma existente ou informe uma nova.
        </p>

        <datalist id={dataListId}>
          {knownCategories.map((cat) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>

        <div className="mt-4 space-y-3">
          {unknownCategories.map((category) => (
            <div key={category} className="space-y-1">
              <label className="text-xs text-muted-foreground">{category}</label>
              <Input
                list={dataListId}
                placeholder="Mapear para..."
                value={mapping[category] ?? ""}
                onChange={(e) => setMapping((current) => ({ ...current, [category]: e.target.value }))}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleApply}>Aplicar mapeamento</Button>
        </div>
      </div>
    </div>
  );
}
