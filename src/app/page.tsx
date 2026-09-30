import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { getProducts, getCategories, getAllReviews } from "@/lib/woocommerce/api";
import WhyBananaSection from "@/components/home/WhyBananaSection";
import ConcernCareSection from "@/components/home/ConcernCareSection";
import CuratedCollectionsSection, { CuratedCollectionItem } from "@/components/home/CuratedCollectionsSection";
import CelebrityReviewsSection from "@/components/home/CelebrityReviewsSection";

export default async function Home() {
  // Fetch real products, categories, and verified reviews from WooCommerce in parallel
  const [products, allCategories, rawReviews] = await Promise.all([
    getProducts("?per_page=20").catch(() => []),
    getCategories().catch(() => []),
    getAllReviews(6).catch(() => [])
  ]);

  // Target EXACTLY the 7 requested Curated Collections
  const TARGET_COLLECTIONS = [
    {
      key: "designer-mund",
      displayName: "Designer mund",
      searchTerms: ["designer", "designer-mund", "print"],
      defaultDescription: "Designed by Us, Made for Your Wardrobe.",
      fallbackImage: "/images/bananana_lifestyle_drape_1787382308249.jpg",
      fallbackSlug: "all"
    },
    {
      key: "daily-wear-mund",
      displayName: "Daily wear mund",
      searchTerms: ["daily", "daily-wear", "daily_wear", "daily-wear-mund"],
      defaultDescription: "Comfort You Can Wear Every Day.",
      fallbackImage: "/images/hero-banner.jpg",
      fallbackSlug: "daily-wear"
    },
    {
      key: "premium-kasavu",
      displayName: "Premium Kasavu",
      searchTerms: ["kasavu", "premium-kasavu", "border", "gold"],
      defaultDescription: "find a premium Kasavu border that suits your style.",
      fallbackImage: "https://images.unsplash.com/photo-1650632784049-3aded83f8e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      fallbackSlug: "all"
    },
    {
      key: "left-side-mund",
      displayName: "Left side mund",
      searchTerms: ["left", "left-side", "left-side-mund"],
      defaultDescription: "Made for Your Left-Side Style.",
      fallbackImage: "/images/bananana_hero_banner_1787382262199.jpg",
      fallbackSlug: "all"
    },
    {
      key: "festive-collection",
      displayName: "Festive collection",
      searchTerms: ["festive", "festive-collection", "celebration", "onam"],
      defaultDescription: "Celebrate Every Moment With Us.",
      fallbackImage: "/images/hero-banner-v2.jpg",
      fallbackSlug: "festive"
    },
    {
      key: "chill-stuffs",
      displayName: "Chill stuffs",
      searchTerms: ["chill", "chill-stuffs", "casual", "drops"],
      defaultDescription: "Fresh Drops. Made to Move.",
      fallbackImage: "/images/bananana_lifestyle_drape_1787382308249.jpg",
      fallbackSlug: "all"
    },
    {
      key: "complete-your-look",
      displayName: "Complete Your Look",
      searchTerms: ["complete", "kurta", "t-shirt", "kurti", "apparel"],
      defaultDescription: "tshirt, kurta",
      fallbackImage: "/images/bananana_product_kurti_1787382292698.jpg",
      fallbackSlug: "all"
    }
  ];

  // Resolve collection cards with high-definition imagery and functional shop links
  const curatedCollections: CuratedCollectionItem[] = await Promise.all(
    TARGET_COLLECTIONS.map(async (target) => {
      const matchedCat = allCategories?.find((cat: any) => {
        const slug = (cat.slug || "").toLowerCase();
        const name = (cat.name || "").toLowerCase();
        return target.searchTerms.some(term => slug.includes(term) || name.includes(term));
      });

      let imgSrc = matchedCat?.image?.src;
      if (matchedCat && !imgSrc) {
        try {
          const catProducts = await getProducts(`?category=${matchedCat.id}&per_page=1`);
          if (catProducts && catProducts.length > 0 && catProducts[0].images?.[0]?.src) {
            imgSrc = catProducts[0].images[0].src;
          }
        } catch (e) {
          console.error(`Failed to fetch product image for ${matchedCat.name}:`, e);
        }
      }

      if (!imgSrc || target.key === "left-side-mund") {
        imgSrc = target.fallbackImage;
      }

      // Ensure valid shop link: matched category if found, else valid fallback route
      const linkUrl = matchedCat ? `/category/${matchedCat.slug}` : `/category/${target.fallbackSlug}`;

      return {
        id: matchedCat?.id || target.key,
        name: target.displayName,
        slug: matchedCat?.slug || target.key,
        description: target.defaultDescription,
        imageSrc: imgSrc,
        linkUrl
      };
    })
  );

  // Map verified reviews if present in WooCommerce
  const verifiedReviews = rawReviews?.map((r: any) => ({
    id: r.id,
    name: r.reviewer,
    content: r.review,
    rating: r.rating || 5,
    role: "Verified Patron",
    verified: true
  })) || [];

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* 1. Existing Hero Video Section */}
      <section className="relative h-[72vh] min-h-[480px] max-h-[640px] w-full bg-brand-charcoal overflow-hidden">
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
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-cream mb-4 tracking-tight max-w-4xl drop-shadow-lg">
            A Mundu That <span className="text-brand-gold">Moves With You</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-brand-cream/90 mb-6 max-w-xl font-medium drop-shadow-md">
            Soft comfort, a flexible woven elastic waistband, a secure pocket, and a polished finish—everything you need in one modern mundu.
          </p>
          <div className="flex gap-4 flex-col sm:flex-row">
            <Link
              href="/category/all"
              className="bg-brand-gold text-brand-charcoal px-7 py-3 rounded-sm font-bold tracking-wider uppercase text-xs hover:bg-yellow-600 transition-colors shadow-lg"
            >
              Upgrade Your Mundu
            </Link>
          </div>
        </div>
      </section>

      {/* 2 & 3. Why Bananana? Section + Expandable What Makes Our Mundu Different? */}
      <WhyBananaSection />

      {/* 4 & 5. Your Concern Our Care + 3-Image Seamless Infinite Auto-Scroll Carousel */}
      <ConcernCareSection />

      {/* 6, 7, 8, 9. Curated Collections + Seamless Infinite Auto-Scroll Carousel */}
      <CuratedCollectionsSection collections={curatedCollections} />

      {/* 11. Existing Remaining Section: Trending Now (Bestsellers) */}
      <section className="bg-brand-offwhite py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-center mb-8 md:mb-10">
            <span className="text-brand-gold text-[10px] sm:text-xs uppercase font-bold tracking-widest block mb-1.5">Most Wanted</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-brand-charcoal mb-3">Trending Now</h2>
            <div className="w-12 h-0.5 bg-brand-gold mx-auto mb-3" />
            <p className="text-brand-charcoal/70 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
              Discover our most loved pieces, handpicked for their exceptional quality and timeless style.
            </p>
          </div>
          <div className="flex overflow-x-auto gap-4 sm:gap-6 snap-x snap-mandatory pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {products && products.length > 0 ? (
              products.map((product: any) => (
                <div key={product.id} className="flex-none w-[70vw] sm:w-[42vw] md:w-[260px] lg:w-[280px] snap-start">
                  <ProductCard 
                    title={product.name} 
                    price={product.price || product.regular_price} 
                    imageSrc={product.images?.[0]?.src || "/images/placeholder.png"} 
                    slug={product.slug} 
                    id={product.id}
                  />
                </div>
              ))
            ) : (
              <p className="w-full text-center py-8 text-brand-charcoal/60">Loading products...</p>
            )}
          </div>
        </div>
      </section>

      {/* 13. Existing Remaining Section: Size & Fit Banner */}
      <section className="bg-brand-charcoal w-full overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Image Side */}
            <div className="w-full md:w-1/2 relative min-h-[320px] md:min-h-[420px]">
              <Image 
                src="/images/size-guide-banner.jpg" 
                alt="Tailoring a Kasavu Mundu" 
                fill 
                className="object-cover" 
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Text Side */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 md:p-14 lg:p-16 text-brand-cream">
              <span className="text-brand-gold text-[10px] sm:text-xs uppercase font-bold tracking-widest block mb-1.5">Tailored Precision</span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                Find Your <span className="text-brand-gold italic">Perfect Fit.</span>
              </h2>
              <div className="w-12 h-0.5 bg-brand-gold mb-4" />
              <p className="text-brand-cream/80 mb-6 md:mb-8 text-xs sm:text-sm md:text-base leading-relaxed max-w-md">
                Unlike traditional one-size-fits-all, our mundus are meticulously tailored by waist size. Experience a flawless drape without the excess bulk, designed for the modern silhouette.
              </p>
              <div>
                <Link 
                  href="/category/all" 
                  className="inline-block bg-brand-gold text-brand-charcoal px-7 py-3 rounded-sm font-bold tracking-wider uppercase text-xs hover:bg-yellow-600 transition-colors shadow-lg"
                >
                  Shop The Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Celebrity Review Storytelling Carousel (Matching WhatsApp Video Reference) */}
      <CelebrityReviewsSection />

      {/* 14. Existing Remaining Section: WhatsApp CTA */}
      <section className="bg-brand-offwhite py-12 md:py-16 px-4 w-full border-t border-brand-charcoal/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-brand-charcoal mb-3">
            Have Questions? Chat With Us
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto mb-3" />
          <p className="text-brand-charcoal/70 mb-6 max-w-lg mx-auto text-xs sm:text-sm md:text-base">
            Our team is ready to help you find the perfect mundu. Reach out on WhatsApp for quick, personal support.
          </p>
          <a
            href="https://wa.me/919847774755"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-7 py-3 rounded-sm font-bold tracking-wider uppercase text-xs hover:bg-[#1ebe5c] transition-colors shadow-lg"
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
