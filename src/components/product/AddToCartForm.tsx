"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface AddToCartFormProps {
  product: {
    id: number;
    name: string;
    price: string;
    imageSrc: string;
    slug: string;
  };
  sizes?: string[];
}

const STANDARD_SIZE_ORDER: Record<string, number> = {
  xs: 10,
  "extra small": 10,
  s: 20,
  small: 20,
  m: 30,
  medium: 30,
  l: 40,
  large: 40,
  xl: 50,
  "extra large": 50,
  "x-large": 50,
  xxl: 60,
  "2xl": 60,
  "double extra large": 60,
  xxxl: 70,
  "3xl": 70,
  xxxxl: 80,
  "4xl": 80,
  "5xl": 90,
  "free size": 999,
  free: 999,
  onesize: 999,
  "one size": 999,
};

function sortProductSizes(sizes?: string[]): string[] {
  if (!sizes || !Array.isArray(sizes) || sizes.length <= 1) {
    return sizes || [];
  }

  return [...sizes].sort((a, b) => {
    const normA = a.trim().toLowerCase();
    const normB = b.trim().toLowerCase();

    const rankA = STANDARD_SIZE_ORDER[normA];
    const rankB = STANDARD_SIZE_ORDER[normB];

    if (rankA !== undefined && rankB !== undefined) {
      return rankA - rankB;
    }
    if (rankA !== undefined) return -1;
    if (rankB !== undefined) return 1;

    const numA = parseFloat(normA.replace(/[^\d.]/g, ""));
    const numB = parseFloat(normB.replace(/[^\d.]/g, ""));

    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }

    return a.localeCompare(b);
  });
}

export default function AddToCartForm({ product, sizes }: AddToCartFormProps) {
  const sortedSizes = sortProductSizes(sizes);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCart();
  const router = useRouter();

  const isSizeRequiredButNotSelected = Boolean(sortedSizes && sortedSizes.length > 0 && !selectedSize);

  const handleAddToCart = () => {
    if (sortedSizes && sortedSizes.length > 0 && !selectedSize) {
      toast.error("Please select a size first.");
      return false;
    }

    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageSrc: product.imageSrc,
      slug: product.slug,
      size: selectedSize || undefined,
    };

    for (let i = 0; i < quantity; i++) {
       addToCart(item);
    }
    toast.success(`${product.name} added to cart!`);
    return true;
  };

  const handleBuyNow = () => {
    if (handleAddToCart()) {
      router.push("/cart");
    }
  };

  return (
    <div>
      {sortedSizes && sortedSizes.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold uppercase tracking-wider text-sm">Size</h3>
            <button className="text-sm font-bold text-brand-gold hover:underline">Size Guide</button>
          </div>
          <div className="flex flex-wrap gap-3">
            {sortedSizes.map((opt: string) => (
              <button 
                key={opt} 
                onClick={() => setSelectedSize(opt)}
                className={`border rounded-sm py-2 px-4 text-sm font-medium transition-colors focus:outline-none ${
                  selectedSize === opt 
                    ? "border-brand-gold bg-brand-gold/10 text-brand-gold ring-1 ring-brand-gold" 
                    : "border-brand-charcoal/20 hover:border-brand-charcoal text-brand-charcoal"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 mb-8">
        <div className="flex items-center border border-brand-charcoal/20 rounded-sm">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 text-brand-charcoal/60 hover:text-brand-charcoal transition-colors"
          >
            −
          </button>
          <span className="px-2 py-3 font-medium min-w-[3ch] text-center">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-3 text-brand-charcoal/60 hover:text-brand-charcoal transition-colors"
          >
            +
          </button>
        </div>
        <button 
          onClick={handleAddToCart}
          disabled={isSizeRequiredButNotSelected}
          className="flex-1 bg-brand-charcoal text-brand-cream font-bold tracking-wider uppercase text-sm rounded-sm hover:bg-black transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-charcoal"
        >
          Add to Cart
        </button>
        <button 
          onClick={handleBuyNow}
          disabled={isSizeRequiredButNotSelected}
          className="flex-1 bg-brand-gold text-brand-charcoal font-bold tracking-wider uppercase text-sm rounded-sm hover:bg-yellow-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-gold"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
