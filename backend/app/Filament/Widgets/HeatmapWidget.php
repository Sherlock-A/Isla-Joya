<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class HeatmapWidget extends Widget
{
    protected static ?int $sort = 5;
    protected int|string|array $columnSpan = 'full';
    protected static string $view = 'filament.widgets.heatmap';

    public function getViewData(): array
    {
        // Table may not exist yet if migrations are pending
        if (! Schema::hasTable('click_heatmaps')) {
            return ['topPages' => collect(), 'topElements' => collect(), 'migrationPending' => true];
        }

        $topPages = DB::table('click_heatmaps')
            ->select('page', DB::raw('COUNT(*) as clicks'))
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('page')
            ->orderByDesc('clicks')
            ->limit(5)
            ->get();

        $topElements = DB::table('click_heatmaps')
            ->select('element', DB::raw('COUNT(*) as clicks'))
            ->where('created_at', '>=', now()->subDays(30))
            ->whereNotNull('element')
            ->groupBy('element')
            ->orderByDesc('clicks')
            ->limit(8)
            ->get();

        return ['topPages' => $topPages, 'topElements' => $topElements, 'migrationPending' => false];
    }
}
