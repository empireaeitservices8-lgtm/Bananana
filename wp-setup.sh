#!/bin/bash
# wait for WP to be accessible
echo "Waiting for WordPress to be ready..."
sleep 20

# Install and activate WooCommerce
echo "Installing WooCommerce..."
docker-compose exec -u www-data wpcli wp plugin install woocommerce --activate

# Install WPGraphQL and WPGraphQL WooCommerce
echo "Installing WPGraphQL and WPGraphQL WooCommerce..."
docker-compose exec -u www-data wpcli wp plugin install wp-graphql --activate
docker-compose exec -u www-data wpcli wp plugin install https://github.com/wp-graphql/wp-graphql-woocommerce/releases/download/v0.12.0/wp-graphql-woocommerce.zip --activate

# Install ACF
echo "Installing Advanced Custom Fields..."
docker-compose exec -u www-data wpcli wp plugin install advanced-custom-fields --activate
docker-compose exec -u www-data wpcli wp plugin install wp-graphql-acf --activate

# Set up permalinks
docker-compose exec -u www-data wpcli wp rewrite structure '/%postname%/'
docker-compose exec -u www-data wpcli wp rewrite flush

# Seed Categories
echo "Seeding categories..."
docker-compose exec -u www-data wpcli wp wc product_category create --name="Wrapz (Casual Mundus)" --user=1
docker-compose exec -u www-data wpcli wp wc product_category create --name="Premium Kasavu Mundu" --user=1
docker-compose exec -u www-data wpcli wp wc product_category create --name="Daily Wear Mundu" --user=1
docker-compose exec -u www-data wpcli wp wc product_category create --name="Black Mundu - Designer Print" --user=1
docker-compose exec -u www-data wpcli wp wc product_category create --name="Off White / White Cotton Mundu" --user=1
docker-compose exec -u www-data wpcli wp wc product_category create --name="Left Side Designer Mundu" --user=1
docker-compose exec -u www-data wpcli wp wc product_category create --name="Saranam Ayyappa Dhotis" --user=1
docker-compose exec -u www-data wpcli wp wc product_category create --name="Tops" --user=1

echo "WordPress & WooCommerce setup complete!"
