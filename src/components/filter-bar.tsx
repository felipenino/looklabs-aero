"use client";

import { useMemo } from "react";
import { FilterChip } from "@/components/filter-chip";
import { COLOR_FAMILIES, colorFamilyKey } from "@/lib/constants/colors";
import type { FilterState } from "@/lib/hooks/use-filters";
import type { Piece } from "@/types/database";

const PRECO_RANGES = [
  { key: "ate100", label: "até R$100", test: (v: number) => v <= 100 },
  { key: "100a200", label: "R$100–200", test: (v: number) => v > 100 && v <= 200 },
  { key: "200mais", label: "+R$200", test: (v: number) => v > 200 },
];

interface FilterBarProps {
  pieces: Piece[];
  filters: FilterState;
  onToggleCor: (cor: string) => void;
  onSetPrecoRange: (range: string | null) => void;
  onClear: () => void;
  activeCount: number;
}

export function FilterBar({
  pieces,
  filters,
  onToggleCor,
  onSetPrecoRange,
  onClear,
  activeCount,
}: FilterBarProps) {
  // Famílias de cor realmente presentes nesta categoria
  const colors = useMemo(() => {
    const present = new Set<string>();
    for (const p of pieces) {
      const k = colorFamilyKey(p.cor);
      if (k) present.add(k);
    }
    return COLOR_FAMILIES.filter((f) => present.has(f.key));
  }, [pieces]);

  // Faixas de preço com pelo menos uma peça nesta categoria
  const priceRanges = useMemo(() => {
    return PRECO_RANGES.filter((r) =>
      pieces.some((p) => p.preco_pdv != null && r.test(p.preco_pdv))
    );
  }, [pieces]);

  return (
    <div className="pt-3">
      <div className="flex items-center gap-1.5 overflow-x-auto px-6 pb-2 scrollbar-hide">
        {/* Cores reais da categoria */}
        {colors.map((color) => (
          <FilterChip
            key={`cor-${color.key}`}
            label=""
            selected={filters.cores.includes(color.key)}
            onToggle={() => onToggleCor(color.key)}
            colorIndicator={color.hex}
            colorOnly
          />
        ))}

        {colors.length > 0 && priceRanges.length > 0 && (
          <div className="mx-0.5 w-px shrink-0 self-stretch bg-border/60" />
        )}

        {/* Faixas de preço presentes */}
        {priceRanges.map((range) => (
          <FilterChip
            key={`preco-${range.key}`}
            label={range.label}
            selected={filters.precoRange === range.key}
            onToggle={() => onSetPrecoRange(range.key)}
          />
        ))}

        {activeCount > 0 && (
          <>
            <div className="mx-0.5 w-px shrink-0 self-stretch bg-border/60" />
            <button
              onClick={onClear}
              className="h-8 shrink-0 rounded-full px-3 text-xs font-medium text-red-accent active:scale-95"
            >
              Limpar ({activeCount})
            </button>
          </>
        )}
      </div>
    </div>
  );
}
