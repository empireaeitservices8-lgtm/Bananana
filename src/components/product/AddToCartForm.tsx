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

export default function AddToCartForm({ product, sizes }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCart();
  const router = useRouter();

  const isSizeRequiredButNotSelected = Boolean(sizes && sizes.length > 0 && !selectedSize);

  const handleAddToCart = () => {
    if (sizes && sizes.length > 0 && !selectedSize) {
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
      {sizes && sizes.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold uppercase tracking-wider text-sm">Size</h3>
            <button className="text-sm font-bold text-brand-gold hover:underline">Size Guide</button>
          </div>
          <div className="flex flex-wrap gap-3">
            {sizes.map((opt: string) => (
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
