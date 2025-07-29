<?php

namespace App\Filament\Resources;

use App\Filament\Resources\KelasResource\Pages;
use App\Filament\Resources\KelasResource\RelationManagers;
use App\Models\Benefit;
use App\Models\Category;
use App\Models\Kelas;
use App\Models\Level;
use App\Models\Type;
use App\Models\User;
use Awcodes\Matinee\Matinee;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Wizard;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Support\RawJs;
use Filament\Tables;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Columns\SelectColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class KelasResource extends Resource
{
    protected static ?string $model = Kelas::class;

    protected static ?string $navigationIcon = 'heroicon-o-computer-desktop';
    protected static ?string $navigationGroup = 'Course';
    protected static ?string $navigationLabel = 'Kelas';
    protected static ?int $navigationSort = 10;

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canDelete(Model $record): bool
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
                Wizard::make([
                    Wizard\Step::make('Kelas')
                        ->columns(3)
                        ->completedIcon('heroicon-m-check-badge')
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
                                    ->maxSize(4072)
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
                                Textarea::make('description')->label('Deskripsi')->required()->placeholder('Deskripsi Kelas'),
                                RichEditor::make('body')->label('Detail Kelas')->required()->columns(1),
                            ])->columnSpan(['lg' => 3]),
                        ]),
                    Wizard\Step::make('Section')
                        ->columns(3)
                        ->completedIcon('heroicon-m-check-badge')
                        ->schema([
                            Repeater::make('section')->label('Section')->cloneable()->relationship('section')
                                ->schema([
                                    TextInput::make('title')->label('Judul')->placeholder('Judul Section')->required()->live(onBlur: true),
                                    TextInput::make('total_video')->label('Total Video')->placeholder('Total Video')->required()->numeric()->suffix('Video'),
                                    TextInput::make('total_duration')->label('Total Durasi Video')->placeholder('Total Durasi Video')->required(),
                                    Repeater::make('videos')->label('Video')->collapsed()->cloneable()->relationship('videos')
                                        ->schema([
                                            TextInput::make('title')->label('Judul')->placeholder('Judul Video')->required()->columnSpan(['lg' => 2, 'md' => 1, 'sm' => 1])->live(onBlur: true),
                                            TextInput::make('duration')->label('Durasi')->placeholder('Durasi Video')->required(),

                                            // Pilihan kategori video
                                            Select::make('type')
                                                ->label('Tipe Konten')
                                                ->options([
                                                    'youtube' => 'Link YouTube',
                                                    'file' => 'Upload File',
                                                    'google_drive' => 'Upload Link',
                                                ])
                                                ->required()
                                                ->columnSpan(['lg' => 2, 'md' => 1, 'sm' => 1])
                                                ->live()
                                                ->afterStateUpdated(function ($state, $set) {
                                                    $set('url', null);
                                                }),

                                            // Conditional fields berdasarkan type
                                            Group::make([
                                                // Link YouTube
                                                Matinee::make('url')
                                                    ->required()
                                                    ->label('Link YouTube')
                                                    ->showPreview()
                                                    ->visible(fn(Get $get): bool => $get('type') === 'youtube'),
                                                FileUpload::make('file')
                                                    ->disk('public')
                                                    ->directory('course-materials')
                                                    ->label('Upload File')
                                                    ->acceptedFileTypes(['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'])
                                                    ->maxSize(10240) // 10MB
                                                    ->required()
                                                    ->visible(fn(Get $get): bool => $get('type') === 'file')
                                                    ->deleteUploadedFileUsing(function ($record, $file) {
                                                        if (isset($record->file)) {
                                                            if ($record->file == $file) {
                                                                if (File::exists(public_path('storage\\' . $record->file))) {
                                                                    File::delete(public_path('storage\\' . $record->file));
                                                                }
                                                            }
                                                        }
                                                    }),

                                                TextInput::make('url_drive')
                                                    ->label('Upload Link')
                                                    ->placeholder('Masukkan link upload')
                                                    ->url()
                                                    ->required()
                                                    ->visible(fn(Get $get): bool => in_array($get('type'), ['google_drive'])),
                                            ])->columnSpan(['lg' => 3, 'md' => 1, 'sm' => 1]),

                                            // Additional fields for PDF/PPT
                                            Group::make([
                                                Textarea::make('description')
                                                    ->label('Deskripsi Materi')
                                                    ->placeholder('Deskripsi singkat tentang materi...')
                                                    ->rows(2)
                                                    ->visible(fn(Get $get): bool => in_array($get('type'), ['file', 'google_drive'])),
                                            ])->columnSpan(['lg' => 3, 'md' => 1, 'sm' => 1]),

                                        ])
                                        ->columns(['lg' => 3, 'md' => 3, 'sm' => 1])
                                        ->columnSpan(['lg' => 3, 'md' => 1, 'sm' => 1])
                                        ->itemLabel(fn(array $state): ?string => $state['title'] ?? null)
                                        ->mutateRelationshipDataBeforeCreateUsing(function (array $data): array {
                                            if ($data['type'] === 'pdf' && is_array($data['url'])) {
                                                $data['url'] = $data['url'][0] ?? null;
                                            }
                                            return $data;
                                        })
                                        ->mutateRelationshipDataBeforeSaveUsing(function (array $data): array {
                                            // Jika type adalah PDF, simpan path file
                                            if ($data['type'] === 'pdf' && is_array($data['url'])) {
                                                $data['url'] = $data['url'][0] ?? null;
                                            }
                                            return $data;
                                        })
                                ])->columnSpan(['lg' => 3, 'md' => 1, 'sm' => 1])->columns(['lg' => 3, 'md' => 1, 'sm' => 1])->itemLabel(fn(array $state): ?string => $state['title'] ?? null)->collapsed(),
                        ]),
                    Wizard\Step::make('Quiz')
                        ->columns(3)
                        ->completedIcon('heroicon-m-check-badge')
                        ->schema([
                            Repeater::make('quiz')->label('Quiz')->collapsed()->cloneable()->relationship('quiz')
                                ->schema([
                                    TextInput::make('question')->label('Pertanyaan')->placeholder('Pertanyaan')->required()->columnSpan(['lg' => 3, 'md' => 1, 'sm' => 1])->live(onBlur: true),
                                    Repeater::make('quizAnswer')->label('Jawaban')->collapsed()->cloneable()->relationship('quizAnswer')
                                        ->schema([
                                            TextInput::make('answer')->label('Jawaban Quiz')->placeholder('Jawaban Quiz')->required()->columnSpan(['lg' => 2, 'md' => 1, 'sm' => 1])->live(onBlur: true),
                                            TextInput::make('point')->label('Point Quiz')->placeholder('Point')->required()->numeric(),
                                        ])
                                        ->columns(['lg' => 3, 'md' => 3, 'sm' => 1])->columnSpan(['lg' => 3, 'md' => 1, 'sm' => 1])->itemLabel(fn(array $state): ?string => $state['answer'] ?? null),
                                ])->columnSpan(['lg' => 3, 'md' => 1, 'sm' => 1])->columns(['lg' => 3, 'md' => 1, 'sm' => 1])->itemLabel(fn(array $state): ?string => $state['question'] ?? null)->collapsed(),
                        ]),
                ])->skippable()
            ])->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('No')->rowIndex(),
                TextColumn::make('title')->label('Judul')->searchable()->sortable()->wrap(),
                TextColumn::make('user.name')->label('Mentor')->sortable(),
                TextColumn::make('created_at')->label('Tgl')->sortable()->dateTime(),
                SelectColumn::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'ditolak' => 'Ditolak',
                        'disetujui' => 'Disetujui',
                    ]),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'ditolak' => 'Ditolak',
                        'disetujui' => 'Disetujui',
                    ]),
                SelectFilter::make('type_id')->searchable()->label('Tipe Kelas')
                    ->options(Type::all()->pluck('name', 'id')),
                SelectFilter::make('category_id')->searchable()->label('Kategori Kelas')
                    ->options(Category::all()->pluck('name', 'id')),
                SelectFilter::make('user_id')->searchable()->label('Mentor')
                    ->options(User::where('role', 'mentor')->pluck('name', 'id')),
            ], layout: FiltersLayout::Modal)
            ->actions([
                Tables\Actions\EditAction::make()->label('')->icon('heroicon-s-pencil')->button()->color('success'),
                Tables\Actions\DeleteAction::make()->after(function ($record) {
                    File::delete(public_path('storage\\' . $record->image));
                })->icon('heroicon-o-trash')->color('danger')->button()->label(''),
                Tables\Actions\ViewAction::make()->label('Detail')->icon('heroicon-s-eye')->button()->color('info'),
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
