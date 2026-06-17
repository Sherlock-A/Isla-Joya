<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class EventController extends Controller
{
    public function store(Request $request): Response
    {
        try {
            $body    = $request->json()->all();
            $payload = $body['payload'] ?? [];

            Event::create([
                'event'        => $body['event'] ?? null,
                'ts'           => $body['ts'] ?? null,
                'source'       => $payload['source'] ?? null,
                'product_slug' => $payload['productSlug'] ?? null,
                'product_name' => $payload['productName'] ?? null,
                'page'         => $payload['page'] ?? null,
                'country'      => $payload['country'] ?? null,
            ]);
        } catch (\Throwable) {
            // analytics must never return an error
        }

        return response()->noContent();
    }
}
