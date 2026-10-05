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
    id: "elastic",
    title: "Elastic",
    image: "/images/wc_samples/Daily-Wear-Mund8.jpeg",
    objectPosition: "58% 22%", // Direct focus on the premium woven elastic waistband & drawstring
  },
  {
    id: "rib",
    title: "Rib",
    image: "/images/wc_samples/Daily-Wear-Mund11.jpeg",
    objectPosition: "42% 46%", // Direct focus on the distinct ribbed knit waistband structure
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
    <section className="bg-white py-10 md:py-14 w-full overflow-hidden">
      {/* SECTION HEADER */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-6 md:mb-10">
        <span className="block text-xs sm:text-sm font-semibold tracking-[0.25em] text-brand-gold uppercase mb-2">
          ROOTED IN NATURE
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-charcoal tracking-tight uppercase">
          YOUR CONCERN, OUR CARE
        </h2>
        <div className="w-14 h-0.5 bg-brand-gold mx-auto mt-3" />
      </div>

      {/* CAROUSEL TRACK WITH REDUCED IMAGE SIZES */}
      <div className="w-full">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-4 md:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth px-4 sm:px-8 md:px-12 lg:px-16 pb-4 select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          } [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        >
          {CONCERN_CARDS.map((card) => (
            <div
              key={card.id}
              className="relative shrink-0 snap-start rounded-xl sm:rounded-2xl overflow-hidden shadow-md group transition-all duration-300 w-[68vw] sm:w-[48vw] md:w-[320px] lg:w-[360px] h-[280px] sm:h-[340px] md:h-[380px]"
            >
              {/* Image */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                draggable={false}
                className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                style={{ objectPosition: card.objectPosition }}
                sizes="(max-width: 640px) 68vw, (max-width: 1024px) 48vw, 360px"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-36 sm:h-44 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

              {/* Title */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 md:p-6 pointer-events-none">
                <h3
                  className="text-xl sm:text-2xl md:text-3xl font-medium text-white tracking-wide drop-shadow-lg"
                  style={{
                    fontFamily: "'Italiana', 'Playfair Display', var(--font-cormorant-garamond), serif",
                    letterSpacing: "0.02em",
                  }}
                >
                  {card.title}
                </h3>
                <div className="w-8 h-0.5 bg-brand-gold mt-2 transition-all duration-300 group-hover:w-14" />
              </div>
            </div>
          ))}

          {/* Spacer to preserve right margin when scrolled to the end */}
          <div className="shrink-0 w-4 md:w-8" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
