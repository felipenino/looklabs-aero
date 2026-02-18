"use client";

import Image from "next/image";

interface PieceCardProps {
  imageUrl: string;
  onClick: () => void;
}

export function PieceCard({ imageUrl, onClick }: PieceCardProps) {
  return (
    <button
      onClick={onClick}
      className="group overflow-hidden rounded-2xl bg-card p-3 shadow-md transition-all duration-200 active:scale-95 active:shadow-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={imageUrl}
          alt="Peça"
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 45vw, 200px"
        />
      </div>
    </button>
  );
}
