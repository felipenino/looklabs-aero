"use client";

import Image from "next/image";

interface LookPiece {
  slot: number;
  imageUrl: string;
}

interface LookOverlayProps {
  pieces: LookPiece[];
  size?: "sm" | "lg";
}

// Template positions for 3, 4, and 5 piece layouts
// Values are percentages: [top, left, width, height, zIndex]
const TEMPLATES: Record<number, Record<number, [number, number, number, number, number]>> = {
  3: {
    1: [0, 5, 55, 50, 3],      // Top (camiseta)
    2: [35, 5, 55, 55, 2],     // Bottom (calça) — overlaps 15%
    3: [50, 60, 35, 40, 1],    // Footwear (right)
  },
  4: {
    1: [0, 5, 50, 48, 3],      // Top (camiseta)
    2: [33, 5, 50, 55, 2],     // Bottom (calça)
    3: [0, 52, 42, 48, 4],     // Layer (blazer) — top right
    4: [50, 60, 35, 40, 1],    // Footwear (right)
  },
  5: {
    1: [0, 5, 48, 45, 3],      // Top (camiseta)
    2: [0, 50, 42, 45, 4],     // Layer (blazer)
    3: [32, 5, 48, 50, 2],     // Bottom (calça)
    4: [32, 52, 38, 35, 1],    // Accessory (bolsa)
    5: [65, 55, 35, 30, 1],    // Footwear
  },
};

export function LookOverlay({ pieces, size = "sm" }: LookOverlayProps) {
  const count = pieces.length;
  const template = TEMPLATES[count] || TEMPLATES[3];
  const containerClass =
    size === "lg"
      ? "relative aspect-[3/4] w-full max-w-md"
      : "relative aspect-[3/4] w-full";

  return (
    <div className={`${containerClass} rounded-2xl bg-off-white`}>
      {pieces.map((piece) => {
        const pos = template[piece.slot];
        if (!pos) return null;
        const [top, left, width, height, zIndex] = pos;

        return (
          <div
            key={piece.slot}
            className="absolute"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${width}%`,
              height: `${height}%`,
              zIndex,
            }}
          >
            <Image
              src={piece.imageUrl}
              alt={`Peça slot ${piece.slot}`}
              fill
              className="object-contain drop-shadow-md"
              sizes={size === "lg" ? "400px" : "200px"}
            />
          </div>
        );
      })}
    </div>
  );
}
