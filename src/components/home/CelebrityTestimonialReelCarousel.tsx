"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, CheckCircle, Sparkles } from "lucide-react";

interface ReelItem {
  id: string;
  type: "video" | "image";
  src: string;
  tag: string;
  quote: string;
  creator: string;
}

const REEL_ITEMS: ReelItem[] = [
  {
    id: "reel-1-video",
    type: "video",
    src: "/videoherosection.mp4",
    tag: "Signature Fit",
    quote: "Soft comfort, woven elastic waistband, and a secure pocket.",
    creator: "Bananana Movement",
  },
  {
    id: "reel-2-celeb-1",
    type: "image",
    src: "/images/celebrity-1.jpg",
    tag: "Stage Presence",
    quote: "Effortless drape that stays pristine through every moment.",
    creator: "Celebrity Spotlight",
  },
  {
    id: "reel-3-celeb-2",
    type: "image",
    src: "/images/celebrity-2.jpg",
    tag: "Heritage Craft",
    quote: "Authentic Kerala weaving tailored for the modern man.",
    creator: "Celebrity Favorite",
  },
  {
    id: "reel-4-celeb-3",
    type: "image",
    src: "/images/celebrity-3.jpg",
    tag: "All-Day Comfort",
    quote: "Engineered waistband with zero roll and all-day softness.",
    creator: "Everyday Ease",
  },
  {
    id: "reel-5-celeb-4",
    type: "image",
    src: "/images/celebrity-4.jpg",
    tag: "Kasavu Edition",
    quote: "Crisp border finish combined with lightweight breathable knit.",
    creator: "Festive Spotlight",
  },
];

export default function CelebrityTestimonialReelCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isTouchingRef = useRef(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-scroll the reel carousel continuously
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animFrame: number;
    let lastTime: number | null = null;
    const speed = 25; // pixels per second

    const step = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isHoveredRef.current && !isTouchingRef.current && el) {
        el.scrollLeft += speed * delta;
        // Loop back seamlessly when reaching half scrollWidth
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }

      animFrame = requestAnimationFrame(step);
    };

    animFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animFrame);
  }, []);

  const handleManualScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth > 768 ? 320 : el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  const toggleVideoPlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.paused) {
      vid.play();
      setIsPlayingVideo(true);
    } else {
      vid.pause();
      setIsPlayingVideo(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  // Duplicate items for a seamless continuous reel strip
  const carouselReels = [...REEL_ITEMS, ...REEL_ITEMS, ...REEL_ITEMS];

  return (
    <section className="bg-brand-offwhite/50 py-12 md:py-16 px-4 w-full overflow-hidden border-t border-brand-charcoal/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-brand-gold text-[10px] sm:text-xs uppercase font-bold tracking-widest">
                Celebrity Spotlight
              </span>
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-brand-charcoal tracking-tight">
              Celebrity Testimonial Reels
            </h2>
            <div className="w-12 h-0.5 bg-brand-gold mt-2.5" />
          </div>
        </div>

        {/* Horizontal Reel Track (9:16 vertical ratio cards) */}
        <div
          ref={scrollRef}
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
          onTouchStart={() => {
            isTouchingRef.current = true;
          }}
          onTouchEnd={() => {
            isTouchingRef.current = false;
          }}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 scrollbar-none cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {carouselReels.map((reel, idx) => (
            <div
              key={`${reel.id}-${idx}`}
              className="flex-none w-[240px] sm:w-[270px] md:w-[290px] h-[430px] sm:h-[480px] md:h-[510px] rounded-2xl overflow-hidden relative shadow-md hover:shadow-2xl transition-all duration-300 border border-brand-charcoal/10 group bg-black"
            >
              {/* Reel Media (Video or Photo) */}
              {reel.type === "video" ? (
                <div className="absolute inset-0 w-full h-full">
                  <video
                    ref={idx === 0 ? videoRef : undefined}
                    src={reel.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {/* Video Control Buttons */}
                  <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5">
                    <button
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                      className="w-7 h-7 rounded-full bg-black/50 text-white backdrop-blur-md flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={toggleVideoPlayback}
                      aria-label={isPlayingVideo ? "Pause video" : "Play video"}
                      className="w-7 h-7 rounded-full bg-black/50 text-white backdrop-blur-md flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      {isPlayingVideo ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={reel.src}
                    alt={reel.creator}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 270px, 290px"
                    priority={idx < 4}
                  />
                </div>
              )}

              {/* Reel Vignette Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15 pointer-events-none" />

              {/* Top Reel Badge */}
              <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 bg-black/50 text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider backdrop-blur-md border border-white/10 uppercase">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>Reel</span>
              </div>

              {/* Bottom Testimonial Reel Info */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 text-white">
                {/* 5-Star Rating & Tag */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex text-brand-gold text-xs">
                    {"★".repeat(5)}
                  </div>
                  <span className="bg-brand-gold text-brand-charcoal text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
                    {reel.tag}
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-sm font-medium text-white/95 leading-snug line-clamp-3 mb-2.5 drop-shadow-sm">
                  &ldquo;{reel.quote}&rdquo;
                </p>

                {/* Creator Handle with Verified Tick */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-white/15">
                  <span className="text-[11px] font-bold text-white/90 truncate">
                    {reel.creator}
                  </span>
                  <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 fill-current" />
                  <span className="text-[10px] text-white/50 ml-auto shrink-0 font-medium">
                    @bananana.in
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
