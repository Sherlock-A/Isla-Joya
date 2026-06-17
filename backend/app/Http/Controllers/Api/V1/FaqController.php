<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class FaqController extends Controller
{
    public function index(): JsonResponse
    {
        $data = Cache::remember('faqs:active', 300, function () {
            return Faq::active()->get();
        });

        return response()->json($data)->withHeaders([
            'Cache-Control' => 'public, max-age=300, stale-while-revalidate=600',
        ]);
    }
}
