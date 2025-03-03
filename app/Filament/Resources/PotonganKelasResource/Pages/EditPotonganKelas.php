<?php

namespace App\Filament\Resources\PotonganKelasResource\Pages;

use App\Filament\Resources\PotonganKelasResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPotonganKelas extends EditRecord
{
    protected static string $resource = PotonganKelasResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
