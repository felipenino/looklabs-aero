"use client";

import { useState } from "react";

interface FeedbackWidgetProps {
  onFeedback: (liked: boolean) => void;
}

export function FeedbackWidget({ onFeedback }: FeedbackWidgetProps) {
  const [submitted, setSubmitted] = useState<boolean | null>(null);

  const handleFeedback = (liked: boolean) => {
    if (submitted !== null) return; // Already submitted
    setSubmitted(liked);
    onFeedback(liked);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-base font-medium text-navy">
        {submitted !== null ? "Obrigado!" : "Gostou desse look?"}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => handleFeedback(true)}
          disabled={submitted !== null}
          className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-all duration-200 ${
            submitted === true
              ? "scale-110 bg-success text-white"
              : submitted === false
              ? "opacity-30 bg-muted"
              : "bg-card shadow-md active:scale-95"
          }`}
          aria-label="Gostei"
        >
          👍
        </button>
        <button
          onClick={() => handleFeedback(false)}
          disabled={submitted !== null}
          className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-all duration-200 ${
            submitted === false
              ? "scale-110 bg-destructive text-white"
              : submitted === true
              ? "opacity-30 bg-muted"
              : "bg-card shadow-md active:scale-95"
          }`}
          aria-label="Não gostei"
        >
          👎
        </button>
      </div>
    </div>
  );
}
