<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class SiteSettingController extends Controller
{
    public function index(): JsonResponse
    {
        $settings = Cache::remember('site_settings:all', 300, function () {
            return SiteSetting::pluck('value', 'key');
        });

        return response()->json($settings)->withHeaders([
            'Cache-Control' => 'public, max-age=300, stale-while-revalidate=600',
        ]);
    }
}
