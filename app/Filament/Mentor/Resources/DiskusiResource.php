<?php

namespace App\Filament\Mentor\Resources;

use App\Filament\Mentor\Resources\DiskusiResource\Pages;
use App\Filament\Mentor\Resources\DiskusiResource\RelationManagers;
use App\Models\Diskusi;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\Action;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class DiskusiResource extends Resource
{
    protected static ?string $model = Diskusi::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-bottom-center-text';
    protected static ?string $navigationGroup = 'Main Menu';
    protected static ?string $navigationLabel = 'Diskusi';
    protected static ?int $navigationSort = 5;

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
                TextColumn::make('No')->rowIndex(),
                ImageColumn::make('image')->width('120px')->height('120px')->label('Foto'),
                TextColumn::make('user.name')->label('Nama')->searchable(),
                TextColumn::make('title')->label('Judul')->searchable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make()->button()->color('info'),
                Action::make('Balas')->button()->color('success')->url(fn($record) => Pages\BalasPesan::getUrl(['record' => $record->id]))->icon('heroicon-s-arrow-right'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist->schema([
            TextEntry::make('user.name')->label('Nama'),
            TextEntry::make('title')->label('Judul'),
            TextEntry::make('subject')->label('Subjek'),
            TextEntry::make('body')->label('Pesan'),
            TextEntry::make('created_at')->label('Dibuat Pada')->badge()->color('success')->dateTime(),
            ImageEntry::make('image')->width('50%')->height('50%')->label('Foto'),
            RepeatableEntry::make('BalasDiskusi')->label('Balasan')
                ->schema([
                    TextEntry::make('user.name')->label('Nama'),
                    TextEntry::make('user.role')->label('Role')->badge()->color(function ($state) {
                        return match ($state) {
                            'mentor' => 'success',
                            'student' => 'warning',
                            default => 'warning',
                        };
                    }),
                    TextEntry::make('body')
                        ->columnSpan(2)->label('Pesan'),
                ])
                ->columns(2)
        ])->columns(1);
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
            'index' => Pages\ListDiskusis::route('/'),
            'create' => Pages\CreateDiskusi::route('/create'),
            'edit' => Pages\EditDiskusi::route('/{record}/edit'),
            'balas' => Pages\BalasPesan::route('/{record}/balas'),
        ];
    }
}
