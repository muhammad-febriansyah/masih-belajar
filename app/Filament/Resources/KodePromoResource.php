<?php

namespace App\Filament\Resources;

use App\Filament\Resources\KodePromoResource\Pages;
use App\Filament\Resources\KodePromoResource\RelationManagers;
use App\Models\KodePromo;
use App\Models\PromoCode;
use Filament\Forms;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\ToggleButtons;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Support\RawJs;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class KodePromoResource extends Resource
{
    protected static ?string $model = PromoCode::class;

    protected static ?string $navigationIcon = 'heroicon-o-currency-dollar';
    protected static ?string $navigationGroup = 'Course';
    protected static ?string $navigationLabel = 'Kode Promo';
    protected static ?int $navigationSort = 6;
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make()
                    ->schema([
                        TextInput::make('code')->required()->label('Kode Promo')->placeholder('Kode Promo'),
                        TextInput::make('discount')->placeholder('Potongan harga')->prefix('Rp')->mask(RawJs::make('$money($input)'))
                            ->stripCharacters(',')
                            ->numeric(),
                        ToggleButtons::make('status')
                            ->options([
                                'inactive' => 'Inactive',
                                'active' => 'Active',
                            ])
                            ->icons([
                                'inactive' => 'heroicon-o-x-circle',
                                'active' => 'heroicon-o-check-circle',
                            ])
                            ->colors([
                                'inactive' => 'danger',
                                'active' => 'info',
                            ])->inline()->label('Status'),
                    ])->columns(['lg' => 2]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make("No")->rowIndex(),
                TextColumn::make("code")->label('Kode Promo')->searchable(),
                TextColumn::make("discount")->label('Potongan Harga')->money('idr')->sortable(),
                TextColumn::make("status")->label('Status')->formatStateUsing(fn($record) => match ($record->status) {
                    'active' => 'Active',
                    'inactive' => 'Inactive',
                })->badge()->color(fn(string $state): string => match ($state) {
                    'active' => 'success',
                    'inactive' => 'danger',
                })->icon(function ($record) {
                    return match ($record->status) {
                        'active' => 'heroicon-s-check-circle',
                        'inactive' => 'heroicon-s-x-circle',
                    };
                })
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make()->label('Edit')->icon('heroicon-s-pencil')->button()->color('success'),
                Tables\Actions\DeleteAction::make()->label('Hapus')->icon('heroicon-s-trash')->button()->color('danger'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListKodePromos::route('/'),
            'create' => Pages\CreateKodePromo::route('/create'),
            'edit' => Pages\EditKodePromo::route('/{record}/edit'),
        ];
    }
}
