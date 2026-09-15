import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-brand-cream border-t border-brand-charcoal/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
        
        {/* Brand */}
        <div className="col-span-2 md:col-span-3 lg:col-span-2">
          <Link href="/" className="relative inline-block h-32 w-64 mb-6">
            <Image src="/images/logo.png" alt="Bananana" fill className="object-contain object-left scale-150 origin-left" />
          </Link>
          <p className="text-sm text-brand-cream/70 leading-relaxed max-w-sm">
            Rooted in Kerala heritage, crafted for the modern man. Premium mundus and kurtis for every occasion.
          </p>
        </div>

        {/* Chill Stuffs */}
        <div>
          <h3 className="font-bold mb-5 text-sm tracking-widest uppercase text-brand-cream">Chill Stuffs</h3>
          <ul className="space-y-3 text-sm text-brand-cream/70">
            <li><Link href="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
            <li><Link href="/category/all" className="hover:text-brand-gold transition-colors">Shop All</Link></li>
            <li><Link href="/category/new-arrivals" className="hover:text-brand-gold transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        {/* Dopey Stuffs */}
        <div>
          <h3 className="font-bold mb-5 text-sm tracking-widest uppercase text-brand-cream">Dopey Stuffs</h3>
          <ul className="space-y-3 text-sm text-brand-cream/70">
            <li><Link href="/track-order" className="hover:text-brand-gold transition-colors">Track Order</Link></li>
            <li><Link href="/returns" className="hover:text-brand-gold transition-colors">Returns</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-bold mb-5 text-sm tracking-widest uppercase text-brand-cream">Legal</h3>
          <ul className="space-y-3 text-sm text-brand-cream/70">
            <li><Link href="/terms" className="hover:text-brand-gold transition-colors">Terms and Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-brand-gold transition-colors">Shipping Policy</Link></li>
            <li><Link href="/return-policy" className="hover:text-brand-gold transition-colors">Return Policy</Link></li>
          </ul>
        </div>

        {/* Let's Connect */}
        <div>
          <h3 className="font-bold mb-5 text-sm tracking-widest uppercase text-brand-cream">Let’s Connect</h3>
          <ul className="space-y-3 text-sm text-brand-cream/70">
            <li><a href="#" className="hover:text-brand-gold transition-colors">WhatsApp</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Email</a></li>
            <li><Link href="/contact-us" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-brand-cream/10 text-sm text-brand-cream/50 text-center">
        &copy; {new Date().getFullYear()} Bananana. All rights reserved.
      </div>
    </footer>
  );
}
