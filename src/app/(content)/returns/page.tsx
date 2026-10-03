import Link from "next/link";

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-10 w-full">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal mb-3">Returns</h1>
      <p className="text-brand-charcoal/70 mb-8 text-base sm:text-lg">We want you to love every Bananana mundu. If you need to return an item, we make it simple.</p>

      <div className="space-y-8">
        <div className="bg-brand-offwhite p-8 rounded-sm border border-brand-charcoal/5">
          <h2 className="font-serif text-xl font-bold text-brand-charcoal mb-3">Return Window</h2>
          <p className="text-brand-charcoal/70">You can return items within <strong>7 days of delivery</strong>. Items must be unworn, unwashed, and in original condition with all tags attached.</p>
        </div>
        <div className="bg-brand-offwhite p-8 rounded-sm border border-brand-charcoal/5">
          <h2 className="font-serif text-xl font-bold text-brand-charcoal mb-3">How to Return</h2>
          <p className="text-brand-charcoal/70 mb-4">Contact us with your order ID and reason for return:</p>
          <ul className="space-y-3">
            <li><a href="https://wa.me/919847774755" target="_blank" rel="noopener noreferrer" className="text-brand-gold font-medium hover:underline">WhatsApp: +91 98477 74755</a></li>
            <li><a href="mailto:inbananana@gmail.com" className="text-brand-gold font-medium hover:underline">Email: inbananana@gmail.com</a></li>
          </ul>
        </div>
        <div className="bg-brand-offwhite p-8 rounded-sm border border-brand-charcoal/5">
          <h2 className="font-serif text-xl font-bold text-brand-charcoal mb-3">Refunds</h2>
          <p className="text-brand-charcoal/70">Once we receive and inspect the returned item, your refund will be processed within 5–7 business days to your original payment method.</p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/contact-us" className="bg-brand-charcoal text-brand-cream px-8 py-3 rounded-sm font-bold tracking-wider uppercase text-sm hover:bg-black transition-colors shadow-lg">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
