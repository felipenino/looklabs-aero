"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FocusRail } from "@/components/focus-rail";
import { PersonaCard } from "@/components/persona-card";
import { PERSONAS } from "@/lib/constants/personas";

export default function Home() {
  const router = useRouter();

  const handleSelect = useCallback(
    (persona: (typeof PERSONAS)[number]) => {
      router.push(`/categorias?persona=${persona.id}`);
    },
    [router]
  );

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex h-16 items-center justify-end px-6">
        <span className="text-lg font-bold tracking-tight text-navy">
          aéropostale
        </span>
      </header>

      {/* Hero text */}
      <div className="px-6 pt-8 text-center">
        <h1 className="text-3xl font-bold text-navy">
          Monte seu Look
        </h1>
        <p className="mt-2 text-lg text-charcoal">
          Escolha seu estilo para começar
        </p>
      </div>

      {/* Focus Rail carousel */}
      <div className="flex flex-1 items-center py-8">
        <FocusRail
          items={PERSONAS}
          initialIndex={2}
          onSelect={handleSelect}
          renderItem={(persona, _index, isActive) => (
            <PersonaCard
              name={persona.name}
              gender={persona.gender}
              image={persona.image}
              isActive={isActive}
            />
          )}
        />
      </div>

      {/* Hint */}
      <p className="pb-8 text-center text-sm text-charcoal/60">
        Deslize para navegar • Toque para selecionar
      </p>
    </main>
  );
}
