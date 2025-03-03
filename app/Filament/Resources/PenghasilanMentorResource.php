<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PenghasilanMentorResource\Pages;
use App\Filament\Resources\PenghasilanMentorResource\RelationManagers;
use App\Models\PenghasilanMentor;
use App\Models\Transaction;
use Dompdf\FrameDecorator\Text;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\Summarizers\Sum;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PenghasilanMentorResource extends Resource
{
    protected static ?string $model = Transaction::class;

    protected static ?string $navigationIcon = 'heroicon-o-credit-card';
    protected static ?string $navigationGroup = 'Course';
    protected static ?string $navigationLabel = 'Penghasilan Mentor';
    protected static ?int $navigationSort = 16;

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canEdit(Model $record): bool
    {
        return false;
    }

    public static function canDelete(Model $record): bool
    {
        return false;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make("No")->rowIndex(),
                TextColumn::make('mentor')->label('Mentor')->searchable(),
                TextColumn::make('total_transaction')->label('Kelas Terjual')->searchable()->formatStateUsing(function (string $state): string {
                    return "$state Kelas";
                }),
                TextColumn::make('total_bersih')->label('Bersih')->money('IDR')->summarize(Sum::make('total_bersih')),
                TextColumn::make('total_amount')->label('Total')->money('IDR'),
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
            'index' => Pages\ListPenghasilanMentors::route('/'),
            'create' => Pages\CreatePenghasilanMentor::route('/create'),
            'edit' => Pages\EditPenghasilanMentor::route('/{record}/edit'),
        ];
    }
}
