<?php

namespace App\Filament\Mentor\Resources\KelasResource\Pages;

use App\Filament\Mentor\Resources\KelasResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListKelas extends ListRecords
{
    protected static string $resource = KelasResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()->label('Form Kelas')->icon('heroicon-o-plus-circle'),
        ];
    }
}
