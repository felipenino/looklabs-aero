"use client";

import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
  colorIndicator?: string;
  colorOnly?: boolean;
}

export function FilterChip({
  label,
  selected,
  onToggle,
  colorIndicator,
  colorOnly,
}: FilterChipProps) {
  if (colorOnly && colorIndicator) {
    return (
      <button
        onClick={onToggle}
        className={cn(
          "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 active:scale-95",
          selected
            ? "border-primary ring-2 ring-primary ring-offset-1"
            : "border-border/50"
        )}
      >
        <span
          className="h-5 w-5 rounded-full border border-border/30"
          style={{ backgroundColor: colorIndicator }}
        />
      </button>
    );
  }

  return (
    <button
      onClick={onToggle}
      className={cn(
        "inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-xs font-medium transition-all duration-200 active:scale-95",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground"
      )}
    >
      {colorIndicator && (
        <span
          className="h-3 w-3 rounded-full border border-border/50"
          style={{ backgroundColor: colorIndicator }}
        />
      )}
      {label}
    </button>
  );
}
