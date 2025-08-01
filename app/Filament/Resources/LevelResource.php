<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LevelResource\Pages;
use App\Filament\Resources\LevelResource\RelationManagers;
use App\Models\Level;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class LevelResource extends Resource
{
    protected static ?string $model = Level::class;

    protected static ?string $navigationIcon = 'heroicon-o-adjustments-horizontal';
    protected static ?string $navigationGroup = 'Course';
    protected static ?string $navigationLabel = 'Tingkatan Kelas';
    protected static ?int $navigationSort = 7;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make()
                    ->schema([
                        TextInput::make('name')->required()->label('Level Kelas'),
                        FileUpload::make('image')->label('Foto/gambar')->disk('public')
                            ->directory('image-upload-server')
                            ->label('Foto/gambar')
                            ->maxSize(3072)
                            ->image()
                            ->deletable(true)
                            ->deleteUploadedFileUsing(function ($record, $file) {
                                if (isset($record->image)) {
                                    if ($record->image == $file->image) {
                                        if (File::exists(public_path('storage\\' . $record->image))) {
                                            File::delete(public_path('storage\\' . $record->image));
                                        }
                                    }
                                }
                            }),
                    ])

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('No')->rowIndex(),
                TextColumn::make('name')->label('Level Kelas')->searchable(),
                ImageColumn::make('image')->label('Foto/gambar')->width(50)->height(50),

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
            'index' => Pages\ListLevels::route('/'),
            'create' => Pages\CreateLevel::route('/create'),
            'edit' => Pages\EditLevel::route('/{record}/edit'),
        ];
    }
}
