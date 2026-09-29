export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 w-full">
      <h1 className="font-serif text-4xl font-bold text-brand-charcoal mb-8">Terms and Conditions</h1>
      <div className="prose prose-lg max-w-none text-brand-charcoal/80 space-y-6">
        <p>Welcome to Bananana. By accessing and placing an order with Bananana, you confirm that you are in agreement with and bound by the following terms and conditions.</p>
        <h2 className="font-serif text-2xl font-bold text-brand-charcoal mt-8">1. Products</h2>
        <p>All products are subject to availability. We reserve the right to discontinue any product at any time. Prices for products are subject to change without notice.</p>
        <h2 className="font-serif text-2xl font-bold text-brand-charcoal mt-8">2. Orders</h2>
        <p>When you place an order with us, you are making an offer to purchase. We reserve the right to refuse or cancel any order for any reason.</p>
        <h2 className="font-serif text-2xl font-bold text-brand-charcoal mt-8">3. Payment</h2>
        <p>We accept payments through Razorpay. All transactions are secured and encrypted.</p>
        <h2 className="font-serif text-2xl font-bold text-brand-charcoal mt-8">4. Contact</h2>
        <p>For any queries regarding our terms, please contact us at <a href="mailto:inbananana@gmail.com" className="text-brand-gold hover:underline">inbananana@gmail.com</a>.</p>
      </div>
    </div>
  );
}
