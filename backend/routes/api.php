<?php

use App\Http\Controllers\Api\V1\ClickHeatmapController;
use App\Http\Controllers\Api\V1\EventController;
use App\Http\Controllers\Api\V1\FaqController;
use App\Http\Controllers\Api\V1\InstagramController;
use App\Http\Controllers\Api\V1\LeadController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\SiteSettingController;
use App\Http\Controllers\Api\V1\TestimonialController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('products',             [ProductController::class,     'index']);
    Route::get('products/{slug}',      [ProductController::class,     'show']);
    Route::get('trending',             [ProductController::class,     'trending']);
    Route::get('testimonials',         [TestimonialController::class, 'index']);
    Route::get('faqs',                 [FaqController::class,         'index']);
    Route::get('settings',             [SiteSettingController::class, 'index']);
    Route::get('instagram-posts',      [InstagramController::class,   'index']);

    Route::post('leads',          [LeadController::class,        'store'])->middleware('throttle:leads');
    Route::post('events',         [EventController::class,       'store'])->middleware('throttle:events');
    Route::post('click-heatmaps', [ClickHeatmapController::class,'store'])->middleware('throttle:60,1');
});
