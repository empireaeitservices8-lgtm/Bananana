"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface HamburgerMenuProps {
  categories: Category[];
}

export default function HamburgerMenu({ categories }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <button
        id="hamburger-btn"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="flex flex-col justify-center items-start w-10 h-10 gap-[6px] group focus:outline-none"
      >
        <span className="block h-[2px] w-6 bg-brand-charcoal transition-all duration-300" />
        <span className="block h-[2px] w-6 bg-brand-charcoal transition-all duration-300" />
        <span className="block h-[2px] w-6 bg-brand-charcoal transition-all duration-300" />
      </button>

      <div
        aria-hidden="true"
        onClick={close}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <nav
        id="mobile-nav-drawer"
        aria-label="Navigation drawer"
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-sm z-50 bg-[#FCF8F2] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <Link href="/" onClick={close} className="font-serif text-2xl font-bold tracking-tight text-brand-charcoal">
            Bananana
          </Link>
          <button
            id="close-menu-btn"
            aria-label="Close navigation menu"
            onClick={close}
            className="w-10 h-10 flex items-center justify-end text-brand-charcoal focus:outline-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="mb-6 pb-6 border-b border-brand-charcoal/10">
            <h3 className="font-bold uppercase tracking-widest text-sm mb-4 text-brand-charcoal">Shop</h3>
            <div className="space-y-4">
              <Link href="/category/all" onClick={close} className="block text-[15px] text-brand-charcoal/90 hover:text-brand-charcoal">
                All Products
              </Link>
              {categories.map((cat: any) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={close}
                  className="block text-[15px] text-brand-charcoal/90 hover:text-brand-charcoal capitalize"
                  dangerouslySetInnerHTML={{ __html: cat.name }}
                />
              ))}
            </div>
          </div>

          <div className="mb-6 pb-6 border-b border-brand-charcoal/10">
            <h3 className="font-bold uppercase tracking-widest text-sm mb-4 text-brand-charcoal">More</h3>
            <div className="space-y-4">
              {[
                { href: "/about", label: "About Us" },
                { href: "/service", label: "Service" },
                { href: "/contact-us", label: "Contact Us" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} onClick={close} className="block text-[15px] text-brand-charcoal/90 hover:text-brand-charcoal">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-5">
          <p className="text-xs text-brand-charcoal/50">bananana.in &middot; For the privileged few</p>
        </div>
      </nav>
    </>
  );
}
