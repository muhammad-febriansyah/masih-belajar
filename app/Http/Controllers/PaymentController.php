<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Setting;
use App\Models\Transaction;
use App\Models\User;
use Filament\Notifications\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Midtrans\Config;
use Midtrans\Snap;

class PaymentController extends Controller
{
    public function __construct()
    {
        try {
            Config::$serverKey = config('services.midtrans.server_key');
            Config::$clientKey = config('services.midtrans.client_key');
            Config::$isProduction = config('services.midtrans.is_production', false);
            Config::$isSanitized = config('services.midtrans.is_sanitized', true);
            Config::$is3ds = config('services.midtrans.is_3ds', true);
            Config::$overrideNotifUrl = config('app.url') . '/api/midtrans-callback';

            Log::info('Midtrans Config Initialized', [
                'server_key_exists' => !empty(config('services.midtrans.server_key')),
                'client_key_exists' => !empty(config('services.midtrans.client_key')),
                'is_production' => config('services.midtrans.is_production', false),
                'callback_url' => config('app.url') . '/api/midtrans-callback'
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to initialize Midtrans config', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }

    public function createTransactionWithSnapToken(Request $request)
    {
        Log::info('=== START CREATE TRANSACTION ===', [
            'user_id' => Auth::id(),
            'request_data' => $request->all()
        ]);

        DB::beginTransaction();

        try {
            if (empty(config('services.midtrans.server_key'))) {
                throw new \Exception('Midtrans server key is not configured');
            }

            if (empty(config('services.midtrans.client_key'))) {
                throw new \Exception('Midtrans client key is not configured');
            }

            $request->validate([
                'kelas_id' => 'required|exists:kelas,id',
                'amount' => 'required|numeric|min:0.01',
            ]);

            Log::info('Request validation passed');

            $setting = Setting::first();
            if (!$setting) {
                Log::warning('No setting found, using default fee of 0');
                $setting = (object) ['fee' => 0];
            }

            Log::info('Setting retrieved', ['fee' => $setting->fee ?? 0]);

            $kelas = Kelas::find($request->kelas_id);
            if (!$kelas) {
                throw new \Exception('Kelas not found');
            }

            try {
                $kelas->load('category');
            } catch (\Exception $e) {
                Log::warning('Failed to load category relation', ['error' => $e->getMessage()]);
            }

            Log::info('Kelas retrieved', [
                'kelas_id' => $kelas->id,
                'kelas_title' => $kelas->title,
                'has_category' => !is_null($kelas->category ?? null)
            ]);

            $invoiceNumber = $this->generateInvoiceNumber($kelas);
            Log::info('Invoice number generated', ['invoice_number' => $invoiceNumber]);

            $transactionData = [
                'kelas_id' => $request->kelas_id,
                'user_id' => Auth::id(),
                'invoice_number' => $invoiceNumber,
                'amount' => number_format((float)$request->amount, 2, '.', ''),
                'fee_trx' => (int)($setting->fee ?? 0),
                'payment_method' => 'midtrans',
                'status' => 'pending'
            ];

            if (Schema::hasColumn('transactions', 'snap_token')) {
                $transactionData['snap_token'] = null;
            }
            if (Schema::hasColumn('transactions', 'payment_url')) {
                $transactionData['payment_url'] = null;
            }

            Log::info('Creating transaction with data', $transactionData);

            $trx = Transaction::create($transactionData);

            Log::info('Transaction created', [
                'transaction_id' => $trx->id,
                'invoice_number' => $trx->invoice_number,
                'amount' => $trx->amount
            ]);

            $grossAmount = (int) $trx->amount;
            $coursePrice = (int) ($request->amount - ($setting->fee ?? 0));
            $serviceFee = (int) ($setting->fee ?? 0);

            $params = [
                'transaction_details' => [
                    'order_id' => $invoiceNumber,
                    'gross_amount' => $grossAmount,
                ],
                'item_details' => [],
                'customer_details' => [
                    'first_name' => Auth::user()->name ?? 'User',
                    'email' => Auth::user()->email ?? 'user@example.com',
                    'phone' => Auth::user()->phone ?? '08123456789',
                    'address' => Auth::user()->address ?? 'Indonesia',
                ],
                'enabled_payments' => [
                    'credit_card',
                    'bca_va',
                    'bni_va',
                    'bri_va',
                    'mandiri_va',
                    'permata_va',
                    'gopay',
                    'qris',
                    'shopeepay',
                    'dana'
                ],
                'expiry' => [
                    'start_time' => date('Y-m-d H:i:s O'),
                    'unit' => 'hour',
                    'duration' => 24
                ]
            ];

            if ($coursePrice > 0) {
                $params['item_details'][] = [
                    'id' => $kelas->id,
                    'price' => $coursePrice,
                    'quantity' => 1,
                    'name' => $kelas->title,
                    'category' => $kelas->category->name ?? 'Course',
                ];
            }

            if ($serviceFee > 0) {
                $params['item_details'][] = [
                    'id' => 'service_fee',
                    'price' => $serviceFee,
                    'quantity' => 1,
                    'name' => 'Service Fee',
                    'category' => 'Fee',
                ];
            }

            if (empty($params['item_details'])) {
                $params['item_details'][] = [
                    'id' => $kelas->id,
                    'price' => $grossAmount,
                    'quantity' => 1,
                    'name' => $kelas->title,
                    'category' => $kelas->category->name ?? 'Course',
                ];
            }

            Log::info('Midtrans parameters prepared', [
                'order_id' => $params['transaction_details']['order_id'],
                'gross_amount' => $params['transaction_details']['gross_amount'],
                'item_count' => count($params['item_details']),
                'customer_email' => $params['customer_details']['email']
            ]);

            try {
                $snapResponse = Snap::createTransaction($params);
                Log::info('Snap transaction created successfully', [
                    'token_length' => strlen($snapResponse->token),
                    'redirect_url_exists' => !empty($snapResponse->redirect_url)
                ]);
            } catch (\Exception $midtransError) {
                Log::error('Midtrans Snap::createTransaction failed', [
                    'error' => $midtransError->getMessage(),
                    'params' => $params
                ]);
                throw new \Exception('Failed to create Midtrans transaction: ' . $midtransError->getMessage());
            }

            $updateData = [];
            if (Schema::hasColumn('transactions', 'payment_url')) {
                $updateData['payment_url'] = $snapResponse->redirect_url;
            }
            if (Schema::hasColumn('transactions', 'snap_token')) {
                $updateData['snap_token'] = $snapResponse->token;
            }

            if (!empty($updateData)) {
                $trx->update($updateData);
                Log::info('Transaction updated with Midtrans data', $updateData);
            }

            DB::commit();

            Log::info('=== TRANSACTION CREATED SUCCESSFULLY ===', [
                'invoice_number' => $invoiceNumber,
                'transaction_id' => $trx->id,
                'snap_token' => substr($snapResponse->token, 0, 20) . '...'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Transaction with Snap Token created successfully',
                'data' => [
                    'invoice_number' => $invoiceNumber,
                    'redirect_url' => $snapResponse->redirect_url,
                    'snap_token' => $snapResponse->token,
                    'transaction_id' => $trx->id,
                    'amount' => (float)$trx->amount,
                    'payment_method' => 'midtrans_snap',
                    'expires_at' => now()->addHours(24)->toISOString(),
                ]
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            Log::error('Validation failed', [
                'errors' => $e->errors(),
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('=== TRANSACTION CREATION FAILED ===', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
                'request_data' => $request->all(),
                'trace' => $e->getTraceAsString()
            ]);

            $errorMessage = 'Failed to create transaction';
            $statusCode = 500;

            if (strpos($e->getMessage(), 'Midtrans') !== false) {
                $errorMessage = 'Payment gateway error. Please try again later.';
            } elseif (strpos($e->getMessage(), 'not configured') !== false) {
                $errorMessage = 'Payment system configuration error';
                $statusCode = 503;
            } elseif (strpos($e->getMessage(), 'not found') !== false) {
                $errorMessage = 'Requested resource not found';
                $statusCode = 404;
            }

            return response()->json([
                'success' => false,
                'message' => $errorMessage,
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error',
                'debug_info' => config('app.debug') ? [
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => array_slice($e->getTrace(), 0, 3)
                ] : null
            ], $statusCode);
        }
    }

    public function createFreeTransaction(Request $request)
    {
        Log::info('=== START CREATE FREE TRANSACTION ===', [
            'user_id' => Auth::id(),
            'request_data' => $request->all()
        ]);

        DB::beginTransaction();

        try {
            $request->validate([
                'kelas_id' => 'required|exists:kelas,id',
            ]);

            $userId = Auth::id();
            $kelasId = $request->kelas_id;

            // Cek apakah user sudah pernah join kelas ini
            $existingTransaction = Transaction::where('user_id', $userId)
                ->where('kelas_id', $kelasId)
                ->where('status', 'paid')
                ->first();

            if ($existingTransaction) {
                Log::info('User already joined this class', [
                    'user_id' => $userId,
                    'kelas_id' => $kelasId,
                    'existing_invoice' => $existingTransaction->invoice_number
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'Anda sudah terdaftar di kelas ini',
                    'data' => [
                        'existing_invoice' => $existingTransaction->invoice_number,
                        'joined_at' => $existingTransaction->created_at
                    ]
                ], 409); // 409 Conflict status code
            }

            $kelas = Kelas::findOrFail($kelasId);
            $invoiceNumber = $this->generateInvoiceNumber($kelas);

            $trx = Transaction::create([
                'kelas_id' => $kelasId,
                'user_id' => $userId,
                'invoice_number' => $invoiceNumber,
                'amount' => 0,
                'fee_trx' => 0,
                'payment_method' => 'manual',
                'status' => 'paid',
                'payment_url' => "-",
            ]);

            Log::info('Free transaction created successfully', [
                'invoice_number' => $invoiceNumber,
                'user_id' => $userId,
                'kelas_id' => $kelasId
            ]);

            try {
                $user = Auth::user();
                if ($user) {
                    $this->sendPaymentNotification($trx, $kelas, $user);
                }
            } catch (\Exception $e) {
                Log::error('Error sending free course notification', [
                    'error' => $e->getMessage(),
                    'transaction_id' => $trx->id
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Free transaction created successfully',
                'data' => [
                    'invoice_number' => $invoiceNumber,
                    'transaction_id' => $trx->id,
                    'amount' => 0,
                    'status' => 'paid'
                ]
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Free transaction creation failed', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create free transaction',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function midtransCallback(Request $request)
    {
        try {
            Log::info('=== MIDTRANS CALLBACK RECEIVED ===', [
                'all_data' => $request->all(),
                'headers' => $request->headers->all(),
                'method' => $request->method(),
                'ip' => $request->ip()
            ]);

            $requiredParams = ['order_id', 'status_code', 'gross_amount', 'signature_key'];
            $missingParams = [];

            foreach ($requiredParams as $param) {
                if (!$request->has($param) || empty($request->input($param))) {
                    $missingParams[] = $param;
                }
            }

            if (!empty($missingParams)) {
                Log::error('Missing required parameters in callback', [
                    'missing_params' => $missingParams,
                    'received_params' => array_keys($request->all())
                ]);
                return response()->json([
                    'message' => 'Missing required parameters: ' . implode(', ', $missingParams)
                ], 400);
            }

            $serverKey = config('services.midtrans.server_key');
            if (empty($serverKey)) {
                Log::error('Midtrans server key not configured');
                return response()->json(['message' => 'Server configuration error'], 500);
            }

            $orderId = $request->input('order_id');
            $statusCode = $request->input('status_code');
            $grossAmount = $request->input('gross_amount');
            $signatureKey = $request->input('signature_key');

            $expectedSignature = hash("sha512", $orderId . $statusCode . $grossAmount . $serverKey);

            Log::info('Signature verification', [
                'order_id' => $orderId,
                'status_code' => $statusCode,
                'gross_amount' => $grossAmount,
                'received_signature' => $signatureKey,
                'expected_signature' => $expectedSignature,
                'signature_match' => $expectedSignature === $signatureKey
            ]);

            if ($expectedSignature !== $signatureKey) {
                Log::warning('Invalid signature in Midtrans callback', [
                    'order_id' => $orderId,
                    'received_signature' => $signatureKey,
                    'expected_signature' => $expectedSignature
                ]);
                return response()->json(['message' => 'Invalid signature'], 403);
            }

            $transaction = Transaction::where('invoice_number', $orderId)->first();

            if (!$transaction) {
                Log::warning('Transaction not found for callback', [
                    'order_id' => $orderId,
                    'searched_invoice' => $orderId
                ]);

                $alternativeTransaction = Transaction::where('invoice_number', 'LIKE', "%{$orderId}%")->first();

                if ($alternativeTransaction) {
                    Log::info('Found transaction with alternative search', [
                        'order_id' => $orderId,
                        'found_invoice' => $alternativeTransaction->invoice_number
                    ]);
                    $transaction = $alternativeTransaction;
                } else {
                    return response()->json(['message' => 'Transaction not found'], 404);
                }
            }

            Log::info('Transaction found', [
                'transaction_id' => $transaction->id,
                'current_status' => $transaction->status,
                'invoice_number' => $transaction->invoice_number
            ]);

            $transactionStatus = $request->input('transaction_status');
            $fraudStatus = $request->input('fraud_status');
            $paymentType = $request->input('payment_type');

            Log::info('Processing transaction status update', [
                'order_id' => $orderId,
                'transaction_status' => $transactionStatus,
                'fraud_status' => $fraudStatus,
                'payment_type' => $paymentType,
                'current_db_status' => $transaction->status
            ]);

            $newStatus = $transaction->status;
            $paidAt = null;

            switch (strtolower($transactionStatus)) {
                case 'capture':
                    if (strtolower($fraudStatus) === 'challenge') {
                        $newStatus = 'challenge';
                    } elseif (strtolower($fraudStatus) === 'accept') {
                        $newStatus = 'paid';
                        $paidAt = now();
                    }
                    break;

                case 'settlement':
                    $newStatus = 'paid';
                    $paidAt = now();
                    break;

                case 'pending':
                    $newStatus = 'pending';
                    break;

                case 'deny':
                    $newStatus = 'failed';
                    break;

                case 'cancel':
                    $newStatus = 'cancelled';
                    break;

                case 'expire':
                    $newStatus = 'expired';
                    break;

                case 'failure':
                    $newStatus = 'failed';
                    break;

                default:
                    Log::warning('Unknown transaction status received', [
                        'transaction_status' => $transactionStatus,
                        'order_id' => $orderId
                    ]);
                    $newStatus = 'unknown';
                    break;
            }

            $updateData = ['status' => $newStatus];

            if ($newStatus === 'paid' && Schema::hasColumn('transactions', 'paid_at')) {
                $updateData['paid_at'] = $paidAt;
            }

            Log::info('Updating transaction', [
                'transaction_id' => $transaction->id,
                'old_status' => $transaction->status,
                'new_status' => $newStatus,
                'update_data' => $updateData
            ]);

            $transaction->update($updateData);

            if ($newStatus === 'paid') {
                try {
                    $kelas = $transaction->kelas;
                    $user = $transaction->user;

                    if ($kelas && $user) {
                        $this->sendPaymentNotification($transaction, $kelas, $user);
                    }
                } catch (\Exception $e) {
                    Log::error('Error sending payment notification after callback', [
                        'error' => $e->getMessage(),
                        'transaction_id' => $transaction->id
                    ]);
                }
            }

            Log::info('=== CALLBACK PROCESSED SUCCESSFULLY ===', [
                'order_id' => $orderId,
                'transaction_id' => $transaction->id,
                'status_updated' => $newStatus,
                'payment_completed' => $newStatus === 'paid'
            ]);

            return response()->json([
                'message' => 'OK',
                'status' => 'success',
                'order_id' => $orderId,
                'new_status' => $newStatus
            ], 200);
        } catch (\Exception $e) {
            Log::error('=== MIDTRANS CALLBACK FAILED ===', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'message' => 'Callback processing failed',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function checkTransactionStatus($invoiceNumber)
    {
        try {
            $transaction = Transaction::where('invoice_number', $invoiceNumber)->first();

            if (!$transaction) {
                return response()->json([
                    'success' => false,
                    'message' => 'Transaction not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'invoice_number' => $transaction->invoice_number,
                    'status' => $transaction->status,
                    'amount' => $transaction->amount,
                    'payment_method' => $transaction->payment_method,
                    'created_at' => $transaction->created_at,
                    'paid_at' => $transaction->paid_at
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Check transaction status failed', [
                'error' => $e->getMessage(),
                'invoice_number' => $invoiceNumber
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to check transaction status'
            ], 500);
        }
    }

    public function sendWhatsAppMessage($phoneNumber, $message)
    {
        $waGatewayUrl = env('APP_WA_URL');

        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => $waGatewayUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => [
                'message' => $message,
                'to' => $phoneNumber,
            ],
            CURLOPT_HTTPHEADER => [
                'User-Agent: ' . env('APP_NAME', 'Laravel App')
            ],
        ]);

        $response = curl_exec($curl);
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        if (curl_error($curl)) {
            throw new \Exception('cURL Error: ' . curl_error($curl));
        }

        curl_close($curl);

        if ($httpCode !== 200) {
            throw new \Exception("WhatsApp API returned HTTP {$httpCode}: {$response}");
        }

        return json_decode($response, true);
    }

    private function sendPaymentNotification($transaction, $kelas, $user)
    {
        try {
            if (empty($user->phone)) {
                Log::warning('User phone number not available for WhatsApp notification', [
                    'user_id' => $user->id,
                    'transaction_id' => $transaction->id
                ]);
                return;
            }

            $message = "🎉 *Pembayaran Berhasil!*\n\n";
            $message .= "Halo {$user->name},\n\n";
            $message .= "Pembayaran Anda telah berhasil diproses:\n\n";
            $message .= "📋 *Detail Transaksi:*\n";
            $message .= "• Invoice: {$transaction->invoice_number}\n";
            $message .= "• Kelas: {$kelas->title}\n";
            $message .= "• Total: Rp " . number_format($transaction->amount, 0, ',', '.') . "\n";
            $message .= "• Tanggal: " . $transaction->created_at->format('d M Y H:i') . "\n\n";
            $message .= "🎓 Selamat belajar! Akses kelas Anda sekarang melalui aplikasi.\n\n";
            $message .= "Terima kasih telah bergabung dengan kami! 🙏";

            $phoneNumber = $this->formatPhoneNumber($user->phone);

            $this->sendWhatsAppMessage($phoneNumber, $message);

            Log::info('WhatsApp payment notification sent successfully', [
                'user_id' => $user->id,
                'phone' => $phoneNumber,
                'transaction_id' => $transaction->id
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to send WhatsApp payment notification', [
                'error' => $e->getMessage(),
                'user_id' => $user->id,
                'transaction_id' => $transaction->id,
                'trace' => $e->getTraceAsString()
            ]);
        }
    }

    private function formatPhoneNumber($phone)
    {
        $phone = preg_replace('/[^0-9]/', '', $phone);

        if (substr($phone, 0, 1) === '0') {
            $phone = '62' . substr($phone, 1);
        } elseif (substr($phone, 0, 2) !== '62') {
            $phone = '62' . $phone;
        }

        return $phone;
    }

    private function generateInvoiceNumber($kelas)
    {
        try {
            $prefix = 'MBI';
            $namaKelas = strtoupper(substr(preg_replace('/[^a-zA-Z0-9]/', '', $kelas->title), 0, 10));
            $noSertifikat = str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);
            $tanggal = date('d');
            $bulan = date('m');
            $tahun = date('Y');

            return $prefix . '/' . $namaKelas . '/' . $noSertifikat . '/' . $tanggal . '/' . $bulan . '/' . $tahun;
        } catch (\Exception $e) {
            Log::error('Failed to generate invoice number', [
                'error' => $e->getMessage(),
                'kelas_id' => $kelas->id ?? 'unknown'
            ]);

            return 'MBI/DEFAULT/' . str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT) . '/' . date('d/m/Y');
        }
    }
}
