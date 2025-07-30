<?php

namespace App\Filament\Resources\TentangKamiResource\Pages;

use App\Filament\Resources\TentangKamiResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTentangKami extends EditRecord
{
    protected static string $resource = TentangKamiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
