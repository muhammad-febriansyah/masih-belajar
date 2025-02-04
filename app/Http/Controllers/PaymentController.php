<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Transaction;
use App\Models\User;
use Filament\Notifications\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Midtrans\Config;
use Midtrans\Snap;

class PaymentController extends Controller
{


    public function createTransaction(Request $request)
    {
        try {
            // Validasi input
            $request->validate([
                'kelas_id' => 'required|exists:kelas,id',
                'amount' => 'required|numeric|min:0.01',
            ]);

            // Cek apakah amount >= 0.01
            if ($request->amount < 0.01) {
                return response()->json(['error' => 'Amount must be at least 0.01'], 400);
            }

            // Ambil data kelas
            $kelas = Kelas::findOrFail($request->kelas_id);

            // Membuat objek transaksi di database
            $trx = new Transaction();
            $trx->kelas_id = $request->kelas_id;
            $trx->user_id = Auth::user()->id;
            $trx->invoice_number = 'NOTA' . time();
            $trx->amount = $request->amount;
            $trx->payment_method = 'midtrans';
            $trx->status = 'pending';
            $trx->save();

            // Konfigurasi Midtrans
            \Midtrans\Config::$serverKey = config('services.midtrans.server_key');
            \Midtrans\Config::$clientKey = config('services.midtrans.client_key');
            \Midtrans\Config::$isProduction = config('services.midtrans.is_production');
            \Midtrans\Config::$isSanitized = config('services.midtrans.is_sanitized');
            \Midtrans\Config::$is3ds = config('services.midtrans.is_3ds');
            \Midtrans\Config::$overrideNotifUrl = config('app.url') . '/api/midtrans-callback';

            // Detail transaksi
            $item_details = [
                [
                    'id' => $kelas->id,
                    'price' => $trx->amount,
                    'quantity' => 1,
                    'name' => $kelas->title,
                    'category' => $kelas->category->name,
                ]
            ];

            $transaction_details = [
                'order_id' => 'NOTA' . time(),
                'gross_amount' => $trx->amount,
            ];

            // Detail pelanggan
            $customer_details = [
                'first_name' => Auth::user()->name,
                'email' => Auth::user()->email,
                'phone' => Auth::user()->phone,
                'address' => Auth::user()->address ?? 'Indonesia',
            ];

            $params = [
                'transaction_details' => $transaction_details,
                'item_details' => $item_details,
                'customer_details' => $customer_details,
            ];

            // Membuat transaksi dengan Midtrans dan mendapatkan snapToken
            $snapResponse = \Midtrans\Snap::createTransaction($params);
            $snapToken = $snapResponse->token;

            // Menyimpan snapToken ke transaksi
            $trx->payment_url = $snapResponse->redirect_url;
            $trx->save();

            // Redirect user ke halaman Midtrans
            return response()->json(['redirect_url' => $trx->payment_url]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function callback(Request $request)
    {
        $serverKey = config('midtrans.server_key');
        $hashed = hash('sha512', $request->input('order_id') . $request->input('status_code') . $request->input('gross_amount') . $serverKey);
        if ($hashed !== $request->input('signature_key')) {
            return response()->json(['error' => 'Invalid signature'], 400);
        } else {
            $transaction = Transaction::where("invoice_number", $request->order_id)->firstOrFail();
            if ($request->input('transaction_status') == 'capture') {
                $transaction->status = 'paid';
            } else if ($request->input('transaction_status') == 'settlement') {
                $transaction->status = 'paid';
            } else if ($request->input('transaction_status') == 'pending') {
                $transaction->status = 'pending';
            } else if ($request->input('transaction_status') == 'deny') {
                $transaction->status = 'failed';
            } else if ($request->input('transaction_status') == 'expire') {
                $transaction->status = 'expired';
            } else if ($request->input('transaction_status') == 'cancel') {
                $transaction->status = 'canceled';
            }
            $transaction->save();
            return response()->json(['message' => 'Callback success']);
        }
    }
}
