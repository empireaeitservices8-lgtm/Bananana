export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 w-full">
      <h1 className="font-serif text-4xl font-bold text-brand-charcoal mb-8">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none text-brand-charcoal/80 space-y-6">
        <p>At Bananana, accessible from bananana.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Bananana and how we use it.</p>
        <h2 className="font-serif text-2xl font-bold text-brand-charcoal mt-8">Information We Collect</h2>
        <p>We collect personal information you voluntarily provide when placing an order, including name, email address, shipping address, and payment information (processed securely via Razorpay).</p>
        <h2 className="font-serif text-2xl font-bold text-brand-charcoal mt-8">How We Use Your Information</h2>
        <p>Your information is used solely to process and fulfill your orders, and to communicate with you about your orders. We do not sell or share your personal information with third parties.</p>
        <h2 className="font-serif text-2xl font-bold text-brand-charcoal mt-8">Contact Us</h2>
        <p>If you have questions about our privacy practices, contact us at <a href="mailto:inbananana@gmail.com" className="text-brand-gold hover:underline">inbananana@gmail.com</a>.</p>
      </div>
    </div>
  );
}
