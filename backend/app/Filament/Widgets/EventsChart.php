<?php

namespace App\Filament\Widgets;

use App\Models\Event;
use Filament\Widgets\ChartWidget;

class EventsChart extends ChartWidget
{
    protected static ?string $heading = 'Événements Analytics (30 derniers jours)';
    protected static string $chartType = 'bar';
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $counts = Event::query()
            ->where('created_at', '>=', now()->subDays(30))
            ->selectRaw('`event`, COUNT(*) as count')
            ->groupBy('event')
            ->orderByDesc('count')
            ->pluck('count', 'event');

        return [
            'datasets' => [
                [
                    'label'           => 'Occurrences',
                    'data'            => $counts->values()->toArray(),
                    'backgroundColor' => '#f59e0b',
                ],
            ],
            'labels' => $counts->keys()->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
