#!/bin/sh
set -e

# Require APP_KEY — never start with an empty key
if [ -z "$APP_KEY" ]; then
    echo "ERROR: APP_KEY is not set."
    echo "  Generate one locally:  php artisan key:generate --show"
    echo "  Then set it on Fly.io: fly secrets set APP_KEY=<value>"
    exit 1
fi

# TiDB Cloud Serverless requires SSL — use the Alpine CA bundle
: "${MYSQL_ATTR_SSL_CA:=/etc/ssl/certs/ca-certificates.crt}"
export MYSQL_ATTR_SSL_CA

# Run pending migrations (idempotent on subsequent deploys)
php artisan migrate --force --no-interaction

# Cache config / routes / views for production speed
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Storage symlink (idempotent)
php artisan storage:link --force 2>/dev/null || true

# Hand off to supervisord (manages nginx + php-fpm)
exec /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf
