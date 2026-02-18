"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

interface FocusRailProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isActive: boolean) => ReactNode;
  onSelect: (item: T, index: number) => void;
  initialIndex?: number;
}

export function FocusRail<T>({
  items,
  renderItem,
  onSelect,
  initialIndex = 0,
}: FocusRailProps<T>) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastWheelRef = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(items.length - 1, index));
      setActiveIndex(clamped);
    },
    [items.length]
  );

  // Swipe handling
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    },
    []
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // Only handle horizontal swipes
      if (absDx > 40 && absDx > absDy) {
        if (dx < 0) goTo(activeIndex + 1);
        else goTo(activeIndex - 1);
      }
      touchStartRef.current = null;
    },
    [activeIndex, goTo]
  );

  // Mouse wheel / trackpad
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelRef.current < 400) return;
      lastWheelRef.current = now;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta > 0) goTo(activeIndex + 1);
      else if (delta < 0) goTo(activeIndex - 1);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [activeIndex, goTo]);

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, goTo]);

  // Position offsets: 5 visible slots (-2, -1, 0, 1, 2)
  const getItemStyle = (index: number) => {
    const diff = index - activeIndex;
    const absDiff = Math.abs(diff);

    if (absDiff > 2) {
      return {
        opacity: 0,
        transform: `translateX(${diff * 280}px) scale(0.7)`,
        zIndex: 0,
        filter: "blur(8px)",
        pointerEvents: "none" as const,
      };
    }

    const xOffset = diff * 280;
    const scale = absDiff === 0 ? 1 : absDiff === 1 ? 0.85 : 0.7;
    const opacity = absDiff === 0 ? 1 : absDiff === 1 ? 0.6 : 0.35;
    const blur = absDiff === 0 ? 0 : absDiff === 1 ? 2 : 6;
    const zIndex = 10 - absDiff;

    return {
      opacity,
      transform: `translateX(${xOffset}px) scale(${scale})`,
      zIndex,
      filter: `blur(${blur}px)`,
      pointerEvents: (absDiff <= 1 ? "auto" : "none") as
        | "auto"
        | "none",
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-[calc(100vh-220px)] w-full items-center justify-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {items.map((item, index) => {
        const style = getItemStyle(index);
        const isActive = index === activeIndex;

        return (
          <div
            key={index}
            className="absolute transition-all duration-500 ease-out"
            style={style}
            onClick={() => {
              if (isActive) {
                onSelect(item, index);
              } else {
                goTo(index);
              }
            }}
          >
            {renderItem(item, index, isActive)}
          </div>
        );
      })}

      {/* Dot indicators — 44px touch targets */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-0">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className="flex h-11 w-11 items-center justify-center"
            aria-label={`Ir para item ${index + 1}`}
          >
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-charcoal/20"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
