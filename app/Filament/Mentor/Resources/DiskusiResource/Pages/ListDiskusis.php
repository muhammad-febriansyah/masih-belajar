<?php

namespace App\Filament\Mentor\Resources\DiskusiResource\Pages;

use App\Filament\Mentor\Resources\DiskusiResource;
use App\Models\Diskusi;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListDiskusis extends ListRecords
{
    protected static string $resource = DiskusiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    protected function getTableQuery(): ?Builder
    {
        return Diskusi::query()->whereHas('kelas', function (Builder $query) {
            $query->where('user_id', auth()->user()->id);
        });
    }
}
