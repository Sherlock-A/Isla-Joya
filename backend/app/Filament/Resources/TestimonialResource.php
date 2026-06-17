<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TestimonialResource\Pages;
use App\Models\Testimonial;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TestimonialResource extends Resource
{
    protected static ?string $model = Testimonial::class;
    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-ellipsis';
    protected static ?string $navigationGroup = 'Contenu du site';
    protected static ?int $navigationSort = 1;
    protected static ?string $modelLabel = 'Témoignage';
    protected static ?string $pluralModelLabel = 'Témoignages';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Textarea::make('quote')
                ->label('Citation')->required()->rows(3)->columnSpanFull(),
            Forms\Components\TextInput::make('name')
                ->label('Nom')->required()->maxLength(100),
            Forms\Components\TextInput::make('city')
                ->label('Ville & drapeau (ex: Casablanca 🇲🇦)')->maxLength(100),
            Forms\Components\TextInput::make('sort_order')
                ->label('Ordre d\'affichage')->numeric()->default(0),
            Forms\Components\Toggle::make('is_active')
                ->label('Visible')->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Nom')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('city')->label('Ville'),
                Tables\Columns\TextColumn::make('quote')->label('Citation')->limit(60)->wrap(),
                Tables\Columns\TextColumn::make('sort_order')->label('Ordre')->sortable(),
                Tables\Columns\IconColumn::make('is_active')->label('Actif')->boolean(),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->actions([Tables\Actions\EditAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListTestimonials::route('/'),
            'create' => Pages\CreateTestimonial::route('/create'),
            'edit'   => Pages\EditTestimonial::route('/{record}/edit'),
        ];
    }
}
