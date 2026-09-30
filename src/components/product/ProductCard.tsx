"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

interface ProductCardProps {
  title: string;
  price: string | number;
  imageSrc: string;
  slug: string;
  label?: string;
  id?: number;
}

export default function ProductCard({ title, price, imageSrc, slug, label, id }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (id) {
      addToCart({
        id,
        name: title,
        price: price.toString(),
        imageSrc,
        slug
      });
      toast.success(`${title} added to cart!`);
    } else {
      toast.error("Cannot add product without ID");
    }
  };

  return (
    <Link href={`/product/${slug}`} className="group block cursor-pointer">
      <div className="relative aspect-[3/4] bg-brand-offwhite rounded-sm overflow-hidden mb-3">
        {label && (
          <div className="absolute top-2 left-2 z-10 bg-brand-charcoal text-brand-cream text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm">
            {label}
          </div>
        )}
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div>
        <h3 className="font-serif text-base sm:text-lg text-brand-charcoal mb-0.5 line-clamp-1 group-hover:text-brand-gold transition-colors">{title}</h3>
        <p className="text-sm font-bold text-brand-charcoal">₹{price}</p>
      </div>
    </Link>
  );
}
