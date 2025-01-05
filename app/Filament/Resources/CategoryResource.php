<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CategoryResource\Pages;
use App\Filament\Resources\CategoryResource\RelationManagers;
use App\Models\Category;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class CategoryResource extends Resource
{
    protected static ?string $model = Category::class;

    protected static ?string $navigationIcon = 'heroicon-o-funnel';
    protected static ?string $navigationGroup = 'Course';
    protected static ?string $navigationLabel = 'Kategori Kelas';
    protected static ?int $navigationSort = 6;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make()
                    ->schema([
                        TextInput::make('name')
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn(Set $set, ?string $state) => $set('slug', Str::slug($state)))
                            ->required()->label('Kategori'),
                        TextInput::make('slug')->readOnly(),
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
                            })->columnSpan(['lg' => 2]),
                    ])->columns(['lg' => 2]),

            ])->columns([['lg' => 2]]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('No')->rowIndex(),
                TextColumn::make('name')->label('Kategori')->searchable()->sortable(),
                TextColumn::make('slug')->label('Slug')->sortable(),
                ImageColumn::make('image')->label('Foto/gambar')->width(50)->height(50),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make()->label('Edit')->icon('heroicon-s-pencil')->button()->color('success'),
                Tables\Actions\DeleteAction::make()->after(function ($record) {
                    File::delete(public_path('storage\\' . $record->image));
                })->icon('heroicon-o-trash')->color('danger')->button(),
            ])
            ->bulkActions([
                DeleteBulkAction::make()
                    ->after(function ($records) {
                        foreach ($records as $record) {
                            File::delete(public_path('storage\\' . $record->image));
                        }
                    }),
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
            'index' => Pages\ListCategories::route('/'),
            'create' => Pages\CreateCategory::route('/create'),
            'edit' => Pages\EditCategory::route('/{record}/edit'),
        ];
    }
}
