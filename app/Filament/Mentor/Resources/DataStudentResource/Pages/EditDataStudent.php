<?php

namespace App\Filament\Mentor\Resources\DataStudentResource\Pages;

use App\Filament\Mentor\Resources\DataStudentResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditDataStudent extends EditRecord
{
    protected static string $resource = DataStudentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
