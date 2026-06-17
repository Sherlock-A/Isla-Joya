<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InstagramPostResource\Pages;
use App\Models\InstagramPost;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class InstagramPostResource extends Resource
{
    protected static ?string $model = InstagramPost::class;
    protected static ?string $navigationIcon = 'heroicon-o-camera';
    protected static ?string $navigationGroup = 'Contenu du site';
    protected static ?int $navigationSort = 4;
    protected static ?string $modelLabel = 'Post Instagram';
    protected static ?string $pluralModelLabel = 'Posts Instagram';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Image')->schema([
                Forms\Components\TextInput::make('image_url')
                    ->label('URL de l\'image')
                    ->required()
                    ->url()
                    ->maxLength(500)
                    ->placeholder('https://images.unsplash.com/photo-...')
                    ->helperText('URL Unsplash, stockage public, ou CDN — format paysage ou carré recommandé')
                    ->columnSpanFull(),
            ]),

            Forms\Components\Section::make('Contenu')->schema([
                Forms\Components\Textarea::make('caption')
                    ->label('Légende Instagram')
                    ->rows(3)
                    ->maxLength(300)
                    ->placeholder('✨ Description du post avec hashtags...')
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('post_url')
                    ->label('Lien Instagram')
                    ->url()
                    ->maxLength(500)
                    ->placeholder('https://instagram.com/isla.joya/p/...'),
                Forms\Components\TextInput::make('likes')
                    ->label('Likes')
                    ->numeric()
                    ->default(0),
            ])->columns(2),

            Forms\Components\Section::make('Affichage')->schema([
                Forms\Components\TextInput::make('sort_order')
                    ->label('Ordre d\'affichage')
                    ->numeric()
                    ->default(0),
                Forms\Components\Toggle::make('is_featured')
                    ->label('Visible sur le site')
                    ->default(true),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_url')
                    ->label('')
                    ->getStateUsing(fn (InstagramPost $r): string => $r->image_url)
                    ->size(60),
                Tables\Columns\TextColumn::make('caption')
                    ->label('Légende')
                    ->limit(60)
                    ->wrap()
                    ->searchable(),
                Tables\Columns\TextColumn::make('likes')
                    ->label('❤')
                    ->sortable(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Ordre')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->label('Visible')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Créé le')
                    ->date('d/m/Y')
                    ->sortable(),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->filters([
                Tables\Filters\TernaryFilter::make('is_featured')->label('Visible'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListInstagramPosts::route('/'),
            'create' => Pages\CreateInstagramPost::route('/create'),
            'edit'   => Pages\EditInstagramPost::route('/{record}/edit'),
        ];
    }
}
