<x-filament-widgets::widget>
    <x-filament::section>
        <x-slot name="heading">Heatmap clics · 30 jours</x-slot>

        @if ($migrationPending ?? false)
            <div class="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
                ⚠ Migration en attente — lancez <code class="font-mono">php artisan migrate</code> pour activer le heatmap.
            </div>
        @else
        <div class="grid gap-6 sm:grid-cols-2">
            {{-- Top pages --}}
            <div>
                <h4 class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Pages les plus cliquées</h4>
                <div class="space-y-2">
                    @forelse ($topPages as $row)
                        <div class="flex items-center justify-between text-sm">
                            <span class="truncate max-w-[200px] text-gray-700 dark:text-gray-300">{{ $row->page ?: '/' }}</span>
                            <span class="ml-4 shrink-0 font-semibold tabular-nums text-amber-600 dark:text-amber-400">{{ number_format($row->clicks) }}</span>
                        </div>
                    @empty
                        <p class="text-sm text-gray-400">Aucune donnée</p>
                    @endforelse
                </div>
            </div>

            {{-- Top elements --}}
            <div>
                <h4 class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Éléments les plus cliqués</h4>
                <div class="space-y-2">
                    @forelse ($topElements as $row)
                        <div class="flex items-center justify-between text-sm">
                            <code class="truncate max-w-[200px] rounded bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 text-[11px] text-gray-600 dark:text-gray-400">{{ $row->element }}</code>
                            <span class="ml-4 shrink-0 font-semibold tabular-nums text-amber-600 dark:text-amber-400">{{ number_format($row->clicks) }}</span>
                        </div>
                    @empty
                        <p class="text-sm text-gray-400">Aucune donnée</p>
                    @endforelse
                </div>
            </div>
        </div>
        @endif
    </x-filament::section>
</x-filament-widgets::widget>
