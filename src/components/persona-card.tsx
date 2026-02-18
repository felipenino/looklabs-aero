"use client";

import Image from "next/image";

interface PersonaCardProps {
  name: string;
  gender: "masculino" | "feminino";
  image: string;
  isActive: boolean;
}

export function PersonaCard({
  name,
  gender,
  image,
  isActive,
}: PersonaCardProps) {
  const genderLabel = gender === "masculino" ? "Masculino" : "Feminino";

  return (
    <div
      className={`select-none transition-all duration-300 ${
        isActive ? "" : "opacity-80"
      }`}
      style={{ height: "60vh", aspectRatio: "3/4" }}
    >
      <div className="relative h-full w-full">
        <Image
          src={image}
          alt={`${genderLabel} ${name}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 70vw, 40vw"
          priority
        />
        {/* Gradient fade — bottom to top, cor do fundo */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(to top, var(--background) 0%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}
