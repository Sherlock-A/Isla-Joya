<x-filament-widgets::widget>
    <x-filament::section>
        <x-slot name="heading">Funnel de conversion · {{ $days }} jours</x-slot>

        <div class="space-y-3">
            @foreach ($steps as $step)
                <div class="flex items-center gap-4">
                    <span class="text-lg w-6 text-center shrink-0">{{ $step['icon'] }}</span>
                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between text-xs mb-1">
                            <span class="font-medium text-gray-700 dark:text-gray-300">{{ $step['label'] }}</span>
                            <span class="tabular-nums text-gray-500">{{ number_format($step['count']) }}
                                <span class="text-gray-400">({{ $step['pct'] }}%)</span>
                            </span>
                        </div>
                        <div class="h-2.5 w-full rounded-full bg-gray-100 dark:bg-white/10">
                            <div
                                class="h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"
                                style="width: {{ $step['pct'] }}%"
                            ></div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
