<?php

namespace App\Filament\Resources\MentorResource\Pages;

use App\Filament\Resources\MentorResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Hash;

class EditMentor extends EditRecord
{
    protected static string $resource = MentorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()->label('Hapus')->color('danger')->icon('heroicon-o-trash'),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
        return $data;
    }
}
