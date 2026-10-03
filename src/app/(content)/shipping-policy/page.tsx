import Link from "next/link";

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-10 w-full">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal mb-5">Shipping Policy</h1>
      <div className="prose prose-lg max-w-none text-brand-charcoal/80 space-y-6">
        <p>We are committed to delivering your Bananana mundu safely and promptly.</p>
        <h2 className="font-serif text-2xl font-bold text-brand-charcoal mt-8">Processing Time</h2>
        <p>Orders are processed and dispatched within 1–2 business days of payment confirmation.</p>
        <h2 className="font-serif text-2xl font-bold text-brand-charcoal mt-8">Shipping Rates</h2>
        <p>We offer flat-rate shipping of ₹50 across India. Free shipping may be available on orders above a certain amount — check our latest promotions.</p>
        <h2 className="font-serif text-2xl font-bold text-brand-charcoal mt-8">Delivery Time</h2>
        <p>Standard delivery typically takes 3–7 business days depending on your location within India. Deliveries are made via Shiprocket partner couriers.</p>
        <h2 className="font-serif text-2xl font-bold text-brand-charcoal mt-8">Order Tracking</h2>
        <p>Once your order is dispatched, you can track it using our <Link href="/track-order" className="text-brand-gold hover:underline">Track Order</Link> page.</p>
        <h2 className="font-serif text-2xl font-bold text-brand-charcoal mt-8">Contact</h2>
        <p>For shipping queries, contact us at <a href="mailto:inbananana@gmail.com" className="text-brand-gold hover:underline">inbananana@gmail.com</a> or WhatsApp us at <a href="https://wa.me/919847774755" className="text-brand-gold hover:underline">+91 98477 74755</a>.</p>
      </div>
    </div>
  );
}
