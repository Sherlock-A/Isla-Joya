<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventResource\Pages;
use App\Models\Event;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;
    protected static ?string $navigationIcon = 'heroicon-o-chart-bar';
    protected static ?string $navigationGroup = 'Analytics';
    protected static ?int $navigationSort = 3;
    protected static ?string $modelLabel = 'Événement';
    protected static ?string $pluralModelLabel = 'Événements';

    public static function canCreate(): bool
    {
        return false;
    }

    public static function form(Form $form): Form
    {
        return $form->schema([]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date')->dateTime('d/m/Y H:i')->sortable(),
                Tables\Columns\TextColumn::make('event')
                    ->label('Événement')->badge()->searchable()->sortable(),
                Tables\Columns\TextColumn::make('product_name')
                    ->label('Produit')->searchable(),
                Tables\Columns\TextColumn::make('source')->label('Source'),
                Tables\Columns\TextColumn::make('page')
                    ->label('Page')->limit(40),
                Tables\Columns\TextColumn::make('country')->label('Pays'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('event')
                    ->label('Type')
                    ->options(fn (): array => Event::distinct()->pluck('event', 'event')->toArray()),
                Tables\Filters\Filter::make('created_at')
                    ->label('Période')
                    ->form([
                        Forms\Components\DatePicker::make('from')->label('Du'),
                        Forms\Components\DatePicker::make('until')->label('Au'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when($data['from'], fn ($q) => $q->whereDate('created_at', '>=', $data['from']))
                            ->when($data['until'], fn ($q) => $q->whereDate('created_at', '<=', $data['until']));
                    }),
            ])
            ->actions([])
            ->bulkActions([])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEvents::route('/'),
        ];
    }
}
