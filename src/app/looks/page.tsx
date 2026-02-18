"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { TopNav } from "@/components/top-nav";
import { LookOverlay } from "@/components/look-overlay";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

interface LookWithPieces {
  id: string;
  name: string | null;
  pieces: { slot: number; imageUrl: string }[];
}

function LooksContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pieceId = searchParams.get("peca") || "";
  const personaId = searchParams.get("persona") || "";
  const categoryId = searchParams.get("categoria") || "";
  const [looks, setLooks] = useState<LookWithPieces[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchLooks() {
      // Get all looks that contain this piece
      const { data: lookPieceData } = await supabase
        .from("look_pieces")
        .select("look_id")
        .eq("piece_id", pieceId);

      if (!lookPieceData || lookPieceData.length === 0) {
        setLoading(false);
        return;
      }

      const lookIds = [...new Set(lookPieceData.map((lp) => lp.look_id))];

      // Get looks details + all their pieces
      const { data: looksData } = await supabase
        .from("looks")
        .select("id, name")
        .in("id", lookIds)
        .eq("is_active", true);

      if (!looksData) {
        setLoading(false);
        return;
      }

      // Get all pieces for these looks
      const { data: allPieces } = await supabase
        .from("look_pieces")
        .select("look_id, slot, piece:pieces(image_url, is_active)")
        .in("look_id", lookIds);

      const result: LookWithPieces[] = looksData.map((look) => {
        const lookPieces = (allPieces || [])
          .filter((lp) => lp.look_id === look.id && lp.piece)
          .filter((lp) => {
            const piece = lp.piece as unknown as { image_url: string; is_active: boolean };
            return piece.is_active;
          })
          .map((lp) => {
            const piece = lp.piece as unknown as { image_url: string; is_active: boolean };
            return {
              slot: lp.slot,
              imageUrl: piece.image_url,
            };
          });

        return { id: look.id, name: look.name, pieces: lookPieces };
      });

      // Filter out looks with inactive pieces (all pieces must be active)
      setLooks(result.filter((l) => l.pieces.length >= 3));
      setLoading(false);
    }

    if (pieceId) fetchLooks();
  }, [pieceId]);

  const displayed = showAll ? looks : looks.slice(0, 4);

  return (
    <main className="flex min-h-screen flex-col pt-16">
      <TopNav currentStep={4} />

      <div className="px-6 pt-8 text-center">
        <h1 className="text-2xl font-bold text-navy">Looks com essa Peça</h1>
        <p className="mt-2 text-base text-charcoal">
          Veja combinações completas
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 px-6 py-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] w-full rounded-2xl" />
          ))}
        </div>
      ) : looks.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
          <p className="text-lg text-muted-foreground">
            Ainda não temos combinações para essa peça
          </p>
          <Button variant="outline" onClick={() => router.back()}>
            Voltar
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 px-6 py-8">
            {displayed.map((look) => (
              <button
                key={look.id}
                onClick={() =>
                  router.push(
                    `/detalhe?look=${look.id}&persona=${personaId}&categoria=${categoryId}&peca=${pieceId}`
                  )
                }
                className="overflow-hidden rounded-2xl bg-card p-3 shadow-md transition-all duration-200 active:scale-95"
              >
                <LookOverlay pieces={look.pieces} size="sm" />
              </button>
            ))}
          </div>

          {looks.length > 4 && !showAll && (
            <div className="px-6 pb-8 text-center">
              <Button
                variant="ghost"
                onClick={() => setShowAll(true)}
                className="text-primary"
              >
                Ver mais looks ({looks.length - 4} restantes)
              </Button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default function LooksPage() {
  return (
    <Suspense>
      <LooksContent />
    </Suspense>
  );
}
