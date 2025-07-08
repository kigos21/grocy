# Stage 1: Install dependencies with Composer
FROM composer:2 as vendor

WORKDIR /app
COPY . .
RUN composer require league/flysystem-aws-s3-v3 "^3.0" --with-all-dependencies
RUN composer install --no-interaction --no-dev --prefer-dist

# Stage 2: Build the final application image
FROM php:8.3-fpm-alpine

WORKDIR /var/www/html

# Install required system packages for PHP extensions
RUN apk add --no-cache netcat-openbsd freetype-dev libjpeg-turbo-dev libpng-dev

# Install required PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql

# Copy application files and dependencies
COPY --from=vendor /app/vendor/ ./vendor/
COPY . .

# Copy and set permissions for the entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set correct permissions for storage and bootstrap cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port for PHP-FPM
EXPOSE 9000

# Set the entrypoint
ENTRYPOINT ["entrypoint.sh"]

# The main command to run when the container starts
CMD ["php-fpm"]
