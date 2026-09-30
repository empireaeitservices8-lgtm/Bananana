import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import AddToCartForm from "@/components/product/AddToCartForm";
import ProductDetailsAccordion from "@/components/product/ProductDetailsAccordion";
import Accordion from "@/components/ui/Accordion";
import CustomerReviews from "@/components/product/CustomerReviews";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import { getProductBySlug, getProducts, getProductReviews } from "@/lib/woocommerce/api";
import { notFound } from "next/navigation";
import { ShieldCheck, RefreshCcw } from "lucide-react";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  // Fetch some related products
  const relatedProducts = await getProducts(`?include=${product.related_ids?.join(',') || ''}&per_page=4`);

  // Fetch product reviews
  const initialReviews = await getProductReviews(product.id).catch(() => []);

  // Filter out size attribute to pass the rest as product details
  const detailsAttributes = product.attributes?.filter((attr: any) => !attr.name.toLowerCase().includes('size')) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-brand-charcoal/60 mb-8">
        <Link href="/" className="hover:text-brand-charcoal transition-colors">Home</Link>
        <span>/</span>
        <Link href="/category/all" className="hover:text-brand-charcoal transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-brand-charcoal font-serif">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mb-24">
        {/* Left: Interactive Image Gallery */}
        <ProductImageGallery
          images={product.images || []}
          productName={product.name}
        />

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

          <AddToCartForm 
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              imageSrc: product.images?.[0]?.src || "/images/placeholder.png",
              slug: product.slug,
            }}
            sizes={product.attributes?.find((a: any) => a.name.toLowerCase().includes('size'))?.options}
          />

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 py-6 border-y border-brand-charcoal/10 my-8">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-brand-offwhite flex items-center justify-center text-brand-gold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-brand-charcoal/80">Secure Checkout</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-brand-offwhite flex items-center justify-center text-brand-gold">
                <RefreshCcw className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-brand-charcoal/80">7-Day Returns</span>
            </div>
          </div>

          {/* Accordions */}
          <ProductDetailsAccordion attributes={detailsAttributes} product={product} />
          
          {product.description && (
            <Accordion title="Full Description">
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </Accordion>
          )}
          
          <Accordion title="Shipping & Returns">
            <p className="mb-2"><strong>Shipping:</strong> We offer flat-rate shipping of ₹50 across India. Orders are processed and dispatched within 1-2 business days via Shiprocket.</p>
            <p><strong>Returns:</strong> We accept returns within 7 days of delivery. Items must be unworn, unwashed, and in their original condition with all tags attached.</p>
          </Accordion>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <CustomerReviews productId={product.id} initialReviews={initialReviews} />

      {/* Cross-sell / Related */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-3xl font-bold text-brand-charcoal mb-8 text-center">Similar products you may like</h2>
          <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {relatedProducts.map((p: any) => (
              <div key={p.id} className="flex-none w-[45vw] sm:w-[35vw] md:w-[280px] lg:w-[300px] snap-start">
                <ProductCard 
                  title={p.name} 
                  price={p.price || p.regular_price} 
                  imageSrc={p.images?.[0]?.src || "/images/placeholder.png"} 
                  slug={p.slug} 
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
