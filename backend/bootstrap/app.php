<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->prepend(\App\Http\Middleware\ForceHttps::class);
    })
    ->booted(function (): void {
        RateLimiter::for('leads', function (Request $request): Limit {
            return Limit::perMinute(10)->by($request->ip());
        });
        RateLimiter::for('events', function (Request $request): Limit {
            return Limit::perMinute(30)->by($request->ip());
        });
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
