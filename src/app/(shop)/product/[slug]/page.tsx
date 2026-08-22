import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import AddToCartForm from "@/components/product/AddToCartForm";
import { getProductBySlug, getProducts } from "@/lib/woocommerce/api";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  // Fetch some related products
  const relatedProducts = await getProducts(`?include=${product.related_ids?.join(',') || ''}&per_page=4`);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-brand-charcoal/60 mb-8">
        <Link href="/" className="hover:text-brand-charcoal transition-colors">Home</Link>
        <span>/</span>
        <Link href="/category/all" className="hover:text-brand-charcoal transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-brand-charcoal">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mb-24">
        {/* Left: Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-4 overflow-x-auto md:w-20 flex-shrink-0">
            {product.images?.map((img: any, i: number) => (
              <button key={img.id} className={`relative aspect-[3/4] w-20 flex-shrink-0 rounded-sm overflow-hidden border-2 ${i === 0 ? 'border-brand-gold' : 'border-transparent'}`}>
                <Image src={img.src} alt={img.alt || product.name} fill className="object-cover" />
              </button>
            ))}
          </div>
          <div className="relative aspect-[3/4] w-full bg-brand-offwhite rounded-sm overflow-hidden cursor-zoom-in group">
            {product.images && product.images[0] ? (
              <Image 
                src={product.images[0].src} 
                alt={product.images[0].alt || product.name} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-125" 
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">No Image</div>
            )}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-charcoal mb-2">{product.name}</h1>
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-2xl font-bold text-brand-charcoal">₹{product.price}</span>
            {product.regular_price !== product.price && (
              <>
                <span className="text-sm text-brand-charcoal/50 line-through">₹{product.regular_price}</span>
                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-sm uppercase tracking-wider">On Sale</span>
              </>
            )}
          </div>

          <div 
            className="text-brand-charcoal/70 mb-8 leading-relaxed prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: product.short_description || product.description }}
          />

          {/* Attributes / Variants */}
          {product.attributes && product.attributes.map((attr: any) => (
             <div key={attr.id} className="mb-8">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold uppercase tracking-wider text-sm">{attr.name}</h3>
                 {attr.name.toLowerCase().includes('size') && <button className="text-sm font-bold text-brand-gold hover:underline">Size Guide</button>}
               </div>
               <div className="flex flex-wrap gap-3">
                 {attr.options.map((opt: string) => (
                   <button key={opt} className="border border-brand-charcoal/20 rounded-sm py-2 px-4 text-sm font-medium hover:border-brand-charcoal transition-colors focus:ring-2 focus:ring-brand-gold focus:outline-none">
                     {opt}
                   </button>
                 ))}
               </div>
             </div>
          ))}

          <AddToCartForm 
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              imageSrc: product.images?.[0]?.src || "/images/placeholder.png",
              slug: product.slug,
            }} 
          />

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-brand-charcoal/10 mb-8">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-offwhite flex items-center justify-center">🧶</div>
              <span className="text-xs font-medium text-brand-charcoal/80">Authentic Handloom</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-offwhite flex items-center justify-center">🔒</div>
              <span className="text-xs font-medium text-brand-charcoal/80">Secure Checkout</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-offwhite flex items-center justify-center">↩️</div>
              <span className="text-xs font-medium text-brand-charcoal/80">7-Day Returns</span>
            </div>
          </div>

          {/* Accordions */}
          {product.description && (
             <div className="border-b border-brand-charcoal/10">
               <button className="w-full py-4 flex justify-between items-center font-bold uppercase tracking-wider text-sm">
                 Full Description <span>+</span>
               </button>
             </div>
          )}
          <div className="border-b border-brand-charcoal/10">
            <button className="w-full py-4 flex justify-between items-center font-bold uppercase tracking-wider text-sm">
              Shipping & Returns <span>+</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cross-sell / Related */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section>
          <h2 className="font-serif text-3xl font-bold text-brand-charcoal mb-8 text-center">Complete the Look</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p: any) => (
              <ProductCard 
                key={p.id}
                title={p.name} 
                price={p.price || p.regular_price} 
                imageSrc={p.images?.[0]?.src || "/images/placeholder.png"} 
                slug={p.slug} 
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
