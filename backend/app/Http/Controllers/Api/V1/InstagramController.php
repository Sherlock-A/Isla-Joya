<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\InstagramPost;
use Illuminate\Http\JsonResponse;

class InstagramController extends Controller
{
    public function index(): JsonResponse
    {
        $posts = InstagramPost::where('is_featured', true)
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->limit(12)
            ->get();

        return response()->json($posts);
    }
}
