<?php

namespace App\Filament\Resources\TentangKamiResource\Pages;

use App\Filament\Resources\TentangKamiResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListTentangKamis extends ListRecords
{
    protected static string $resource = TentangKamiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
