"use client";

import { useMemo } from "react";
import { FilterChip } from "@/components/filter-chip";
import type { FilterState } from "@/lib/hooks/use-filters";
import type { Piece } from "@/types/database";

const PRECO_RANGES = [
  { key: "ate100", label: "até R$100" },
  { key: "100a200", label: "R$100–200" },
  { key: "200mais", label: "+R$200" },
];

// Fake color filters — only shown for camiseta masculino
const CAMISETA_MASC_CATEGORY_ID = "b2c3d4e5-0001-4000-8000-000000000001";
const FAKE_COLORS = [
  { key: "preto", hex: "#000000" },
  { key: "branco", hex: "#ffffff" },
  { key: "grafite", hex: "#2b2b2f" },
  { key: "bege", hex: "#d3cdbc" },
  { key: "azul-cinza", hex: "#8d9fb0" },
  { key: "caramelo", hex: "#b98452" },
  { key: "marinho", hex: "#1b2340" },
];

interface FilterBarProps {
  pieces: Piece[];
  filters: FilterState;
  onToggleCor: (cor: string) => void;
  onSetPrecoRange: (range: string | null) => void;
  onClear: () => void;
  activeCount: number;
  categoryId?: string;
  gender?: string;
}

export function FilterBar({
  pieces,
  filters,
  onToggleCor,
  onSetPrecoRange,
  onClear,
  activeCount,
  categoryId,
  gender,
}: FilterBarProps) {
  const showFakeColors = categoryId === CAMISETA_MASC_CATEGORY_ID && gender === "masculino";

  return (
    <div className="pt-3">
      {/* Filters + Clear */}
      <div className="flex items-center gap-1.5 overflow-x-auto px-6 pb-2 scrollbar-hide">
        {/* Fake color filters for camiseta masculino */}
        {showFakeColors && FAKE_COLORS.map((color) => (
          <FilterChip
            key={`cor-${color.key}`}
            label=""
            selected={filters.cores.includes(color.key)}
            onToggle={() => onToggleCor(color.key)}
            colorIndicator={color.hex}
            colorOnly
          />
        ))}

        {/* Separator */}
        {showFakeColors && (
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
