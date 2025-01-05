<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BenefitResource\Pages;
use App\Filament\Resources\BenefitResource\RelationManagers;
use App\Models\Benefit;
use Filament\Forms;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class BenefitResource extends Resource
{
    protected static ?string $model = Benefit::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';
    protected static ?string $navigationGroup = 'Course';
    protected static ?string $navigationLabel = 'Benefit Kelas';
    protected static ?int $navigationSort = 9;
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make()
                    ->schema([
                        TextInput::make('name')->required()->label('Benefit Kelas'),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('No')->rowIndex(),
                TextColumn::make('name')->label('Benefit Kelas')->searchable(),
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
            'index' => Pages\ListBenefits::route('/'),
            'create' => Pages\CreateBenefit::route('/create'),
            'edit' => Pages\EditBenefit::route('/{record}/edit'),
        ];
    }
}
