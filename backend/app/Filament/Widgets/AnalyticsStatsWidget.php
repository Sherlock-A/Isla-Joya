<?php

namespace App\Filament\Widgets;

use App\Models\Event;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\DB;

class AnalyticsStatsWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $now = now();
        $start30  = $now->copy()->subDays(30);
        $start60  = $now->copy()->subDays(60);

        $totalEvents30 = Event::where('created_at', '>=', $start30)->count();

        $waClicks30 = Event::where('event', 'whatsapp_click')
            ->where('created_at', '>=', $start30)->count();
        $waClicks60 = Event::where('event', 'whatsapp_click')
            ->whereBetween('created_at', [$start60, $start30])->count();
        $waDelta = $waClicks60 > 0
            ? round(($waClicks30 - $waClicks60) / $waClicks60 * 100, 1)
            : 100;

        $views30 = Event::where('event', 'view_product')
            ->where('created_at', '>=', $start30)->count();

        $conversionRate = $views30 > 0
            ? round($waClicks30 / $views30 * 100, 1) . '%'
            : '—';

        $leads30 = Event::where('event', 'lead_submit')
            ->where('created_at', '>=', $start30)->count();

        return [
            Stat::make('Événements (30j)', number_format($totalEvents30))
                ->icon('heroicon-o-chart-bar')
                ->color('primary'),

            Stat::make('Clics WhatsApp (30j)', $waClicks30)
                ->description($waDelta >= 0 ? "+{$waDelta}% vs mois préc." : "{$waDelta}% vs mois préc.")
                ->color($waDelta >= 0 ? 'success' : 'danger')
                ->icon('heroicon-o-chat-bubble-left-ellipsis'),

            Stat::make('Leads (30j)', $leads30)
                ->icon('heroicon-o-users')
                ->color('warning'),

            Stat::make('Taux conversion', $conversionRate)
                ->description('WhatsApp / vue produit')
                ->icon('heroicon-o-arrow-trending-up')
                ->color('info'),
        ];
    }
}
