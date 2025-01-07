<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TestimoniResource\Pages;
use App\Filament\Resources\TestimoniResource\RelationManagers;
use App\Models\Testimoni;
use Filament\Actions\ViewAction;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\ViewAction as ActionsViewAction;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TestimoniResource extends Resource
{
    protected static ?string $model = Testimoni::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';
    protected static ?string $navigationGroup = 'Course';
    protected static ?string $navigationLabel = 'Testimoni';
    protected static ?int $navigationSort = 12;

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
                Tables\Columns\TextColumn::make('No')->rowIndex(),
                Tables\Columns\TextColumn::make('user.name')->label('Student'),
                Tables\Columns\TextColumn::make('rating')->label('Rating')->icon('heroicon-s-star')->badge()->color('warning'),
                Tables\Columns\TextColumn::make('created_at')->label('Tgl')->date(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\DeleteAction::make()->label('Hapus')->icon('heroicon-s-trash')->button()->color('danger'),
                ActionsViewAction::make()->label('Lihat')->icon('heroicon-s-eye')->button()->color('info'),
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
                Section::make('Detail Testimoni')
                    ->schema([
                        TextEntry::make('rating')->label('Rating')->icon('heroicon-s-star')->badge()->color('warning'),
                        TextEntry::make('body')->label('Testimoni'),
                        TextEntry::make('created_at')->label('Tgl')->badge()->color('success')->dateTime(),
                    ])->columnSpan(['lg' => 3, 'md' => 1, 'sm' => 1])->columns(['lg' => 2, 'md' => 1, 'sm' => 1]),
                Section::make('Detail Kelas')
                    ->schema([
                        TextEntry::make('kelas.title')->label('Judul'),
                        TextEntry::make('kelas.category.name')->label('Kategori'),
                        TextEntry::make('kelas.type.name')->label('Tipe Kelas'),
                        TextEntry::make('kelas.level.name')->label('Level Kelas'),
                        TextEntry::make('kelas.price')->label('Harga')->formatStateUsing(fn($state) => 'Rp ' . number_format($state, 0, ',', '.')),
                        TextEntry::make('kelas.created_at')->label('Dibuat Pada')->badge()->color('success')->dateTime(),
                        TextEntry::make('kelas.user.name')->label('Mentor'),
                    ])->columnSpan(['lg' => 2, 'md' => 1, 'sm' => 1]),
                Section::make()
                    ->schema([
                        ImageEntry::make('kelas.image')->label('Thumbnail')->width('100%')->height('250px'),
                    ])->columnSpan(['lg' => 1, 'md' => 1, 'sm' => 1]),

                Section::make('Detail Student')
                    ->schema([
                        TextEntry::make('user.name')->label('Nama'),
                        TextEntry::make('user.email')->label('Email'),
                        TextEntry::make('user.phone')->label('No Telepon'),
                        TextEntry::make('user.tempat_lahir')->label('Tempat Lahir'),
                        TextEntry::make('user.tanggal_lahir')->label('Tanggal Lahir'),
                        TextEntry::make('user.umur')->label('Umur'),
                        TextEntry::make('user.jk')->label('Jenis Kelamin'),
                        TextEntry::make('user.alamat')->label('Alamat'),
                    ])->columnSpan(['lg' => 3, 'md' => 1, 'sm' => 1])->columns(['lg' => 2, 'md' => 1, 'sm' => 1]),
            ])->columns(['lg' => 3, 'md' => 2, 'sm' => 1]);
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
            'index' => Pages\ListTestimonis::route('/'),
            'create' => Pages\CreateTestimoni::route('/create'),
            'edit' => Pages\EditTestimoni::route('/{record}/edit'),
        ];
    }
}
