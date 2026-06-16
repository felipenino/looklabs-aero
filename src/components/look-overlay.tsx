"use client";

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

/* ─── Ordem visual na grade 2x2 ───
   topo:    slot 1 (base)      | slot 2 (camada)
   embaixo: slot 4 (baixo)     | slot 3 (calçado)        */
const GRID_ORDER = [1, 2, 4, 3];

const ANIMATION_DELAYS: Record<number, string> = {
  1: "0ms",
  2: "80ms",
  4: "160ms",
  3: "240ms",
};

/* ─── Component ─── */

export function LookOverlay({ pieces }: LookCompositionProps) {
  const bySlot = new Map(pieces.map((p) => [p.slot, p]));

  return (
    <div
      className="mx-auto grid w-full grid-cols-2 gap-3"
      style={{ aspectRatio: "3 / 4", maxHeight: "calc(100vh - 160px)" }}
    >
      {GRID_ORDER.map((slot) => {
        const piece = bySlot.get(slot);
        return (
          <div
            key={slot}
            className="flex items-center justify-center overflow-hidden rounded-2xl bg-muted/40"
          >
            {piece && (
              <img
                src={piece.imageUrl}
                alt={piece.name ?? `Peça slot ${slot}`}
                className="h-full w-full animate-[flatlay-enter_400ms_ease-out_both] object-contain p-2"
                style={{ animationDelay: ANIMATION_DELAYS[slot] ?? "0ms" }}
                draggable={false}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* Re-export for backwards compat if needed */
export { LookOverlay as LookComposition };
