"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CelebrityReviewItem {
  id: string;
  imageSrc: string;
  category: string;
  title: string;
  lead: string;
  description: string;
  highlight: string;
}

const CELEBRITY_REVIEWS: CelebrityReviewItem[] = [
  {
    id: "review-1",
    imageSrc: "/images/celebrity-1.jpg",
    category: "Signature Comfort",
    title: "COMFORT IN EVERY WEAR",
    lead: "Purposefully Developed for Everyday Ease:",
    description:
      "Comfort you can wear every day. Lightweight knit fabric purposefully developed for unmatched softness, natural drape, and effortless all-day breathability.",
    highlight:
      "Right fabric, right balance—engineered to keep you cool and relaxed from morning rituals to evening celebrations.",
  },
  {
    id: "review-2",
    imageSrc: "/images/celebrity-2.jpg",
    category: "Modern Utility",
    title: "CONVENIENT POCKET",
    lead: "Carry Easy, Worry Less:",
    description:
      "A practical, easy-access pocket to keep your phone, wallet, keys, and daily essentials close at hand without compromising authentic traditional style.",
    highlight:
      "Deep, secure, and seamlessly integrated into the inner fold so your silhouette stays perfectly neat.",
  },
  {
    id: "review-3",
    imageSrc: "/images/celebrity-3.jpg",
    category: "Master Craftsmanship",
    title: "PRODUCT QUALITY",
    lead: "Checked Before It Reaches You:",
    description:
      "Every mundu is carefully finished for neat stitching, clean edges, and a polished look—thoroughly checked to ensure it meets our exacting quality standards.",
    highlight:
      "Reinforced borders and premium yarns designed to endure frequent wear and repeated washes with zero distortion.",
  },
  {
    id: "review-4",
    imageSrc: "/images/celebrity-4.jpg",
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
  const [isCardCovered, setIsCardCovered] = useState<boolean>(false);
  const isTransitioningRef = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isMouseDown = useRef(false);

  const total = CELEBRITY_REVIEWS.length;

  // When scrolling/navigating forward (to the right):
  // 1. If currently showing the photo -> slide description card over to completely hide the photo
  // 2. If already covering the photo -> move to next review, showing its photo full with partial overlap
  const triggerNext = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    if (!isCardCovered) {
      setIsCardCovered(true);
    } else {
      setIsCardCovered(false);
      setActiveIndex((prev) => (prev + 1) % total);
    }

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 450);
  };

  // When scrolling/navigating backward (to the left):
  // 1. If currently covering the photo -> slide description card off to reveal photo
  // 2. If showing the photo -> move to previous review in covered state
  const triggerPrev = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    if (isCardCovered) {
      setIsCardCovered(false);
    } else {
      setIsCardCovered(true);
      setActiveIndex((prev) => (prev - 1 + total) % total);
    }

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 450);
  };

  // Trackpad / Wheel horizontal scroll handler
  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
    if (Math.abs(delta) > 20) {
      if (delta > 0) {
        triggerNext();
      } else {
        triggerPrev();
      }
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only trigger if horizontal swipe is dominant and exceeds threshold
    if (Math.abs(deltaX) > 30 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        // Swiped left = scroll content right -> next step
        triggerNext();
      } else {
        // Swiped right = scroll content left -> prev step
        triggerPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Mouse drag support for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    isMouseDown.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown.current || mouseStartX.current === null) return;
    const deltaX = e.clientX - mouseStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        triggerNext();
      } else {
        triggerPrev();
      }
    }
    isMouseDown.current = false;
    mouseStartX.current = null;
  };

  return (
    <section className="bg-brand-forest py-10 md:py-16 px-2 sm:px-4 w-full overflow-hidden text-brand-cream relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight uppercase">
            Celebrity Reviews
          </h2>
          <div className="w-14 h-0.5 bg-brand-gold mx-auto mt-2.5" />
        </div>

        {/* Carousel Viewport Container */}
        <div
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="relative w-full max-w-5xl mx-auto overflow-hidden px-2 sm:px-6 py-2 select-none"
        >
          {/* Sliding Track for Reviews */}
          <div
            className="flex transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {CELEBRITY_REVIEWS.map((review, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={review.id}
                  className="w-full shrink-0 flex items-center justify-center px-2 sm:px-6 py-2"
                >
                  {/* Single Unified Slide: Celebrity Image displayed full on left with partial card overlap on right, hiding image when scrolled right */}
                  <div className="flex flex-row items-center justify-center relative py-4 [--cover-shift:-128px] sm:[--cover-shift:-202px] md:[--cover-shift:-256px]">
                    {/* 1. Celebrity Image: In FRONT and fully visible */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isActive) {
                          triggerNext();
                        }
                      }}
                      className={`relative shrink-0 w-[160px] sm:w-[250px] md:w-[320px] h-[300px] sm:h-[390px] md:h-[460px] rounded-3xl overflow-hidden bg-brand-charcoal shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-white/15 cursor-pointer transition-all duration-700 ${
                        isActive && isCardCovered
                          ? "z-10 opacity-0 scale-95 pointer-events-none"
                          : "z-30 opacity-100 scale-100"
                      }`}
                    >
                      <Image
                        src={review.imageSrc}
                        alt={review.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 640px) 175px, (max-width: 1024px) 250px, 320px"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* 2. White Partial Description Card: Prominently and properly overlaps the image on the right, slides over to completely hide image on scroll */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isActive) {
                          if (!isCardCovered) {
                            triggerNext();
                          } else {
                            triggerPrev();
                          }
                        }
                      }}
                      style={{
                        transform: isActive && isCardCovered ? "translateX(var(--cover-shift))" : "translateX(0px)",
                      }}
                      className={`relative shrink-0 w-[200px] sm:w-[290px] md:w-[380px] h-[260px] sm:h-[350px] md:h-[415px] -ml-8 sm:-ml-12 md:-ml-16 bg-white text-brand-charcoal py-4 sm:py-5 md:py-6 pr-3.5 sm:pr-5 md:pr-6 rounded-3xl border border-black/10 ring-1 ring-black/5 flex flex-col justify-center cursor-pointer transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
                        isActive && isCardCovered
                          ? "z-40 pl-4 sm:pl-5 md:pl-6 shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
                          : "z-20 pl-11 sm:pl-16 md:pl-22 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                      }`}
                    >
                      <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2">
                        {/* Category Tag */}
                        <div>
                          <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-brand-gold">
                            {review.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-xs sm:text-base md:text-xl lg:text-2xl font-bold uppercase tracking-tight text-brand-forest leading-tight">
                          {review.title}
                        </h3>

                        {/* Lead */}
                        <p className="font-bold text-[9px] sm:text-xs md:text-sm text-brand-charcoal leading-snug">
                          {review.lead}
                        </p>

                        {/* Description */}
                        <p className="text-brand-charcoal/80 text-[9px] sm:text-xs md:text-sm leading-relaxed">
                          {review.description}
                        </p>

                        {/* Pull Quote Highlight */}
                        <div className="pt-1.5 sm:pt-2 border-t border-brand-charcoal/10 mt-0.5 sm:mt-1">
                          <p className="text-brand-charcoal/70 text-[8px] sm:text-xs leading-relaxed italic border-l-2 border-brand-gold pl-2 sm:pl-3 bg-brand-cream py-1 sm:py-1.5 pr-1.5 rounded-r">
                            "{review.highlight}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Vertical Navigation Pill on the Right */}
          <div className="flex absolute right-1.5 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 flex-col bg-white text-brand-charcoal rounded-full shadow-2xl p-0.5 sm:p-1 border border-black/10">
            <button
              type="button"
              onClick={triggerPrev}
              aria-label="Previous"
              className="p-2 sm:p-3 hover:bg-brand-offwhite rounded-full transition-colors cursor-pointer text-brand-charcoal hover:text-brand-gold"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>
            <div className="w-full h-px bg-black/10 my-0.5" />
            <button
              type="button"
              onClick={triggerNext}
              aria-label="Next"
              className="p-2 sm:p-3 hover:bg-brand-offwhite rounded-full transition-colors cursor-pointer text-brand-charcoal hover:text-brand-gold"
            >
              <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Minimalist Progress Indicators at bottom */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {CELEBRITY_REVIEWS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setIsCardCovered(false);
                setActiveIndex(idx);
              }}
              aria-label={`Go to review ${idx + 1}`}
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
