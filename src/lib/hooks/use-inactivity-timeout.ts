"use client";

import { useEffect, useRef, useCallback } from "react";

const TIMEOUT_MS = 3 * 60 * 1000; // 3 minutes

export function useInactivityTimeout(onTimeout: () => void, enabled = true) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (enabled) {
      timerRef.current = setTimeout(onTimeout, TIMEOUT_MS);
    }
  }, [onTimeout, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const events = ["touchstart", "mousedown", "scroll", "keydown"];
    const handler = () => reset();

    events.forEach((e) => window.addEventListener(e, handler, { passive: true }));
    reset(); // Start timer

    return () => {
      events.forEach((e) => window.removeEventListener(e, handler));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [reset, enabled]);

  return { reset };
}
