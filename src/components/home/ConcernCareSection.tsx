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
    <section className="bg-white py-16 md:py-24 w-full overflow-hidden">
      {/* 
        ==================================================
        SECTION HEADER
        ==================================================
        ROOTED IN NATURE
        YOUR CONCERN, OUR CARE
      */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-10 md:mb-16">
        <span className="block text-xs sm:text-sm font-semibold tracking-[0.25em] text-brand-gold uppercase mb-2.5">
          ROOTED IN NATURE
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-charcoal tracking-tight uppercase">
          YOUR CONCERN, OUR CARE
        </h2>
        <div className="w-14 h-0.5 bg-brand-gold mx-auto mt-4" />
      </div>

      {/* 
        ==================================================
        LARGE PORTRAIT CARDS CAROUSEL
        ==================================================
        - Tall vertical portrait cards (large width & height)
        - Rounded corners
        - Images occupy the entire card
        - Bottom dark gradient overlay for effortless readability
        - Title positioned near the bottom of each image
        - Part of next card visible on the right side
        - NO AUTOPLAY / NO AUTO-SCROLL (Stationary until customer interacts)
        - NO < > BUTTONS / NO ARROWS / NO NUMBER INDICATORS
        - Manual touch swipe on mobile & drag/scroll on desktop
      */}
      <div className="w-full">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-6 md:gap-8 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth px-6 sm:px-10 md:px-14 lg:px-20 pb-4 select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          } [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        >
          {CONCERN_CARDS.map((card) => (
            <div
              key={card.id}
              className="relative shrink-0 snap-start rounded-2xl md:rounded-3xl overflow-hidden shadow-lg group transition-all duration-300 w-[84vw] sm:w-[65vw] md:w-[460px] lg:w-[500px] h-[520px] sm:h-[580px] md:h-[620px] lg:h-[660px]"
            >
              {/* Full-bleed Portrait Image */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                draggable={false}
                className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                style={{ objectPosition: card.objectPosition }}
                sizes="(max-width: 640px) 84vw, (max-width: 1024px) 65vw, 500px"
                priority
              />

              {/* Bottom Soft/Dark Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-52 sm:h-64 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />

              {/* Bottom Large White Title */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 md:p-10 pointer-events-none">
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide drop-shadow-md">
                  {card.title}
                </h3>
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
