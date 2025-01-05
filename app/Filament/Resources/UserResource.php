<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\File;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationGroup = 'Main Menu';
    protected static ?string $navigationLabel = 'Management User';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make([
                    TextInput::make('name')
                        ->required()
                        ->label('Nama')
                        ->placeholder('Nama Lengkap'),
                    TextInput::make('email')
                        ->required()
                        ->label('Email')
                        ->placeholder('Email'),
                    TextInput::make('password')
                        ->password()
                        ->label('Password')
                        ->minLength(8)
                        ->dehydrated(fn($state) => filled($state))->nullable()
                        ->placeholder('Password'),
                    TextInput::make('tempat_lahir')
                        ->required()
                        ->label('Tempat Lahir')
                        ->placeholder('Tempat Lahir'),
                    DatePicker::make('tanggal_lahir')
                        ->required()
                        ->native(false)
                        ->label('Tanggal Lahir')
                        ->placeholder('Tanggal Lahir'),
                    TextInput::make('umur')
                        ->required()
                        ->label('Umur')
                        ->suffix('Tahun')
                        ->placeholder('Umur'),
                    TextInput::make('phone')
                        ->required()
                        ->label('Nomor Telepon')
                        ->numeric()
                        ->placeholder('Nomor Telepon'),
                    TextInput::make('alamat')
                        ->required()
                        ->label('Alamat')
                        ->placeholder('Alamat'),
                    Select::make('jk')
                        ->label('Jenis Kelamin')
                        ->options(['Laki-laki' => 'Laki-laki', 'Perempuan' => 'Perempuan'])
                        ->required()->columnSpan(['lg' => 2, 'md' => 1, 'sm' => 1]),
                ])
                    ->columnSpan(['lg' => 2, 'md' => 1, 'sm' => 1])
                    ->columns(['lg' => 2, 'md' => 1, 'sm' => 1]),
                Section::make([
                    FileUpload::make('image')
                        ->disk('public')
                        ->directory('image-upload-server')
                        ->label('Avatar')
                        ->maxSize(3072)
                        ->image()
                        ->avatar()
                        ->deletable(true)
                        ->deleteUploadedFileUsing(function ($record, $file) {
                            if (isset($record->image) && $record->image == $file) {
                                if (File::exists(public_path('storage/' . $record->image))) {
                                    File::delete(public_path('storage/' . $record->image));
                                }
                            }
                        })
                        ->required()
                        ->alignCenter()
                        ->columns(1),
                ])
                    ->columnSpan(1),
            ])
            ->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\Layout\Split::make([
                    Tables\Columns\Layout\Stack::make([
                        Tables\Columns\TextColumn::make('name')
                            ->searchable()
                            ->sortable()
                            ->weight('medium')
                            ->alignLeft(),

                        Tables\Columns\TextColumn::make('email')
                            ->label('Email address')
                            ->searchable()
                            ->sortable()
                            ->color('gray')
                            ->alignLeft(),
                    ])->space(),

                    Tables\Columns\Layout\Stack::make([
                        Tables\Columns\TextColumn::make('phone')
                            ->icon('heroicon-o-phone')
                            ->label('Phone')
                            ->alignLeft(),

                        Tables\Columns\TextColumn::make('alamat')
                            ->icon('heroicon-o-map-pin')
                            ->label('Alamat')
                            ->alignLeft(),
                    ])->space(2),
                ])->from('md'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make()->label('Edit')->icon('heroicon-s-pencil')->button()->color('success'),
                Tables\Actions\DeleteAction::make()->after(function ($record) {
                    File::delete(public_path('storage\\' . $record->image));
                })->icon('heroicon-o-trash')->color('danger')->button()->label('Hapus'),
                Tables\Actions\ViewAction::make()->label('Lihat')->icon('heroicon-s-eye')->button()->color('info'),
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
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
