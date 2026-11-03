const WORDPRESS_URL = process.env.WORDPRESS_URL || "";
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY || "";
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || "";

// Automatically generate crystal-clear high-definition left-side-mundu asset if missing
if (typeof window === "undefined") {
  (async () => {
    try {
      const fs = await import("fs");
      const path = await import("path");
      const destPng = path.join(process.cwd(), "public", "images", "left-side-mundu.png");
      const destJpg = path.join(process.cwd(), "public", "images", "left-side-mundu.jpg");
      if (fs.existsSync(destPng) && fs.statSync(destPng).size > 100000) return;

      const srcImg = "C:\\Users\\SONA\\.gemini\\antigravity-ide\\brain\\40dfff8c-285b-4674-8a8c-1ae66385e5cc\\.user_uploaded\\media_1791269827558.png";
      if (!fs.existsSync(srcImg)) return;

      const sharpModule = await import("sharp");
      const sharp = sharpModule.default || sharpModule;
      const meta = await sharp(srcImg).metadata();
      const lWidth = meta.width || 400;
      const lHeight = meta.height || 600;
      const lLeft = Math.round(lWidth * 0.075);
      const lTop = Math.round(lHeight * 0.498);
      const lCropWidth = Math.round(lWidth * 0.850);
      const lCropHeight = Math.round(lHeight * 0.320);

      const processed = sharp(srcImg)
        .extract({ left: lLeft, top: lTop, width: lCropWidth, height: lCropHeight })
        .resize({ width: lCropWidth * 4, height: lCropHeight * 4, kernel: "lanczos3" })
        .sharpen({ sigma: 1.5, m1: 1.4, m2: 2.5 });

      await processed.png({ compressionLevel: 1 }).toFile(destPng);
      await sharp(destPng).jpeg({ quality: 100, chromaSubsampling: "4:4:4" }).toFile(destJpg);
      console.log("Generated high-res left-side-mundu images successfully!");
    } catch (e) {
      console.error("left-side-mundu gen error:", e);
    }

    try {
      const fs = await import("fs");
      const path = await import("path");
      const logoPath = path.join(process.cwd(), "public", "images", "logo.png");
      const destLogo = path.join(process.cwd(), "public", "images", "logo-clean.png");
      if (fs.existsSync(logoPath) && !fs.existsSync(destLogo)) {
        const sharpModule = await import("sharp");
        const sharp = sharpModule.default || sharpModule;
        await sharp(logoPath).trim().toFile(destLogo);
        console.log("Trimmed logo-clean.png created successfully!");
      }
    } catch (e) {
      console.error("logo trim error:", e);
    }
  })();
}

function cleanProductData(item: any): any {
  if (!item || typeof item !== "object") return item;

  const sanitizeText = (text: any): any => {
    if (typeof text !== "string") return text;
    return text
      .replace(/<p[^>]*>[\s\S]*?waist[\s\S]*?size[\s\S]*?<\/p>/gi, "")
      .replace(/<[^>]*>[\s\S]*?waist[\s\S]*?size[\s\S]*?<\/[^>]*>/gi, "")
      .replace(/waist[\s\S]*?size[^\n<.]*(?:0nly|only)?[^\n<.]*available[^\n<.]*/gi, "")
      .replace(/waist\s*size\s*28\s*-\s*32\s*(?:0nly|only)?\s*available/gi, "")
      .replace(/<p>\s*<\/p>/gi, "")
      .trim();
  };

  if (item.description) {
    item.description = sanitizeText(item.description);
  }
  if (item.short_description) {
    item.short_description = sanitizeText(item.short_description);
  }

  return item;
}

function cleanProductsResponse(data: any): any {
  if (Array.isArray(data)) {
    return data.map(cleanProductData);
  }
  return cleanProductData(data);
}

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

  const data = await response.json();
  return cleanProductsResponse(data);
}

function getFallbackData() {
  try {
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(process.cwd(), "public", "wc_products.json");
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (err) {
    console.error("Failed to read fallback data:", err);
  }
  return null;
}

export async function getProducts(query = "") {
  try {
    return await fetchWooCommerceAPI(`products${query}`);
  } catch (e) {
    console.warn("Using fallback products:", e);
    const fallback = getFallbackData();
    return cleanProductsResponse(fallback?.products || []);
  }
}

export async function getCategories() {
  try {
    return await fetchWooCommerceAPI('products/categories?hide_empty=true&per_page=100');
  } catch (e) {
    console.warn("Using fallback categories:", e);
    const fallback = getFallbackData();
    return fallback?.allCategories || [];
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const categories = await fetchWooCommerceAPI(`products/categories?slug=${slug}`);
    return categories.length > 0 ? categories[0] : null;
  } catch (e) {
    console.warn(`Using fallback category for slug: ${slug}`, e);
    const fallback = getFallbackData();
    const found = fallback?.allCategories?.find((cat: any) => cat.slug === slug);
    return found || null;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const products = await fetchWooCommerceAPI(`products?slug=${slug}`);
    return products.length > 0 ? products[0] : null;
  } catch (e) {
    console.warn(`Using fallback product for slug: ${slug}`, e);
    const fallback = getFallbackData();
    const found = fallback?.products?.find((p: any) => p.slug === slug);
    return found ? cleanProductData(found) : null;
  }
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

export async function getAllReviews(limit = 6) {
  try {
    return await fetchWooCommerceAPI(`products/reviews?per_page=${limit}&status=approved`);
  } catch (e) {
    console.warn("Failed to fetch WooCommerce reviews:", e);
    return [];
  }
}
