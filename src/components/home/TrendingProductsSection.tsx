"use client";

import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

interface Product {
  id: number | string;
  name: string;
  price: string;
  regular_price?: string;
  slug: string;
  images?: { src: string }[];
}

interface TrendingProductsSectionProps {
  products: Product[];
}

export default function TrendingProductsSection({ products }: TrendingProductsSectionProps) {
  if (!products || products.length === 0) return null;

  // Display top 2 products on homepage grid
  const initialProducts = products.slice(0, 2);

  return (
    <section className="bg-brand-offwhite py-6 sm:py-8">
      <div className="max-w-2xl mx-auto px-4 w-full">
        {/* Product Grid: 2 columns showing 2 images with reduced height */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {initialProducts.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard
                title={product.name}
                price={product.price || product.regular_price || ""}
                imageSrc={product.images?.[0]?.src || "/images/placeholder.png"}
                slug={product.slug}
                id={product.id}
                aspectRatio="4/3"
              />
            </div>
          ))}
        </div>

        {/* Explore Now Button: Navigates to next page (/category/all) listing all mund products */}
        <div className="flex justify-center mt-8 md:mt-10">
          <Link
            id="trending-explore-now-btn"
            href="/category/all"
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 bg-brand-gold text-brand-charcoal font-bold text-sm uppercase tracking-[0.18em] rounded-full shadow-lg hover:shadow-brand-gold/40 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <span className="relative z-10">Explore Now</span>
            <svg
              className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
            {/* shimmer sweep */}
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          </Link>
        </div>
      </div>
    </section>
  );
}

