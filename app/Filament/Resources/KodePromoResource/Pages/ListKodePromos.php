<?php

namespace App\Filament\Resources\KodePromoResource\Pages;

use App\Filament\Resources\KodePromoResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListKodePromos extends ListRecords
{
    protected static string $resource = KodePromoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()->label('Form Kode Promo')->icon('heroicon-o-plus-circle'),
        ];
    }
}
