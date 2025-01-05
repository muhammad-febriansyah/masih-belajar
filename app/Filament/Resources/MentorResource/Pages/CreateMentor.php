<?php

namespace App\Filament\Resources\MentorResource\Pages;

use App\Filament\Resources\MentorResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Hash;

class CreateMentor extends CreateRecord
{
    protected static string $resource = MentorResource::class;

    public function getTitle(): string
    {
        return 'Form Mentor';
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['password'] = Hash::make($data['password']);
        $data['role'] = 'mentor';
        $data['status'] = 1;
        return $data;
    }
}
