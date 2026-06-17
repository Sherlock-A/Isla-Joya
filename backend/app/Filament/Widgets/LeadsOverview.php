<?php

namespace App\Filament\Widgets;

use App\Models\Lead;
use App\Models\Product;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class LeadsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $total = Lead::count();
        $converted = Lead::where('status', 'converted')->count();
        $rate = $total > 0 ? round($converted / $total * 100, 1) . '%' : '—';

        return [
            Stat::make('Total Leads', $total)
                ->icon('heroicon-o-users'),
            Stat::make('Nouveaux', Lead::where('status', 'new')->count())
                ->color('warning')
                ->icon('heroicon-o-bell'),
            Stat::make('Convertis', $converted)
                ->color('success')
                ->icon('heroicon-o-check-circle'),
            Stat::make('Taux de conversion', $rate)
                ->color('primary')
                ->icon('heroicon-o-arrow-trending-up'),
            Stat::make('Produits actifs', Product::where('is_active', true)->count())
                ->color('info')
                ->icon('heroicon-o-sparkles'),
        ];
    }
}
