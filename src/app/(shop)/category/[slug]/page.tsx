import ProductCard from "@/components/product/ProductCard";
import { getCategoryBySlug, getProducts } from "@/lib/woocommerce/api";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // 1. Get the category details from Woo
  const category = await getCategoryBySlug(slug);
  
  if (!category && slug !== 'all') {
    notFound();
  }

  // 2. Get products for this category
  const categoryQuery = slug !== 'all' && category ? `?category=${category.id}&per_page=20` : `?per_page=20`;
  const products = await getProducts(categoryQuery);

  const categoryName = category ? category.name : 'All Products';
  const categoryDescription = category?.description || `Explore our curated collection of premium ${categoryName.toLowerCase()}, crafted with traditional techniques and designed for the modern man.`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full flex flex-col md:flex-row gap-8">
      {/* Sidebar Filter Panel */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-24">
          <div className="mb-6 pb-6 border-b border-brand-charcoal/10">
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Size (Waist)</h3>
            <div className="space-y-2">
              {['S (28-30)', 'M (32-34)', 'L (36-38)', 'XL (40-42)'].map(size => (
                <label key={size} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-brand-charcoal border-brand-charcoal/30 rounded-sm focus:ring-brand-gold" />
                  <span className="text-sm text-brand-charcoal/80 hover:text-brand-charcoal transition-colors">{size}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="mb-6 pb-6 border-b border-brand-charcoal/10">
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Occasion</h3>
            <div className="space-y-2">
              {['Daily Wear', 'Festive', 'Devotional (Sabarimala)'].map(occ => (
                <label key={occ} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-brand-charcoal border-brand-charcoal/30 rounded-sm focus:ring-brand-gold" />
                  <span className="text-sm text-brand-charcoal/80 hover:text-brand-charcoal transition-colors">{occ}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Price Range</h3>
            <div className="space-y-2">
              {['Under ₹999', '₹1000 - ₹1999', '₹2000 & Above'].map(price => (
                <label key={price} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-brand-charcoal border-brand-charcoal/30 rounded-sm focus:ring-brand-gold" />
                  <span className="text-sm text-brand-charcoal/80 hover:text-brand-charcoal transition-colors">{price}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Product Grid */}
      <div className="flex-1">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-brand-charcoal/60 mb-4">
            <a href="/" className="hover:text-brand-charcoal transition-colors">Home</a>
            <span>/</span>
            <a href="/category/all" className="hover:text-brand-charcoal transition-colors">Shop</a>
            {category && (
              <>
                <span>/</span>
                <span className="text-brand-charcoal capitalize">{categoryName}</span>
              </>
            )}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-charcoal mb-4 capitalize">
            {categoryName}
          </h1>
          <p 
            className="text-brand-charcoal/70 max-w-2xl"
            dangerouslySetInnerHTML={{ __html: categoryDescription }}
          />
        </div>

        <div className="flex justify-between items-center mb-6 pb-4 border-b border-brand-charcoal/10">
          <span className="text-sm text-brand-charcoal/70">{products?.length || 0} Products</span>
          <select className="text-sm border-none bg-transparent font-medium cursor-pointer focus:ring-0 text-brand-charcoal">
            <option>Sort by: Popularity</option>
            <option>Sort by: Newest Arrivals</option>
            <option>Sort by: Price (Low to High)</option>
            <option>Sort by: Price (High to Low)</option>
          </select>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
            {products.map((product: any) => (
              <ProductCard 
                key={product.id}
                title={product.name} 
                price={product.price || product.regular_price} 
                imageSrc={product.images?.[0]?.src || "/images/placeholder.png"} 
                slug={product.slug} 
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-brand-charcoal/50">
            No products found in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
