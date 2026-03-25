"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface CategoryCircleProps {
  name: string;
  image: string;
  isActive?: boolean;
  size?: "lg" | "sm";
  onClick: () => void;
}

export function CategoryCircle({
  name,
  image,
  isActive = false,
  size = "lg",
  onClick,
}: CategoryCircleProps) {
  const isLg = size === "lg";

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex shrink-0 flex-col items-center gap-2 transition-all duration-200 active:scale-95",
        isLg ? "w-full" : "w-auto"
      )}
      aria-label={name}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-full bg-muted transition-all duration-200",
          isLg ? "h-28 w-28" : "h-[108px] w-[108px]",
          isActive
            ? "ring-[3px] ring-red-accent ring-offset-2 ring-offset-background"
            : "ring-1 ring-border"
        )}
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes={isLg ? "112px" : "108px"}
        />
      </div>
      {/* Only show label on lg (home grid) */}
      {isLg && (
        <span className="text-sm font-medium leading-tight text-foreground">
          {name}
        </span>
      )}
    </button>
  );
}
