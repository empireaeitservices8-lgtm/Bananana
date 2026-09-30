"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface CuratedCollectionItem {
  id: string | number;
  name: string;
  description: string;
  imageSrc: string;
  slug: string;
  linkUrl: string;
}

interface CuratedCollectionsProps {
  collections: CuratedCollectionItem[];
}

export default function CuratedCollectionsSection({ collections }: CuratedCollectionsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isHoveredRef = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isMouseDownRef = useRef(false);

  const total = collections?.length || 0;

  const goToNext = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Seamless auto-scroll: advances to next collection every 2 seconds continuously
  useEffect(() => {
    if (total <= 1) return;

    const timer = setInterval(() => {
      goToNext();
    }, 2000);

    return () => clearInterval(timer);
  }, [total, goToNext]);

  // Touch swipe support for mobile
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

  // Mouse drag support for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDownRef.current = true;
    mouseStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current || mouseStartX.current === null) return;
    const deltaX = e.clientX - mouseStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
      mouseStartX.current = null;
      isMouseDownRef.current = false;
    }
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
    mouseStartX.current = null;
  };

  if (!collections || collections.length === 0) return null;

  const currentCol = collections[currentIndex];

  return (
    <section className="py-12 md:py-16 px-4 w-full overflow-hidden bg-brand-offwhite/40">
      <div className="max-w-6xl mx-auto">
        {/* Section Header - Clean and minimal with NO arrow navigation buttons */}
        <div className="mb-6 md:mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-brand-charcoal tracking-tight">
            Curated Collections
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mt-2.5" />
        </div>

        {/* Automatic Showcase Carousel: Seamlessly Loops, Zero Arrow Buttons, Touch/Drag Supported */}
        <div
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="relative bg-white rounded-sm border border-brand-charcoal/10 overflow-hidden shadow-xs p-4 sm:p-6 md:p-8 select-none cursor-grab active:cursor-grabbing"
        >
          <div className="grid md:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Prominent Large Collection Image */}
            <div className="md:col-span-7 relative h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] rounded-sm overflow-hidden bg-brand-offwhite group">
              <Image
                key={currentCol.imageSrc}
                src={currentCol.imageSrc}
                alt={currentCol.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
              <div className="absolute top-3 left-3 bg-brand-charcoal/80 text-brand-cream text-[10px] sm:text-xs uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm backdrop-blur-xs">
                {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>
            </div>

            {/* Collection Details */}
            <div className="md:col-span-5 flex flex-col justify-center px-1 sm:px-4 md:px-6">
              <span className="text-brand-gold text-[10px] sm:text-xs uppercase font-bold tracking-widest block mb-1.5">
                Featured Collection
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-charcoal mb-2 tracking-tight">
                {currentCol.name}
              </h3>
              <div className="w-12 h-0.5 bg-brand-gold mb-3" />
              <p className="text-brand-charcoal/75 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                {currentCol.description}
              </p>
              <div>
                <Link
                  href={currentCol.linkUrl}
                  className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto bg-brand-charcoal text-brand-cream px-7 py-3 rounded-sm font-bold tracking-wider uppercase text-xs hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-300 shadow-xs"
                >
                  <span>Shop Mund</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Minimalist Progress Indicators (Zero Arrow Buttons) */}
          <div className="flex justify-center items-center gap-2 mt-6 pt-4 border-t border-brand-charcoal/10">
            {collections.map((col, idx) => (
              <button
                key={col.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to ${col.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-8 bg-brand-gold"
                    : "w-2 bg-brand-charcoal/20 hover:bg-brand-charcoal/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
