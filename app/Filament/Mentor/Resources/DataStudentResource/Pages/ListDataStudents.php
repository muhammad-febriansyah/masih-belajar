<?php

namespace App\Filament\Mentor\Resources\DataStudentResource\Pages;

use App\Filament\Mentor\Resources\DataStudentResource;
use App\Models\Transaction;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Database\Eloquent\Builder;

class ListDataStudents extends ListRecords
{
    protected static string $resource = DataStudentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    public function getTitle(): string|Htmlable
    {
        return 'Data Students';
    }

    protected function getTableQuery(): ?Builder
    {
        return Transaction::query()->whereHas('kelas', function (Builder $query) {
            $query->where('user_id', auth()->user()->id);
        });
    }
}
