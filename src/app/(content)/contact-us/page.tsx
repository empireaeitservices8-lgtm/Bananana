import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-10 pb-12">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[280px] w-full bg-brand-forest overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1650632782979-30efe0e526ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Bananana Contact Us"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-darkgreen/90 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-cream mb-4 tracking-tight drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-brand-cream/90 max-w-xl font-medium drop-shadow-md">
            We&apos;re here to help. Reach out for support, inquiries, or custom orders.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Contact Info */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-brand-charcoal mb-8">Get In Touch</h2>
            <p className="text-brand-charcoal/70 mb-10 leading-relaxed">
              Whether you have a question about our traditional kasavu mundus, need sizing advice, or want to discuss a bulk order for an upcoming event, our team is ready to assist you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-offwhite flex items-center justify-center text-xl flex-shrink-0">📞</div>
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-sm mb-1 text-brand-charcoal">Phone & WhatsApp</h3>
                  <a href="tel:+919847774755" className="text-brand-charcoal/80 hover:text-brand-gold transition-colors font-medium text-lg">
                    +91 98477 74755
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-offwhite flex items-center justify-center text-xl flex-shrink-0">✉️</div>
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-sm mb-1 text-brand-charcoal">Email Address</h3>
                  <a href="mailto:inbananana@gmail.com" className="text-brand-charcoal/80 hover:text-brand-gold transition-colors font-medium text-lg">
                    inbananana@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-offwhite flex items-center justify-center text-xl flex-shrink-0">📍</div>
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-sm mb-1 text-brand-charcoal">Office Address</h3>
                  <p className="text-brand-charcoal/80 leading-relaxed">
                    Chemmalamattom P.O,<br />
                    Kottayam, Kerala - 686508<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-brand-offwhite p-8 md:p-10 rounded-sm border border-brand-charcoal/5">
            <h2 className="font-serif text-2xl font-bold text-brand-charcoal mb-6">General Contact Inquiries</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wider text-brand-charcoal mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 bg-white border border-brand-charcoal/20 rounded-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider text-brand-charcoal mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 bg-white border border-brand-charcoal/20 rounded-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold uppercase tracking-wider text-brand-charcoal mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-brand-charcoal/20 rounded-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="button" 
                className="w-full bg-brand-forest text-brand-cream font-bold tracking-wider uppercase text-sm py-4 rounded-sm hover:bg-brand-darkgreen transition-colors shadow-md cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
          
        </div>
      </section>
    </div>
  );
}
