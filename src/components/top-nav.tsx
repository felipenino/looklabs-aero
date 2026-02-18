"use client";

import { useRouter } from "next/navigation";

interface TopNavProps {
  currentStep: number;
  showBack?: boolean;
}

export function TopNav({
  currentStep,
  showBack = true,
}: TopNavProps) {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-card/80 px-6 backdrop-blur-sm">
      {/* Left — Back */}
      <div className="flex items-center">
        {showBack && currentStep > 1 ? (
          <button
            onClick={() => router.back()}
            className="flex h-11 items-center gap-1 rounded-lg px-3 text-sm font-medium text-charcoal active:bg-muted"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Voltar
          </button>
        ) : (
          <div className="w-11" /> /* spacer to keep logo aligned */
        )}
      </div>

      {/* Right — Logo */}
      <div className="flex items-center">
        <span className="text-lg font-bold tracking-tight text-navy">
          aéropostale
        </span>
      </div>
    </nav>
  );
}
