<?php

namespace App\Filament\Resources\KodePromoResource\Pages;

use App\Filament\Resources\KodePromoResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditKodePromo extends EditRecord
{
    protected static string $resource = KodePromoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
