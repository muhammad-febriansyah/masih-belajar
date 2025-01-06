<?php

namespace App\Filament\Mentor\Resources\KelasResource\Pages;

use App\Filament\Mentor\Resources\KelasResource;
use App\Models\Kelas;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateKelas extends CreateRecord
{
    protected static string $resource = KelasResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['status'] = 'pending';
        $data['user_id'] = auth()->user()->id;
        return $data;
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
