"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackWidgetProps {
  onFeedback: (liked: boolean) => void;
}

export function FeedbackWidget({ onFeedback }: FeedbackWidgetProps) {
  const [submitted, setSubmitted] = useState<boolean | null>(null);

  const handleFeedback = (liked: boolean) => {
    if (submitted !== null) return;
    setSubmitted(liked);
    onFeedback(liked);
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <p className="text-[11px] text-muted-foreground/70">
        {submitted !== null ? "Obrigado!" : "Gostou desse look?"}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => handleFeedback(true)}
          disabled={submitted !== null}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
            submitted === true
              ? "bg-navy text-white"
              : submitted === false
              ? "opacity-15"
              : "text-muted-foreground/50 hover:text-muted-foreground active:scale-90"
          )}
          aria-label="Gostei"
        >
          <ThumbsUp className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
        <button
          onClick={() => handleFeedback(false)}
          disabled={submitted !== null}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
            submitted === false
              ? "bg-navy text-white"
              : submitted === true
              ? "opacity-15"
              : "text-muted-foreground/50 hover:text-muted-foreground active:scale-90"
          )}
          aria-label="Não gostei"
        >
          <ThumbsDown className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
