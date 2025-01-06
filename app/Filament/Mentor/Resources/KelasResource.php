<?php

namespace App\Filament\Mentor\Resources;

use App\Filament\Mentor\Resources\KelasResource\Pages;
use App\Filament\Mentor\Resources\KelasResource\RelationManagers;
use App\Models\Benefit;
use App\Models\Category;
use App\Models\Kelas;
use App\Models\Level;
use App\Models\Type;
use Awcodes\Matinee\Matinee;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Wizard;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Support\RawJs;
use Filament\Tables;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class KelasResource extends Resource
{
    protected static ?string $model = Kelas::class;

    protected static ?string $navigationIcon = 'heroicon-o-computer-desktop';
    protected static ?string $navigationGroup = 'Main Menu';
    protected static ?string $navigationLabel = 'Kelas';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Wizard::make([
                    Wizard\Step::make('Kelas')
                        ->columns(3)
                        ->schema([
                            Section::make([
                                TextInput::make('title')
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn(Set $set, ?string $state) => $set('slug', Str::slug($state)))
                                    ->required()->label('Judul')->placeholder('Judul Kelas'),
                                TextInput::make('slug')->readOnly()->placeholder('Slug Kelas'),
                                Select::make('level_id')
                                    ->label('Level Kelas')
                                    ->options(Level::all()->pluck('name', 'id'))
                                    ->required()
                                    ->searchable(),
                                Select::make('type_id')
                                    ->label('Tipe Kelas')
                                    ->options(Type::all()->pluck('name', 'id'))
                                    ->required()
                                    ->searchable(),
                                Select::make('category_id')
                                    ->label('Kategori Kelas')
                                    ->options(Category::all()->pluck('name', 'id'))
                                    ->required()
                                    ->searchable(),
                                Select::make('benefit')
                                    ->label('Benefit')
                                    ->options(Benefit::all()->pluck('name', 'name'))
                                    ->multiple()
                                    ->required()
                                    ->searchable(),
                                TextInput::make('price')->required()->placeholder('Harga')->prefix('Rp')->mask(RawJs::make('$money($input)'))
                                    ->stripCharacters(',')
                                    ->numeric(),
                                TextInput::make('discount')->placeholder('Diskon/Promo')->prefix('Rp')->mask(RawJs::make('$money($input)'))
                                    ->stripCharacters(',')
                                    ->numeric(),
                            ])->columnSpan(['lg' => 2, 'md' => 3, 'sm' => 3])->columns(1),
                            Section::make([
                                FileUpload::make('image')
                                    ->disk('public')
                                    ->directory('image-upload-server')
                                    ->label('Thumbnail')
                                    ->maxSize(3072)
                                    ->image()
                                    ->deletable(true)
                                    ->deleteUploadedFileUsing(function ($record, $file) {
                                        if (isset($record->image)) {
                                            if ($record->image == $file) {
                                                if (File::exists(public_path('storage\\' . $record->image))) {
                                                    File::delete(public_path('storage\\' . $record->image));
                                                }
                                            }
                                        }
                                    })
                                    ->required(),

                            ])->columnSpan(['lg' => 1, 'md' => 3, 'sm' => 3]),
                            Section::make([
                                Matinee::make('link_overview')
                                    ->label('Link Overview')
                                    ->showPreview(),
                                RichEditor::make('description')->label('Deskripsi')->required()->columns(1),
                            ])->columnSpan(['lg' => 3]),
                        ]),
                    Wizard\Step::make('Content')
                        ->columns(3)
                        ->schema([
                            Repeater::make('section')->label('Section')->collapsed()->cloneable()->relationship('section')
                                ->schema([
                                    TextInput::make('title')->label('Judul')->placeholder('Judul Section')->required(),
                                    TextInput::make('total_video')->label('Total Video')->placeholder('Total Video')->required()->numeric()->suffix('Video'),
                                    TextInput::make('total_duration')->label('Total Durasi Video')->placeholder('Total Durasi Video')->required(),
                                    Repeater::make('videos')->label('Video')->collapsed()->cloneable()->relationship('videos')
                                        ->schema([
                                            TextInput::make('title')->label('Judul')->placeholder('Judul Video')->required()->columnSpan(['lg' => 2, 'md' => 1, 'sm' => 1]),
                                            TextInput::make('duration')->label('Durasi')->placeholder('Durasi Video')->required(),
                                            Matinee::make('url')
                                                ->required()
                                                ->label('Url Video')
                                                ->showPreview()->columnSpan(['lg' => 3, 'md' => 1, 'sm' => 1]),
                                        ])
                                        ->columns(['lg' => 3, 'md' => 3, 'sm' => 1])->columnSpan(['lg' => 3, 'md' => 1, 'sm' => 1])
                                ])->columnSpan(['lg' => 3, 'md' => 1, 'sm' => 1])->columns(['lg' => 3, 'md' => 1, 'sm' => 1]),

                        ]),
                ])
            ])->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('No')->rowIndex(),
                TextColumn::make('title')->label('Judul')->searchable()->sortable(),
                TextColumn::make('user.name')->label('Mentor')->sortable(),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'pending' => 'warning',
                        'ditolak' => 'danger',
                        'disetujui' => 'primary',
                    })->formatStateUsing(fn($record) => match ($record->status) {
                        'pending' => 'Pending',    // Display text for 'pending'
                        'ditolak' => 'Rejected',   // Display text for 'ditolak'
                        'disetujui' => 'Approved', // Display text for 'disetujui'
                    })->icon(function ($record) {
                        return match ($record->status) {
                            'pending' => 'heroicon-s-clock',
                            'ditolak' => 'heroicon-s-x-circle',
                            'disetujui' => 'heroicon-s-check-circle',
                        };
                    }),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'ditolak' => 'Ditolak',
                        'disetujui' => 'Disetujui',
                    ]),
            ], layout: FiltersLayout::Modal)
            ->actions([
                Tables\Actions\EditAction::make()->label('')->icon('heroicon-s-pencil')->button()->color('success'),
                Tables\Actions\DeleteAction::make()->after(function ($record) {
                    File::delete(public_path('storage\\' . $record->image));
                })->icon('heroicon-o-trash')->color('danger')->button()->label(''),
                Tables\Actions\ViewAction::make()->label('')->icon('heroicon-s-eye')->button()->color('info'),
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
            'index' => Pages\ListKelas::route('/'),
            'create' => Pages\CreateKelas::route('/create'),
            'edit' => Pages\EditKelas::route('/{record}/edit'),
        ];
    }
}
