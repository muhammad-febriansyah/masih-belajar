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

        // === ADMIN QUERY ===
        $studentQuery = User::where('role', 'student')->where('status', 1);
        $mentorQuery = User::where('role', 'mentor')->where('status', 1);
        $trxQuery = Transaction::query();
        $amountQuery = Transaction::query();

        if ($startDate) {
            $parsedStart = Carbon::parse($startDate);
            $studentQuery->where('created_at', '>=', $parsedStart);
            $mentorQuery->where('created_at', '>=', $parsedStart);
            $trxQuery->where('created_at', '>=', $parsedStart);
            $amountQuery->where('created_at', '>=', $parsedStart);
        }

        if ($endDate) {
            $parsedEnd = Carbon::parse($endDate);
            $studentQuery->where('created_at', '<=', $parsedEnd);
            $mentorQuery->where('created_at', '<=', $parsedEnd);
            $trxQuery->where('created_at', '<=', $parsedEnd);
            $amountQuery->where('created_at', '<=', $parsedEnd);
        }

        $countStudent = $studentQuery->count();
        $countMentor = $mentorQuery->count();
        $countTrx = $trxQuery->count();
        $totalAmount = $amountQuery->sum('amount');

        // === ADMIN CHART DATA ===
        $monthlyChart = function ($model, $column = 'id', $filter = null) use ($startDate, $endDate) {
            $query = $model::query();
            if ($filter) $query->whereRaw($filter);
            if ($startDate) $query->where('created_at', '>=', Carbon::parse($startDate));
            if ($endDate) $query->where('created_at', '<=', Carbon::parse($endDate));

            $rawColumn = $column === 'amount' ? 'SUM(amount)' : 'COUNT(*)';

            $result = $query
                ->selectRaw("MONTH(created_at) as month, $rawColumn as total")
                ->groupByRaw('MONTH(created_at)')
                ->pluck('total', 'month')
                ->toArray();

            $data = [];
            for ($i = 1; $i <= 12; $i++) {
                $data[] = (int) ($result[$i] ?? 0);
            }
            return $data;
        };

        $studentChartData = $monthlyChart(new User, 'id', "role = 'student' AND status = 1");
        $mentorChartData = $monthlyChart(new User, 'id', "role = 'mentor' AND status = 1");
        $trxChartData = $monthlyChart(new Transaction);
        $amountChartData = $monthlyChart(new Transaction, 'amount');

        // === MENTOR VIEW ===
        if (auth()->user()->role === 'mentor') {
            $userId = auth()->id();

            $kelasChart = function ($status) use ($userId, $startDate, $endDate) {
                $query = Kelas::where('user_id', $userId)->where('status', $status);
                if ($startDate) $query->where('created_at', '>=', Carbon::parse($startDate));
                if ($endDate) $query->where('created_at', '<=', Carbon::parse($endDate));

                $result = $query
                    ->selectRaw('MONTH(created_at) as month, COUNT(*) as total')
                    ->groupByRaw('MONTH(created_at)')
                    ->pluck('total', 'month')
                    ->toArray();

                $data = [];
                for ($i = 1; $i <= 12; $i++) {
                    $data[] = (int) ($result[$i] ?? 0);
                }
                return $data;
            };

            $kelasPendingCount = Kelas::where('user_id', $userId)->where('status', 'pending')->count();
            $kelasDitolakCount = Kelas::where('user_id', $userId)->where('status', 'ditolak')->count();
            $kelasDisetujuiCount = Kelas::where('user_id', $userId)->where('status', 'disetujui')->count();

            return [
                Stat::make('Kelas Pending', $kelasPendingCount)
                    ->description('Pending per bulan')
                    ->descriptionIcon('heroicon-m-clock')
                    ->chart($kelasChart('pending'))
                    ->color('warning'),

                Stat::make('Kelas Ditolak', $kelasDitolakCount)
                    ->description('Ditolak per bulan')
                    ->descriptionIcon('heroicon-m-x-circle')
                    ->chart($kelasChart('ditolak'))
                    ->color('danger'),

                Stat::make('Kelas Disetujui', $kelasDisetujuiCount)
                    ->description('Disetujui per bulan')
                    ->descriptionIcon('heroicon-m-check-circle')
                    ->chart($kelasChart('disetujui'))
                    ->color('success'),
            ];
        }

        // === ADMIN RETURN ===
        return [
            Stat::make('Total Siswa', $countStudent)
                ->description('Total siswa aktif')
                ->descriptionIcon('heroicon-m-user-group')
                ->chart($studentChartData)
                ->color('success'),

            Stat::make('Total Mentor', $countMentor)
                ->description('Mentor aktif')
                ->descriptionIcon('heroicon-m-academic-cap')
                ->chart($mentorChartData)
                ->color('info'),

            Stat::make('Total Transaksi', $countTrx)
                ->description('Jumlah transaksi')
                ->descriptionIcon('heroicon-m-credit-card')
                ->chart($trxChartData)
                ->color('warning'),

            Stat::make('Jumlah Pendapatan', number_format($totalAmount, 0, ',', '.'))
                ->description('Total pendapatan')
                ->descriptionIcon('heroicon-m-currency-dollar')
                ->chart($amountChartData)
                ->color('primary'),
        ];
    }
}
