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
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      {/* Main Product Grid */}
      <div className="w-full">
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
