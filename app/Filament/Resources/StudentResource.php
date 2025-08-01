<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StudentResource\Pages;
use App\Filament\Resources\StudentResource\RelationManagers;
use App\Models\Student;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Filament\Notifications\Notification;

class StudentResource extends Resource
{
    protected static ?string $model = User::class;
    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationGroup = 'Main Menu';
    protected static ?string $navigationLabel = 'Data Students';
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
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make()
                    ->label('Edit')
                    ->icon('heroicon-s-pencil')
                    ->button()
                    ->color('success'),

                Tables\Actions\Action::make('reset_password')
                    ->label('Reset Password')
                    ->icon('heroicon-o-key')
                    ->button()
                    ->color('warning')
                    ->requiresConfirmation()
                    ->modalHeading('Reset Password')
                    ->modalDescription('Apakah Anda yakin ingin mereset password ke default (123)?')
                    ->modalSubmitActionLabel('Ya, Reset')
                    ->modalCancelActionLabel('Batal')
                    ->action(function (User $record) {
                        $record->update([
                            'password' => Hash::make('123')
                        ]);

                        Notification::make()
                            ->title('Password berhasil direset!')
                            ->body('Password untuk ' . $record->name . ' telah direset ke default.')
                            ->success()
                            ->send();
                    }),

                Tables\Actions\DeleteAction::make()
                    ->after(function ($record) {
                        File::delete(public_path('storage\\' . $record->image));
                    })
                    ->icon('heroicon-o-trash')
                    ->color('danger')
                    ->button()
                    ->label('Hapus'),

                Tables\Actions\ViewAction::make()
                    ->label('Lihat')
                    ->icon('heroicon-s-eye')
                    ->button()
                    ->color('info'),
            ])
            ->bulkActions([
                DeleteBulkAction::make()
                    ->after(function ($records) {
                        foreach ($records as $record) {
                            File::delete(public_path('storage\\' . $record->image));
                        }
                    }),

                Tables\Actions\BulkAction::make('bulk_reset_password')
                    ->label('Reset Password Terpilih')
                    ->icon('heroicon-o-key')
                    ->color('warning')
                    ->requiresConfirmation()
                    ->modalHeading('Reset Password Massal')
                    ->modalDescription('Apakah Anda yakin ingin mereset password semua data terpilih ke default (123)?')
                    ->modalSubmitActionLabel('Ya, Reset Semua')
                    ->modalCancelActionLabel('Batal')
                    ->action(function ($records) {
                        foreach ($records as $record) {
                            $record->update([
                                'password' => Hash::make('123')
                            ]);
                        }

                        $count = count($records);
                        Notification::make()
                            ->title('Password berhasil direset!')
                            ->body($count . ' password telah direset ke default.')
                            ->success()
                            ->send();
                    }),
            ]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Section::make()->schema([
                    TextEntry::make('name')->label('Nama'),
                    TextEntry::make('email')->label('Email'),
                    TextEntry::make('phone')->label('No.HP'),
                    TextEntry::make('tempat_lahir')->label('Tempat Lahir'),
                    TextEntry::make('tanggal_lahir')->label('Tanggal Lahir'),
                    TextEntry::make('umur')->label('Usia'),
                    TextEntry::make('jk')->label('Jenis Kelamin'),
                    TextEntry::make('alamat')->label('Alamat'),
                    TextEntry::make('created_at')->label('Dibuat Pada')->badge()->color('success')->dateTime(),

                ])->columnSpan(['lg' => 2])->columns(['lg' => 2]),
                Section::make()->schema([
                    ImageEntry::make('image')->label('Foto')->width('100%')->height('100%')->circular()

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
            'index' => Pages\ListStudents::route('/'),
            'create' => Pages\CreateStudent::route('/create'),
            'edit' => Pages\EditStudent::route('/{record}/edit'),
        ];
    }
}
