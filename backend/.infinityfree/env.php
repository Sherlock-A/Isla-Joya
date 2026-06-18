<?php
// Environment config for InfinityFree
// Upload this file via FTP to /laravel/bootstrap/env.php (NOT committed to git)

putenv('APP_NAME=Isla Joya');
putenv('APP_ENV=production');
putenv('APP_KEY=base64:JrNUKEjxGtfCd0fKtd6VXom0CBmiYGSa/+8mAq+IQyU=');
putenv('APP_DEBUG=false');
putenv('APP_URL=https://islajoya.kesug.com');
putenv('APP_LOCALE=en');
putenv('BCRYPT_ROUNDS=12');
putenv('LOG_CHANNEL=single');
putenv('LOG_LEVEL=error');
putenv('DB_CONNECTION=mysql');
putenv('DB_HOST=gateway01.eu-central-1.prod.aws.tidbcloud.com');
putenv('DB_PORT=4000');
putenv('DB_DATABASE=islajoya');
putenv('DB_USERNAME=66eWerAuTa9UQCP.root');
putenv('DB_PASSWORD=bg0eoqCiAnIbx11N');
putenv('MYSQL_ATTR_SSL_CA=/etc/ssl/certs/ca-certificates.crt');
putenv('FILESYSTEM_DISK=infinityfree');
putenv('SESSION_DRIVER=file');
putenv('SESSION_LIFETIME=120');
putenv('CACHE_STORE=file');
putenv('QUEUE_CONNECTION=sync');
putenv('FRONTEND_URL=https://islajoya.vercel.app');
putenv('REVALIDATE_SECRET=465b87c4386899d23a5e91bb9b8fb68b48904b86be8d2e55');
putenv('MAIL_MAILER=log');
