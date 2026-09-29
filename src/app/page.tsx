import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { getProducts, getCategories } from "@/lib/woocommerce/api";

import AutoScrollCarousel from "@/components/ui/AutoScrollCarousel";


export default async function Home() {
  // Fetch real products and categories from WooCommerce
  const [products, allCategories] = await Promise.all([
    getProducts("?per_page=4"),
    getCategories()
  ]);

  const uniqueCategories: any[] = [];
  const names = new Set();
  if (allCategories) {
    for (const cat of allCategories) {
      const normalizedName = cat.name.trim().toLowerCase();
      if (cat.slug !== 'uncategorized' && cat.count > 0 && !names.has(normalizedName)) {
        uniqueCategories.push(cat);
        names.add(normalizedName);
      }
    }
  }
  // Target four curated collections
  const TARGET_COLLECTIONS = [
    {
      key: "casual",
      displayName: "Casual",
      searchTerms: ["casual", "wrapz"],
      defaultDescription: "Everyday comfort meets effortless style. Lightweight, breathable, and made for the modern man who values ease without compromising elegance.",
      fallbackImage: "/images/bananana_hero_banner_1787382262199.jpg"
    },
    {
      key: "cotton",
      displayName: "Cotton",
      searchTerms: ["cotton", "white-cotton", "off-white"],
      defaultDescription: "Pure, natural, and breathable. Our cotton mundus are crafted for those who appreciate the understated luxury of premium natural fabrics.",
      fallbackImage: "/images/bananana_product_white_mundu_1787382278051.jpg"
    },
    {
      key: "daily-wear",
      displayName: "Daily Wear Mund",
      searchTerms: ["daily-wear", "daily wear", "daily_wear", "daily-wear-mund"],
      defaultDescription: "Built for daily life. Soft knit fabric, a convenient pocket, and a woven elastic waistband—everything you need for an all-day comfortable mundu.",
      fallbackImage: "/images/hero-banner.jpg"
    },
    {
      key: "designer",
      displayName: "Designer Mund",
      searchTerms: ["designer", "designer-print", "print", "designer-mund"],
      defaultDescription: "Where tradition meets artistry. Each piece features intricate borders and premium finishes that make every occasion unforgettable.",
      fallbackImage: "/images/bananana_lifestyle_drape_1787382308249.jpg"
    }
  ];

  // Resolve collection cards with WooCommerce categories and images (reusing existing project image logic)
  const curatedCollections = await Promise.all(
    TARGET_COLLECTIONS.map(async (target) => {
      const matchedCat = allCategories?.find((cat: any) => {
        const slug = (cat.slug || "").toLowerCase();
        const name = (cat.name || "").toLowerCase();
        return target.searchTerms.some(term => slug.includes(term) || name.includes(term));
      });

      let imgSrc = matchedCat?.image?.src;
      const slug = matchedCat?.slug || target.key;
      const name = target.displayName;
      let description = target.defaultDescription;

      if (matchedCat) {
        if (matchedCat.description && matchedCat.description.trim().length > 10) {
          description = matchedCat.description.replace(/<[^>]+>/g, "").trim();
        }
        // If category doesn't have an image, fetch first product image in that category (existing project behavior)
        if (!imgSrc) {
          try {
            const catProducts = await getProducts(`?category=${matchedCat.id}&per_page=1`);
            if (catProducts && catProducts.length > 0 && catProducts[0].images?.[0]?.src) {
              imgSrc = catProducts[0].images[0].src;
            }
          } catch (e) {
            console.error(`Failed to fetch product image for ${matchedCat.name}:`, e);
          }
        }
      }

      // Safe fallback to existing project image asset if WooCommerce has no thumbnail
      if (!imgSrc) {
        imgSrc = target.fallbackImage;
      }

      return {
        id: matchedCat?.id || target.key,
        name,
        slug,
        description,
        imageSrc: imgSrc
      };
    })
  );

  return (
    <div className="flex flex-col gap-24">
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-brand-charcoal overflow-hidden">
        <video
          src="/videoherosection.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-brand-cream mb-6 tracking-tight max-w-4xl drop-shadow-lg">
            A Mundu That <span className="text-brand-gold">Moves With You</span>
          </h2>
          <p className="text-lg text-brand-cream/90 mb-8 max-w-xl font-medium drop-shadow-md">
            Soft comfort, a flexible woven elastic waistband, a secure pocket, and a polished finish—everything you need in one modern mundu.
          </p>
          <div className="flex gap-4 flex-col sm:flex-row">
            <Link href="/category/all" className="bg-brand-gold text-brand-charcoal px-8 py-3 rounded-sm font-bold tracking-wider uppercase text-sm hover:bg-yellow-600 transition-colors shadow-lg">
              Upgrade Your Mundu
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Curated Collections — Auto-scroll carousel with card style and images */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-serif text-3xl font-bold text-brand-charcoal">Curated Collections</h2>
          <Link href="/category/all" className="text-sm font-bold tracking-wider uppercase hover:text-brand-gold transition-colors pb-1 border-b border-current">View All</Link>
        </div>
        <AutoScrollCarousel
          speedMs={3000}
          className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {curatedCollections.map((col) => (
            <div
              key={col.id}
              className="flex-none w-[80vw] sm:w-[50vw] md:w-[320px] lg:w-[360px] snap-start bg-white border border-brand-charcoal/8 rounded-sm overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* [COLLECTION IMAGE] - Main visual element */}
              <div className="relative aspect-[4/3] w-full bg-brand-offwhite overflow-hidden">
                <Image
                  src={col.imageSrc}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 640px) 80vw, (max-width: 768px) 50vw, (max-width: 1024px) 320px, 360px"
                />
              </div>

              {/* Collection Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-charcoal mb-2 uppercase tracking-wide">
                  {col.name}
                </h3>
                <p className="text-brand-charcoal/70 text-sm leading-relaxed mb-6 flex-1">
                  {col.description}
                </p>
                <div className="mt-auto">
                  <Link
                    href={`/category/${col.slug}`}
                    className="inline-block bg-brand-charcoal text-brand-cream px-6 py-2.5 rounded-sm font-bold tracking-wider uppercase text-xs hover:bg-black transition-colors"
                  >
                    Shop Mund
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </AutoScrollCarousel>
      </section>

      {/* 3. Bestsellers */}
      <section className="bg-brand-offwhite py-20">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-brand-charcoal mb-4">Trending Now</h2>
            <p className="text-brand-charcoal/70 max-w-2xl mx-auto">Discover our most loved pieces, handpicked for their exceptional quality and timeless style.</p>
          </div>
          <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {products && products.length > 0 ? (
              products.map((product: any) => (
                <div key={product.id} className="flex-none w-[45vw] sm:w-[35vw] md:w-[280px] lg:w-[300px] snap-start">
                  <ProductCard 
                    title={product.name} 
                    price={product.price || product.regular_price} 
                    imageSrc={product.images?.[0]?.src || "/images/placeholder.png"} 
                    slug={product.slug} 
                  />
                </div>
              ))
            ) : (
              <p className="w-full text-center py-8">Loading products...</p>
            )}
          </div>
        </div>
      </section>

      {/* 4. The Craft / Brand Story */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
             <Image src="https://images.unsplash.com/photo-1650632784049-3aded83f8e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Kasavu Weaving" fill className="object-cover" />
          </div>
          <div className="max-w-lg">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-charcoal mb-6">Woven with Heritage. Crafted for Today.</h2>
            <p className="text-brand-charcoal/70 mb-6 leading-relaxed">
              Every Bananana mundu is a testament to the centuries-old weaving traditions of Kerala. We blend authentic craftsmanship with modern aesthetics to create garments that feel both rooted and refreshingly new.
            </p>
            <Link href="/about" className="inline-flex items-center text-brand-gold font-bold uppercase tracking-wider text-sm hover:text-yellow-700 transition-colors">
              Discover Our Story 
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Size & Fit Banner */}
      <section className="bg-brand-charcoal w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Image Side */}
            <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-[500px]">
              <Image 
                src="/images/size-guide-banner.jpg" 
                alt="Tailoring a Kasavu Mundu" 
                fill 
                className="object-cover"
              />
            </div>
            {/* Text Side */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-16 md:p-20 text-brand-cream">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Find Your <span className="text-brand-gold">Perfect Fit.</span>
              </h2>
              <p className="text-brand-cream/80 mb-10 text-lg leading-relaxed max-w-md">
                Unlike traditional one-size-fits-all, our mundus are meticulously tailored by waist size. Experience a flawless drape without the excess bulk, designed for the modern silhouette.
              </p>
              <div>
                <Link href="/category/all" className="inline-block bg-brand-gold text-brand-charcoal px-10 py-4 rounded-sm font-bold tracking-wider uppercase text-sm hover:bg-yellow-600 transition-colors shadow-lg">
                  Shop The Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. What Makes Our Product Different */}
      <section className="bg-brand-cream py-20 md:py-32 px-4 w-full border-b border-brand-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-charcoal leading-tight mb-4">
              What Makes Our Product <span className="text-brand-gold italic">Different?</span>
            </h2>
            <div className="w-20 h-1 bg-brand-gold mx-auto mb-6"></div>
            <p className="text-brand-charcoal/70 text-lg max-w-2xl mx-auto">
              Three things we obsess over to make sure every Bananana mundu is truly different.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* 1 — Material Quality */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-charcoal/5 hover:shadow-lg transition-all duration-300 flex flex-col text-center">
              <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-serif text-2xl font-bold">1</div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-charcoal mb-4">Material Quality</h3>
              <p className="text-brand-charcoal/70 leading-relaxed text-sm">
                Lightweight knit fabric developed for a softer, more breathable and comfortable everyday feel. Bio-wash and silicone wash give the fabric a smoother, refined finish with better colour retention.
              </p>
            </div>

            {/* 2 — Pocket */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-charcoal/5 hover:shadow-lg transition-all duration-300 flex flex-col text-center">
              <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-serif text-2xl font-bold">2</div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-charcoal mb-4">A Convenient Pocket</h3>
              <p className="text-brand-charcoal/70 leading-relaxed text-sm">
                A practical, easy-access pocket to keep your phone, wallet, and daily essentials close at hand. Traditional style with the convenience of modern everyday wear.
              </p>
            </div>

            {/* 3 — Woven Elastic Rib */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-charcoal/5 hover:shadow-lg transition-all duration-300 flex flex-col text-center">
              <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-serif text-2xl font-bold">3</div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-charcoal mb-4">A Woven Elastic Rib</h3>
              <p className="text-brand-charcoal/70 leading-relaxed text-sm">
                Our woven elastic gives a firm yet comfortable fit that stretches naturally and stays flat without rolling or twisting—keeping your mundu secure and neat all day.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/about" className="inline-flex items-center text-brand-gold font-bold uppercase tracking-wider text-sm hover:text-yellow-700 transition-colors">
              Read The Full Details
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Celebrity Review Section */}
      {/* NOTE: No real celebrity review asset exists in the project. Section structure created — client must provide celebrity name, image and quote to populate it. */}
      {/* Placeholder: hidden until real content is provided */}

      {/* 8. WhatsApp CTA */}
      <section className="bg-brand-offwhite py-16 px-4 w-full">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-charcoal mb-4">
            Have Questions? Chat With Us
          </h2>
          <p className="text-brand-charcoal/70 mb-8 max-w-lg mx-auto">
            Our team is ready to help you find the perfect mundu. Reach out on WhatsApp for quick, personal support.
          </p>
          <a
            href="https://wa.me/919847774755"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-sm font-bold tracking-wider uppercase text-sm hover:bg-[#1ebe5c] transition-colors shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
