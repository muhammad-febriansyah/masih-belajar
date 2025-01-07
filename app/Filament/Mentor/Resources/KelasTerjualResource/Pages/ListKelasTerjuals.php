<?php

namespace App\Filament\Mentor\Resources\KelasTerjualResource\Pages;

use App\Filament\Mentor\Resources\KelasTerjualResource;
use App\Models\Transaction;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListKelasTerjuals extends ListRecords
{
    protected static string $resource = KelasTerjualResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    protected function getTableQuery(): ?Builder
    {
        return Transaction::query()->whereHas('kelas', function (Builder $query) {
            $query->where('user_id', auth()->user()->id);
        });
    }
}
