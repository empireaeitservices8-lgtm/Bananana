"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[3/4] w-full bg-brand-offwhite rounded-sm flex items-center justify-center text-brand-charcoal/40">
        No Image
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:w-20 flex-shrink-0 pb-1 md:pb-0">
        {images.map((img, i) => (
          <button
            key={`${img.id}-${i}`}
            onClick={() => setSelectedIndex(i)}
            aria-label={`View image ${i + 1}`}
            className={`relative aspect-[3/4] w-16 md:w-20 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-200 ${
              i === selectedIndex
                ? "border-brand-gold shadow-sm"
                : "border-transparent opacity-60 hover:opacity-100 hover:border-brand-charcoal/20"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt || productName}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative aspect-[3/4] w-full bg-brand-offwhite rounded-sm overflow-hidden cursor-zoom-in group">
        <Image
          key={selectedIndex}
          src={selectedImage.src}
          alt={selectedImage.alt || productName}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-125"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
