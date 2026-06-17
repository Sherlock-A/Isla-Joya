<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;
use Illuminate\Support\Facades\DB;

class FunnelWidget extends Widget
{
    protected static ?int $sort = 3;
    protected int|string|array $columnSpan = 'full';
    protected static string $view = 'filament.widgets.funnel';

    public function getViewData(): array
    {
        $days = 30;

        $counts = DB::table('events')
            ->select('event', DB::raw('COUNT(*) as total'))
            ->where('created_at', '>=', now()->subDays($days))
            ->groupBy('event')
            ->pluck('total', 'event')
            ->toArray();

        $steps = [
            ['label' => 'Vues de pages',     'event' => 'page_view',       'icon' => '👁'],
            ['label' => 'Vues produits',      'event' => 'view_product',    'icon' => '💎'],
            ['label' => 'Ajouts wishlist',    'event' => 'wishlist_add',    'icon' => '❤️'],
            ['label' => 'Clics WhatsApp',     'event' => 'whatsapp_click',  'icon' => '💬'],
            ['label' => 'Leads soumis',       'event' => 'lead_submit',     'icon' => '✅'],
        ];

        $topCount = max(1, ...array_map(fn ($s) => $counts[$s['event']] ?? 0, $steps));

        $data = array_map(function ($s) use ($counts, $topCount) {
            $count = $counts[$s['event']] ?? 0;
            return [
                'label' => $s['label'],
                'icon'  => $s['icon'],
                'count' => $count,
                'pct'   => round($count / $topCount * 100),
            ];
        }, $steps);

        return ['steps' => $data, 'days' => $days];
    }
}
