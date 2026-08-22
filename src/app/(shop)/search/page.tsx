import { getProducts } from "@/lib/woocommerce/api";
import ProductCard from "@/components/product/ProductCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";

  // Fetch products matching the search term
  const products = await getProducts(`?search=${encodeURIComponent(query)}&per_page=20`);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 w-full min-h-[60vh]">
      <div className="mb-12 border-b border-brand-charcoal/10 pb-8 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-charcoal mb-4">
          Search Results
        </h1>
        <p className="text-brand-charcoal/70 max-w-2xl mx-auto">
          {products?.length > 0
            ? `Showing results for "${query}"`
            : `No products found for "${query}". Please try a different term.`}
        </p>
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
        <div className="text-center py-20">
          <p className="text-brand-charcoal/50 text-lg">No products found.</p>
        </div>
      )}
    </div>
  );
}
