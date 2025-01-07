<?php

namespace App\Filament\Mentor\Resources;

use App\Filament\Mentor\Resources\DataStudentResource\Pages;
use App\Filament\Mentor\Resources\DataStudentResource\RelationManagers;
use App\Models\DataStudent;
use App\Models\Transaction;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class DataStudentResource extends Resource
{
    protected static ?string $model = Transaction::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationGroup = 'Main Menu';
    protected static ?string $navigationLabel = 'Data Students';
    protected static ?int $navigationSort = 4;

    public static function canEdit(Model $record): bool
    {
        return false;
    }

    public static function canDelete(Model $record): bool
    {
        return false;
    }

    public static function canCreate(): bool
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
                TextColumn::make("name")->label('Nama')->searchable(),
                TextColumn::make("email")->label('Email')->sortable(),
                TextColumn::make("phone")->label('No.Hp')->sortable(),
                TextColumn::make("jk")->label('Jenis Kelamin')->sortable(),
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
            'index' => Pages\ListDataStudents::route('/'),
            'create' => Pages\CreateDataStudent::route('/create'),
            'edit' => Pages\EditDataStudent::route('/{record}/edit'),
        ];
    }
}
