<?php

namespace App\Filament\Resources\MentorResource\Pages;

use App\Filament\Resources\MentorResource;
use App\Models\User;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListMentors extends ListRecords
{
    protected static string $resource = MentorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()->label('Form Mentor')->icon('heroicon-s-plus'),
        ];
    }

    public function getTitle(): string
    {
        return 'Mentor';
    }

    protected function getTableQuery(): ?Builder
    {
        return User::query()->where('role', 'mentor');
    }
}
