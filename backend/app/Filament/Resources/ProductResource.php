<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;
    protected static ?string $navigationIcon = 'heroicon-o-sparkles';
    protected static ?string $navigationGroup = 'Catalogue';
    protected static ?int $navigationSort = 1;
    protected static ?string $modelLabel = 'Produit';
    protected static ?string $pluralModelLabel = 'Produits';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Informations')->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Nom')->required()->maxLength(120)->columnSpan(2)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (string $state, Forms\Set $set) => $set('slug', Str::slug($state))),
                Forms\Components\TextInput::make('slug')
                    ->label('Slug URL')->required()->unique(ignoreRecord: true)->maxLength(120)
                    ->helperText('Auto-généré depuis le nom'),
                Forms\Components\TextInput::make('material')
                    ->label('Matière')->required()->maxLength(120),
            ])->columns(2),

            Forms\Components\Section::make('Description')->schema([
                Forms\Components\Textarea::make('description')
                    ->label('Description produit')
                    ->rows(4)->columnSpanFull()->nullable(),
            ])->collapsible(),

            Forms\Components\Section::make('Prix & Catégorie')->schema([
                Forms\Components\TextInput::make('price')
                    ->label('Prix (€)')->numeric()->prefix('€')->required(),
                Forms\Components\Select::make('category')
                    ->label('Catégorie')->required()
                    ->options([
                        'rings'     => 'Rings',
                        'necklaces' => 'Necklaces',
                        'bracelets' => 'Bracelets',
                        'earrings'  => 'Earrings',
                    ]),
                Forms\Components\Select::make('badge')
                    ->label('Badge')
                    ->options(['new' => 'New', 'bestseller' => 'Bestseller', 'limited' => 'Limited'])
                    ->nullable(),
                Forms\Components\Select::make('tone')
                    ->label('Tone couleur')->required()
                    ->options([
                        'gold'      => 'Gold',
                        'rose'      => 'Rose',
                        'ivory'     => 'Ivory',
                        'champagne' => 'Champagne',
                        'nude'      => 'Nude',
                        'noir'      => 'Noir',
                    ]),
            ])->columns(2),

            Forms\Components\Section::make('Statistiques & Visibilité')->schema([
                Forms\Components\TextInput::make('rating')
                    ->label('Note (0–5)')->numeric()->step(0.1)->default(4.5),
                Forms\Components\TextInput::make('reviews')
                    ->label('Nb avis')->numeric()->default(0),
                Forms\Components\Toggle::make('is_bestseller')->label('Best Seller'),
                Forms\Components\Toggle::make('is_new')->label('Nouveau'),
                Forms\Components\Toggle::make('is_active')->label('Actif')->default(true),
            ])->columns(3),

            Forms\Components\Section::make('Images')->schema([
                Forms\Components\FileUpload::make('images')
                    ->label('Photos')->multiple()->image()
                    ->disk('public')
                    ->directory('products')
                    ->maxSize(3072)
                    ->acceptedFileTypes(['image/jpeg', 'image/webp', 'image/png'])
                    ->reorderable()->nullable(),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('images')
                    ->label('')
                    ->disk('public')
                    ->getStateUsing(fn (Product $record): ?string => $record->images[0] ?? null)
                    ->size(48)
                    ->defaultImageUrl(null),
                Tables\Columns\TextColumn::make('name')
                    ->label('Nom')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('category')
                    ->label('Catégorie')->badge()->sortable(),
                Tables\Columns\TextColumn::make('badge')
                    ->label('Badge')->badge()
                    ->color(fn (?string $state): string => match ($state) {
                        'new'        => 'info',
                        'bestseller' => 'success',
                        'limited'    => 'warning',
                        default      => 'gray',
                    }),
                Tables\Columns\TextColumn::make('price')
                    ->label('Prix')->money('EUR')->sortable(),
                Tables\Columns\TextColumn::make('rating')
                    ->label('Note')->sortable(),
                Tables\Columns\IconColumn::make('is_bestseller')->label('BS')->boolean(),
                Tables\Columns\IconColumn::make('is_active')->label('Actif')->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Créé le')->date('d/m/Y')->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->label('Catégorie')
                    ->options(['rings' => 'Rings', 'necklaces' => 'Necklaces', 'bracelets' => 'Bracelets', 'earrings' => 'Earrings']),
                Tables\Filters\SelectFilter::make('badge')
                    ->label('Badge')
                    ->options(['new' => 'New', 'bestseller' => 'Bestseller', 'limited' => 'Limited']),
                Tables\Filters\TernaryFilter::make('is_active')->label('Actif'),
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ReplicateAction::make()
                    ->label('Dupliquer')
                    ->beforeReplicaSaved(function (Product $replica): void {
                        $replica->slug = $replica->slug . '-copie';
                        $replica->name = $replica->name . ' (copie)';
                        $replica->is_active = false;
                    }),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\RestoreAction::make(),
                Tables\Actions\ForceDeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit'   => Pages\EditProduct::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->withTrashed();
    }
}
