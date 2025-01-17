<?php

namespace App\Filament\Resources\KodePromoResource\Pages;

use App\Filament\Resources\KodePromoResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateKodePromo extends CreateRecord
{
    protected static string $resource = KodePromoResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
