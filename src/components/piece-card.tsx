"use client";

import Image from "next/image";

interface PieceCardProps {
  imageUrl: string;
  name?: string | null;
  onClick: () => void;
}

export function PieceCard({ imageUrl, name, onClick }: PieceCardProps) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-200 active:scale-95 active:shadow-md"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-muted">
        <Image
          src={imageUrl}
          alt={name || "Peça"}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 45vw, 200px"
        />
      </div>
    </button>
  );
}
