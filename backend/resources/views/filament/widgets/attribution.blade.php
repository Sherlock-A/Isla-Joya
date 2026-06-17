<x-filament-widgets::widget>
    <x-filament::section>
        <x-slot name="heading">Attribution marketing · {{ $days }} jours</x-slot>

        @if ($migrationPending ?? false)
            <div class="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
                ⚠ Migration en attente — lancez <code class="font-mono">php artisan migrate</code> pour activer l'attribution UTM.
            </div>
        @else
        <table class="w-full text-sm">
            <thead>
                <tr class="border-b border-gray-200 dark:border-white/10 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th class="py-2 pr-4">Source</th>
                    <th class="py-2 pr-4 text-right">Sessions</th>
                    <th class="py-2 pr-4 text-right">WhatsApp</th>
                    <th class="py-2 pr-4 text-right">Leads</th>
                    <th class="py-2 text-right">CVR %</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($rows as $row)
                    <tr class="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                        <td class="py-2.5 pr-4">
                            <span class="inline-flex items-center gap-1.5 font-medium text-gray-900 dark:text-white">
                                @switch($row->source)
                                    @case('instagram') 📸 @break
                                    @case('facebook')  📘 @break
                                    @case('tiktok')    🎵 @break
                                    @case('whatsapp')  💬 @break
                                    @case('google')    🔍 @break
                                    @default           🌐
                                @endswitch
                                {{ $row->source }}
                            </span>
                        </td>
                        <td class="py-2.5 pr-4 text-right tabular-nums text-gray-600 dark:text-gray-400">{{ number_format($row->sessions) }}</td>
                        <td class="py-2.5 pr-4 text-right tabular-nums text-emerald-600 dark:text-emerald-400">{{ number_format($row->wa_clicks) }}</td>
                        <td class="py-2.5 pr-4 text-right tabular-nums text-blue-600 dark:text-blue-400">{{ number_format($row->leads) }}</td>
                        <td class="py-2.5 text-right">
                            <span class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium
                                {{ $row->cvr >= 5 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400' }}">
                                {{ $row->cvr }}%
                            </span>
                        </td>
                    </tr>
                @endforeach
                @if (empty($rows))
                    <tr>
                        <td colspan="5" class="py-8 text-center text-gray-400">
                            Aucune donnée — les UTM seront capturés dès le prochain trafic
                        </td>
                    </tr>
                @endif
            </tbody>
        </table>
        @endif
    </x-filament::section>
</x-filament-widgets::widget>
