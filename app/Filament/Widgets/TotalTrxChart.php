<?php

namespace App\Filament\Widgets;

use App\Models\Transaction;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;

class TotalTrxChart extends ChartWidget
{
    use InteractsWithPageFilters;
    protected static ?string $heading = 'Total Transaksi';
    protected static string $color = 'primary';
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $userId = auth()->id();
        $startDate = $this->filters['startDate'] ?? null;
        $endDate = $this->filters['endDate'] ?? null;
        $trxQuery = Transaction::query();
        if ($startDate) {
            $trxQuery->where('created_at', '>=', $startDate);
        }
        if ($endDate) {
            $trxQuery->where('created_at', '<=', $endDate);
        }
        if (auth()->user()->role == 'mentor') {
            $trxQuery->whereHas('kelas', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            });
        } else {
            $trxQuery->where('status', 'paid'); // Asumsi status ada di kolom 'status' dan nilainya 'paid'

        }
        $monthlyData = $trxQuery->selectRaw('MONTH(created_at) as month, COUNT(*) as total_orders')
            ->groupByRaw('MONTH(created_at)')
            ->orderByRaw('MONTH(created_at)')
            ->get();

        $data = [];
        $labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $monthlyOrders = array_fill(0, 12, 0); // 12 bulan, default 0
        foreach ($monthlyData as $transaction) {
            $monthIndex = $transaction->month - 1; // Index bulan dimulai dari 0 (Jan = 0, Feb = 1, dst)
            $monthlyOrders[$monthIndex] = $transaction->total_orders;
        }
        return [
            'datasets' => [
                [
                    'label' => 'Paid Orders',
                    'data' => $monthlyOrders,
                    'fill' => 'start',
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
