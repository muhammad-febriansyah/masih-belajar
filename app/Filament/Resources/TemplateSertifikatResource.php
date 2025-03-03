<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TemplateSertifikatResource\Pages;
use App\Filament\Resources\TemplateSertifikatResource\RelationManagers;
use App\Models\TemplateSertifikat;
use Filament\Actions\Action;
use Filament\Forms;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\ToggleButtons;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\Action as ActionsAction;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Columns\ColorColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Hugomyb\FilamentMediaAction\Actions\MediaAction as ActionsMediaAction;
use Hugomyb\FilamentMediaAction\Tables\Actions\MediaAction;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\File;
use Joaopaulolndev\FilamentPdfViewer\Forms\Components\PdfViewerField;

class TemplateSertifikatResource extends Resource
{
    protected static ?string $model = TemplateSertifikat::class;

    protected static ?string $navigationIcon = 'heroicon-o-folder-arrow-down';
    protected static ?string $navigationGroup = 'Course';
    protected static ?string $navigationLabel = 'Template Sertifikat';
    protected static ?int $navigationSort = 13;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make()->schema([
                    ToggleButtons::make('status')
                        ->inline()
                        ->options([
                            '1' => 'Active',
                            '0' => 'Inactive',
                        ])
                        ->icons([
                            '1' => 'heroicon-o-check-circle',
                            '0' => 'heroicon-o-x-circle',
                        ])->required(),
                    FileUpload::make('file')
                        ->disk('public')
                        ->directory('image-upload-server')
                        ->label('File Template Sertifikat')
                        ->maxSize(10072)
                        ->acceptedFileTypes(['application/pdf'])->deletable(true)
                        ->deleteUploadedFileUsing(function ($record, $file) {
                            if (isset($record->file)) {
                                if ($record->file == $file) {
                                    if (File::exists(public_path('storage\\' . $record->file))) {
                                        File::delete(public_path('storage\\' . $record->file));
                                    }
                                }
                            }
                        })
                        ->required(),
                ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('No')->rowIndex(),
                TextColumn::make('status')->label('Status')->sortable()->searchable()->badge()->color(function (string $state): string {
                    return match ($state) {
                        '1' => 'success',
                        '0' => 'danger',
                    };
                })->icon(function (string $state): string {
                    return match ($state) {
                        '1' => 'heroicon-o-check-circle',
                        '0' => 'heroicon-o-x-circle',
                    };
                })->formatStateUsing(function ($state) {
                    return match ($state) {
                        '1' => 'Active',
                        '0' => 'Inactive',
                    };
                }),
            ])
            ->filters([
                //
            ])
            ->actions([
                ActionsAction::make('view_pdf')
                    ->modalContent(fn(TemplateSertifikat $record): View => view('filament.pages.view_pdf', [
                        'record' => $record
                    ]))->button()->label('Lihat Template')->icon('heroicon-s-eye'),
                Tables\Actions\EditAction::make()->label('Edit')->icon('heroicon-s-pencil')->button()->color('success'),
                Tables\Actions\DeleteAction::make()->after(function ($record) {
                    File::delete(public_path('storage\\' . $record->file));
                })->icon('heroicon-o-trash')->color('danger')->button()->label('Hapus'),
            ])
            ->bulkActions([
                DeleteBulkAction::make()
                    ->after(function ($records) {
                        foreach ($records as $record) {
                            File::delete(public_path('storage\\' . $record->file));
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
            'index' => Pages\ListTemplateSertifikats::route('/'),
            'create' => Pages\CreateTemplateSertifikat::route('/create'),
            'edit' => Pages\EditTemplateSertifikat::route('/{record}/edit'),
        ];
    }
}
