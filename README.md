# Bananana — Headless E-commerce Project

## 1. Environment Setup

Copy `.env.local.example` to `.env.local` and configure your credentials:

```bash
WORDPRESS_URL="http://localhost:8080" # The local Docker instance or production URL
WC_CONSUMER_KEY="ck_your_consumer_key"
WC_CONSUMER_SECRET="cs_your_consumer_secret"
WPGRAPHQL_URL="http://localhost:8080/graphql"
REVALIDATE_SECRET="your_secret_token"
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_SECRET="your_razorpay_secret"
```

## 2. Local WordPress + WooCommerce Setup

A full local environment is provided via Docker.
1. Run `docker-compose up -d` to spin up WordPress, MySQL, and WP-CLI.
2. Wait ~20 seconds for the database to initialize.
3. Run `bash wp-setup.sh`. This script will:
   - Install and activate WooCommerce
   - Install WPGraphQL & WPGraphQL for WooCommerce
   - Install Advanced Custom Fields (ACF)
   - Seed all required product categories (Wrapz, Premium Kasavu, Daily Wear, etc.)
4. Visit `http://localhost:8080/wp-admin` to configure WooCommerce settings.

## 3. Deployment

**Frontend (Next.js)**:
- Deploy to Vercel. 
- Ensure all environment variables listed in step 1 are configured in the Vercel project settings.
- Setup a webhook in WooCommerce (`/wp-json/wc/v3/webhooks`) pointing to `https://your-vercel-domain.com/api/revalidate?secret=your_secret_token` on the `product.updated` event for on-demand Incremental Static Regeneration (ISR).

**Backend (WordPress)**:
- Deploy to a managed WordPress host (e.g. WP Engine, Kinsta, Cloudways).
- Update the `WORDPRESS_URL` and `WPGRAPHQL_URL` on Vercel to point to the production host.

## 4. Content Management

**Adding a new Product**:
1. Go to Products > Add New in WP Admin.
2. Select the category (e.g. "Premium Kasavu Mundu").
3. Set Product Data to "Variable product".
4. Add Attributes: `Size (Waist in inches)` and `Color/Print`.
5. Generate variations and set stock/price per variation.
6. Publish. The Next.js frontend will revalidate automatically via the webhook.

**Managing Homepage Content**:
- Global settings and homepage banners are managed via Advanced Custom Fields (ACF) Options page.
# bananana
