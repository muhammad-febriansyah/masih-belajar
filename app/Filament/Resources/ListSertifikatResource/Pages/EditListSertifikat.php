<?php

namespace App\Filament\Resources\ListSertifikatResource\Pages;

use App\Filament\Resources\ListSertifikatResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditListSertifikat extends EditRecord
{
    protected static string $resource = ListSertifikatResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
