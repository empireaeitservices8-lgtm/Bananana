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
}

export default function AddToCartForm({ product }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageSrc: product.imageSrc,
      slug: product.slug,
    });
    // Add additional quantity if user selected more than 1 (addToCart adds 1, we can loop or just update the context method)
    // Wait, addToCart only adds 1 or increments by 1. Since our context is simple, let's just loop for now or edit context.
    // Actually it's easier to loop to add quantity times if it's > 1, or just update the context directly if we had a method.
    // For now, loop is safe:
    for (let i = 1; i < quantity; i++) {
       addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        imageSrc: product.imageSrc,
        slug: product.slug,
      });
    }
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
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
        className="flex-1 bg-brand-charcoal text-brand-cream font-bold tracking-wider uppercase text-sm rounded-sm hover:bg-black transition-colors shadow-md"
      >
        Add to Cart
      </button>
      <button 
        onClick={handleBuyNow}
        className="flex-1 bg-brand-gold text-brand-charcoal font-bold tracking-wider uppercase text-sm rounded-sm hover:bg-yellow-600 transition-colors shadow-md"
      >
        Buy Now
      </button>
    </div>
  );
}
