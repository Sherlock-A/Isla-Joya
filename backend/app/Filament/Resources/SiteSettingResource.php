<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SiteSettingResource\Pages;
use App\Models\SiteSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SiteSettingResource extends Resource
{
    protected static ?string $model = SiteSetting::class;
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationGroup = 'Contenu du site';
    protected static ?int $navigationSort = 3;
    protected static ?string $modelLabel = 'Paramètre';
    protected static ?string $pluralModelLabel = 'Paramètres du site';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('key')
                ->label('Clé (technique)')->required()->maxLength(80)->disabled(fn ($context) => $context === 'edit'),
            Forms\Components\TextInput::make('label')
                ->label('Description')->required()->maxLength(120),
            Forms\Components\Textarea::make('value')
                ->label('Valeur')->rows(2)->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('label')->label('Paramètre')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('key')->label('Clé')->badge()->color('gray'),
                Tables\Columns\TextColumn::make('value')->label('Valeur')->limit(60)->wrap(),
                Tables\Columns\TextColumn::make('updated_at')->label('Modifié le')->dateTime('d/m/Y H:i')->sortable(),
            ])
            ->actions([Tables\Actions\EditAction::make()->label('Modifier')])
            ->paginated(false);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListSiteSettings::route('/'),
            'create' => Pages\CreateSiteSetting::route('/create'),
            'edit'   => Pages\EditSiteSetting::route('/{record}/edit'),
        ];
    }
}
