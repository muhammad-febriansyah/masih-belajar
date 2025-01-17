<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Midtrans\Config;
use Midtrans\Snap;

class PaymentController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = env('MIDTRANS_SERVERKEY');
        Config::$clientKey = env('MIDTRANS_CLIENTKEY');
        Config::$isProduction = env('MIDTRANS_IS_PRODUCTION');
        Config::$isSanitized = env('MIDTRANS_IS_SANITIZED');
        Config::$is3ds = env('MIDTRANS_IS_3DS');
    }

    public function createTransaction(Request $request)
    {
        try {
            $trx = new Transaction();
            $trx->kelas_id = $request->kelas_id;
            $trx->user_id = Auth::user()->id;
            $trx->invoice_number = 'COURSE' . time();
            $trx->amount = $request->amount;
            $trx->payment_method = 'midtrans';
            $trx->status = 'pending';
            $kelas = Kelas::findOrFail($request->kelas_id);
            $item_details = [
                [
                    'id' => $kelas->id, // ID produk atau layanan
                    'price' => $trx->amount, // Harga per unit
                    'quantity' => 1, // Jumlah item
                    'name' => $kelas->title, // Nama kelas atau item
                    'category' => $kelas->category->name, // Jika diperlukan
                ]
            ];
            $transaction_details = [
                'order_id' => 'COURSE' . time(),
                'gross_amount' => $trx->amount,
            ];

            $customer_details = [
                'first_name' => Auth::user()->name,
                'email' => Auth::user()->email,
                'phone' => Auth::user()->phone,
                'address' => Auth::user()->address ?? 'Indonesia',
            ];

            $params = [
                'transaction_details' => $transaction_details,
                'item_details' => $item_details, // Tambahkan rincian item
                'customer_details' => $customer_details,
            ];

            $snapToken = Snap::createTransaction($params)->redirect_url;
            $trx->payment_url = $snapToken;
            $trx->save();
            return response()->json([
                'redirect_url' => $snapToken
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function callback()
    {
        $notif = new \Midtrans\Notification();
        $transaction = $notif->transaction_status;
        $type = $notif->payment_type;
        $order_id = $notif->order_id;
        $fraud = $notif->fraud_status;
        Log::info("Processing payment for order_id: $order_id, transaction status: $transaction, payment type: $type");
        $q = Transaction::where("invoice_number", $order_id)->first();
        if (!$q) {
            Log::warning("No transaction found for payment ID: " . $order_id);
            return; // Early exit if transaction is not found
        }
        DB::transaction(function () use ($transaction, $type, $fraud, $q, $order_id) {
            if ($q->status == 'pending') {
                if ($transaction == 'capture') {
                    if ($type == 'credit_card' && $fraud == 'accept') {
                        $q->status = 'paid';
                        Log::info("Transaction order_id: $order_id successfully captured using " . $type);
                    }
                } elseif ($transaction == 'settlement') {
                    $q->status = 'paid';
                    Log::info("Transaction order_id: $order_id successfully transferred using " . $type);
                } elseif ($transaction == 'pending') {
                    $q->status = 'pending';
                    Log::info("Waiting for customer to finish transaction order_id: $order_id using " . $type);
                } elseif ($transaction == 'deny' || $transaction == 'expire' || $transaction == 'cancel') {
                    $q->status = 'failed';
                    Log::info("Payment using " . $type . " for transaction order_id: $order_id is " . $transaction . ".");
                }
                if (!$q->save()) {
                    Log::error("Failed to update status for order_id: $order_id, errors: " . json_encode($q->getErrors()));
                    return;
                }
            } else {
                Log::info("Transaction for order_id: {$order_id} has already been processed with status: {$q->status}");
            }
        });
    }
}
