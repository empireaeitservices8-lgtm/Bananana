import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-10 pb-12">
      {/* Hero Section: Crystal clear image with lossless rendering and transparent header */}
      <section className="relative h-[65vh] sm:h-[75vh] md:h-[82vh] min-h-[500px] md:min-h-[620px] w-full bg-[#d8bca6] overflow-hidden">
        <Image
          src="/images/about-us-hero.png"
          alt="Bananana About Us"
          fill
          unoptimized
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        {/* Soft, minimal gradient only at the very bottom edge for text legibility without obscuring the model */}
        <div className="absolute inset-x-0 bottom-0 h-36 sm:h-44 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end text-center px-4 pb-8 sm:pb-12 pointer-events-none">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-md">
            About Us
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/95 max-w-xl font-medium drop-shadow-sm">
            We bring the timeless elegance of Kerala mundu into modern lifestyles.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 w-full">
        <div className="prose prose-lg max-w-none text-brand-charcoal/80">
          <h2 className="font-serif text-3xl font-bold text-brand-charcoal mb-8 text-center">Our Journey</h2>
          
          <p className="mb-6 leading-relaxed text-justify">
            Our journey started with a simple vision — to celebrate the beauty of traditional Kerala attire. We believe that mundu is more than just clothing; it represents culture, identity, and elegance.
          </p>
          
          <p className="mb-6 leading-relaxed text-justify">
            From classic white kasavu mundu to modern designer styles, we carefully curate each product to meet the needs of today’s generation while preserving tradition. Crafted with premium fabrics, our collections blend tradition, comfort, and everyday style.
          </p>

          <blockquote className="border-l-4 border-brand-gold pl-6 italic my-12 text-2xl font-serif text-brand-charcoal text-center">
            “Tradition is not just worn, it is carried with pride.”
          </blockquote>

          <h2 className="font-serif text-3xl font-bold text-brand-charcoal mb-8 mt-16 text-center">What Makes Our Mundu Different?</h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="font-serif text-2xl font-bold text-brand-charcoal mb-3">1. Fabric</h3>
              <p className="leading-relaxed text-justify">
                We choose lightweight knit fabric for a softer, more breathable and comfortable everyday feel. From yarn to fabric, we develop our material to match our own quality requirements—giving every mundu the right softness, fall, comfort and finish. Our premium shades are designed for better colour retention, while bio-wash and silicone wash give the fabric a smoother, softer and more refined feel. Bio-washing helps reduce surface fuzz and pilling, and silicone finishing improves smoothness, flexibility and drape.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-2xl font-bold text-brand-charcoal mb-3">2. Premium Woven Elastic Waistband</h3>
              <p className="leading-relaxed text-justify">
                Our woven elastic gives a firm yet comfortable fit that stretches naturally with your movement and returns to shape after wear. It stays flat without rolling, twisting, or becoming narrow—so your mundu remains secure, neat and comfortable all day.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-2xl font-bold text-brand-charcoal mb-3">3. Carry Easy, Worry Less.</h3>
              <p className="leading-relaxed text-justify">
                Our mundu comes with a practical, easy-access pocket to keep your phone, wallet, keys and daily essentials close at hand. Enjoy traditional style with the comfort and convenience of modern everyday wear.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-2xl font-bold text-brand-charcoal mb-3">4. Checked Before It Reaches You</h3>
              <p className="leading-relaxed text-justify">
                Every mundu is carefully finished for neat stitching, clean edges and a polished look. Before packing, we check the fit, fabric, waistband, pocket, stitching and overall finish to ensure it meets our quality standards. Final garment checks commonly cover appearance, measurements, stitching, construction and loose-thread defects.
              </p>
            </div>
          </div>

          <h2 className="font-serif text-3xl font-bold text-brand-charcoal mb-8 mt-16 text-center">Our Commitment</h2>

          <p className="mb-6 leading-relaxed text-justify">
            We are dedicated to preserving the authenticity of Kerala mundu while bringing in modern styles that suit today’s generation. Inspired by Kerala’s rich heritage and timeless elegance.
          </p>
          
          <p className="mb-12 leading-relaxed text-justify">
            Our focus is on quality, comfort, and customer satisfaction. Every product is carefully selected to ensure it meets our standards of tradition and elegance. We are committed to quality, authenticity, and customer satisfaction in every piece we offer.
          </p>
        </div>
        
        <div className="flex justify-center mt-12">
          <Link href="/category/all" className="bg-brand-forest text-brand-cream px-8 py-3 rounded-sm font-bold tracking-wider uppercase text-sm hover:bg-brand-darkgreen transition-colors shadow-lg">
            Explore Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
