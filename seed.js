require('dotenv').config({ path: '.env.local' });
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.WORDPRESS_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3"
});

const categoriesToSeed = [
  'Wrapz (Casual Mundus)',
  'Premium Kasavu Mundu',
  'Daily Wear Mundu',
  'Black Mundu - Designer Print',
  'Off White / White Cotton Mundu',
  'Left Side Designer Mundu',
  'Saranam Ayyappa Dhotis',
  'Tops'
];

async function seed() {
  console.log("Starting WooCommerce Seeding...");
  
  // 1. Seed Categories
  const existingCategoriesRes = await api.get("products/categories?per_page=100");
  const existingCategories = existingCategoriesRes.data.map(c => c.name);
  
  const categoryIds = {};
  
  for (const catName of categoriesToSeed) {
    if (!existingCategories.includes(catName)) {
      console.log(`Creating category: ${catName}`);
      const res = await api.post("products/categories", { name: catName });
      categoryIds[catName] = res.data.id;
    } else {
      console.log(`Category exists: ${catName}`);
      categoryIds[catName] = existingCategoriesRes.data.find(c => c.name === catName).id;
    }
  }

  // 2. Add some placeholder products
  const placeholderProducts = [
    {
      name: "Temple Gold Kara Mundu",
      type: "simple",
      regular_price: "1499",
      description: "Premium Kasavu mundu with a gold border.",
      short_description: "Premium Kasavu mundu.",
      categories: [ { id: categoryIds['Premium Kasavu Mundu'] } ],
      images: [ { src: "https://images.unsplash.com/photo-1650632784494-7b6d1960113f?q=80&w=1080&auto=format&fit=crop" } ]
    },
    {
      name: "Classic Black Kara",
      type: "simple",
      regular_price: "799",
      description: "Daily wear mundu with a black border.",
      short_description: "Daily wear mundu.",
      categories: [ { id: categoryIds['Daily Wear Mundu'] } ],
      images: [ { src: "https://images.unsplash.com/photo-1650632784437-07f2aecafc28?q=80&w=1080&auto=format&fit=crop" } ]
    },
    {
      name: "White Short Kurti",
      type: "simple",
      regular_price: "699",
      description: "Casual white kurti.",
      short_description: "Casual white kurti.",
      categories: [ { id: categoryIds['Tops'] } ],
      images: [ { src: "https://images.unsplash.com/photo-1670774837214-21b88943a6bb?q=80&w=1080&auto=format&fit=crop" } ]
    }
  ];

  for (const prod of placeholderProducts) {
    console.log(`Creating product: ${prod.name}`);
    await api.post("products", prod);
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
