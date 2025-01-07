<?php

namespace App\Filament\Mentor\Resources\KelasTerjualResource\Pages;

use App\Filament\Mentor\Resources\KelasTerjualResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditKelasTerjual extends EditRecord
{
    protected static string $resource = KelasTerjualResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
