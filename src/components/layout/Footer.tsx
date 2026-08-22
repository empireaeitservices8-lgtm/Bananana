import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-brand-cream border-t border-brand-charcoal/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="md:col-span-1">
          <Link href="/" className="relative inline-block h-32 w-64 mb-6">
            <Image src="/images/logo.png" alt="Bananana" fill className="object-contain object-left scale-150 origin-left" />
          </Link>
          <p className="text-sm text-brand-cream/70 leading-relaxed">
            Rooted in Kerala heritage, crafted for the modern man. Premium mundus and kurtis for every occasion.
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-sm tracking-wider uppercase">Shop</h3>
          <ul className="space-y-2 text-sm text-brand-cream/70">
            <li><a href="#" className="hover:text-brand-gold transition-colors">Wrapz</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Premium Kasavu</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Daily Wear</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-sm tracking-wider uppercase">Help</h3>
          <ul className="space-y-2 text-sm text-brand-cream/70">
            <li><a href="#" className="hover:text-brand-gold transition-colors">Size Guide</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-sm tracking-wider uppercase">Newsletter</h3>
          <p className="text-sm text-brand-cream/70 mb-4">Subscribe for 10% off your first order.</p>
          <div className="flex">
            <input type="email" placeholder="Your email" className="bg-brand-charcoal border border-brand-cream/20 px-3 py-2 text-sm w-full focus:outline-none focus:border-brand-gold text-brand-cream" />
            <button className="bg-brand-gold text-brand-charcoal px-4 py-2 text-sm font-bold hover:bg-yellow-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-brand-cream/10 text-sm text-brand-cream/50 text-center">
        &copy; {new Date().getFullYear()} Bananana. All rights reserved.
      </div>
    </footer>
  );
}
