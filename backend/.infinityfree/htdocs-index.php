<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Load env vars from PHP file (InfinityFree deletes .env, SetEnv not supported)
$envFile = __DIR__.'/../laravel/bootstrap/env.php';
if (file_exists($envFile)) {
    require_once $envFile;
}

if (file_exists($maintenance = __DIR__.'/../laravel/storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/../laravel/vendor/autoload.php';

/** @var Application $app */
$app = require_once __DIR__.'/../laravel/bootstrap/app.php';

$app->bind('path.public', fn() => __DIR__);

$app->handleRequest(Request::capture());
