<x-filament-widgets::widget>
    <x-filament::section>
        <x-slot name="heading">Top produits (30 jours)</x-slot>

        <table class="w-full text-sm">
            <thead>
                <tr class="border-b border-gray-200 dark:border-white/10 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th class="py-2 pr-4">Produit</th>
                    <th class="py-2 pr-4 text-right">Vues</th>
                    <th class="py-2 pr-4 text-right">Clics WhatsApp</th>
                    <th class="py-2 text-right">CVR %</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($rows as $row)
                    <tr class="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                        <td class="py-2.5 pr-4 font-medium text-gray-900 dark:text-white">
                            {{ $row->name }}
                        </td>
                        <td class="py-2.5 pr-4 text-right tabular-nums text-gray-600 dark:text-gray-400">
                            {{ number_format($row->views) }}
                        </td>
                        <td class="py-2.5 pr-4 text-right tabular-nums text-emerald-600 dark:text-emerald-400">
                            {{ number_format($row->wa_clicks) }}
                        </td>
                        <td class="py-2.5 text-right tabular-nums">
                            <span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
                                {{ $row->cvr >= 10 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300' }}">
                                {{ $row->cvr }}%
                            </span>
                        </td>
                    </tr>
                @endforeach

                @if (empty($rows))
                    <tr>
                        <td colspan="4" class="py-8 text-center text-gray-400">
                            Aucune donnée sur les 30 derniers jours
                        </td>
                    </tr>
                @endif
            </tbody>
        </table>
    </x-filament::section>
</x-filament-widgets::widget>
