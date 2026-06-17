<?php

namespace App\Filament\Exports;

use App\Models\Lead;
use Filament\Actions\Exports\ExportColumn;
use Filament\Actions\Exports\Exporter;
use Filament\Actions\Exports\Models\Export;

class LeadExporter extends Exporter
{
    protected static ?string $model = Lead::class;

    public static function getColumns(): array
    {
        return [
            ExportColumn::make('id')->label('ID'),
            ExportColumn::make('name')->label('Nom'),
            ExportColumn::make('email')->label('Email'),
            ExportColumn::make('business')->label('Entreprise'),
            ExportColumn::make('country')->label('Pays'),
            ExportColumn::make('phone')->label('Téléphone'),
            ExportColumn::make('whatsapp')->label('WhatsApp'),
            ExportColumn::make('monthly_orders')->label('Cdes/mois'),
            ExportColumn::make('source')->label('Source'),
            ExportColumn::make('status')->label('Statut'),
            ExportColumn::make('notes')->label('Notes'),
            ExportColumn::make('created_at')->label('Date'),
        ];
    }

    public static function getCompletedNotificationBody(Export $export): string
    {
        $count = number_format($export->successful_rows);
        return "Export terminé : {$count} lead(s) exporté(s).";
    }
}
