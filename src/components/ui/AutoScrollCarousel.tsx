"use client";

import { useEffect, useRef } from "react";

interface AutoScrollCarouselProps {
  children: React.ReactNode;
  className?: string;
  speedMs?: number;
}

export default function AutoScrollCarousel({ children, className, speedMs = 3000 }: AutoScrollCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let intervalId: NodeJS.Timeout;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        if (!el) return;
        
        // Calculate the maximum possible scroll left value
        const maxScroll = el.scrollWidth - el.clientWidth;
        
        // If we've reached the end (with a small 10px buffer), scroll back to the beginning
        if (el.scrollLeft >= maxScroll - 10) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll forward by roughly one item's width or a sensible fraction
          el.scrollBy({ left: el.clientWidth > 600 ? 320 : el.clientWidth * 0.8, behavior: 'smooth' });
        }
      }, speedMs);
    };

    startAutoScroll();

    // Pause auto-scrolling when the user interacts with the carousel
    const pause = () => clearInterval(intervalId);
    
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", startAutoScroll);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", startAutoScroll, { passive: true });

    return () => {
      clearInterval(intervalId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", startAutoScroll);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", startAutoScroll);
    };
  }, [speedMs]);

  return (
    <div ref={scrollRef} className={className}>
      {children}
    </div>
  );
}
