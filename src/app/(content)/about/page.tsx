import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-brand-charcoal overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1650632784437-07f2aecafc28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Bananana Heritage"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-brand-cream mb-6 tracking-tight drop-shadow-lg">
            About Us
          </h1>
          <p className="text-lg text-brand-cream/90 max-w-xl font-medium drop-shadow-md">
            We bring the timeless elegance of Kerala mundu into modern lifestyles.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 w-full">
        <div className="prose prose-lg max-w-none text-brand-charcoal/80">
          <h2 className="font-serif text-3xl font-bold text-brand-charcoal mb-8 text-center">Our Journey</h2>
          
          <p className="mb-6 leading-relaxed">
            Our journey started with a simple vision — to celebrate the beauty of traditional Kerala attire. We believe that mundu is more than just clothing; it represents culture, identity, and elegance.
          </p>
          
          <p className="mb-6 leading-relaxed">
            From classic white kasavu mundu to modern designer styles, we carefully curate each product to meet the needs of today’s generation while preserving tradition. Crafted with premium fabrics, our collections blend tradition, comfort, and everyday style.
          </p>

          <blockquote className="border-l-4 border-brand-gold pl-6 italic my-12 text-2xl font-serif text-brand-charcoal text-center">
            “Tradition is not just worn, it is carried with pride.”
          </blockquote>

          <h2 className="font-serif text-3xl font-bold text-brand-charcoal mb-8 mt-16 text-center">Our Commitment</h2>

          <p className="mb-6 leading-relaxed">
            We are dedicated to preserving the authenticity of Kerala mundu while bringing in modern styles that suit today’s generation. Inspired by Kerala’s rich heritage and timeless elegance.
          </p>
          
          <p className="mb-12 leading-relaxed">
            Our focus is on quality, comfort, and customer satisfaction. Every product is carefully selected to ensure it meets our standards of tradition and elegance. We are committed to quality, authenticity, and customer satisfaction in every piece we offer.
          </p>
        </div>
        
        <div className="flex justify-center mt-12">
          <Link href="/category/all" className="bg-brand-charcoal text-brand-cream px-8 py-3 rounded-sm font-bold tracking-wider uppercase text-sm hover:bg-black transition-colors shadow-lg">
            Explore Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
