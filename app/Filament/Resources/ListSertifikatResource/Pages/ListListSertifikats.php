<?php

namespace App\Filament\Resources\ListSertifikatResource\Pages;

use App\Filament\Resources\ListSertifikatResource;
use App\Models\UserAnswer;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Database\Eloquent\Builder;

class ListListSertifikats extends ListRecords
{
    protected static string $resource = ListSertifikatResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    public function getTitle(): string|Htmlable
    {
        return 'List Sertifikat';
    }

    protected function getTableQuery(): ?Builder
    {
        return UserAnswer::query()->whereNotNull('kelas_id') // Pastikan kelas_id tidak null
            ->groupBy('kelas_id')
            ->selectRaw('*, SUM(point) as total_point')
            ->havingRaw('SUM(point) >= 80');
    }
}
