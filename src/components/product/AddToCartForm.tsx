"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

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

const STANDARD_BANANANA_SIZES = [
  "S - 26-28",
  "L - 30-32",
  "XL - 34-36"
];

export default function AddToCartForm({ product }: AddToCartFormProps) {
  const displaySizes = STANDARD_BANANANA_SIZES;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const isSizeRequiredButNotSelected = !selectedSize;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first.");
      return false;
    }

    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageSrc: product.imageSrc,
      slug: product.slug,
      size: selectedSize,
    };

    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }
    toast.success(`${product.name} (Size: ${selectedSize}) added to cart!`);
    return true;
  };

  const handleBuyNow = () => {
    if (handleAddToCart()) {
      router.push("/cart");
    }
  };

  return (
    <div>
      {/* Size Selection */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold uppercase tracking-wider text-sm">Size</h3>
          <button
            type="button"
            onClick={() => setShowSizeGuide(true)}
            className="text-sm font-bold text-brand-gold hover:underline cursor-pointer"
          >
            Size Guide
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {displaySizes.map((sizeOpt: string) => (
            <button
              key={sizeOpt}
              type="button"
              onClick={() => setSelectedSize(sizeOpt)}
              className={`border rounded-sm py-2.5 px-5 text-sm font-bold tracking-wide transition-all cursor-pointer ${
                selectedSize === sizeOpt
                  ? "border-brand-gold bg-brand-gold/15 text-brand-gold ring-2 ring-brand-gold shadow-xs"
                  : "border-brand-charcoal/20 hover:border-brand-charcoal text-brand-charcoal bg-white"
              }`}
            >
              {sizeOpt}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex gap-4 mb-8">
        <div className="flex items-center border border-brand-charcoal/20 rounded-sm bg-white">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 text-brand-charcoal/60 hover:text-brand-charcoal transition-colors cursor-pointer"
          >
            −
          </button>
          <span className="px-2 py-3 font-medium min-w-[3ch] text-center">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-3 text-brand-charcoal/60 hover:text-brand-charcoal transition-colors cursor-pointer"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isSizeRequiredButNotSelected}
          className="flex-1 bg-brand-charcoal text-brand-cream font-bold tracking-wider uppercase text-sm rounded-sm hover:bg-black transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Add to Cart
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={isSizeRequiredButNotSelected}
          className="flex-1 bg-brand-gold text-brand-charcoal font-bold tracking-wider uppercase text-sm rounded-sm hover:bg-yellow-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Buy Now
        </button>
      </div>

      {/* Size Guide Modal matching reference card */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-xs bg-black text-white p-7 rounded-xl shadow-2xl border border-white/10">
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold mb-6 text-white tracking-tight">Sizes</h3>
            <div className="space-y-3 text-base font-semibold tracking-wide text-white/90">
              <div className="py-2 border-b border-white/10 flex justify-between items-center">
                <span className="font-bold">S</span>
                <span className="text-white/80">26-28</span>
              </div>
              <div className="py-2 border-b border-white/10 flex justify-between items-center">
                <span className="font-bold">L</span>
                <span className="text-white/80">30-32</span>
              </div>
              <div className="py-2 flex justify-between items-center">
                <span className="font-bold">XL</span>
                <span className="text-white/80">34-36</span>
              </div>
            </div>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="mt-7 w-full py-3 bg-brand-gold text-brand-charcoal font-bold uppercase text-xs rounded-md hover:bg-yellow-500 transition-colors cursor-pointer"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

