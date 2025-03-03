<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PotonganKelasResource\Pages;
use App\Filament\Resources\PotonganKelasResource\RelationManagers;
use App\Models\PotonganKelas;
use Filament\Forms;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Support\RawJs;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PotonganKelasResource extends Resource
{
    protected static ?string $model = PotonganKelas::class;

    protected static ?string $navigationIcon = 'heroicon-o-currency-dollar';
    protected static ?string $navigationGroup = 'Course';
    protected static ?string $navigationLabel = 'Potongan Kelas';
    protected static ?int $navigationSort = 15;

    public static function canCreate(): bool
    {
        return false;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make()->schema([
                    TextInput::make('fee')->required()->placeholder('Potongan Kelas')->prefix('Rp')->mask(RawJs::make('$money($input)'))
                        ->stripCharacters(',')
                        ->numeric(),
                ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('fee')->label('Potongan Kelas'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListPotonganKelas::route('/'),
            'create' => Pages\CreatePotonganKelas::route('/create'),
            'edit' => Pages\EditPotonganKelas::route('/{record}/edit'),
        ];
    }
}
