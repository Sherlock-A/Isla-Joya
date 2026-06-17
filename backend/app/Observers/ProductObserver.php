<?php

namespace App\Observers;

use App\Models\Product;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ProductObserver
{
    public function saved(Product $product): void
    {
        $this->invalidate($product);
    }

    public function deleted(Product $product): void
    {
        $this->invalidate($product, true);
    }

    private function invalidate(Product $product, bool $all = false): void
    {
        Cache::flush();

        $frontendUrl = rtrim(env('FRONTEND_URL', 'http://localhost:3000'), '/');
        $secret      = env('REVALIDATE_SECRET', '');

        if (!$secret) {
            return;
        }

        try {
            Http::timeout(5)
                ->withHeaders(['x-revalidate-secret' => $secret])
                ->post("{$frontendUrl}/api/revalidate", [
                    'slug' => $product->slug,
                    'type' => $all ? 'all' : 'product',
                ]);
        } catch (\Throwable $e) {
            Log::warning("ISR revalidation failed: {$e->getMessage()}");
        }
    }
}
