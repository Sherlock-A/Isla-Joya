<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\AnalyticsStatsWidget;
use App\Filament\Widgets\AttributionWidget;
use App\Filament\Widgets\FunnelWidget;
use App\Filament\Widgets\HeatmapWidget;
use App\Filament\Widgets\TopProductsWidget;
use Filament\Pages\Page;

class AnalyticsDashboard extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-chart-bar';
    protected static string  $view           = 'filament.pages.analytics-dashboard';
    protected static ?string $navigationLabel = 'Analytics';
    protected static ?string $title           = 'Analytics';
    protected static ?string $slug            = 'analytics';
    protected static ?int    $navigationSort  = 99;

    protected function getHeaderWidgets(): array
    {
        return [
            AnalyticsStatsWidget::class,
        ];
    }

    protected function getFooterWidgets(): array
    {
        return [
            TopProductsWidget::class,
            FunnelWidget::class,
            AttributionWidget::class,
            HeatmapWidget::class,
        ];
    }

    public function getHeaderWidgetsColumns(): int | array
    {
        return 2;
    }
}
