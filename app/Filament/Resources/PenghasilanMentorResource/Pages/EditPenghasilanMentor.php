<?php

namespace App\Filament\Resources\PenghasilanMentorResource\Pages;

use App\Filament\Resources\PenghasilanMentorResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPenghasilanMentor extends EditRecord
{
    protected static string $resource = PenghasilanMentorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
