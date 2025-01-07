<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TransaksiResource\Pages;
use App\Filament\Resources\TransaksiResource\RelationManagers;
use App\Models\Transaction;
use App\Models\Transaksi;
use Carbon\Carbon;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\SelectColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TransaksiResource extends Resource
{
    protected static ?string $model = Transaction::class;

    protected static ?string $navigationIcon = 'heroicon-o-banknotes';
    protected static ?string $navigationGroup = 'Course';
    protected static ?string $navigationLabel = 'Transaksi';
    protected static ?int $navigationSort = 11;

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

    public static function getGlobalSearchResultTitle(Model $record): string | Htmlable
    {
        return $record->invoice_number;
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['invoice_number', 'user.name', 'kelas.title'];
    }

    public static function getGlobalSearchResultDetails(Model $record): array
    {
        return [
            'Pembeli' => $record->user->name,
            'Kelas' => $record->kelas->title,
            'Qty' => $record->qty,
            'Total' => number_format($record->amount, 0, ',', '.'),
            'Status' => $record->status,
            'Tanggal' => $record->created_at->format('d-m-Y H:i:s'),
        ];
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
                TextColumn::make('No')->rowIndex()->toggleable(),
                TextColumn::make('invoice_number')->label('Order ID')->toggleable(),
                TextColumn::make('user.name')->label('Student')->searchable(),
                TextColumn::make('kelas.title')->label('Kelas')->toggleable(),
                TextColumn::make('amount')->label('Total')->money('IDR')->toggleable()->summarize([
                    Tables\Columns\Summarizers\Sum::make()
                        ->money('IDR'),
                ]),
                SelectColumn::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'paid' => 'Paid',
                        'failed' => 'Failed',
                    ]),
                TextColumn::make('created_at')->label('tgl Trx')->dateTime()->toggleable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'paid' => 'Paid',
                        'failed' => 'Failed',
                    ]),
                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\DatePicker::make('created_from')->native(false)
                            ->placeholder(fn($state): string =>  now()->subYear()->format('M d, Y')),
                        Forms\Components\DatePicker::make('created_until')->native(false)
                            ->placeholder(fn($state): string => now()->format('M d, Y')),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['created_from'] ?? null,
                                fn(Builder $query, $date): Builder => $query->whereDate('created_at', '>=', $date),
                            )
                            ->when(
                                $data['created_until'] ?? null,
                                fn(Builder $query, $date): Builder => $query->whereDate('created_at', '<=', $date),
                            );
                    })
                    ->indicateUsing(function (array $data): array {
                        $indicators = [];
                        if ($data['created_from'] ?? null) {
                            $indicators['created_from'] = 'Order from ' . Carbon::parse($data['created_from'])->toFormattedDateString();
                        }
                        if ($data['created_until'] ?? null) {
                            $indicators['created_until'] = 'Order until ' . Carbon::parse($data['created_until'])->toFormattedDateString();
                        }

                        return $indicators;
                    }),
            ], layout: FiltersLayout::Modal)->actions([
                Tables\Actions\ViewAction::make()->label('')->icon('heroicon-s-eye')->button()->color('info'),
                Tables\Actions\DeleteAction::make()->label('')->icon('heroicon-s-trash')->button()->color('danger'),
            ])
            ->groups([
                Tables\Grouping\Group::make('created_at')
                    ->label('Tgl Transaksi')
                    ->date()
                    ->collapsible(),
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
                Section::make('Detail Transaksi')
                    ->schema([
                        TextEntry::make('invoice_number')->label('Order ID'),
                        TextEntry::make('amount')->label('Total')->money('IDR'),
                        TextEntry::make('status')->label('Status')->badge()->color(function (string $state): string {
                            return match ($state) {
                                'pending' => 'warning',
                                'paid' => 'success',
                                'failed' => 'danger',
                            };
                        })->icon(function (string $state): string {
                            return match ($state) {
                                'pending' => 'heroicon-s-clock',
                                'paid' => 'heroicon-s-check-circle',
                                'failed' => 'heroicon-s-x-circle',
                            };
                        }),
                        TextEntry::make('payment_method')->label('Jenis Pembayaran'),
                        TextEntry::make('created_at')->label('Tgl Transaksi')->badge()->color('success')->dateTime(),
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
            'index' => Pages\ListTransaksis::route('/'),
            'create' => Pages\CreateTransaksi::route('/create'),
            'edit' => Pages\EditTransaksi::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        /** @var class-string<Model> $modelClass */
        $modelClass = static::$model;
        return (string) $modelClass::count();
    }
}
