"use client";

import { cn } from "@/lib/utils";

type Gender = "feminino" | "masculino";

interface GenderToggleProps {
  value: Gender;
  onChange: (gender: Gender) => void;
  size?: "lg" | "sm";
}

const OPTIONS: { value: Gender; label: string }[] = [
  { value: "feminino", label: "Feminino" },
  { value: "masculino", label: "Masculino" },
];

export function GenderToggle({
  value,
  onChange,
  size = "lg",
}: GenderToggleProps) {
  const isLg = size === "lg";

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-full bg-secondary p-1",
        isLg ? "h-14 gap-1" : "h-11 gap-0.5"
      )}
    >
      {OPTIONS.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative z-10 rounded-full font-semibold transition-colors duration-200 active:scale-95",
              isLg ? "h-12 px-8 text-base" : "h-9 px-6 text-sm",
              isActive
                ? "bg-navy text-white shadow-sm"
                : "text-muted-foreground"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
