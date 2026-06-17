<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $cacheKey = 'products:' . md5($request->getQueryString() ?? '');

        $products = Cache::remember($cacheKey, 60, function () use ($request) {
            $query = Product::active()->orderBy('created_at', 'desc');

            if ($search = $request->query('q')) {
                $query->where(fn ($q) => $q
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('material', 'like', "%{$search}%"));
            }
            if ($request->has('category')) {
                $query->where('category', $request->query('category'));
            }
            if ($request->has('badge')) {
                $query->where('badge', $request->query('badge'));
            }
            if ($request->boolean('bestsellers')) {
                $query->where('is_bestseller', true);
            }
            if ($request->boolean('new_arrivals')) {
                $query->where('is_new', true);
            }

            $limit = min((int) $request->query('limit', 50), 100);

            return $query->limit($limit)->get();
        });

        return response()->json($products)->withHeaders([
            'Cache-Control' => 'public, max-age=60, stale-while-revalidate=300',
            'Vary'          => 'Accept',
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $product = Cache::remember("product:{$slug}", 60, function () use ($slug) {
            return Product::active()->where('slug', $slug)->firstOrFail();
        });

        return response()->json($product)->withHeaders([
            'Cache-Control' => 'public, max-age=60, stale-while-revalidate=300',
        ]);
    }
}
