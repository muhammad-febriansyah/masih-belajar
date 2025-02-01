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
    public function __construct(Request $request)
    {
        \Midtrans\Config::$serverKey = config('services.midtrans.server_key');
        \Midtrans\Config::$clientKey = config('services.midtrans.client_key');
        \Midtrans\Config::$isProduction = config('services.midtrans.is_production');
        \Midtrans\Config::$isSanitized = config('services.midtrans.is_sanitized');
        \Midtrans\Config::$is3ds = config('services.midtrans.is_3ds');
        \Midtrans\Config::$overrideNotifUrl = env('APP_URL') . '/api/midtrans-callback';
    }

    public function createTransaction(Request $request)
    {
        try {
            // Validasi input
            $request->validate([
                'kelas_id' => 'required|exists:kelas,id',
                'amount' => 'required|numeric|min:0.01',  // Pastikan amount lebih dari atau sama dengan 0.01
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
            $trx->nota = 'NOTA' . Auth::user()->id . '-' . time();
            $trx->amount = $request->amount;
            $trx->qty = 1;
            $trx->payment_type = 'midtrans';
            $trx->status = 'pending';
            $trx->save();

            \Midtrans\Config::$serverKey = config('services.midtrans.server_key');
            \Midtrans\Config::$clientKey = config('services.midtrans.client_key');
            \Midtrans\Config::$isProduction = config('services.midtrans.is_production');
            \Midtrans\Config::$isSanitized = config('services.midtrans.is_sanitized');
            \Midtrans\Config::$is3ds = config('services.midtrans.is_3ds');
            \Midtrans\Config::$overrideNotifUrl = env('APP_URL') . '/api/midtrans-callback';
            $item_details = [
                [
                    'id' => $kelas->id, // ID produk atau layanan
                    'price' => $trx->amount, // Harga per unit
                    'quantity' => 1, // Jumlah item
                    'name' => $kelas->title, // Nama kelas atau item
                    'category' => $kelas->category->name, // Kategori kelas
                ]
            ];

            // Detail transaksi
            $transaction_details = [
                'order_id' => 'NOTA' . Auth::user()->id . '-' . time(),
                'gross_amount' => $trx->amount, // Total amount
            ];

            // Detail pelanggan
            $customer_details = [
                'first_name' => Auth::user()->name,
                'email' => Auth::user()->email,
                'phone' => Auth::user()->phone,
                'address' => Auth::user()->address ?? 'Indonesia',
            ];

            // Parameter untuk transaksi
            $params = [
                'transaction_details' => $transaction_details,
                'item_details' => $item_details, // Tambahkan rincian item
                'customer_details' => $customer_details,
            ];

            // Konfigurasi Midtrans
            Config::$serverKey = env('MIDTRANS_SERVERKEY');
            Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
            Config::$clientKey = env('MIDTRANS_CLIENTKEY');

            // Membuat transaksi dengan Midtrans dan mendapatkan snapToken
            $snapResponse = Snap::createTransaction($params);
            $snapToken = $snapResponse->token;  // Ambil token transaksi dari response

            // Menyimpan snapToken ke transaksi
            $trx->payment_url = $snapResponse->redirect_url; // Simpan URL pembayaran ke transaksi jika perlu
            $trx->save();

            return response()->json(['snapToken' => $snapToken]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }



    public function callback(Request $request)
    {
        // Pastikan MIDTRANS_SERVERKEY terdefinisi dengan benar
        $serverKey = env('MIDTRANS_SERVERKEY');

        // Periksa apakah MIDTRANS_SERVERKEY ada di .env
        if (!$serverKey) {
            return response()->json(['message' => 'Server key is missing'], 400);
        }

        // Encode server key untuk authorization header
        $auth = base64_encode($serverKey);

        // Mengirim request ke Midtrans API untuk memeriksa status transaksi
        $httpResponse = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
            'Authorization' => "Basic $auth",
        ])->get('https://api.midtrans.com/v2/transaction/status'); // Update the URL as needed

        // Log response for debugging purposes
        Log::info("Midtrans API Response", ['response' => $httpResponse->body()]);

        // Jika request gagal (misalnya authorization error), kirim response error
        if ($httpResponse->failed()) {
            return response()->json(['message' => 'Authorization failed or Invalid response from Midtrans'], 401);
        }

        // Decode body JSON response dari Midtrans
        $midtransResponse = json_decode($httpResponse->body());

        // Pastikan order_id ada dalam response
        if (!isset($midtransResponse->order_id)) {
            return response()->json(['message' => 'Order ID not found in response'], 400);
        }

        // Cari transaksi berdasarkan invoice_number
        $transaction = Transaction::where("invoice_number", $midtransResponse->order_id)->firstOrFail();

        // Cek apakah status transaksi sudah diproses sebelumnya
        if ($transaction->status === 'settlement' || $transaction->status === 'capture') {
            return response()->json(['message' => 'Transaction has been processed before'], 200);
        }

        // Update status transaksi berdasarkan status dari Midtrans API
        switch ($midtransResponse->transaction_status) {
            case 'capture':
                $transaction->status = 'capture';
                break;
            case 'settlement':
                $transaction->status = 'settlement';
                break;
            case 'pending':
                $transaction->status = 'pending';
                break;
            case 'expire':
            case 'cancel':
            case 'deny':
                $transaction->status = 'failed';
                break;
            default:
                return response()->json(['message' => 'Unknown transaction status'], 400);
        }

        // Simpan status yang telah diperbarui
        $transaction->save();

        return response()->json(['message' => 'Transaction has been processed'], 200);
    }
}
