<?php

namespace App\Filament\Mentor\Resources;

use App\Filament\Mentor\Resources\DataStudentResource\Pages;
use App\Filament\Mentor\Resources\DataStudentResource\RelationManagers;
use App\Models\DataStudent;
use App\Models\Transaction;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
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
                TextColumn::make("user.name")->label('Nama')->searchable(),
                TextColumn::make("user.email")->label('Email')->sortable(),
                TextColumn::make("user.phone")->label('No.Hp')->sortable(),
                TextColumn::make("user.jk")->label('Jenis Kelamin')->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make()->label('Lihat')->icon('heroicon-s-eye')->button()->color('info'),

            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Section::make()->schema([
                    TextEntry::make('user.name')->label('Nama'),
                    TextEntry::make('user.email')->label('Email'),
                    TextEntry::make('user.phone')->label('No.HP'),
                    TextEntry::make('user.tempat_lahir')->label('Tempat Lahir'),
                    TextEntry::make('user.tanggal_lahir')->label('Tanggal Lahir'),
                    TextEntry::make('user.umur')->label('Usia'),
                    TextEntry::make('user.jk')->label('Jenis Kelamin'),
                    TextEntry::make('user.alamat')->label('Alamat'),
                    TextEntry::make('user.created_at')->label('Dibuat Pada')->badge()->color('success')->dateTime(),

                ])->columnSpan(['lg' => 2])->columns(['lg' => 2]),
                Section::make()->schema([
                    ImageEntry::make('user.image')->label('Foto')->width('100%')->height('100%')->circular()

                ])->columnSpan(['lg' => 1]),
            ])->columns(3);
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
