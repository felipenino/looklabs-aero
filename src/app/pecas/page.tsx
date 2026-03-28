"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { GenderToggle } from "@/components/gender-toggle";
import { CategoryCircle } from "@/components/category-circle";
import { PieceCard } from "@/components/piece-card";
import { FilterBar } from "@/components/filter-bar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { useFilters } from "@/lib/hooks/use-filters";
import { getMockPieces } from "@/lib/mock-data";
import { PERSONAS } from "@/lib/constants/personas";
import { CATEGORIES } from "@/lib/constants/categories";
import type { Piece } from "@/types/database";

function PecasContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const personaId = searchParams.get("persona") || "";
  const categoryId = searchParams.get("categoria") || "";

  const gender = useMemo(() => {
    const persona = PERSONAS.find((p) => p.id === personaId);
    return persona?.gender ?? "feminino";
  }, [personaId]);

  const [pieces, setPieces] = useState<Piece[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    filters,
    toggleCor,
    setPrecoRange,
    clearFilters,
    activeCount,
    hasActiveFilters,
  } = useFilters();

  useEffect(() => {
    async function fetchPieces() {
      setLoading(true);
      const { data } = await supabase
        .from("pieces")
        .select("*")
        .eq("persona_id", personaId)
        .eq("category_id", categoryId)
        .eq("is_active", true);

      if (data && data.length > 0) {
        setPieces(data);
      } else {
        setPieces(getMockPieces(personaId, categoryId));
      }
      setLoading(false);
    }

    if (personaId && categoryId) fetchPieces();
  }, [personaId, categoryId]);

  const filteredPieces = useMemo(() => {
    let result = pieces;
    if (filters.cores.length > 0) {
      result = result.filter((p) => p.cor && filters.cores.includes(p.cor));
    }
    if (filters.precoRange) {
      result = result.filter((p) => {
        if (!p.preco_pdv) return false;
        switch (filters.precoRange) {
          case "ate100": return p.preco_pdv <= 100;
          case "100a200": return p.preco_pdv > 100 && p.preco_pdv <= 200;
          case "200mais": return p.preco_pdv > 200;
          default: return true;
        }
      });
    }
    return result;
  }, [pieces, filters]);

  const genderCategories = useMemo(
    () => CATEGORIES.filter((cat) => cat.genders.includes(gender)),
    [gender]
  );

  const handleGenderChange = useCallback(
    (newGender: "feminino" | "masculino") => {
      const persona = PERSONAS.find((p) => p.gender === newGender);
      if (!persona) return;
      // If current category exists in new gender, keep it; otherwise pick first
      const catExistsInNewGender = CATEGORIES.find(
        (c) => c.id === categoryId && c.genders.includes(newGender)
      );
      const targetCategory = catExistsInNewGender?.id
        ?? CATEGORIES.find((c) => c.genders.includes(newGender))?.id
        ?? categoryId;
      router.replace(`/pecas?persona=${persona.id}&categoria=${targetCategory}`);
    },
    [router, categoryId]
  );

  const handleCategoryChange = useCallback(
    (newCategoryId: string) => {
      router.replace(`/pecas?persona=${personaId}&categoria=${newCategoryId}`);
    },
    [router, personaId]
  );

  const handleSelectPiece = useCallback(
    (pieceId: string) => {
      router.push(`/looks?peca=${pieceId}&persona=${personaId}&categoria=${categoryId}`);
    },
    [router, personaId, categoryId]
  );

  return (
    <main className="flex h-screen flex-col overflow-hidden">
      {/* Header: GenderToggle + Logo */}
      <header className="flex shrink-0 items-center justify-between bg-background/80 px-6 pt-6 pb-3 backdrop-blur-sm">
        <GenderToggle value={gender} onChange={handleGenderChange} size="sm" />
        <span className="text-2xl font-bold tracking-tight text-navy">aéropostale</span>
      </header>

      {/* Category Scroll */}
      <div className="shrink-0 border-b border-border/40">
        <div className="flex gap-3 overflow-x-auto px-6 py-4 scrollbar-hide">
          {genderCategories.map((cat) => (
            <CategoryCircle
              key={cat.id}
              name={cat.name}
              image={cat.image[gender] ?? ""}
              size="sm"
              isActive={cat.id === categoryId}
              onClick={() => handleCategoryChange(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {loading ? (
          <div className="grid grid-cols-2 gap-4 px-6 py-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <>
            {pieces.length > 0 && (
              <FilterBar
                pieces={pieces}
                filters={filters}
                onToggleCor={toggleCor}
                onSetPrecoRange={setPrecoRange}
                onClear={clearFilters}
                activeCount={activeCount}
                categoryId={categoryId}
                gender={gender}
              />
            )}

            {filteredPieces.length > 0 ? (
              <div className="grid grid-cols-3 gap-3 px-6 py-4 pb-8">
                {filteredPieces.map((piece, index) => (
                  <div
                    key={piece.id}
                    className="animate-in fade-in slide-in-from-bottom-1"
                    style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
                  >
                    <PieceCard
                      imageUrl={piece.image_url}
                      name={piece.name}
                      onClick={() => handleSelectPiece(piece.id)}
                    />
                  </div>
                ))}
              </div>
            ) : hasActiveFilters ? (
              <div className="flex flex-col items-center gap-4 px-6 py-16">
                <p className="text-lg text-muted-foreground">
                  Nenhuma peça encontrada com esses filtros
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 px-6 py-16">
                <p className="text-lg text-muted-foreground">
                  Nenhuma peça disponível nesta categoria
                </p>
                <p className="text-sm text-muted-foreground">
                  Tente outra categoria acima
                </p>
              </div>
            )}
          </>
        )}
      </div>
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
