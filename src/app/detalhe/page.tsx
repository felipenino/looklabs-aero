"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { TopNav } from "@/components/top-nav";
import { LookOverlay } from "@/components/look-overlay";
import { FeedbackWidget } from "@/components/feedback-widget";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase/client";

interface LookPieceDetail {
  slot: number;
  imageUrl: string;
  name: string | null;
  categoryName: string | null;
}

function DetalheContent() {
  const searchParams = useSearchParams();
  const lookId = searchParams.get("look") || "";
  const [pieces, setPieces] = useState<LookPieceDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLookDetail() {
      const { data } = await supabase
        .from("look_pieces")
        .select(
          "slot, piece:pieces(image_url, name, category:categories(name))"
        )
        .eq("look_id", lookId);

      if (data) {
        const mapped = data
          .filter((lp) => lp.piece && !Array.isArray(lp.piece))
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
        setPieces(mapped);
      }
      setLoading(false);
    }

    if (lookId) fetchLookDetail();
  }, [lookId]);

  const handleFeedback = async (liked: boolean) => {
    // In production, this would use the session hook
    await supabase.from("feedback").insert({
      session_id: "00000000-0000-0000-0000-000000000000", // placeholder
      look_id: lookId,
      liked,
    });
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col pt-16">
        <TopNav currentStep={5} />
        <div className="flex flex-1 flex-col items-center gap-6 px-6 py-8">
          <Skeleton className="aspect-[3/4] w-full max-w-md rounded-2xl" />
          <Skeleton className="h-20 w-full max-w-md rounded-xl" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col pt-16">
      <TopNav currentStep={5} />

      <div className="flex flex-1 flex-col items-center gap-6 px-6 py-8">
        {/* Look overlay — large */}
        <div className="w-full max-w-md">
          <LookOverlay
            pieces={pieces.map((p) => ({
              slot: p.slot,
              imageUrl: p.imageUrl,
            }))}
            size="lg"
          />
        </div>

        <Separator className="max-w-md" />

        {/* Individual pieces list */}
        <div className="w-full max-w-md">
          <h2 className="mb-4 text-lg font-semibold text-navy">
            Peças deste Look
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {pieces
              .sort((a, b) => a.slot - b.slot)
              .map((piece) => (
                <div
                  key={piece.slot}
                  className="flex flex-shrink-0 flex-col items-center gap-2"
                >
                  <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={piece.imageUrl}
                      alt={piece.name || `Peça ${piece.slot}`}
                      fill
                      className="object-contain p-1"
                      sizes="96px"
                    />
                  </div>
                  {piece.categoryName && (
                    <span className="text-xs font-medium text-muted-foreground">
                      {piece.categoryName}
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>

        <Separator className="max-w-md" />

        {/* Feedback */}
        <FeedbackWidget onFeedback={handleFeedback} />
      </div>
    </main>
  );
}

export default function DetalhePage() {
  return (
    <Suspense>
      <DetalheContent />
    </Suspense>
  );
}
