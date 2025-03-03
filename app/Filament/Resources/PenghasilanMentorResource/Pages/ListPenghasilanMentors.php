<?php

namespace App\Filament\Resources\PenghasilanMentorResource\Pages;

use App\Filament\Resources\PenghasilanMentorResource;
use App\Models\PotonganKelas;
use App\Models\Transaction;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class ListPenghasilanMentors extends ListRecords
{
    protected static string $resource = PenghasilanMentorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    protected function getTableQuery(): ?Builder
    {
        $potongan = PotonganKelas::first();
        return Transaction::query()
            ->where('transactions.status', 'paid')
            ->join('kelas', 'kelas.id', '=', 'transactions.kelas_id')
            ->join('users', 'users.id', '=', 'kelas.user_id')
            ->select(
                DB::raw('MIN(transactions.id) as id'),
                DB::raw('count(transactions.id) as total_transaction'),
                'kelas.user_id',
                'users.name as mentor',
                DB::raw("SUM(transactions.amount-$potongan->fee) as total_bersih"),
                DB::raw('SUM(transactions.amount) as total_amount'),
            )
            ->groupBy('kelas.user_id');
    }

    public function getTitle(): string|Htmlable
    {
        return 'Penghasilan Mentor';
    }
}
