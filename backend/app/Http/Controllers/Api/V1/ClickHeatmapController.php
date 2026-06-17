<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\ClickHeatmap;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ClickHeatmapController extends Controller
{
    public function store(Request $request): Response
    {
        try {
            ClickHeatmap::create([
                'page'       => $request->input('page'),
                'x_pct'      => $request->input('x_pct'),
                'y_pct'      => $request->input('y_pct'),
                'viewport_w' => $request->input('viewport_w'),
                'element'    => $request->input('element'),
                'session_id' => $request->input('session_id'),
            ]);
        } catch (\Throwable) {
            // heatmap must never return errors
        }

        return response()->noContent();
    }
}
