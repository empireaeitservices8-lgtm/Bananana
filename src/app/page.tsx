import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { getProducts, getCategories } from "@/lib/woocommerce/api";

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
  const featuredCategories = uniqueCategories.slice(0, 4);

  // Fetch a product image for categories that don't have a thumbnail
  const featuredCategoriesWithImages = await Promise.all(
    featuredCategories.map(async (cat: any) => {
      let imgSrc = cat.image?.src;
      if (!imgSrc) {
        const catProducts = await getProducts(`?category=${cat.id}&per_page=1`);
        if (catProducts && catProducts.length > 0 && catProducts[0].images?.[0]?.src) {
          imgSrc = catProducts[0].images[0].src;
        }
      }
      return { ...cat, calculatedImage: imgSrc || "/images/placeholder.png" };
    })
  );

  return (
    <div className="flex flex-col gap-24">
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-brand-charcoal overflow-hidden">
        <Image
          src="/images/hero-banner-v2.jpg"
          alt="Bananana Modern Heritage Menswear"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-brand-cream mb-6 tracking-tight max-w-4xl drop-shadow-lg">
            The Modern Era of <span className="text-brand-gold">Kerala Heritage</span>
          </h2>
          <p className="text-lg text-brand-cream/90 mb-8 max-w-xl font-medium drop-shadow-md">
            Premium Kasavu mundus and tailored kurtis designed for the contemporary man. 
          </p>
          <div className="flex gap-4 flex-col sm:flex-row">
            <Link href="/category/premium-kasavu" className="bg-brand-gold text-brand-charcoal px-8 py-3 rounded-sm font-bold tracking-wider uppercase text-sm hover:bg-yellow-600 transition-colors shadow-lg">
              Shop Festive
            </Link>
            <Link href="/category/daily-wear" className="bg-transparent border border-brand-cream text-brand-cream px-8 py-3 rounded-sm font-bold tracking-wider uppercase text-sm hover:bg-brand-cream/10 transition-colors backdrop-blur-sm">
              Explore Daily Wear
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-serif text-3xl font-bold text-brand-charcoal">Curated Collections</h2>
          <Link href="/category/all" className="text-sm font-bold tracking-wider uppercase hover:text-brand-gold transition-colors pb-1 border-b border-current">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredCategoriesWithImages.map((cat: any) => {
            const imgSrc = cat.calculatedImage;

            return (
              <Link href={`/category/${cat.slug}`} key={cat.id} className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-brand-offwhite">
                <Image src={imgSrc} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 
                    className="text-brand-cream font-serif text-xl font-bold drop-shadow-md"
                    dangerouslySetInnerHTML={{ __html: cat.name }}
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* 3. Bestsellers */}
      <section className="bg-brand-offwhite py-20">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-brand-charcoal mb-4">Trending Now</h2>
            <p className="text-brand-charcoal/70 max-w-2xl mx-auto">Discover our most loved pieces, handpicked for their exceptional quality and timeless style.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products && products.length > 0 ? (
              products.map((product: any) => (
                <ProductCard 
                  key={product.id}
                  title={product.name} 
                  price={product.price || product.regular_price} 
                  imageSrc={product.images?.[0]?.src || "/images/placeholder.png"} 
                  slug={product.slug} 
                />
              ))
            ) : (
              <p className="col-span-4 text-center">Loading products...</p>
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
                <Link href="/size-guide" className="inline-block bg-brand-gold text-brand-charcoal px-10 py-4 rounded-sm font-bold tracking-wider uppercase text-sm hover:bg-yellow-600 transition-colors shadow-lg">
                  View Size Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
