"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#1C4D38] md:border-none">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-3 md:py-0 md:mb-5 cursor-pointer text-left"
        aria-expanded={isOpen}
      >
        <h3 className="font-bold text-sm tracking-widest uppercase text-brand-cream">{title}</h3>
        <ChevronDown className={`w-4 h-4 text-brand-cream/70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100 pb-3.5 sm:pb-4" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brand-darkgreen text-brand-cream border-t border-[#1C4D38] pt-6 sm:pt-8 md:pt-12 pb-5">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-0 md:gap-8 lg:gap-12">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-3 lg:col-span-2 mb-4 sm:mb-5 md:mb-0">
          <Link href="/" className="relative inline-block h-12 w-36 sm:h-14 sm:w-44 md:h-22 md:w-56 mb-2 md:mb-4">
            <Image src="/images/logo.png" alt="Bananana" fill className="object-contain object-left md:scale-135 md:origin-left" />
          </Link>
          <p className="text-xs sm:text-sm text-brand-cream/70 leading-relaxed max-w-sm">
            Rooted in Kerala heritage, crafted for the modern man. Premium mundus and kurtis for every occasion.
          </p>
        </div>

        {/* Chill Stuffs */}
        <FooterSection title="Chill Stuffs">
          <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-brand-cream/70 pt-1 md:pt-0">
            <li><Link href="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
            <li><Link href="/category/all" className="hover:text-brand-gold transition-colors">Shop All</Link></li>
            <li><Link href="/category/new-arrivals" className="hover:text-brand-gold transition-colors">New Arrivals</Link></li>
          </ul>
        </FooterSection>

        {/* Dopey Stuffs */}
        <FooterSection title="Dopey Stuffs">
          <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-brand-cream/70 pt-1 md:pt-0">
            <li><Link href="/track-order" className="hover:text-brand-gold transition-colors">Track Order</Link></li>
            <li><Link href="/returns" className="hover:text-brand-gold transition-colors">Returns</Link></li>
          </ul>
        </FooterSection>

        {/* Legal */}
        <FooterSection title="Legal">
          <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-brand-cream/70 pt-1 md:pt-0">
            <li><Link href="/terms" className="hover:text-brand-gold transition-colors">Terms and Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-brand-gold transition-colors">Shipping Policy</Link></li>
            <li><Link href="/return-policy" className="hover:text-brand-gold transition-colors">Return Policy</Link></li>
          </ul>
        </FooterSection>

        {/* Let's Connect */}
        <FooterSection title="Let's Connect">
          <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-brand-cream/70 pt-1 md:pt-0">
            <li><a href="https://wa.me/919847774755" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">WhatsApp</a></li>
            <li><a href="mailto:inbananana@gmail.com" className="hover:text-brand-gold transition-colors">Email</a></li>
            <li><Link href="/contact-us" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
          </ul>
        </FooterSection>
      </div>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 mt-5 sm:mt-6 md:mt-8 pt-3.5 sm:pt-4 border-t border-[#1C4D38] text-xs sm:text-sm text-brand-cream/60 text-center">
        &copy; {new Date().getFullYear()} Bananana. All rights reserved.
      </div>
    </footer>
  );
}
