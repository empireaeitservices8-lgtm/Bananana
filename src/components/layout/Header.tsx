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
      <div className="relative md:hidden max-w-7xl mx-auto px-4 h-14 flex items-center">
        {/* Left — Hamburger (mobile only) */}
        <div className="flex items-center z-10">
          <HamburgerMenu categories={uniqueCategories} />
        </div>

        {/* Center — Logo absolutely centered (mobile only) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <Link href="/" className="relative h-11 w-28 flex items-center overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Bananana"
              fill
              className="object-contain object-center scale-110"
              priority
            />
          </Link>
        </div>

        {/* Right — Search + Cart */}
        <div className="flex items-center gap-3 ml-auto z-10">
          <SearchBar />
          <CartIcon />
        </div>
      </div>

      {/* ── DESKTOP layout (≥ md) — logo centered ── */}
      <div className="hidden md:block max-w-7xl mx-auto px-4">
        <div className="relative h-16 flex items-center">
          {/* Left — Hamburger + Nav links */}
          <div className="flex items-center gap-5 z-10">
            <HamburgerMenu categories={uniqueCategories} />
            <nav className="flex gap-5 items-center">
              <Link href="/category/all" className="text-sm font-medium hover:text-brand-gold transition-colors py-1.5 tracking-wide">Shop All</Link>
              <Link href="/about" className="text-sm font-medium hover:text-brand-gold transition-colors py-1.5 tracking-wide">About Us</Link>
              <Link href="/contact-us" className="text-sm font-medium hover:text-brand-gold transition-colors py-1.5 tracking-wide">Contact Us</Link>
            </nav>
          </div>

          {/* Center — Logo absolutely centered */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <Link href="/" className="relative h-13 w-36 flex items-center overflow-hidden">
              <Image src="/images/logo.png" alt="Bananana" fill className="object-contain object-center scale-110" priority />
            </Link>
          </div>

          {/* Right — Search + Cart */}
          <div className="flex items-center gap-3.5 ml-auto z-10">
            <SearchBar />
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
