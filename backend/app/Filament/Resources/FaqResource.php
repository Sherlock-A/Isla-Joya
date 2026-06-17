<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FaqResource\Pages;
use App\Models\Faq;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class FaqResource extends Resource
{
    protected static ?string $model = Faq::class;
    protected static ?string $navigationIcon = 'heroicon-o-question-mark-circle';
    protected static ?string $navigationGroup = 'Contenu du site';
    protected static ?int $navigationSort = 2;
    protected static ?string $modelLabel = 'FAQ';
    protected static ?string $pluralModelLabel = 'FAQ';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('question')
                ->label('Question')->required()->maxLength(255)->columnSpanFull(),
            Forms\Components\Textarea::make('answer')
                ->label('Réponse')->required()->rows(4)->columnSpanFull(),
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
                Tables\Columns\TextColumn::make('sort_order')->label('#')->sortable(),
                Tables\Columns\TextColumn::make('question')->label('Question')->searchable()->wrap()->limit(80),
                Tables\Columns\TextColumn::make('answer')->label('Réponse')->limit(60)->wrap(),
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
            'index'  => Pages\ListFaqs::route('/'),
            'create' => Pages\CreateFaq::route('/create'),
            'edit'   => Pages\EditFaq::route('/{record}/edit'),
        ];
    }
}
