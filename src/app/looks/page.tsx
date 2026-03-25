"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { FocusRail, type FocusRailHandle } from "@/components/focus-rail";
import { LookOverlay } from "@/components/look-overlay";
import { FeedbackWidget } from "@/components/feedback-widget";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { getMockLooksForPiece } from "@/lib/mock-data";
import type { LookDetailFull } from "@/types/database";

function LooksCarouselContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pieceId = searchParams.get("peca") || "";
  const [looks, setLooks] = useState<LookDetailFull[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const railRef = useRef<FocusRailHandle | undefined>(undefined);

  useEffect(() => {
    async function fetchLooksWithDetails() {
      const { data: lookPieceData } = await supabase
        .from("look_pieces")
        .select("look_id")
        .eq("piece_id", pieceId);

      if (!lookPieceData || lookPieceData.length === 0) {
        setLooks(getMockLooksForPiece(pieceId));
        setLoading(false);
        return;
      }

      const lookIds = [...new Set(lookPieceData.map((lp) => lp.look_id))];

      const { data: looksData } = await supabase
        .from("looks")
        .select("id, name")
        .in("id", lookIds)
        .eq("is_active", true);

      if (!looksData || looksData.length === 0) {
        setLooks(getMockLooksForPiece(pieceId));
        setLoading(false);
        return;
      }

      const { data: allPieces } = await supabase
        .from("look_pieces")
        .select(
          "look_id, slot, piece:pieces(image_url, name, is_active, category:categories(name))"
        )
        .in("look_id", lookIds);

      const result: LookDetailFull[] = looksData.map((look) => {
        const lookPieces = (allPieces || [])
          .filter((lp) => lp.look_id === look.id && lp.piece)
          .filter((lp) => {
            const piece = lp.piece as unknown as { is_active: boolean };
            return piece.is_active;
          })
          .map((lp) => {
            const piece = lp.piece as unknown as {
              image_url: string;
              name: string | null;
              category: { name: string } | null;
            };
            return {
              slot: lp.slot,
              imageUrl: piece.image_url,
              name: piece.name,
              categoryName: piece.category?.name || null,
            };
          });

        return { id: look.id, name: look.name, pieces: lookPieces };
      });

      const validLooks = result.filter((l) => l.pieces.length >= 3);
      if (validLooks.length > 0) {
        setLooks(validLooks);
      } else {
        setLooks(getMockLooksForPiece(pieceId));
      }
      setLoading(false);
    }

    if (pieceId) fetchLooksWithDetails();
  }, [pieceId]);

  const handleFeedback = useCallback(
    async (liked: boolean) => {
      const lookId = looks[activeIndex]?.id;
      if (!lookId) return;

      await supabase.from("feedback").insert({
        session_id: "00000000-0000-0000-0000-000000000000",
        look_id: lookId,
        liked,
      });

      // Auto-advance to next look after 600ms
      if (activeIndex < looks.length - 1) {
        setTimeout(() => {
          railRef.current?.goTo(activeIndex + 1);
        }, 600);
      }
    },
    [looks, activeIndex]
  );

  // Capture goTo from FocusRail via onActiveIndexChange
  const handleActiveIndexChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const activeLook = looks[activeIndex];

  if (loading) {
    return (
      <main className="flex h-screen flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center justify-end px-6">
          <span className="text-lg font-bold tracking-tight text-navy">aéropostale</span>
        </header>
        <div className="flex flex-1 flex-col items-center gap-6 px-6 py-8">
          <Skeleton className="aspect-[3/4] w-64 rounded-2xl" />
          <Skeleton className="h-20 w-full max-w-md rounded-xl" />
        </div>
      </main>
    );
  }

  if (looks.length === 0) {
    return (
      <main className="flex h-screen flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center justify-between px-6">
          <button
            onClick={() => router.back()}
            className="flex h-11 items-center gap-1 rounded-lg px-2 text-sm font-medium text-charcoal active:bg-muted"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Voltar
          </button>
          <span className="text-lg font-bold tracking-tight text-navy">aéropostale</span>
        </header>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
          <p className="text-lg text-muted-foreground">
            Não foi possível montar look dessa peça
          </p>
          <Button variant="outline" onClick={() => router.back()}>
            Voltar
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-screen flex-col overflow-hidden">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between px-6">
        <button
          onClick={() => router.back()}
          className="flex h-11 items-center gap-1 rounded-lg px-2 text-sm font-medium text-charcoal active:bg-muted"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Voltar
        </button>
        <span className="text-lg font-bold tracking-tight text-navy">aéropostale</span>
      </header>

      {/* Title */}
      <div className="shrink-0 px-6 pt-1 text-center">
        <h1 className="text-base font-semibold text-navy">
          Escolha o look que mais combina com você
        </h1>
        <p className="mt-0.5 text-xs text-muted-foreground/70">
          {looks.length} {looks.length === 1 ? "look encontrado" : "looks encontrados"}
        </p>
      </div>

      {/* Carousel — responsive height */}
      <div className="flex-1 min-h-0">
        <FocusRail
          items={looks}
          initialIndex={0}
          className="relative flex h-full w-full items-center justify-center overflow-hidden"
          onActiveIndexChange={handleActiveIndexChange}
          onSelect={() => {}}
          actionRef={railRef}
          itemSpacing={620}
          renderItem={(look, _index, _isActive) => (
            <div
              className="flex h-full items-center justify-center transition-all duration-500"
              style={{ width: "min(600px, 85vw)" }}
            >
              <LookOverlay pieces={look.pieces} />
            </div>
          )}
        />
      </div>

      {/* Feedback */}
      {activeLook && (
        <div className="shrink-0 px-6 pb-6 pt-1">
          <FeedbackWidget key={activeLook.id} onFeedback={handleFeedback} />
        </div>
      )}
    </main>
  );
}

export default function LooksPage() {
  return (
    <Suspense>
      <LooksCarouselContent />
    </Suspense>
  );
}
