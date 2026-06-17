<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AttributionWidget extends Widget
{
    protected static ?int $sort = 4;
    protected int|string|array $columnSpan = 'full';
    protected static string $view = 'filament.widgets.attribution';

    public function getViewData(): array
    {
        $days = 30;

        // utm_source and session_id columns require the migration to be run first
        $hasColumns = Schema::hasColumns('events', ['utm_source', 'session_id']);

        if (! $hasColumns) {
            return ['rows' => [], 'days' => $days, 'migrationPending' => true];
        }

        $rows = DB::select("
            SELECT
                COALESCE(utm_source, 'direct') AS source,
                COUNT(DISTINCT session_id)       AS sessions,
                SUM(CASE WHEN event = 'whatsapp_click' THEN 1 ELSE 0 END) AS wa_clicks,
                SUM(CASE WHEN event = 'lead_submit'    THEN 1 ELSE 0 END) AS leads,
                CASE WHEN COUNT(*) > 0
                     THEN ROUND(SUM(CASE WHEN event = 'whatsapp_click' THEN 1 ELSE 0 END) / COUNT(*) * 100, 1)
                     ELSE 0 END AS cvr
            FROM events
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL :days DAY)
            GROUP BY COALESCE(utm_source, 'direct')
            ORDER BY sessions DESC
            LIMIT 10
        ", ['days' => $days]);

        return ['rows' => $rows, 'days' => $days, 'migrationPending' => false];
    }
}
