"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-brand-cream/10 md:border-none mb-4 md:mb-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-3 md:py-0 md:mb-5 cursor-pointer"
      >
        <h3 className="font-bold text-sm tracking-widest uppercase text-brand-cream">{title}</h3>
        <ChevronDown className={`w-4 h-4 text-brand-cream/70 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-brand-cream border-t border-brand-charcoal/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-8 lg:gap-12">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-3 lg:col-span-2 mb-8 md:mb-0">
          <Link href="/" className="relative inline-block h-32 w-64 mb-6">
            <Image src="/images/logo.png" alt="Bananana" fill className="object-contain object-left scale-150 origin-left" />
          </Link>
          <p className="text-sm text-brand-cream/70 leading-relaxed max-w-sm">
            Rooted in Kerala heritage, crafted for the modern man. Premium mundus and kurtis for every occasion.
          </p>
        </div>

        {/* Chill Stuffs */}
        <FooterSection title="Chill Stuffs">
          <ul className="space-y-3 text-sm text-brand-cream/70 pt-2 md:pt-0">
            <li><Link href="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
            <li><Link href="/category/all" className="hover:text-brand-gold transition-colors">Shop All</Link></li>
            <li><Link href="/category/new-arrivals" className="hover:text-brand-gold transition-colors">New Arrivals</Link></li>
          </ul>
        </FooterSection>

        {/* Dopey Stuffs */}
        <FooterSection title="Dopey Stuffs">
          <ul className="space-y-3 text-sm text-brand-cream/70 pt-2 md:pt-0">
            <li><Link href="/track-order" className="hover:text-brand-gold transition-colors">Track Order</Link></li>
            <li><Link href="/returns" className="hover:text-brand-gold transition-colors">Returns</Link></li>
          </ul>
        </FooterSection>

        {/* Legal */}
        <FooterSection title="Legal">
          <ul className="space-y-3 text-sm text-brand-cream/70 pt-2 md:pt-0">
            <li><Link href="/terms" className="hover:text-brand-gold transition-colors">Terms and Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-brand-gold transition-colors">Shipping Policy</Link></li>
            <li><Link href="/return-policy" className="hover:text-brand-gold transition-colors">Return Policy</Link></li>
          </ul>
        </FooterSection>

        {/* Let's Connect */}
        <FooterSection title="Let’s Connect">
          <ul className="space-y-3 text-sm text-brand-cream/70 pt-2 md:pt-0">
            <li><a href="#" className="hover:text-brand-gold transition-colors">WhatsApp</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Email</a></li>
            <li><Link href="/contact-us" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
          </ul>
        </FooterSection>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-brand-cream/10 text-sm text-brand-cream/50 text-center">
        &copy; {new Date().getFullYear()} Bananana. All rights reserved.
      </div>
    </footer>
  );
}
