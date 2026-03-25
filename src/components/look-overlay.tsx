"use client";

import Image from "next/image";

/* ─── Types ─── */

interface LookPiece {
  slot: number;
  imageUrl: string;
  name?: string | null;
  categoryName?: string | null;
}

interface LookCompositionProps {
  pieces: LookPiece[];
}

/* ─── Slot positions (% of container) ─── */

const SLOT_POSITIONS = {
  1: {
    // Camiseta — canto superior esquerdo
    top: "6%",
    left: "5%",
    width: "52%",
    zIndex: 1,
  },
  2: {
    // Jaqueta/Moletom — superior direito, sobrepõe slot 1
    top: "0%",
    left: "30%",
    width: "58%",
    zIndex: 2,
  },
  3: {
    // Acessório/Calçado — centro direita, menor
    top: "48%",
    left: "52%",
    width: "32%",
    zIndex: 3,
  },
  4: {
    // Bermuda/Calça — inferior esquerda
    top: "45%",
    left: "10%",
    width: "50%",
    zIndex: 2,
  },
} as const;

/* ─── Animation delays (staggered entrance) ─── */

const ANIMATION_DELAYS: Record<number, string> = {
  1: "0ms",
  2: "100ms",
  3: "200ms",
  4: "300ms",
};

/* ─── Component ─── */

export function LookOverlay({ pieces }: LookCompositionProps) {
  return (
    <div
      className="relative mx-auto w-full overflow-hidden"
      style={{
        aspectRatio: "3 / 4",
        maxHeight: "calc(100vh - 160px)",
      }}
    >
      {pieces.map((piece) => {
        const pos = SLOT_POSITIONS[piece.slot as keyof typeof SLOT_POSITIONS];
        if (!pos) return null;

        return (
          <div
            key={piece.slot}
            className="absolute animate-[flatlay-enter_400ms_ease-out_both]"
            style={{
              top: pos.top,
              left: pos.left,
              width: pos.width,
              zIndex: pos.zIndex,
              animationDelay: ANIMATION_DELAYS[piece.slot] ?? "0ms",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={piece.imageUrl}
              alt={piece.name ?? `Peça slot ${piece.slot}`}
              className="h-auto w-full object-contain"
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
}

/* Re-export for backwards compat if needed */
export { LookOverlay as LookComposition };
