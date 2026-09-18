const WORDPRESS_URL = process.env.WORDPRESS_URL || "";
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY || "";
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || "";

export async function fetchWooCommerceAPI(endpoint: string, options: RequestInit = {}) {
  const url = new URL(`${WORDPRESS_URL.replace(/\/$/, '')}/wp-json/wc/v3/${endpoint}`);
  
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  
  const headers = {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url.toString(), {
    ...options,
    headers,
    next: { revalidate: 60 } 
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`WooCommerce API Error: ${response.status} ${response.statusText}`, errorText);
    throw new Error(`WooCommerce API failed: ${response.statusText}`);
  }

  return response.json();
}

export async function getProducts(query = "") {
  return fetchWooCommerceAPI(`products${query}`);
}

export async function getCategories() {
  return fetchWooCommerceAPI('products/categories?hide_empty=true&per_page=100');
}

export async function getCategoryBySlug(slug: string) {
  const categories = await fetchWooCommerceAPI(`products/categories?slug=${slug}`);
  return categories.length > 0 ? categories[0] : null;
}

export async function getProductBySlug(slug: string) {
  const products = await fetchWooCommerceAPI(`products?slug=${slug}`);
  return products.length > 0 ? products[0] : null;
}

export async function createOrder(data: any) {
  return fetchWooCommerceAPI('orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getProductReviews(productId: number) {
  return fetchWooCommerceAPI(`products/reviews?product=${productId}`);
}

export async function getOrderById(orderId: string | number) {
  return fetchWooCommerceAPI(`orders/${orderId}`);
}
