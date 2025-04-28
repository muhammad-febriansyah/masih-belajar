<?php

namespace App\Filament\Mentor\Resources\DiskusiResource\Pages;

use App\Filament\Mentor\Resources\DiskusiResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditDiskusi extends EditRecord
{
    protected static string $resource = DiskusiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
