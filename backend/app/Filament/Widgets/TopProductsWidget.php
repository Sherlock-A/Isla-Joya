<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;
use Illuminate\Support\Facades\DB;

class TopProductsWidget extends Widget
{
    protected static ?int $sort = 2;
    protected int|string|array $columnSpan = 'full';
    protected static string $view = 'filament.widgets.top-products';

    public function getViewData(): array
    {
        $days = 30;

        $rows = DB::select("
            SELECT
                p.name,
                p.slug,
                COALESCE(v.views, 0)      AS views,
                COALESCE(w.wa_clicks, 0)  AS wa_clicks,
                CASE WHEN COALESCE(v.views, 0) > 0
                     THEN ROUND(COALESCE(w.wa_clicks, 0) / v.views * 100, 1)
                     ELSE 0 END            AS cvr
            FROM products p
            LEFT JOIN (
                SELECT product_slug, COUNT(*) AS views
                FROM events
                WHERE event = 'view_product' AND product_slug IS NOT NULL
                  AND created_at >= DATE_SUB(NOW(), INTERVAL :days1 DAY)
                GROUP BY product_slug
            ) v ON p.slug = v.product_slug
            LEFT JOIN (
                SELECT product_slug, COUNT(*) AS wa_clicks
                FROM events
                WHERE event = 'whatsapp_click' AND product_slug IS NOT NULL
                  AND created_at >= DATE_SUB(NOW(), INTERVAL :days2 DAY)
                GROUP BY product_slug
            ) w ON p.slug = w.product_slug
            WHERE p.is_active = 1
            ORDER BY views DESC
            LIMIT 10
        ", ['days1' => $days, 'days2' => $days]);

        return ['rows' => $rows];
    }
}
