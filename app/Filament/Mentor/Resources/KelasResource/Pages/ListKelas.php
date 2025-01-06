<?php

namespace App\Filament\Mentor\Resources\KelasResource\Pages;

use App\Filament\Mentor\Resources\KelasResource;
use App\Models\Kelas;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListKelas extends ListRecords
{
    protected static string $resource = KelasResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()->label('Form Kelas')->icon('heroicon-o-plus-circle'),
        ];
    }

    protected function getTableQuery(): ?Builder
    {
        return Kelas::query()->where('user_id', auth()->user()->id);
    }
}
