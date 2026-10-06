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

  const MenuGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6 pb-6 border-b border-brand-charcoal/10">
      <h3 className="font-bold uppercase tracking-widest text-[11px] mb-4 text-brand-charcoal/50">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );

  const MenuItem = ({ href, label, external }: { href: string; label: string; external?: boolean }) => (
    <Link
      href={href}
      onClick={close}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="block text-[15px] font-medium text-brand-charcoal/90 hover:text-brand-gold transition-colors"
    >
      {label}
    </Link>
  );

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
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-sm z-50 bg-brand-cream shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-charcoal/10">
          <Link href="/" onClick={close} className="font-serif text-2xl font-bold tracking-tight text-brand-forest">
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

        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-6">
          <MenuGroup title="Chill Stuffs">
            <MenuItem href="/about" label="About Us" />
            <MenuItem href="/category/all" label="Shop All" />
            <MenuItem href="/category/new-arrivals" label="New Arrivals" />
            <MenuItem href="/category/daily-wear" label="Daily Wear" />
            <MenuItem href="/category/festive" label="Festive" />
          </MenuGroup>

          <MenuGroup title="Dopey Stuffs">
            <MenuItem href="/track-order" label="Track Order" />
            <MenuItem href="/returns" label="Returns" />
          </MenuGroup>

          <MenuGroup title="Legal">
            <MenuItem href="/terms" label="Terms and Conditions" />
            <MenuItem href="/privacy" label="Privacy Policy" />
            <MenuItem href="/shipping-policy" label="Shipping Policy" />
            <MenuItem href="/return-policy" label="Return Policy" />
          </MenuGroup>

          <div className="mb-6">
            <h3 className="font-bold uppercase tracking-widest text-[11px] mb-4 text-brand-charcoal/50">Let&apos;s Connect</h3>
            <div className="space-y-4">
              <a
                href="https://wa.me/919847774755"
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="block text-[15px] font-medium text-brand-charcoal/90 hover:text-brand-charcoal transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="mailto:inbananana@gmail.com"
                onClick={close}
                className="block text-[15px] font-medium text-brand-charcoal/90 hover:text-brand-charcoal transition-colors"
              >
                Email
              </a>
              <Link href="/contact-us" onClick={close} className="block text-[15px] font-medium text-brand-charcoal/90 hover:text-brand-charcoal transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 border-t border-brand-charcoal/10">
          <p className="text-xs text-brand-charcoal/50">bananana.in &middot; For the privileged few</p>
        </div>
      </nav>
    </>
  );
}
