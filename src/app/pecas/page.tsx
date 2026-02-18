"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { TopNav } from "@/components/top-nav";
import { PieceCard } from "@/components/piece-card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase/client";
import type { Piece } from "@/types/database";

function PecasContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const personaId = searchParams.get("persona") || "";
  const categoryId = searchParams.get("categoria") || "";
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPieces() {
      const { data } = await supabase
        .from("pieces")
        .select("*")
        .eq("persona_id", personaId)
        .eq("category_id", categoryId)
        .eq("is_active", true);

      if (data) setPieces(data);
      setLoading(false);
    }

    if (personaId && categoryId) fetchPieces();
  }, [personaId, categoryId]);

  const handleSelect = useCallback(
    (pieceId: string) => {
      router.push(`/looks?peca=${pieceId}&persona=${personaId}&categoria=${categoryId}`);
    },
    [router, personaId, categoryId]
  );

  return (
    <main className="flex min-h-screen flex-col pt-16">
      <TopNav currentStep={3} />

      <div className="px-6 pt-8 text-center">
        <h1 className="text-2xl font-bold text-navy">Escolha a Peça</h1>
        <p className="mt-2 text-base text-charcoal">
          Toque em uma peça para ver looks completos
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 px-6 py-8 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 px-6 py-8 md:grid-cols-3">
          {pieces.map((piece) => (
            <PieceCard
              key={piece.id}
              imageUrl={piece.image_url}
              onClick={() => handleSelect(piece.id)}
            />
          ))}
        </div>
      )}

      {!loading && pieces.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          Nenhuma peça disponível nesta categoria.
        </p>
      )}
    </main>
  );
}

export default function PecasPage() {
  return (
    <Suspense>
      <PecasContent />
    </Suspense>
  );
}
