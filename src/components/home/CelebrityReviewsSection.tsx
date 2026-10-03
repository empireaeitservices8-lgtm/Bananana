"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

interface TextSlide {
  type: "text";
  id: string;
  category: string;
  title: string;
  lead: string;
  description: string;
  highlight: string;
}

interface ImageSlide {
  type: "image";
  id: string;
  src: string;
  overlayTitle: string;
  overlaySubtitle: string;
}

type StorySlide = TextSlide | ImageSlide;

// Alternating Description and Celebrity Image slides
const STORY_SLIDES: StorySlide[] = [
  // 1. Description 1: Comfort
  {
    type: "text",
    id: "desc-comfort",
    category: "Signature Comfort",
    title: "COMFORT IN EVERY WEAR",
    lead: "Purposefully Developed for Everyday Ease:",
    description:
      "Comfort you can wear every day. Lightweight knit fabric purposefully developed for unmatched softness, natural drape, and effortless all-day breathability.",
    highlight:
      "Right fabric, right balance—engineered to keep you cool and relaxed from morning rituals to evening celebrations.",
  },
  // 2. Celebrity Image 1
  {
    type: "image",
    id: "img-celeb-1",
    src: "/images/celebrity-1.jpg",
    overlayTitle: "Comfort In Every Move",
    overlaySubtitle: "Lightweight Breathable Knit & Flawless Drape",
  },
  // 3. Description 2: Pocket (Celebrity image hides here)
  {
    type: "text",
    id: "desc-pocket",
    category: "Modern Utility",
    title: "CONVENIENT POCKET",
    lead: "Carry Easy, Worry Less:",
    description:
      "A practical, easy-access pocket to keep your phone, wallet, keys, and daily essentials close at hand without compromising authentic traditional style.",
    highlight:
      "Deep, secure, and seamlessly integrated into the inner fold so your silhouette stays perfectly neat.",
  },
  // 4. Celebrity Image 2
  {
    type: "image",
    id: "img-celeb-2",
    src: "/images/celebrity-2.jpg",
    overlayTitle: "Convenient Pocket",
    overlaySubtitle: "Deep Functional Storage in Authentic Kerala Attire",
  },
  // 5. Description 3: Product Quality (Celebrity image hides here)
  {
    type: "text",
    id: "desc-quality",
    category: "Master Craftsmanship",
    title: "PRODUCT QUALITY",
    lead: "Checked Before It Reaches You:",
    description:
      "Every mundu is carefully finished for neat stitching, clean edges, and a polished look—thoroughly checked to ensure it meets our exacting quality standards.",
    highlight:
      "Reinforced borders and premium yarns designed to endure frequent wear and repeated washes with zero distortion.",
  },
  // 6. Celebrity Image 3
  {
    type: "image",
    id: "img-celeb-3",
    src: "/images/celebrity-3.jpg",
    overlayTitle: "Product Quality",
    overlaySubtitle: "Precision Stitching & Rigorously Checked Finish",
  },
  // 7. Description 4: Elastic Waistband (Celebrity image hides here)
  {
    type: "text",
    id: "desc-waistband",
    category: "Engineered Fit",
    title: "ELASTIC WAISTBAND",
    lead: "Zero Roll, All-Day Comfort:",
    description:
      "Engineered woven elastic that adapts naturally to your movement and returns to shape—staying securely flat without twisting, rolling, or slipping.",
    highlight:
      "Never constantly re-tie or adjust. Put it on once and enjoy secure confidence all day long.",
  },
  // 8. Celebrity Image 4
  {
    type: "image",
    id: "img-celeb-4",
    src: "/images/celebrity-4.jpg",
    overlayTitle: "Elastic Waistband",
    overlaySubtitle: "Flexible Zero-Roll Fit That Adapts To Your Day",
  },
];

export default function CelebrityReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const total = STORY_SLIDES.length;

  const goToNext = useCallback(() => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Smooth continuous auto-scroll every 3.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 3800);

    return () => clearInterval(timer);
  }, [goToNext]);

  // Optional Touch Swipe support on Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section className="bg-[#243329] py-14 md:py-20 px-4 w-full overflow-hidden text-brand-cream">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="text-brand-gold text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold block mb-2 opacity-90">
            Where Tradition Meets Modern Comfort
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight uppercase">
            Celebrity Review
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* 
          Fixed Stage Viewport with Auto-Scroll:
          - Automatically cycles between Description and Celebrity Image.
          - On Description state: Image is completely hidden.
          - On Image state: Celebrity photo appears with overlay badge.
          - No "Next" button, no "Swipe for photo", no "Read More" button.
        */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto h-[460px] sm:h-[500px] select-none"
        >
          {STORY_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;

            return (
              <div
                key={slide.id}
                aria-hidden={!isActive}
                className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
                  isActive
                    ? "opacity-100 translate-x-0 z-10 pointer-events-auto"
                    : "opacity-0 pointer-events-none z-0 " +
                      (direction === "next" ? "-translate-x-6" : "translate-x-6")
                }`}
              >
                {slide.type === "text" ? (
                  /* 1. DESCRIPTION CARD (Clean editorial layout, image hidden) */
                  <div className="w-full h-full bg-white text-brand-charcoal rounded-xl shadow-2xl p-5 sm:p-8 md:p-10 flex flex-col justify-center border border-black/5 overflow-y-auto">
                    {/* Category Tag */}
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-brand-gold block mb-2.5">
                      {slide.category}
                    </span>

                    {/* Bold Uppercase Title */}
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-brand-charcoal mb-4 leading-tight">
                      {slide.title}
                    </h3>

                    {/* Bold Sub-heading */}
                    <p className="font-bold text-xs sm:text-sm text-brand-charcoal mb-3 leading-relaxed">
                      {slide.lead}
                    </p>

                    {/* Main Paragraph Description */}
                    <p className="text-brand-charcoal/80 text-xs sm:text-sm leading-relaxed mb-4">
                      {slide.description}
                    </p>

                    {/* Secondary Highlight Note */}
                    <p className="text-brand-charcoal/65 text-xs sm:text-[13px] leading-relaxed italic border-l-2 border-brand-gold/60 pl-3">
                      {slide.highlight}
                    </p>
                  </div>
                ) : (
                  /* 2. CELEBRITY IMAGE CARD (Fixed Frame, full photo with object-top, bottom overlay badge) */
                  <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl relative bg-brand-charcoal border border-white/10">
                    {/* Celebrity Photo */}
                    <Image
                      src={slide.src}
                      alt={slide.overlayTitle}
                      fill
                      className="object-cover object-top transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 480px, 520px"
                      priority
                    />

                    {/* Subtle dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                    {/* Bottom-Left Overlay Badge with Gold Bar */}
                    <div className="absolute bottom-5 left-5 right-5 z-10 bg-black/65 backdrop-blur-md p-4 rounded-lg border-l-4 border-brand-gold text-white shadow-xl">
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-brand-gold mb-1">
                        {slide.overlayTitle}
                      </h4>
                      <p className="text-[11px] sm:text-xs font-medium text-white/90 leading-snug line-clamp-2">
                        {slide.overlaySubtitle}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Minimalist Progress Indicators for the 8-Step Storytelling Cycle */}
        <div className="flex justify-center items-center gap-1.5 mt-8">
          {STORY_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => {
                setDirection(idx > currentIndex ? "next" : "prev");
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-8 bg-brand-gold"
                  : slide.type === "text"
                  ? "w-2 bg-white/40 hover:bg-white/70"
                  : "w-2 bg-brand-gold/40 hover:bg-brand-gold/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
