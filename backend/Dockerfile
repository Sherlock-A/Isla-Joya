FROM php:8.3-fpm-alpine

# ─── System dependencies ───────────────────────────────────────────────────────
RUN apk add --no-cache \
    nginx supervisor \
    curl zip unzip git \
    libpng-dev libjpeg-turbo-dev freetype-dev \
    libzip-dev icu-dev oniguruma-dev \
    ca-certificates

# ─── PHP extensions ────────────────────────────────────────────────────────────
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql mbstring exif bcmath gd zip intl opcache pcntl

# OPcache — disable validate_timestamps in prod (entrypoint caches files)
RUN printf "[opcache]\nopcache.enable=1\nopcache.validate_timestamps=0\nopcache.max_accelerated_files=10000\n" \
    > /usr/local/etc/php/conf.d/opcache.ini

# ─── Composer ──────────────────────────────────────────────────────────────────
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ─── Application ───────────────────────────────────────────────────────────────
WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# ─── Configs ───────────────────────────────────────────────────────────────────
COPY .docker/nginx.conf       /etc/nginx/nginx.conf
COPY .docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY .docker/entrypoint.sh    /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]
