"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { TopNav } from "@/components/top-nav";
import { CategoryCard } from "@/components/category-card";
import { CATEGORIES } from "@/lib/constants/categories";
import { supabase } from "@/lib/supabase/client";

function CategoriasContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const personaId = searchParams.get("persona") || "";
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch which categories have pieces for this persona
  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase
        .from("pieces")
        .select("category_id")
        .eq("persona_id", personaId)
        .eq("is_active", true);

      if (data) {
        const ids = [...new Set(data.map((p) => p.category_id))];
        setAvailableCategories(ids);
      }
      setLoading(false);
    }

    if (personaId) fetchCategories();
  }, [personaId]);

  const handleSelect = useCallback(
    (categoryId: string) => {
      router.push(`/pecas?persona=${personaId}&categoria=${categoryId}`);
    },
    [router, personaId]
  );

  // Filter categories that have pieces, or show all if still loading or no pieces exist yet
  const filtered = loading || availableCategories.length === 0
    ? CATEGORIES
    : CATEGORIES.filter((c) => availableCategories.includes(c.id));

  return (
    <main className="flex min-h-screen flex-col pt-16">
      <TopNav currentStep={2} />

      <div className="px-6 pt-8 text-center">
        <h1 className="text-2xl font-bold text-navy">Escolha a Categoria</h1>
        <p className="mt-2 text-base text-charcoal">
          Que tipo de peça você procura?
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 px-6 py-8">
        {filtered.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            image={category.image}
            onClick={() => handleSelect(category.id)}
          />
        ))}
      </div>

      {!loading && filtered.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          Nenhuma categoria disponível para este perfil.
        </p>
      )}
    </main>
  );
}

export default function CategoriasPage() {
  return (
    <Suspense>
      <CategoriasContent />
    </Suspense>
  );
}
