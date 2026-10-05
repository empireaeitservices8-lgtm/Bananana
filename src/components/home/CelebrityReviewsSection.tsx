"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ReviewCardItem {
  id: string;
  type: "image" | "description";
  // Image properties
  imageSrc?: string;
  overlayTitle?: string;
  overlaySubtitle?: string;
  // Description properties
  category?: string;
  title?: string;
  lead?: string;
  description?: string;
  highlight?: string;
}

const REVIEW_CARDS: ReviewCardItem[] = [
  // --- PAIR 1 ---
  {
    id: "card-1-img",
    type: "image",
    imageSrc: "/images/celebrity-1.jpg",
    overlayTitle: "Comfort In Every Move",
    overlaySubtitle: "Lightweight Breathable Knit & Flawless Drape",
  },
  {
    id: "card-1-desc",
    type: "description",
    category: "Signature Comfort",
    title: "COMFORT IN EVERY WEAR",
    lead: "Purposefully Developed for Everyday Ease:",
    description:
      "Comfort you can wear every day. Lightweight knit fabric purposefully developed for unmatched softness, natural drape, and effortless all-day breathability.",
    highlight:
      "Right fabric, right balance—engineered to keep you cool and relaxed from morning rituals to evening celebrations.",
  },

  // --- PAIR 2 ---
  {
    id: "card-2-img",
    type: "image",
    imageSrc: "/images/celebrity-2.jpg",
    overlayTitle: "Convenient Pocket",
    overlaySubtitle: "Deep Functional Storage in Authentic Kerala Attire",
  },
  {
    id: "card-2-desc",
    type: "description",
    category: "Modern Utility",
    title: "CONVENIENT POCKET",
    lead: "Carry Easy, Worry Less:",
    description:
      "A practical, easy-access pocket to keep your phone, wallet, keys, and daily essentials close at hand without compromising authentic traditional style.",
    highlight:
      "Deep, secure, and seamlessly integrated into the inner fold so your silhouette stays perfectly neat.",
  },

  // --- PAIR 3 ---
  {
    id: "card-3-img",
    type: "image",
    imageSrc: "/images/celebrity-3.jpg",
    overlayTitle: "Product Quality",
    overlaySubtitle: "Precision Stitching & Rigorously Checked Finish",
  },
  {
    id: "card-3-desc",
    type: "description",
    category: "Master Craftsmanship",
    title: "PRODUCT QUALITY",
    lead: "Checked Before It Reaches You:",
    description:
      "Every mundu is carefully finished for neat stitching, clean edges, and a polished look—thoroughly checked to ensure it meets our exacting quality standards.",
    highlight:
      "Reinforced borders and premium yarns designed to endure frequent wear and repeated washes with zero distortion.",
  },

  // --- PAIR 4 ---
  {
    id: "card-4-img",
    type: "image",
    imageSrc: "/images/celebrity-4.jpg",
    overlayTitle: "Elastic Waistband",
    overlaySubtitle: "Flexible Zero-Roll Fit That Adapts To Your Day",
  },
  {
    id: "card-4-desc",
    type: "description",
    category: "Engineered Fit",
    title: "ELASTIC WAISTBAND",
    lead: "Zero Roll, All-Day Comfort:",
    description:
      "Engineered woven elastic that adapts naturally to your movement and returns to shape—staying securely flat without twisting, rolling, or slipping.",
    highlight:
      "Never constantly re-tie or adjust. Put it on once and enjoy secure confidence all day long.",
  },
];

export default function CelebrityReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const total = REVIEW_CARDS.length;

  const scrollToIndex = (index: number) => {
    const newIdx = Math.max(0, Math.min(total - 1, index));
    setActiveIndex(newIdx);

    if (scrollContainerRef.current) {
      const children = scrollContainerRef.current.children;
      if (children[newIdx]) {
        (children[newIdx] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  const handleNext = () => {
    scrollToIndex((activeIndex + 1) % total);
  };

  const handlePrev = () => {
    scrollToIndex((activeIndex - 1 + total) % total);
  };

  // Detect active card on manual scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const children = Array.from(container.children) as HTMLElement[];
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    children.forEach((child, idx) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    if (closestIdx !== activeIndex) {
      setActiveIndex(closestIdx);
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section className="bg-[#384B32] py-12 md:py-18 px-3 sm:px-4 w-full overflow-hidden text-brand-cream relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight uppercase">
            Celebrity Reviews
          </h2>
          <div className="w-14 h-0.5 bg-brand-gold mx-auto mt-2.5" />
        </div>

        {/* Alternating Storytelling Horizontal Track */}
        <div className="relative w-full">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 sm:px-14 md:px-20 items-center"
          >
            {REVIEW_CARDS.map((card, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={card.id}
                  onClick={() => scrollToIndex(idx)}
                  className={`flex-none snap-center transition-all duration-500 rounded-2xl overflow-hidden cursor-pointer ${
                    isActive
                      ? "opacity-100 scale-100 shadow-2xl z-10 ring-1 ring-white/20"
                      : "opacity-40 scale-95 pointer-events-auto z-0"
                  }`}
                  style={{
                    width: "min(85vw, 440px)",
                    height: "min(68vh, 480px)",
                  }}
                >
                  {card.type === "image" ? (
                    /* CELEBRITY IMAGE CARD (Matching Screenshot 1 & 3) */
                    <div className="relative w-full h-full bg-brand-charcoal overflow-hidden group">
                      <Image
                        src={card.imageSrc!}
                        alt={card.overlayTitle!}
                        fill
                        className={`object-cover object-top transition-transform duration-700 ${
                          isActive ? "group-hover:scale-105" : ""
                        }`}
                        sizes="(max-width: 768px) 85vw, 440px"
                        priority={idx === 0}
                      />

                      {/* Gradient & Bottom Overlay Badge */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/70 backdrop-blur-md p-4 rounded-xl border-l-4 border-brand-gold text-white shadow-xl">
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-brand-gold mb-1">
                          {card.overlayTitle}
                        </h4>
                        <p className="text-xs font-medium text-white/90 leading-snug">
                          {card.overlaySubtitle}
                        </p>
                      </div>

                      {/* DULL Overlay for non-active cards */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-[#384B32]/80 backdrop-blur-[2px] transition-opacity duration-500 pointer-events-none" />
                      )}
                    </div>
                  ) : (
                    /* WHITE EDITORIAL DESCRIPTION CARD (Matching Screenshot 2) */
                    <div className="relative w-full h-full bg-white text-brand-charcoal p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-black/5">
                      <div>
                        <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] font-bold text-brand-gold block mb-2 sm:mb-3">
                          {card.category}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#2B3E2D] mb-3 leading-tight">
                          {card.title}
                        </h3>
                        <p className="font-bold text-xs sm:text-sm text-brand-charcoal mb-2 leading-relaxed">
                          {card.lead}
                        </p>
                        <p className="text-brand-charcoal/80 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-4 sm:line-clamp-5">
                          {card.description}
                        </p>
                      </div>

                      <div>
                        <p className="text-brand-charcoal/70 text-xs sm:text-[13px] leading-relaxed italic border-l-2 border-brand-gold pl-3 bg-brand-offwhite/60 py-2 pr-2 rounded-r-md">
                          "{card.highlight}"
                        </p>
                      </div>

                      {/* DULL Overlay for non-active cards */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-[#384B32]/75 backdrop-blur-[2px] transition-opacity duration-500 pointer-events-none" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Floating Vertical Navigation Pill on the Right (Exact match to screenshots 1, 2, 3!) */}
          <div className="flex absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 flex-col bg-white text-brand-charcoal rounded-full shadow-2xl p-1 border border-black/10">
            <button
              onClick={handlePrev}
              aria-label="Previous Review Card"
              className="p-2.5 sm:p-3 hover:bg-brand-offwhite rounded-full transition-colors cursor-pointer text-brand-charcoal hover:text-brand-gold"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>
            <div className="w-full h-px bg-black/10 my-0.5" />
            <button
              onClick={handleNext}
              aria-label="Next Review Card"
              className="p-2.5 sm:p-3 hover:bg-brand-offwhite rounded-full transition-colors cursor-pointer text-brand-charcoal hover:text-brand-gold"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Minimalist Progress Indicators at bottom */}
        <div className="flex justify-center items-center gap-2 mt-5">
          {REVIEW_CARDS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to review card ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex
                  ? "w-8 bg-brand-gold"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
