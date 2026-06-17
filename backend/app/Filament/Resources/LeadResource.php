<?php

namespace App\Filament\Resources;

use App\Filament\Exports\LeadExporter;
use App\Filament\Resources\LeadResource\Pages;
use App\Models\Lead;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Collection;

class LeadResource extends Resource
{
    protected static ?string $model = Lead::class;
    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationGroup = 'Leads';
    protected static ?int $navigationSort = 2;
    protected static ?string $modelLabel = 'Lead';
    protected static ?string $pluralModelLabel = 'Leads';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Contact')->schema([
                Forms\Components\TextInput::make('name')->label('Nom')->disabled(),
                Forms\Components\TextInput::make('email')->label('Email')->disabled(),
                Forms\Components\TextInput::make('business')->label('Entreprise')->disabled(),
                Forms\Components\TextInput::make('country')->label('Pays')->disabled(),
                Forms\Components\TextInput::make('phone')->label('Téléphone')->disabled(),
                Forms\Components\TextInput::make('whatsapp')->label('WhatsApp')->disabled(),
                Forms\Components\TextInput::make('monthly_orders')->label('Cdes / mois')->disabled(),
            ])->columns(2),

            Forms\Components\Section::make('Suivi CRM')->schema([
                Forms\Components\Select::make('status')
                    ->label('Statut')->required()
                    ->options(['new' => 'Nouveau', 'contacted' => 'Contacté', 'converted' => 'Converti']),
                Forms\Components\Textarea::make('notes')
                    ->label('Notes internes')->rows(4)->columnSpanFull(),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date')->date('d/m/Y')->sortable(),
                Tables\Columns\TextColumn::make('name')
                    ->label('Nom')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->label('Email')->searchable()->toggleable(),
                Tables\Columns\TextColumn::make('business')
                    ->label('Entreprise')->searchable(),
                Tables\Columns\TextColumn::make('country')
                    ->label('Pays')->sortable(),
                Tables\Columns\TextColumn::make('phone')
                    ->label('Tél')->searchable(),
                Tables\Columns\TextColumn::make('whatsapp')
                    ->label('WhatsApp')
                    ->url(fn (Lead $record): string => $record->whatsapp
                        ? 'https://wa.me/' . preg_replace('/\D/', '', $record->whatsapp)
                        : '#')
                    ->openUrlInNewTab(),
                Tables\Columns\TextColumn::make('monthly_orders')->label('Cdes/mois'),
                Tables\Columns\BadgeColumn::make('status')
                    ->label('Statut')
                    ->colors([
                        'warning' => 'new',
                        'primary' => 'contacted',
                        'success' => 'converted',
                    ])
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'new'       => 'Nouveau',
                        'contacted' => 'Contacté',
                        'converted' => 'Converti',
                        default     => $state,
                    }),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Statut')
                    ->options(['new' => 'Nouveau', 'contacted' => 'Contacté', 'converted' => 'Converti']),
                Tables\Filters\SelectFilter::make('country')
                    ->label('Pays')
                    ->options(fn (): array => Lead::distinct()->pluck('country', 'country')->filter()->toArray()),
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
            ->headerActions([
                Tables\Actions\ExportAction::make()->exporter(LeadExporter::class)->label('Exporter CSV'),
            ])
            ->actions([
                Tables\Actions\EditAction::make()->label('Suivi'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\BulkAction::make('mark_contacted')
                        ->label('Marquer : contacté')
                        ->icon('heroicon-o-phone')
                        ->requiresConfirmation()
                        ->action(fn(Collection $records) => $records->each->update(['status' => 'contacted'])),
                    Tables\Actions\BulkAction::make('mark_converted')
                        ->label('Marquer : converti')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->requiresConfirmation()
                        ->action(fn(Collection $records) => $records->each->update(['status' => 'converted'])),
                    Tables\Actions\DeleteBulkAction::make(),
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
            'index'  => Pages\ListLeads::route('/'),
            'create' => Pages\CreateLead::route('/create'),
            'edit'   => Pages\EditLead::route('/{record}/edit'),
        ];
    }
}
