<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ListSertifikatResource\Pages;
use App\Filament\Resources\ListSertifikatResource\RelationManagers;
use App\Models\ListSertifikat;
use App\Models\UserAnswer;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ListSertifikatResource extends Resource
{
    protected static ?string $model = UserAnswer::class;

    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document';
    protected static ?string $navigationGroup = 'Course';
    protected static ?string $navigationLabel = 'List Sertifikat';
    protected static ?int $navigationSort = 14;

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canEdit(Model $record): bool
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
                TextColumn::make('user.name')->label('Nama')->searchable(),
                TextColumn::make('kelas.title')->label('Kursus')->wrap(),
                TextColumn::make('no_sertifikat')->label('Nomor Sertifikat')->formatStateUsing(function ($state) {
                    $tahun = date("Y");
                    return "AC-999862$state-$tahun";
                }),
                TextColumn::make('created_at')->label('Tgl Lulus')->dateTime(),

            ])
            ->filters([
                //
            ])
            ->actions([

                Tables\Actions\Action::make('download_sertifikat') // Nama unik di sini
                    ->label('Download')
                    ->button()
                    ->color('success')
                    ->icon('heroicon-s-cloud-arrow-down')
                    ->url(fn($record): string => route('dashboard.generateSertifikat', $record->id))
                    ->openUrlInNewTab()
                // Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListListSertifikats::route('/'),
            'create' => Pages\CreateListSertifikat::route('/create'),
            'edit' => Pages\EditListSertifikat::route('/{record}/edit'),
        ];
    }
}
