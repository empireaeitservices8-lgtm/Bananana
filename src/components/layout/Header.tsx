import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/woocommerce/api";

import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import HamburgerMenu from "./HamburgerMenu";

export default async function Header() {
  const allCategories = await getCategories();

  // Filter out uncategorized and remove duplicates by NAME (not just slug)
  const uniqueCategories: any[] = [];
  const names = new Set<string>();

  if (allCategories) {
    for (const cat of allCategories) {
      const normalizedName = cat.name.trim().toLowerCase();
      if (cat.slug !== "uncategorized" && cat.count > 0 && !names.has(normalizedName)) {
        uniqueCategories.push(cat);
        names.add(normalizedName);
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-brand-charcoal/10 shadow-sm">
      {/* Header Background (isolated to prevent containing block issues with fixed children) */}
      <div className="absolute inset-0 bg-brand-cream/90 backdrop-blur-md -z-10" />

      {/* ── MOBILE layout (< md) ── */}
      <div className="relative md:hidden max-w-7xl mx-auto px-4 h-24 flex items-center">
        {/* Left — Hamburger (mobile only) */}
        <div className="flex items-center z-10">
          <HamburgerMenu categories={uniqueCategories} />
        </div>

        {/* Center — Logo absolutely centered (mobile only) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <Link href="/" className="relative h-20 w-40 flex items-center overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Bananana"
              fill
              className="object-contain object-center scale-125"
              priority
            />
          </Link>
        </div>

        {/* Right — Search + Cart */}
        <div className="flex items-center gap-4 ml-auto z-10">
          <SearchBar />
          <CartIcon />
        </div>
      </div>

      {/* ── DESKTOP layout (≥ md) — unchanged from original ── */}
      <div className="hidden md:flex max-w-7xl mx-auto px-4 h-24 items-center justify-between">
        {/* Logo — left */}
        <Link href="/" className="relative h-24 w-56 flex items-center overflow-hidden">
          <Image src="/images/logo.png" alt="Bananana" fill className="object-contain object-left scale-150 origin-left" priority />
        </Link>

        {/* Nav — center */}
        <nav className="flex gap-6 items-center">
          {/* Shop Dropdown */}
          <div className="relative group">
            <Link href="/category/all" className="text-sm font-medium hover:text-brand-gold transition-colors flex items-center gap-1 py-4">
              Shop
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-brand-charcoal/10 shadow-xl rounded-sm p-6 w-[85vw] max-w-3xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <Link href="/category/all" className="block mb-6 pb-4 border-b border-brand-charcoal/10 text-sm text-brand-charcoal hover:text-brand-gold font-bold transition-colors">
                All Products
              </Link>
              <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                {uniqueCategories.map((cat: any) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="block p-2 text-sm text-brand-charcoal hover:bg-brand-offwhite hover:text-brand-gold transition-colors rounded-sm"
                    dangerouslySetInnerHTML={{ __html: cat.name }}
                  />
                ))}
              </div>
            </div>
          </div>

          <Link href="/about" className="text-sm font-medium hover:text-brand-gold transition-colors py-4">About Us</Link>
          <Link href="/service" className="text-sm font-medium hover:text-brand-gold transition-colors py-4">Service</Link>
          <Link href="/contact-us" className="text-sm font-medium hover:text-brand-gold transition-colors py-4">Contact Us</Link>
        </nav>

        {/* Search + Cart — right */}
        <div className="flex items-center gap-4">
          <SearchBar />
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
