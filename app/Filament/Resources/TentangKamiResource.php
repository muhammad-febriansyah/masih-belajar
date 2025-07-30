<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TentangKamiResource\Pages;
use App\Filament\Resources\TentangKamiResource\RelationManagers;
use App\Models\TentangKami;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Filters\Filter;
use Filament\Forms\Components\Section;
use Filament\Tables\Actions\ViewAction;
use Illuminate\Database\Eloquent\Model;

class TentangKamiResource extends Resource
{
    protected static ?string $model = TentangKami::class;

    protected static ?string $navigationIcon = 'heroicon-o-flag';
    protected static ?string $navigationGroup = 'Main Menu';
    protected static ?string $navigationLabel = 'Tentang Kami';
    protected static ?int $navigationSort = 3;
    protected static ?string $modelLabel = 'Tentang Kami';
    protected static ?string $pluralModelLabel = 'Tentang Kami';

    public static function canCreate(): bool
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
                Section::make('Informasi Tentang Kami')
                    ->description('Kelola informasi tentang organisasi/perusahaan')
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul')
                            ->placeholder('Masukkan judul tentang kami')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),

                        RichEditor::make('description')
                            ->label('Deskripsi')
                            ->placeholder('Masukkan deskripsi tentang kami')
                            ->required()
                            ->columnSpanFull(),

                        FileUpload::make('image')
                            ->label('Gambar')
                            ->image()
                            ->directory('tentang-kami')
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '16:9',
                                '4:3',
                                '1:1',
                            ])
                            ->required()
                            ->maxSize(2048)
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->helperText('Upload gambar dengan format JPG, PNG, atau WebP. Maksimal 2MB.')
                            ->columnSpanFull(),
                    ])
                    ->columns(2)
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->label('Gambar')
                    ->size("120px")
                    ->defaultImageUrl(url('/images/placeholder.png')),

                TextColumn::make('title')
                    ->label('Judul')
                    ->sortable()
                    ->weight('medium')
                    ->copyable()
                    ->tooltip('Klik untuk menyalin'),

                TextColumn::make('description')
                    ->label('Deskripsi')
                    ->wrap()
                    ->html()
                    ->tooltip(function (TextColumn $column): ?string {
                        $state = $column->getState();
                        if (strlen($state) <= 50) {
                            return null;
                        }
                        return $state;
                    })

            ])
            ->filters([])
            ->actions([
                ViewAction::make()
                    ->label('Lihat')
                    ->icon('heroicon-s-eye')
                    ->button()
                    ->color('info'),
                Tables\Actions\EditAction::make()
                    ->label('Edit')
                    ->color('warning'),
                Tables\Actions\DeleteAction::make()
                    ->label('Hapus')
                    ->requiresConfirmation()
                    ->modalHeading('Hapus Data Tentang Kami')
                    ->modalDescription('Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.')
                    ->modalSubmitActionLabel('Ya, Hapus')
                    ->modalCancelActionLabel('Batal'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->label('Hapus Terpilih')
                        ->requiresConfirmation()
                        ->modalHeading('Hapus Data Terpilih')
                        ->modalDescription('Apakah Anda yakin ingin menghapus semua data yang dipilih? Tindakan ini tidak dapat dibatalkan.')
                        ->modalSubmitActionLabel('Ya, Hapus Semua')
                        ->modalCancelActionLabel('Batal'),
                ]),
            ])
            ->emptyStateActions([
                Tables\Actions\CreateAction::make()
                    ->label('Buat Data Pertama')
                    ->icon('heroicon-m-plus'),
            ])
            ->defaultSort('created_at', 'desc')
            ->striped()
            ->paginated([10, 25, 50, 100]);
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
            'index' => Pages\ListTentangKamis::route('/'),
            'create' => Pages\CreateTentangKami::route('/create'),
            'edit' => Pages\EditTentangKami::route('/{record}/edit'),
        ];
    }
}
