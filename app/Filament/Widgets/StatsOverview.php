<?php

namespace App\Filament\Widgets;

use App\Models\Kelas;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    use InteractsWithPageFilters;
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $startDate = $this->filters['startDate'] ?? null;
        $endDate = $this->filters['endDate'] ?? null;
        $studentQuery = User::where('role', 'student')->where('status', 1);
        $trxQuery = Transaction::query();
        $jmltrxQuery = Transaction::query();
        $mentorQuery = User::where('role', 'mentor')->where('status', 1);
        if ($startDate) {
            $studentQuery->where('created_at', '>=', Carbon::parse($startDate));
            $trxQuery->where('created_at', '>=', Carbon::parse($startDate));
            $jmltrxQuery->where('created_at', '>=', Carbon::parse($startDate));
            $mentorQuery->where('created_at', '>=', Carbon::parse($startDate));
        }

        if ($endDate) {
            $studentQuery->where('created_at', '<=', Carbon::parse($endDate));
            $trxQuery->where('created_at', '<=', Carbon::parse($endDate));
            $jmltrxQuery->where('created_at', '<=', Carbon::parse($endDate));
            $mentorQuery->where('created_at', '<=', Carbon::parse($endDate));
        }
        $countStudent = $studentQuery->count();
        $countTrx = $trxQuery->count();
        $countJmlTrx = $jmltrxQuery->sum('amount');
        $countMentor = $mentorQuery->count();
        if (auth()->user()->role == 'mentor') {
            $pending = Kelas::where('user_id', auth()->user()->id)->where('status', 'pending')->count();
            $ditolak = Kelas::where('user_id', auth()->user()->id)->where('status', 'ditolak')->count();
            $disetujui = Kelas::where('user_id', auth()->user()->id)->where('status', 'disetujui')->count();

            return [
                Stat::make('Kelas Pending', $pending),
                Stat::make('Kelas Ditolak', $ditolak),
                Stat::make('Kelas Disetujui', $disetujui),
            ];
        } else {
            return [
                Stat::make('Total Student', $countStudent),
                Stat::make('Total Mentor', $countMentor),
                Stat::make('Total Transaksi', $countTrx),
                Stat::make('Jumlah Pendapatan', number_format($countJmlTrx, 0, ',', '.')),
            ];
        }
    }
}
