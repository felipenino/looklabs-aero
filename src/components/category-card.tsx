"use client";

import Image from "next/image";

interface CategoryCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

export function CategoryCard({ name, image, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="relative aspect-square w-full overflow-hidden rounded-2xl transition-all duration-200 active:scale-95"
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 33vw, 250px"
      />
    </button>
  );
}
