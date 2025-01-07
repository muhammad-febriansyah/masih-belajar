<?php

namespace App\Filament\Widgets;

use App\Models\Transaction;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;

class JmlTrxChart extends ChartWidget
{
    use InteractsWithPageFilters;
    protected static ?string $heading = 'Pendapatan Transaksi';
    protected static string $color = 'info';
    protected static ?int $sort = 3;

    protected function getData(): array
    {
        $userId = auth()->id();
        // Ambil filter tanggal mulai dan selesai
        $startDate = $this->filters['startDate'] ?? null;
        $endDate = $this->filters['endDate'] ?? null;

        // Query untuk mengambil data transaksi
        $trxQuery = Transaction::query();

        // Menambahkan filter berdasarkan tanggal jika tersedia
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
        // Ambil data transaksi per bulan dengan jumlah total amount
        $monthlyData = $trxQuery->selectRaw('MONTH(created_at) as month, SUM(amount) as total_amount')
            ->groupByRaw('MONTH(created_at)')
            ->orderByRaw('MONTH(created_at)')
            ->get();

        // Siapkan array untuk data dan label
        $data = [];
        $labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Inisialisasi data untuk setiap bulan dengan nilai default 0
        $monthlyAmount = array_fill(0, 12, 0); // 12 bulan, default 0

        // Isi data transaksi ke dalam array berdasarkan bulan
        foreach ($monthlyData as $transaction) {
            $monthIndex = $transaction->month - 1; // Index bulan dimulai dari 0 (Jan = 0, Feb = 1, dst)
            $monthlyAmount[$monthIndex] = $transaction->total_amount;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Total Amount',
                    'data' => $monthlyAmount,
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
