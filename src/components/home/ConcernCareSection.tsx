"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface ConcernCard {
  id: string;
  title: string;
  image: string;
  objectPosition: string;
}

// EXACTLY 3 UNIQUE CARDS — NO MORE, NO LESS
const CONCERN_CARDS: ConcernCard[] = [
  {
    id: "material-quality",
    title: "Material Quality",
    image: "/images/concern-material-quality.jpg",
    objectPosition: "center center",
  },
  {
    id: "elastic-rib",
    title: "Elastic Rib",
    image: "/images/wc_samples/Daily-Wear-Mund8.jpeg",
    objectPosition: "58% 22%", // Direct focus on the premium woven elastic waistband & drawstring
  },
  {
    id: "convenient-pocket",
    title: "Convenient Pocket",
    image: "/images/concern-convenient-pocket.jpg",
    objectPosition: "center 28%", // Direct focus on the convenient functional pocket with phone
  },
];

export default function ConcernCareSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Desktop Mouse Drag Handlers for Smooth Manual Scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    startXRef.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftRef.current = containerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // Smooth manual drag multiplier
    containerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <section className="bg-brand-cream pt-10 md:pt-14 pb-4 md:pb-6 w-full overflow-hidden">
      {/* SECTION HEADER */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-6 md:mb-10">
        <span 
          className="block text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-gold-muted uppercase mb-2"
          style={{ fontFamily: '"Montserrat", "Plus Jakarta Sans", "Inter", sans-serif' }}
        >
          ROOTED IN NATURE
        </span>
        <h2 
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-forest tracking-wide uppercase"
          style={{
            fontFamily: '"Montserrat", "Plus Jakarta Sans", "Inter", sans-serif',
            fontWeight: 700,
            letterSpacing: "0.04em",
            lineHeight: 1.25,
          }}
        >
          YOUR CONCERN, OUR CARE
        </h2>
        <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-2.5" />
      </div>

      {/* FULLY RESPONSIVE CONTAINER: 3-COL GRID ON LAPTOP/DESKTOP, SMOOTH PEEK CAROUSEL ON MOBILE */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex md:grid md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 overflow-x-auto md:overflow-visible scrollbar-none snap-x snap-mandatory scroll-smooth pb-3 md:pb-0 select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab md:cursor-default"
          } [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        >
          {CONCERN_CARDS.map((card) => (
            <div
              key={card.id}
              className="relative shrink-0 md:shrink snap-center rounded-xl sm:rounded-2xl overflow-hidden shadow-md group transition-all duration-300 w-[78vw] sm:w-[52vw] md:w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] max-h-[460px]"
            >
              {/* Image */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                draggable={false}
                className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                style={{ objectPosition: card.objectPosition }}
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 33vw, 360px"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-36 sm:h-44 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

              {/* Title */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 md:p-6 pointer-events-none">
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide drop-shadow-lg"
                  style={{
                    fontFamily: '"Montserrat", "Plus Jakarta Sans", "Inter", sans-serif',
                    letterSpacing: "-0.01em",
                  }}
                >
                  {card.title}
                </h3>
                <div className="w-8 h-0.5 bg-brand-gold mt-2 transition-all duration-300 group-hover:w-14" />
              </div>
            </div>
          ))}

          {/* Mobile Spacer only */}
          <div className="shrink-0 w-3 md:hidden" aria-hidden="true" />
        </div>

        {/* Mobile Indicator Dots (Mobile Only) */}
        <div className="flex md:hidden justify-center items-center gap-1.5 mt-3 pt-1">
          {CONCERN_CARDS.map((card, idx) => (
            <button
              key={card.id}
              type="button"
              onClick={() => {
                if (containerRef.current) {
                  const cardEl = containerRef.current.children[idx] as HTMLElement;
                  if (cardEl) {
                    containerRef.current.scrollTo({ left: cardEl.offsetLeft - 16, behavior: "smooth" });
                  }
                }
              }}
              className="w-2 h-2 rounded-full bg-brand-forest/20 active:bg-brand-gold transition-colors cursor-pointer"
              aria-label={`View ${card.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
