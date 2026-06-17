<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class TestimonialController extends Controller
{
    public function index(): JsonResponse
    {
        $data = Cache::remember('testimonials:active', 300, function () {
            return Testimonial::active()->get();
        });

        return response()->json($data)->withHeaders([
            'Cache-Control' => 'public, max-age=300, stale-while-revalidate=600',
        ]);
    }
}
