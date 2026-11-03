import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  price: string | number;
  imageSrc: string;
  slug: string;
  label?: string;
  category?: string;
  rating?: number | string;
  id?: number | string;
  aspectRatio?: string;
}

function toTitleCase(str: string): string {
  if (!str) return "";
  const isAllUpper = str === str.toUpperCase();
  if (!isAllUpper) return str;
  return str
    .toLowerCase()
    .split(" ")
    .map((word, idx) => {
      if (idx > 0 && ["with", "and", "or", "in", "of", "to", "for", "a", "an", "the"].includes(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export default function ProductCard({
  title,
  price,
  imageSrc,
  slug,
  label,
  category,
  rating = "5.0",
  id,
  aspectRatio,
}: ProductCardProps) {
  const displayTitle = toTitleCase(title);

  // Determine category eyebrow (e.g. SHIRT, MUNDU, KURTA) matching marked reference
  const categoryTag =
    category ||
    (() => {
      const lower = title.toLowerCase();
      if (lower.includes("shirt") || lower.includes("t-shirt") || lower.includes("tshirt")) return "SHIRT";
      if (lower.includes("mund") || lower.includes("kasavu")) return "MUNDU";
      if (lower.includes("kurt")) return "KURTA";
      return label ? label.toUpperCase() : "MUNDU";
    })();

  // Format price neatly with INR symbol (e.g. ₹ 1,399) matching reference
  const formattedPrice = (() => {
    const raw = String(price).replace(/[^0-9.]/g, "");
    const num = parseFloat(raw);
    if (isNaN(num)) return price;
    return num.toLocaleString("en-IN");
  })();

  return (
    <div className="group flex flex-col bg-white rounded-lg border border-brand-charcoal/10 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
      <Link href={`/product/${slug}`} className="block relative cursor-pointer">
        <div
          className="relative w-full bg-brand-offwhite overflow-hidden"
          style={{ aspectRatio: aspectRatio || "3/4" }}
        >
          {/* Badge Label (e.g. TOP SELLER, RELAXED FIT) */}
          {label && (
            <div className="absolute top-2.5 left-2.5 z-10 bg-brand-forest text-brand-cream text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
              {label}
            </div>
          )}

          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Product Details - Clean, Bold, Attractive Geometric Sans Font (Outfit) */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Eyebrow & Star Rating Row */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span
              className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#D99B26]"
              style={{ fontFamily: "var(--font-sans), 'Outfit', sans-serif" }}
            >
              {categoryTag}
            </span>
            <span
              className="text-[11px] sm:text-xs font-bold text-brand-charcoal/80 flex items-center gap-1"
              style={{ fontFamily: "var(--font-sans), 'Outfit', sans-serif" }}
            >
              <span className="text-amber-500">★</span> {rating}
            </span>
          </div>

          {/* Product Title: Oriental Heritage font (Plus Jakarta Sans Bold) */}
          <Link href={`/product/${slug}`} className="block">
            <h3
              className="font-bold text-sm sm:text-base text-brand-charcoal leading-snug line-clamp-2 group-hover:text-[#D99B26] transition-colors mb-2"
              style={{
                fontFamily: 'var(--font-plus-jakarta), "Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 700,
                letterSpacing: "-0.015em",
              }}
            >
              {displayTitle}
            </h3>
          </Link>
        </div>

        <div>
          {/* Price: Bold modern sans font */}
          <p
            className="font-sans font-bold text-sm sm:text-base text-brand-charcoal mb-3"
            style={{ fontFamily: "var(--font-sans), 'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            ₹ {formattedPrice}
          </p>

          {/* EXPLORE NOW Button */}
          <Link
            href={`/product/${slug}`}
            className="w-full bg-[#111111] hover:bg-brand-forest text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider py-2.5 sm:py-3 rounded-md transition-colors flex items-center justify-center cursor-pointer shadow-xs active:scale-[0.98]"
            style={{ fontFamily: "var(--font-sans), 'Outfit', sans-serif" }}
          >
            EXPLORE NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
