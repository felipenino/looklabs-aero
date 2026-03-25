"use client";

import { useMemo } from "react";
import { FilterChip } from "@/components/filter-chip";
import { COLOR_MAP } from "@/lib/constants/colors";
import type { FilterState } from "@/lib/hooks/use-filters";
import type { Piece } from "@/types/database";

const PRECO_RANGES = [
  { key: "ate100", label: "até R$100" },
  { key: "100a200", label: "R$100–200" },
  { key: "200mais", label: "+R$200" },
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
  const availableCores = useMemo(
    () => [...new Set(pieces.map((p) => p.cor).filter(Boolean))] as string[],
    [pieces]
  );

  return (
    <div className="pt-3">
      {/* Filters + Clear */}
      <div className="flex items-center gap-1.5 overflow-x-auto px-6 pb-2 scrollbar-hide">
        {/* Colors */}
        {availableCores.map((cor) => (
          <FilterChip
            key={`cor-${cor}`}
            label={cor}
            selected={filters.cores.includes(cor)}
            onToggle={() => onToggleCor(cor)}
            colorIndicator={COLOR_MAP[cor]}
          />
        ))}

        {/* Separator */}
        {availableCores.length > 0 && (
          <div className="mx-0.5 w-px shrink-0 self-stretch bg-border/60" />
        )}

        {/* Price ranges */}
        {PRECO_RANGES.map((range) => (
          <FilterChip
            key={`preco-${range.key}`}
            label={range.label}
            selected={filters.precoRange === range.key}
            onToggle={() => onSetPrecoRange(range.key)}
          />
        ))}

        {/* Clear button inline */}
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
