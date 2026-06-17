<?php

namespace App\Filament\Widgets;

use App\Models\Lead;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;

class RecentLeads extends BaseWidget
{
    protected static ?string $heading = '5 derniers leads';
    protected static ?int $sort = 3;
    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(fn (): Builder => Lead::query()->latest()->limit(5))
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date')->date('d/m/Y'),
                Tables\Columns\TextColumn::make('name')->label('Nom'),
                Tables\Columns\TextColumn::make('country')->label('Pays'),
                Tables\Columns\BadgeColumn::make('status')
                    ->label('Statut')
                    ->colors(['warning' => 'new', 'primary' => 'contacted', 'success' => 'converted']),
            ]);
    }
}
