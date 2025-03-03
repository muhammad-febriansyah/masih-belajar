<?php

namespace App\Filament\Resources\PotonganKelasResource\Pages;

use App\Filament\Resources\PotonganKelasResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPotonganKelas extends ListRecords
{
    protected static string $resource = PotonganKelasResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
