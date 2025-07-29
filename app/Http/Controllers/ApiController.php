<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\BalasDiskusi;
use App\Models\Category;
use App\Models\Diskusi;
use App\Models\Event;
use App\Models\Faq;
use App\Models\Kelas;
use App\Models\Level;
use App\Models\Quiz;
use App\Models\QuizAnswer;
use App\Models\Section;
use App\Models\Setting;
use App\Models\TemplateSertifikat;
use App\Models\TermCondition;
use App\Models\Testimoni;
use App\Models\Transaction;
use App\Models\Type;
use App\Models\User;
use App\Models\UserAnswer;
use App\Models\Video;
use App\Models\VideoReader;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use setasign\Fpdi\Fpdi;

class ApiController extends Controller
{
    public function home()
    {
        try {
            $user_id = Auth::id();

            $totalstar = Testimoni::sum('rating');
            $totalkelas = Kelas::where('status', 'disetujui')->count();
            $testimoni = Testimoni::latest()->get();

            $kelaspopuler = Kelas::select(
                'kelas.*',
                DB::raw('COUNT(DISTINCT transactions.id) as total_transaksi'),
                DB::raw('ROUND(AVG(testimonis.rating), 1) as average_rating'),
                DB::raw('COUNT(testimonis.id) as total_reviews'),
                DB::raw('COUNT(CASE WHEN transactions.status IN ("paid", "free") AND transactions.user_id = ? THEN 1 END) > 0 as sudah_bergabung')
            )
                ->leftJoin('transactions', function ($join) use ($user_id) {
                    $join->on('kelas.id', '=', 'transactions.kelas_id')
                        ->where(function ($query) use ($user_id) {
                            $query->where(function ($subQuery) {
                                $subQuery->where('transactions.status', '=', 'paid');
                            })
                                ->orWhere(function ($subQuery) use ($user_id) {
                                    $subQuery->where('transactions.status', '=', 'free')
                                        ->where('transactions.user_id', '=', $user_id);
                                });
                        });
                })
                ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
                ->where('kelas.status', 'disetujui')
                ->groupBy('kelas.id')
                ->addBinding([$user_id], 'select')
                ->orderByDesc('total_transaksi')
                ->limit(5)
                ->get();

            $kelaspopuler = $kelaspopuler->map(function ($kelasItem) {
                $kelasArray = $kelasItem->toArray();
                $kelasArray['sudah_bergabung'] = (bool) $kelasItem->sudah_bergabung;
                return $kelasArray;
            });

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil diambil',
                'data' => [
                    'total_star' => $totalstar,
                    'total_kelas' => $totalkelas,
                    'kelas_populer' => $kelaspopuler,
                    'testimoni' => $testimoni
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat mengambil data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function setting()
    {
        $data = Setting::first();
        if (!$data) {
            return response()->json(['error' => 'Setting not found'], 404);
        }
        $response = [
            'data' => $data,
            'status' => 1,
        ];
        return response()->json($response);
    }

    public function user(Request $request)
    {
        $user = Auth::user();
        $token = $request->bearerToken();
        return response()->json([
            'user' => $user,
            'token' => $token,
            'message' => 'User found successfully!',
            'success' => true
        ]);
    }

    public function kategori()
    {
        $data = Category::all();
        if (!$data) {
            return response()->json(['error' => 'data not found'], 404);
        }
        $response = [
            'data' => $data,
            'status' => 1,
        ];
        return response()->json($response);
    }

    public function event()
    {
        $data = Event::all();
        if (!$data) {
            return response()->json(['error' => 'data not found'], 404);
        }
        $response = [
            'data' => $data,
            'status' => 1,
        ];
        return response()->json($response);
    }

    public function about()
    {
        $data = About::all();
        if (!$data) {
            return response()->json(['error' => 'data not found'], 404);
        }
        $response = [
            'data' => $data,
            'status' => 1,
        ];
        return response()->json($response);
    }

    public function faq()
    {
        $data = Faq::all();
        if (!$data) {
            return response()->json(['error' => 'data not found'], 404);
        }
        $response = [
            'data' => $data,
            'status' => 1,
        ];
        return response()->json($response);
    }

    public function trx()
    {
        $idUser = Auth::user()->id;
        $data = Transaction::where('user_id', $idUser)
            ->where(function ($query) {
                $query->where('status', 'paid')
                    ->orWhere('status', 'free');
            })
            ->latest()
            ->get();
        if (!$data) {
            return response()->json(['error' => 'data not found'], 404);
        }
        $response = [
            'data' => $data,
            'status' => 1,
        ];
        return response()->json($response);
    }

    public function term_condition()
    {
        $data = TermCondition::first();
        if (!$data) {
            return response()->json(['error' => 'data not found'], 404);
        }
        $response = [
            'data' => $data,
            'status' => 1,
        ];
        return response()->json($response);
    }

    public function kelasApi()
    {
        $user_id = Auth::id();
        $data = Kelas::select(
            'kelas.*',
            DB::raw('COUNT(DISTINCT transactions.id) as total_transaksi'),
            DB::raw('ROUND(AVG(testimonis.rating), 1) as average_rating'),
            DB::raw('COUNT(CASE WHEN transactions.status IN ("paid", "free") AND transactions.user_id = ? THEN 1 END) > 0 as sudah_bergabung')
        )
            ->leftJoin('transactions', function ($join) use ($user_id) {
                $join->on('kelas.id', '=', 'transactions.kelas_id')
                    ->where(function ($query) use ($user_id) {
                        $query->where(function ($subQuery) {
                            $subQuery->where('transactions.status', '=', 'paid');
                        })
                            ->orWhere(function ($subQuery) use ($user_id) {
                                $subQuery->where('transactions.status', '=', 'free')
                                    ->where('transactions.user_id', '=', $user_id);
                            });
                    });
            })
            ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
            ->where('kelas.status', 'disetujui')
            ->groupBy('kelas.id')
            ->orderByDesc('total_transaksi')
            ->addBinding([$user_id], 'select')
            ->with(['level', 'type', 'category', 'user'])
            ->get();

        $data = $data->map(function ($kelas) {
            $kelasArray = $kelas->toArray();
            $kelasArray['sudah_bergabung'] = (bool) $kelas->sudah_bergabung;
            return $kelasArray;
        });

        $category = Category::all();
        $tipekelas = Type::all();
        $level = Level::all();

        return response()->json([
            'kelas' => $data,
            'category' => $category,
            'tipekelas' => $tipekelas,
            'level' => $level
        ]);
    }

    public function register(Request $request)
    {
        try {
            Log::info('Register attempt', [
                'email' => $request->email,
                'name' => $request->name,
                'phone' => $request->phone
            ]);

            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
                'phone' => 'required|string|max:20',
                'alamat' => 'nullable|string|max:255',
                'tempat_lahir' => 'required|string|max:100',
                'tanggal_lahir' => 'required|date',
                'jk' => 'required',
            ]);

            Log::info('Validation passed');

            $tanggalLahir = Carbon::parse($request->tanggal_lahir);
            $umur = $tanggalLahir->diffInYears(Carbon::now());

            $otp = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
            $expiredOtp = Carbon::now()->addMinutes(5);

            Log::info('Creating user with data', [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'otp' => $otp
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'alamat' => $request->alamat,
                'tempat_lahir' => $request->tempat_lahir,
                'tanggal_lahir' => $request->tanggal_lahir,
                'jk' => $request->jk,
                'umur' => $umur,
                'role' => 'student',
                'status' => 0,
                'otp' => $otp,
                'expired_otp' => $expiredOtp,
            ]);

            Log::info('User created successfully', ['user_id' => $user->id]);

            try {
                $this->sendOtpWhatsApp($user->phone, $otp, $user->name);
                Log::info('WhatsApp OTP sent successfully');
            } catch (\Exception $waError) {
                Log::error('WhatsApp sending failed', [
                    'error' => $waError->getMessage(),
                    'user_id' => $user->id
                ]);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            Log::info('Registration completed successfully', [
                'user_id' => $user->id,
                'otp_for_testing' => $otp
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Registrasi berhasil! OTP: ' . $otp . ' (untuk testing)',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'status' => $user->status,
                ],
                'token' => $token,
                'otp_expired_at' => $expiredOtp->format('Y-m-d H:i:s'),
                'otp_for_testing' => $otp,
            ], 201);
        } catch (ValidationException $e) {
            Log::warning('Validation failed', [
                'errors' => $e->errors(),
                'request' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Validasi Gagal',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error('Database error during registration', [
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ]);

            if ($e->getCode() == 23000) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email atau nomor telepon sudah terdaftar',
                    'error' => 'Duplicate entry detected'
                ], 409);
            }

            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan database',
                'error' => 'Database error occurred'
            ], 500);
        } catch (\Exception $e) {
            Log::error('General error during registration', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Registrasi gagal',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function verifyRegistrationOtp(Request $request)
    {
        try {
            Log::info('Verify OTP attempt', [
                'email' => $request->email,
                'otp' => $request->otp
            ]);

            $request->validate([
                'email' => 'required|email|exists:users,email',
                'otp' => 'required|string|size:6',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user->otp) {
                Log::warning('OTP not found for user', ['email' => $request->email]);
                return response()->json([
                    'success' => false,
                    'message' => 'OTP tidak ditemukan. Silakan minta OTP baru.',
                ], 400);
            }

            if (Carbon::now()->gt($user->expired_otp)) {
                Log::warning('OTP expired', [
                    'email' => $request->email,
                    'expired_at' => $user->expired_otp
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'OTP telah kadaluarsa. Silakan minta OTP baru.',
                ], 400);
            }

            if ($user->otp !== $request->otp) {
                Log::warning('Invalid OTP', [
                    'email' => $request->email,
                    'provided_otp' => $request->otp,
                    'expected_otp' => $user->otp
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'OTP tidak valid.',
                ], 400);
            }

            if ($user->role !== 'student') {
                Log::warning('Non-student user attempting OTP verification', [
                    'email' => $request->email,
                    'role' => $user->role
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'Hanya pengguna dengan role student yang diperbolehkan.',
                ], 403);
            }

            $user->update([
                'status' => 1,
                'otp' => null,
                'expired_otp' => null,
                'email_verified_at' => Carbon::now(),
            ]);

            Log::info('OTP verification successful', ['user_id' => $user->id]);

            $token = $user->createToken('auth_token')->plainTextToken;

            Log::info('Auto-login token generated', ['user_id' => $user->id]);

            try {
                $this->sendWelcomeMessage($user->phone, $user->name);
            } catch (\Exception $e) {
                Log::error('Welcome message failed: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Akun berhasil diverifikasi! Selamat datang.',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'role' => $user->role,
                    'status' => $user->status,
                    'verified_at' => $user->email_verified_at,
                ],
                'token' => $token,
            ], 200);
        } catch (ValidationException $e) {
            Log::warning('OTP validation failed', ['errors' => $e->errors()]);
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('OTP verification error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal memverifikasi OTP: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function resendRegistrationOtp(Request $request)
    {
        try {
            Log::info('Resend OTP attempt', ['email' => $request->email]);

            $request->validate([
                'email' => 'required|email|exists:users,email',
            ]);

            $user = User::where('email', $request->email)->first();

            if ($user->status == 1) {
                Log::warning('User already verified', ['email' => $request->email]);
                return response()->json([
                    'success' => false,
                    'message' => 'Akun sudah terverifikasi.',
                ], 400);
            }

            if ($user->expired_otp && Carbon::now()->lt($user->expired_otp->subMinutes(4))) {
                Log::warning('Rate limit hit', ['email' => $request->email]);
                return response()->json([
                    'success' => false,
                    'message' => 'Tunggu 1 menit sebelum meminta OTP baru.',
                ], 429);
            }

            $otp = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
            $expiredOtp = Carbon::now()->addMinutes(5);

            $user->update([
                'otp' => $otp,
                'expired_otp' => $expiredOtp,
            ]);

            Log::info('New OTP generated', [
                'user_id' => $user->id,
                'otp' => $otp
            ]);

            try {
                $this->sendOtpWhatsApp($user->phone, $otp, $user->name);
            } catch (\Exception $e) {
                Log::error('WhatsApp resend failed: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'OTP baru telah dikirim ke WhatsApp Anda. OTP: ' . $otp,
                'otp_expired_at' => $expiredOtp->format('Y-m-d H:i:s'),
            ], 200);
        } catch (\Exception $e) {
            Log::error('Resend OTP error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengirim ulang OTP: ' . $e->getMessage(),
            ], 500);
        }
    }

    private function sendWelcomeMessage($phoneNumber, $userName)
    {
        try {
            $waGatewayUrl = env('APP_WA_URL');
            $siteName = Setting::first()->site_name ?? 'Platform Kursus Online';
            $waNumber = $this->formatPhoneNumber($phoneNumber);

            $message = "🎓 Selamat datang, {$userName}! 🎉\n\n";
            $message .= "✅ Registrasi berhasil! Anda sudah masuk ke {$siteName}\n\n";
            $message .= "🚀 *Sekarang Anda dapat:*\n";
            $message .= "• Jelajahi katalog kursus yang tersedia\n";
            $message .= "• Pilih kursus sesuai minat Anda\n";
            $message .= "• Mulai perjalanan belajar sekarang juga\n\n";
            $message .= "🎯 *Mulai eksplorasi sekarang:*\n";
            $message .= "• Lihat kursus populer dan terbaru\n";
            $message .= "• Dapatkan sertifikat setelah menyelesaikan kursus\n";
            $message .= "• Bergabung dengan komunitas learner aktif\n\n";
            $message .= "❓ Butuh bantuan? Tim support siap membantu Anda.\n\n";
            $message .= "Selamat menjelajahi dan belajar! 🌟\n\n";
            $message .= "---\n";
            $message .= "Tim {$siteName}";

            $response = $this->sendWhatsAppMessage($waNumber, $message);

            Log::info("Welcome message sent successfully to {$waNumber} for user: {$userName}");

            return $response;
        } catch (\Exception $e) {
            Log::error('Welcome WhatsApp Error: ' . $e->getMessage(), [
                'phone' => $phoneNumber,
                'user' => $userName,
                'trace' => $e->getTraceAsString()
            ]);
            return false;
        }
    }

    private function formatPhoneNumber($phoneNumber)
    {
        $waNumber = preg_replace('/[^0-9]/', '', $phoneNumber);

        if (substr($waNumber, 0, 1) === '0') {
            $waNumber = '62' . substr($waNumber, 1);
        } elseif (substr($waNumber, 0, 2) !== '62') {
            $waNumber = '62' . $waNumber;
        }

        return $waNumber;
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

    private function sendOtpWhatsApp($phoneNumber, $otp, $userName)
    {
        try {
            $siteName = Setting::first()->site_name ?? 'Platform Kursus Online';
            $waNumber = $this->formatPhoneNumber($phoneNumber);
            $message = "🔐 *Kode Verifikasi {$siteName}*\n\n";
            $message .= "Halo {$userName}! 👋\n\n";
            $message .= "Kode OTP Anda adalah:\n";
            $message .= "*{$otp}*\n\n";
            $message .= "⚠️ *PENTING:*\n";
            $message .= "• Kode berlaku selama 5 menit\n";
            $message .= "• Jangan bagikan kode ini kepada siapa pun\n";
            $message .= "• Gunakan kode ini untuk verifikasi akun Anda\n\n";
            $message .= "Jika Anda tidak meminta kode ini, abaikan pesan ini.\n\n";
            $message .= "---\n";
            $message .= "Tim {$siteName}";

            $response = $this->sendWhatsAppMessage($waNumber, $message);

            Log::info("OTP WhatsApp sent successfully to {$waNumber} for user: {$userName}");

            return $response;
        } catch (\Exception $e) {
            Log::error('OTP WhatsApp Error: ' . $e->getMessage(), [
                'phone' => $phoneNumber,
                'user' => $userName,
                'otp' => $otp,
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }


    public function kelassaya()
    {
        try {
            $user_id = Auth::id();
            if (!$user_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            $data = Kelas::select(
                'kelas.*',
                DB::raw('COUNT(DISTINCT transactions.id) as total_transaksi'),
                DB::raw('COALESCE(AVG(testimonis.rating), 0) as average_rating'),
                'transactions.created_at as joined_at',
                'transactions.status as transaction_status'
            )
                ->with([
                    'category:id,name',
                    'level:id,name',
                    'type:id,name',
                    'user:id,name,email,image,bio'
                ])
                ->leftJoin('transactions', function ($join) use ($user_id) {
                    $join->on('kelas.id', '=', 'transactions.kelas_id')
                        ->where('transactions.user_id', $user_id)
                        ->whereIn('transactions.status', ['paid', 'free']);
                })
                ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
                ->where('kelas.status', 'disetujui')
                ->whereNotNull('transactions.id')
                ->groupBy('kelas.id', 'transactions.created_at', 'transactions.status')
                ->orderByDesc('transactions.created_at')
                ->get();

            $kelasWithProgress = $data->map(function ($kelas) use ($user_id) {

                $totalActiveVideos = Video::join('sections', 'videos.section_id', '=', 'sections.id')
                    ->where('sections.kelas_id', $kelas->id)
                    ->count();

                $totalAllVideos = Video::join('sections', 'videos.section_id', '=', 'sections.id')
                    ->where('sections.kelas_id', $kelas->id)
                    ->count();

                $watchedVideos = VideoReader::join('videos', 'video_readers.video_id', '=', 'videos.id')
                    ->join('sections', 'videos.section_id', '=', 'sections.id')
                    ->where('video_readers.user_id', $user_id)
                    ->where('video_readers.status', 1)
                    ->where('sections.kelas_id', $kelas->id)
                    ->count();

                $totalVideos = $totalActiveVideos;

                $progress = $totalVideos > 0 ? ($watchedVideos / $totalVideos) * 100 : 0;

                $completionStatus = 'not_started';
                if ($progress > 0 && $progress < 100) {
                    $completionStatus = 'in_progress';
                } elseif ($progress >= 100) {
                    $completionStatus = 'completed';
                }

                $kelas->progress = round($progress, 2);
                $kelas->total_videos = $totalVideos;
                $kelas->total_active_videos = $totalActiveVideos;
                $kelas->total_all_videos = $totalAllVideos;
                $kelas->videos_completed = $watchedVideos;
                $kelas->completion_status = $completionStatus;

                $kelas->video_breakdown = [
                    'active_videos' => $totalActiveVideos,
                    'inactive_videos' => $totalAllVideos - $totalActiveVideos,
                    'watched_videos' => $watchedVideos,
                    'unwatched_active_videos' => $totalActiveVideos - $watchedVideos,
                ];

                $kelas->formatted_price = $kelas->price > 0 ? 'Rp ' . number_format($kelas->price, 0, ',', '.') : 'Gratis';
                $kelas->final_price = max(0, $kelas->price - ($kelas->discount ?? 0));
                $kelas->formatted_final_price = $kelas->final_price > 0 ? 'Rp ' . number_format($kelas->final_price, 0, ',', '.') : 'Gratis';

                if ($kelas->discount > 0 && $kelas->price > 0) {
                    $kelas->discount_percentage = round(($kelas->discount / $kelas->price) * 100);
                } else {
                    $kelas->discount_percentage = 0;
                }

                $kelas->average_rating = round($kelas->average_rating, 1);

                $kelas->image_url = $kelas->image ?
                    env('IMG_URL') . '/' . $kelas->image :
                    env('IMG_URL') . '/default-class-image.jpg';

                $kelas->joined_at_formatted = $kelas->joined_at ?
                    \Carbon\Carbon::parse($kelas->joined_at)->format('d M Y') : null;

                unset($kelas->joined_at);

                return $kelas;
            });

            $setting = Setting::first();
            $auth = User::select('id', 'name', 'email', 'image', 'bio')
                ->findOrFail($user_id);

            $statistics = [
                'total_classes' => $kelasWithProgress->count(),
                'completed_classes' => $kelasWithProgress->where('completion_status', 'completed')->count(),
                'in_progress_classes' => $kelasWithProgress->where('completion_status', 'in_progress')->count(),
                'not_started_classes' => $kelasWithProgress->where('completion_status', 'not_started')->count(),
                'total_videos_watched' => $kelasWithProgress->sum('videos_completed'),
                'total_videos_available' => $kelasWithProgress->sum('total_videos'),
                'total_active_videos' => $kelasWithProgress->sum('total_active_videos'),
                'total_all_videos' => $kelasWithProgress->sum('total_all_videos'),
                'overall_progress' => $kelasWithProgress->sum('total_videos') > 0 ?
                    round(($kelasWithProgress->sum('videos_completed') / $kelasWithProgress->sum('total_videos')) * 100, 2) : 0
            ];

            return response()->json([
                'success' => true,
                'message' => 'Data retrieved successfully',
                'data' => [
                    'kelas' => $kelasWithProgress,
                    'setting' => $setting,
                    'auth' => $auth,
                    'statistics' => $statistics
                ]
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error in kelassaya method: ' . $e->getMessage(), [
                'user_id' => Auth::id(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while retrieving data',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function sendDiskusi(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:3048',
                'subject' => 'required|string|max:255',
                'title' => 'required|string|max:255',
                'body' => 'required|string',
                'kelasId' => 'required|integer|exists:kelas,id',
            ]);

            $diskusi = new Diskusi();

            if ($request->hasFile('image')) {
                $filename = $request->file('image')->store('images/diskusi', 'public');
                $diskusi->image = $filename;
            }

            $diskusi->user_id = Auth::id();
            $diskusi->kelas_id = $request->kelasId;
            $diskusi->subject = $request->subject;
            $diskusi->title = $request->title;
            $diskusi->body = $request->body;
            $diskusi->save();

            $diskusi->load(['user:id,name,email', 'kelas:id,title']);

            return response()->json([
                'status' => 'success',
                'message' => 'Diskusi berhasil dikirim',
                'data' => [
                    'id' => $diskusi->id,
                    'subject' => $diskusi->subject,
                    'title' => $diskusi->title,
                    'body' => $diskusi->body,
                    'image' => $diskusi->image ? asset('storage/' . $diskusi->image) : null,
                    'user' => $diskusi->user,
                    'kelas' => $diskusi->kelas,
                    'created_at' => $diskusi->created_at,
                    'updated_at' => $diskusi->updated_at,
                ]
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat mengirim diskusi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function sendTestimonial(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'rating' => 'required|integer|min:1|max:5',
                'testimonial' => 'required|string|max:1000',
                'kelasId' => 'required|integer|exists:kelas,id'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $existingTestimoni = Testimoni::where('user_id', Auth::user()->id)
                ->where('kelas_id', $request->kelasId)
                ->first();

            if ($existingTestimoni) {
                return response()->json([
                    'success' => false,
                    'message' => 'Anda sudah memberikan testimoni untuk kelas ini'
                ], 409);
            }

            $kelas = Kelas::find($request->kelasId);
            if (!$kelas) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kelas tidak ditemukan'
                ], 404);
            }

            $testimoni = new Testimoni();
            $testimoni->user_id = Auth::user()->id;
            $testimoni->rating = $request->rating;
            $testimoni->body = $request->testimonial;
            $testimoni->kelas_id = $request->kelasId;
            $testimoni->save();

            $testimoni->load('user');

            return response()->json([
                'success' => true,
                'message' => 'Testimoni berhasil dikirim',
                'data' => [
                    'id' => $testimoni->id,
                    'user_id' => $testimoni->user_id,
                    'rating' => $testimoni->rating,
                    'body' => $testimoni->body,
                    'kelas_id' => $testimoni->kelas_id,
                    'created_at' => $testimoni->created_at,
                    'user' => [
                        'id' => $testimoni->user->id,
                        'name' => $testimoni->user->name,
                        'image' => $testimoni->user->image,
                    ]
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan server',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateTestimonial(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'rating' => 'required|integer|min:1|max:5',
                'testimonial' => 'required|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $testimoni = Testimoni::find($id);
            if (!$testimoni) {
                return response()->json([
                    'success' => false,
                    'message' => 'Testimoni tidak ditemukan'
                ], 404);
            }

            if ($testimoni->user_id !== Auth::user()->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki akses untuk mengubah testimoni ini'
                ], 403);
            }

            $testimoni->rating = $request->rating;
            $testimoni->body = $request->testimonial;
            $testimoni->save();

            $testimoni->load('user');

            return response()->json([
                'success' => true,
                'message' => 'Testimoni berhasil diperbarui',
                'data' => [
                    'id' => $testimoni->id,
                    'user_id' => $testimoni->user_id,
                    'rating' => $testimoni->rating,
                    'body' => $testimoni->body,
                    'kelas_id' => $testimoni->kelas_id,
                    'updated_at' => $testimoni->updated_at,
                    'user' => [
                        'id' => $testimoni->user->id,
                        'name' => $testimoni->user->name,
                        'image' => $testimoni->user->image,
                    ]
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan server',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteTestimonial($id)
    {
        try {
            $testimoni = Testimoni::find($id);
            if (!$testimoni) {
                return response()->json([
                    'success' => false,
                    'message' => 'Testimoni tidak ditemukan'
                ], 404);
            }

            if ($testimoni->user_id !== Auth::user()->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki akses untuk menghapus testimoni ini'
                ], 403);
            }

            $testimoni->delete();

            return response()->json([
                'success' => true,
                'message' => 'Testimoni berhasil dihapus'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan server',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getTestimonialsByKelas($kelasId)
    {
        try {
            $kelas = Kelas::find($kelasId);
            if (!$kelas) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kelas tidak ditemukan'
                ], 404);
            }

            $testimoni = Testimoni::with('user')
                ->where('kelas_id', $kelasId)
                ->orderBy('created_at', 'desc')
                ->get();

            $totalReviews = $testimoni->count();
            $averageRating = $totalReviews > 0 ? round($testimoni->avg('rating'), 1) : 0;

            $ratingDistribution = [];
            for ($i = 1; $i <= 5; $i++) {
                $ratingDistribution[$i] = $testimoni->where('rating', $i)->count();
            }

            return response()->json([
                'success' => true,
                'message' => 'Data testimoni berhasil diambil',
                'data' => [
                    'kelas_id' => $kelasId,
                    'total_reviews' => $totalReviews,
                    'average_rating' => $averageRating,
                    'rating_distribution' => $ratingDistribution,
                    'testimoni' => $testimoni->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'user_id' => $item->user_id,
                            'rating' => $item->rating,
                            'body' => $item->body,
                            'created_at' => $item->created_at,
                            'user' => [
                                'id' => $item->user->id,
                                'name' => $item->user->name,
                                'image' => $item->user->image,
                            ]
                        ];
                    })
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan server',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getMyTestimonials()
    {
        try {
            $testimoni = Testimoni::with(['user', 'kelas'])
                ->where('user_id', Auth::user()->id)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Data testimoni Anda berhasil diambil',
                'data' => $testimoni->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'rating' => $item->rating,
                        'body' => $item->body,
                        'created_at' => $item->created_at,
                        'kelas' => [
                            'id' => $item->kelas->id,
                            'title' => $item->kelas->title,
                            'slug' => $item->kelas->slug,
                        ]
                    ];
                })
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan server',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getAllTestimonials(Request $request)
    {
        try {
            $perPage = $request->get('limit', 10);
            $page = $request->get('page', 1);

            $testimoni = Testimoni::with(['user', 'kelas'])
                ->orderBy('created_at', 'desc')
                ->paginate($perPage, ['*'], 'page', $page);

            return response()->json([
                'success' => true,
                'message' => 'Data testimoni berhasil diambil',
                'data' => [
                    'current_page' => $testimoni->currentPage(),
                    'per_page' => $testimoni->perPage(),
                    'total' => $testimoni->total(),
                    'last_page' => $testimoni->lastPage(),
                    'testimoni' => $testimoni->items()
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan server',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getTestimonialById($id)
    {
        try {
            $testimoni = Testimoni::with(['user', 'kelas'])->find($id);

            if (!$testimoni) {
                return response()->json([
                    'success' => false,
                    'message' => 'Testimoni tidak ditemukan'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Data testimoni berhasil diambil',
                'data' => [
                    'id' => $testimoni->id,
                    'user_id' => $testimoni->user_id,
                    'rating' => $testimoni->rating,
                    'body' => $testimoni->body,
                    'kelas_id' => $testimoni->kelas_id,
                    'created_at' => $testimoni->created_at,
                    'user' => [
                        'id' => $testimoni->user->id,
                        'name' => $testimoni->user->name,
                        'image' => $testimoni->user->image,
                    ],
                    'kelas' => [
                        'id' => $testimoni->kelas->id,
                        'title' => $testimoni->kelas->title,
                        'slug' => $testimoni->kelas->slug,
                    ]
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan server',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function balasDiskusi(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'diskusiId' => 'required|integer|exists:diskusis,id',
                'balas' => 'required|string',
            ]);

            $diskusi = Diskusi::find($request->diskusiId);
            if (!$diskusi) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Diskusi tidak ditemukan'
                ], 404);
            }

            $balasan = new BalasDiskusi();
            $balasan->user_id = Auth::id();
            $balasan->diskusi_id = $request->diskusiId;
            $balasan->body = $request->balas;
            $balasan->save();

            $balasan->load(['user:id,name,email', 'diskusi:id,title,subject']);

            return response()->json([
                'status' => 'success',
                'message' => 'Balasan berhasil dikirim',
                'data' => [
                    'id' => $balasan->id,
                    'body' => $balasan->body,
                    'user' => $balasan->user,
                    'diskusi' => [
                        'id' => $balasan->diskusi->id,
                        'title' => $balasan->diskusi->title,
                        'subject' => $balasan->diskusi->subject,
                    ],
                    'created_at' => $balasan->created_at,
                    'updated_at' => $balasan->updated_at,
                ]
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat membalas diskusi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getDiskusi($id): JsonResponse
    {
        try {
            $diskusi = Diskusi::with([
                'user:id,name,email',
                'kelas:id,title',
                'balasan' => function ($query) {
                    $query->with('user:id,name,email')->orderBy('created_at', 'asc');
                }
            ])->find($id);

            if (!$diskusi) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Diskusi tidak ditemukan'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'data' => [
                    'id' => $diskusi->id,
                    'subject' => $diskusi->subject,
                    'title' => $diskusi->title,
                    'body' => $diskusi->body,
                    'image' => $diskusi->image ? asset('storage/' . $diskusi->image) : null,
                    'user' => $diskusi->user,
                    'kelas' => $diskusi->kelas,
                    'balasan' => $diskusi->balasan->map(function ($balas) {
                        return [
                            'id' => $balas->id,
                            'body' => $balas->body,
                            'user' => $balas->user,
                            'created_at' => $balas->created_at,
                        ];
                    }),
                    'total_balasan' => $diskusi->balasan->count(),
                    'created_at' => $diskusi->created_at,
                    'updated_at' => $diskusi->updated_at,
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat mengambil data diskusi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getDiskusiByKelas($kelasId): JsonResponse
    {
        try {
            $diskusis = Diskusi::with([
                'user:id,name,email',
                'kelas:id,title'
            ])
                ->withCount('balasan')
                ->where('kelas_id', $kelasId)
                ->orderBy('created_at', 'desc')
                ->paginate(10);

            return response()->json([
                'status' => 'success',
                'data' => $diskusis->items(),
                'pagination' => [
                    'current_page' => $diskusis->currentPage(),
                    'last_page' => $diskusis->lastPage(),
                    'per_page' => $diskusis->perPage(),
                    'total' => $diskusis->total(),
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat mengambil data diskusi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function belajar($slug)
    {
        try {
            if (!Auth::check()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $kelas = Kelas::where('slug', $slug)->first();

            if (!$kelas) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kelas tidak ditemukan'
                ], 404);
            }

            $sections = Section::where('kelas_id', $kelas->id)
                ->withCount('videos')
                ->get();

            $videos = Video::whereIn('section_id', $sections->pluck('id'))->get();

            $videoRead = VideoReader::where('user_id', Auth::user()->id)
                ->whereIn('video_id', $videos->pluck('id'))
                ->get();

            $testimoni = Testimoni::where('kelas_id', $kelas->id)->get();

            $setting = Setting::first();

            $diskusi = Diskusi::where('kelas_id', $kelas->id)->get();

            $auth = User::findOrFail(Auth::user()->id);

            $balasDiskusi = BalasDiskusi::whereIn('diskusi_id', $diskusi->pluck('id'))->get();

            $totalstartmentor = Testimoni::where('kelas_id', $kelas->id)
                ->whereHas('kelas', function ($query) use ($kelas) {
                    $query->where('user_id', $kelas->user_id);
                })
                ->sum('rating');

            $totalTestimoni = Testimoni::where('kelas_id', $kelas->id)
                ->whereHas('kelas', function ($query) use ($kelas) {
                    $query->where('user_id', $kelas->user_id);
                })
                ->count();

            if ($totalTestimoni > 0) {
                $averageRating = $totalstartmentor / $totalTestimoni;
                $averageRating = number_format($averageRating, 1);
            } else {
                $averageRating = 0;
            }

            $totalulasan = Testimoni::where('kelas_id', $kelas->id)
                ->whereHas('kelas', function ($query) use ($kelas) {
                    $query->where('user_id', $kelas->user_id);
                })
                ->count();

            $totalsiswa = Transaction::where('kelas_id', $kelas->id)->where('status', ['paid', 'free'])
                ->count();

            $totalkelasmentor = Kelas::where('user_id', $kelas->user_id)->count();

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil diambil',
                'data' => [
                    'setting' => $setting,
                    'auth' => $auth,
                    'kelas' => $kelas,
                    'sectionData' => $sections,
                    'video' => $videos,
                    'testimoni' => $testimoni,
                    'diskusi' => $diskusi,
                    'balasDiskusi' => $balasDiskusi,
                    'averageRating' => $averageRating,
                    'totalulasan' => $totalulasan,
                    'totalsiswa' => $totalsiswa,
                    'totalkelasmentor' => $totalkelasmentor,
                    'videoRead' => $videoRead
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan server',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function exam($slug): JsonResponse
    {
        $kelas = Kelas::where('slug', $slug)->first();
        $exam = Quiz::where('kelas_id', $kelas->id)->get();
        $examanswer = QuizAnswer::whereIn('quiz_id', $exam->pluck('id'))->get();

        return response()->json([
            'success' => true,
            'message' => 'Data exam berhasil diambil',
            'data' => [
                'kelas' => $kelas,
                'exam' => $exam,
                'examanswer' => $examanswer
            ]
        ], 200);
    }

    public function examEnd($slug): JsonResponse
    {
        $kelas = Kelas::where('slug', $slug)->first();
        $exam = Quiz::where('kelas_id', $kelas->id)->get();
        $examanswer = QuizAnswer::whereIn('quiz_id', $exam->pluck('id'))->get();
        $data = UserAnswer::where('user_id', Auth::user()->id)->get();
        $userAnswers = $data->pluck('answer_id', 'quiz_id')->toArray();
        $totalPoint = $data->sum('point');

        return response()->json([
            'success' => true,
            'message' => 'Hasil examend berhasil diambil',
            'data' => [
                'kelas' => $kelas,
                'exam' => $exam,
                'examanswer' => $examanswer,
                'data' => $data,
                'userAnswers' => $userAnswers,
                'totalPoint' => $totalPoint
            ]
        ], 200);
    }

    public function examanswer(Request $request)
    {
        $request->validate([
            'answers' => 'required|array',
            'answers.*.quiz_id' => 'required|integer',
            'answers.*.quiz_answer_id' => 'required|integer',
            'answers.*.kelas_id' => 'required|integer',
        ]);

        foreach ($request->answers as $answer) {
            $quizAnswer = \App\Models\QuizAnswer::find($answer['quiz_answer_id']);
            $actualPoint = $quizAnswer ? $quizAnswer->point : 0;

            $existingAnswer = UserAnswer::where('user_id', Auth::user()->id)
                ->where('quiz_id', $answer['quiz_id'])
                ->first();

            if ($existingAnswer) {
                if ($existingAnswer->edit_count >= 3) {
                    return response()->json(['message' => 'Anda telah melebihi batas untuk mengedit ujian ini.'], 400);
                }

                $existingAnswer->edit_count += 1;
                $existingAnswer->quiz_answer_id = $answer['quiz_answer_id'];
                $existingAnswer->point = $actualPoint;
                $existingAnswer->save();
            } else {
                $kelas = \App\Models\Kelas::find($answer['kelas_id']);
                $namaKelas = $kelas ? strtoupper($kelas->nama) : 'UNKNOWN';
                $namaKelas = preg_replace('/[^A-Z0-9]/', '', $namaKelas);

                $randomNumber = rand(1000, 9999);
                $tanggal = date('d');
                $bulan = date('m');
                $tahun = date('Y');

                $noSertifikat = "MBI{$namaKelas}/{$randomNumber}/{$tanggal}/{$bulan}/{$tahun}";

                $q = new UserAnswer();
                $q->user_id = Auth::user()->id;
                $q->kelas_id = $answer['kelas_id'];
                $q->quiz_id = $answer['quiz_id'];
                $q->no_sertifikat = $noSertifikat;
                $q->quiz_answer_id = $answer['quiz_answer_id'];
                $q->point = $actualPoint;
                $q->edit_count = 1;
                $q->save();
            }
        }

        return response()->json(['message' => 'Answers saved successfully.']);
    }

    public function sertifikat()
    {
        $userAnswers = UserAnswer::where('user_id', Auth::user()->id)
            ->groupBy('kelas_id')
            ->selectRaw('*, SUM(point) as total_point')
            ->get();
        $totalPoint = $userAnswers->sum('total_point');
        return response()->json([
            'success' => true,
            'message' => 'Data sertifikat berhasil diambil',
            'data' => [
                'userAnswers' => $userAnswers,
                'totalPoint' => $totalPoint
            ]
        ]);
    }

    public function generateSertifikat($id)
    {
        $data = UserAnswer::where('id', $id)
            ->groupBy('kelas_id')
            ->selectRaw('*, sum(point) as total_point')
            ->first();

        if (!$data) {
            return response()->json(['error' => 'Data tidak ditemukan'], 404);
        }

        $template = TemplateSertifikat::where('status', 1)->first();

        if (!$template) {
            return response()->json(['error' => 'Template sertifikat tidak ditemukan'], 404);
        }

        $backgroundPdf = public_path('storage/' . $template->file);
        $folderPath = storage_path('app/public/sertifikat');

        if (!file_exists($folderPath)) {
            mkdir($folderPath, 0777, true);
        }

        $timestamp = now()->format('Y-m-d_H-i-s');
        $safeUserName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $data->user->name);
        $outputPdf = $folderPath . "/sertifikat-{$safeUserName}-{$timestamp}.pdf";

        if (!file_exists($backgroundPdf)) {
            return response()->json(['error' => 'Template sertifikat tidak ditemukan'], 404);
        }

        try {

            $pdf = new Fpdi();
            $pdf->setSourceFile($backgroundPdf);
            $tplId = $pdf->importPage(1);
            $size = $pdf->getTemplateSize($tplId);

            $pdf->AddPage($size['orientation'], [$size['width'], $size['height']]);
            $pdf->useTemplate($tplId, 0, 0, $size['width'], $size['height']);

            $pdf->SetFont('Arial', 'B', 18);

            $tanggal = Carbon::parse($data->created_at)->locale('id')->translatedFormat('d F Y');
            $pdf->SetTextColor(32, 122, 54);
            $pdf->SetXY(45, 168);
            $pdf->SetFont('Arial', 'B', 28);
            $pdf->Cell(0, 10, $data->user->name, 0, 1, 'L');

            $pdf->Output($outputPdf, 'F');

            if (!file_exists($outputPdf)) {
                return response()->json(['error' => 'Gagal membuat file PDF'], 500);
            }

            $fileContent = file_get_contents($outputPdf);

            return response($fileContent)
                ->header('Content-Type', 'application/pdf')
                ->header('Content-Disposition', 'attachment; filename="sertifikat-' . $safeUserName . '.pdf"')
                ->header('Content-Length', strlen($fileContent))
                ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
                ->header('Pragma', 'no-cache')
                ->header('Expires', '0');
        } catch (\Exception $e) {
            \Log::error('PDF Generation Error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Gagal membuat sertifikat',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function markAsRead(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'video_id' => 'required|integer|exists:videos,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $userId = Auth::id();
            $videoId = $request->video_id;

            $video = Video::with(['section.kelas'])->findOrFail($videoId);

            $videoReader = VideoReader::where('user_id', $userId)
                ->where('video_id', $videoId)
                ->first();

            if ($videoReader) {
                $videoReader->update([
                    'status' => 1,
                ]);
            } else {
                $videoReader = VideoReader::create([
                    'user_id' => $userId,
                    'video_id' => $videoId,
                    'status' => 1,
                ]);
            }

            $progress = $this->calculateUserProgress($userId, $video->section->kelas->id);

            return response()->json([
                'success' => true,
                'message' => 'Video marked as read successfully',
                'data' => [
                    'video_reader' => $videoReader,
                    'progress' => $progress
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to mark video as read',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getVideoProgress(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'kelas_id' => 'required|integer|exists:kelas,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $userId = Auth::id();
            $kelasId = $request->kelas_id;

            $kelas = Kelas::with(['sections.videos'])->findOrFail($kelasId);

            $progress = $this->calculateUserProgress($userId, $kelasId);

            $videoProgress = $this->getDetailedVideoProgress($userId, $kelasId);

            $sectionProgress = $this->getSectionProgress($userId, $kelasId);

            return response()->json([
                'success' => true,
                'message' => 'Progress retrieved successfully',
                'data' => [
                    'kelas' => [
                        'id' => $kelas->id,
                        'title' => $kelas->title,
                        'slug' => $kelas->slug,
                    ],
                    'overall_progress' => $progress,
                    'section_progress' => $sectionProgress,
                    'video_progress' => $videoProgress,
                    'summary' => [
                        'total_videos' => $progress['total_videos'],
                        'watched_videos' => $progress['watched_videos'],
                        'completion_percentage' => $progress['percentage'],
                        'last_watched_at' => $progress['last_watched_at'],
                    ]
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get video progress',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function calculateUserProgress($userId, $kelasId)
    {
        $allVideos = Video::whereHas('section', function ($query) use ($kelasId) {
            $query->where('kelas_id', $kelasId);
        })->get();

        $watchedVideos = VideoReader::where('user_id', $userId)
            ->whereIn('video_id', $allVideos->pluck('id'))
            ->where('status', 1)
            ->get();

        $totalVideos = $allVideos->count();
        $watchedCount = $watchedVideos->count();
        $percentage = $totalVideos > 0 ? round(($watchedCount / $totalVideos) * 100, 2) : 0;

        $lastWatched = $watchedVideos->sortByDesc('updated_at')->first();

        return [
            'total_videos' => $totalVideos,
            'watched_videos' => $watchedCount,
            'percentage' => $percentage,
            'last_watched_at' => $lastWatched ? $lastWatched->updated_at : null,
        ];
    }

    private function getDetailedVideoProgress($userId, $kelasId)
    {
        $videos = Video::with(['section'])
            ->whereHas('section', function ($query) use ($kelasId) {
                $query->where('kelas_id', $kelasId);
            })
            ->get();

        $videoProgress = [];

        foreach ($videos as $video) {
            $videoReader = VideoReader::where('user_id', $userId)
                ->where('video_id', $video->id)
                ->first();

            $videoProgress[] = [
                'video_id' => $video->id,
                'video_title' => $video->title,
                'video_duration' => $video->duration ?? null,
                'section_id' => $video->section_id,
                'section_title' => $video->section->title,
                'is_watched' => $videoReader ? (bool) $videoReader->status : false,
                'watched_at' => $videoReader ? $videoReader->updated_at : null,
            ];
        }

        return $videoProgress;
    }

    private function getSectionProgress($userId, $kelasId)
    {
        $sections = Section::with(['videos'])
            ->where('kelas_id', $kelasId)
            ->get();

        $sectionProgress = [];

        foreach ($sections as $section) {
            $totalVideos = $section->videos->count();

            $watchedVideos = VideoReader::where('user_id', $userId)
                ->whereIn('video_id', $section->videos->pluck('id'))
                ->where('status', 1)
                ->count();

            $percentage = $totalVideos > 0 ? round(($watchedVideos / $totalVideos) * 100, 2) : 0;

            $sectionProgress[] = [
                'section_id' => $section->id,
                'section_title' => $section->title,
                'total_videos' => $totalVideos,
                'watched_videos' => $watchedVideos,
                'percentage' => $percentage,
                'is_completed' => $percentage == 100,
            ];
        }

        return $sectionProgress;
    }

    public function markAsUnread(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'video_id' => 'required|integer|exists:videos,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $userId = Auth::id();
            $videoId = $request->video_id;

            $videoReader = VideoReader::where('user_id', $userId)
                ->where('video_id', $videoId)
                ->first();

            if ($videoReader) {
                $videoReader->update(['status' => 0]);

                return response()->json([
                    'success' => true,
                    'message' => 'Video marked as unread successfully',
                    'data' => $videoReader
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Video reader record not found'
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to mark video as unread',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getLearningStatistics(Request $request)
    {
        try {
            $userId = Auth::id();

            $coursesWithProgress = Kelas::whereHas('sections.videos', function ($query) use ($userId) {
                $query->whereHas('videoReaders', function ($q) use ($userId) {
                    $q->where('user_id', $userId);
                });
            })->get();

            $totalCourses = $coursesWithProgress->count();

            $totalWatchedVideos = VideoReader::where('user_id', $userId)
                ->where('status', 1)
                ->count();

            $completedCourses = 0;
            foreach ($coursesWithProgress as $course) {
                $progress = $this->calculateUserProgress($userId, $course->id);
                if ($progress['percentage'] == 100) {
                    $completedCourses++;
                }
            }

            $recentActivity = VideoReader::with(['video.section.kelas'])
                ->where('user_id', $userId)
                ->where('status', 1)
                ->orderBy('updated_at', 'desc')
                ->limit(10)
                ->get()
                ->map(function ($reader) {
                    return [
                        'video_id' => $reader->video->id,
                        'video_title' => $reader->video->title,
                        'course_title' => $reader->video->section->kelas->title,
                        'course_id' => $reader->video->section->kelas->id,
                        'watched_at' => $reader->updated_at,
                    ];
                });

            $coursesProgress = [];
            foreach ($coursesWithProgress as $course) {
                $progress = $this->calculateUserProgress($userId, $course->id);
                $coursesProgress[] = [
                    'course_id' => $course->id,
                    'course_title' => $course->title,
                    'course_slug' => $course->slug,
                    'progress' => $progress,
                ];
            }

            return response()->json([
                'success' => true,
                'message' => 'Learning statistics retrieved successfully',
                'data' => [
                    'summary' => [
                        'total_courses' => $totalCourses,
                        'completed_courses' => $completedCourses,
                        'in_progress_courses' => $totalCourses - $completedCourses,
                        'total_watched_videos' => $totalWatchedVideos,
                    ],
                    'courses_progress' => $coursesProgress,
                    'recent_activity' => $recentActivity,
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get learning statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getAllCoursesProgress(Request $request)
    {
        try {
            $userId = Auth::id();

            $courses = Kelas::whereHas('sections.videos', function ($query) use ($userId) {
                $query->whereHas('videoReaders', function ($q) use ($userId) {
                    $q->where('user_id', $userId);
                });
            })->with(['level', 'category', 'user'])->get();

            $coursesProgress = [];

            foreach ($courses as $course) {
                $progress = $this->calculateUserProgress($userId, $course->id);

                $coursesProgress[] = [
                    'course' => [
                        'id' => $course->id,
                        'title' => $course->title,
                        'slug' => $course->slug,
                        'description' => $course->description,
                        'image' => $course->image,
                        'level' => $course->level->name ?? null,
                        'category' => $course->category->name ?? null,
                        'instructor' => $course->user->name ?? null,
                    ],
                    'progress' => $progress,
                    'status' => $progress['percentage'] == 100 ? 'completed' : ($progress['percentage'] > 0 ? 'in_progress' : 'not_started'),
                ];
            }

            usort($coursesProgress, function ($a, $b) {
                $aTime = $a['progress']['last_watched_at'] ?? '1970-01-01';
                $bTime = $b['progress']['last_watched_at'] ?? '1970-01-01';
                return strtotime($bTime) - strtotime($aTime);
            });

            return response()->json([
                'success' => true,
                'message' => 'All courses progress retrieved successfully',
                'data' => [
                    'courses' => $coursesProgress,
                    'summary' => [
                        'total_courses' => count($coursesProgress),
                        'completed_courses' => count(array_filter($coursesProgress, fn($c) => $c['status'] === 'completed')),
                        'in_progress_courses' => count(array_filter($coursesProgress, fn($c) => $c['status'] === 'in_progress')),
                    ]
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get courses progress',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function toggleVideoStatus(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'video_id' => 'required|integer|exists:videos,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $userId = Auth::id();
            $videoId = $request->video_id;

            $videoReader = VideoReader::where('user_id', $userId)
                ->where('video_id', $videoId)
                ->first();

            if ($videoReader) {
                $newStatus = $videoReader->status == 1 ? 0 : 1;
                $videoReader->update(['status' => $newStatus]);
                $action = $newStatus == 1 ? 'marked as read' : 'marked as unread';
            } else {
                $videoReader = VideoReader::create([
                    'user_id' => $userId,
                    'video_id' => $videoId,
                    'status' => 1,
                ]);
                $action = 'marked as read';
            }

            return response()->json([
                'success' => true,
                'message' => "Video {$action} successfully",
                'data' => [
                    'video_reader' => $videoReader,
                    'is_watched' => (bool) $videoReader->status,
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to toggle video status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function apiDetailKelas($slug)
    {
        $user_id = Auth::id();
        $kelas = Kelas::where('slug', $slug)->firstOrFail();
        $kelas->increment('views');
        $setting = Setting::first();
        $sections = Section::where('kelas_id', $kelas->id)->get();
        $videos = Video::whereIn('section_id', $sections->pluck('id'))->get();

        $kelasDetail = Kelas::select(
            'kelas.*',
            DB::raw('COUNT(DISTINCT transactions.id) as total_transaksi'),
            DB::raw('ROUND(AVG(testimonis.rating), 1) as average_rating'),
            DB::raw('COUNT(testimonis.id) as total_ulasan'),
            DB::raw('SUM(testimonis.rating) as total_star')
        )
            ->leftJoin('transactions', function ($join) {
                $join->on('kelas.id', '=', 'transactions.kelas_id')
                    ->whereIn('transactions.status', ['paid', 'free']);
            })
            ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
            ->where('kelas.id', $kelas->id)
            ->groupBy('kelas.id')
            ->first();

        $totalvideo = Video::whereHas('section', function ($query) use ($kelas) {
            $query->where('kelas_id', $kelas->id);
        })->count();

        $testimoni = Testimoni::where('kelas_id', $kelas->id)
            ->with('user')
            ->latest()
            ->get();

        $mentorStats = Kelas::select(
            DB::raw('COUNT(DISTINCT kelas.id) as total_kelas_mentor'),
            DB::raw('ROUND(AVG(testimonis.rating), 1) as mentor_average_rating'),
            DB::raw('COUNT(testimonis.id) as mentor_total_ulasan'),
            DB::raw('COUNT(DISTINCT transactions.id) as mentor_total_siswa')
        )
            ->leftJoin('transactions', function ($join) {
                $join->on('kelas.id', '=', 'transactions.kelas_id')
                    ->whereIn('transactions.status', ['paid', 'free']);
            })
            ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
            ->where('kelas.user_id', $kelas->user_id)
            ->where('kelas.status', 'disetujui')
            ->first();

        $allclass = Kelas::select(
            'kelas.*',
            DB::raw('COUNT(DISTINCT transactions.id) as total_transaksi'),
            DB::raw('ROUND(AVG(testimonis.rating), 1) as average_rating'),
            DB::raw('COUNT(testimonis.id) as total_reviews'),
            DB::raw('COUNT(DISTINCT transactions.id) as total_students'),
            DB::raw('COUNT(CASE WHEN transactions.status IN ("paid", "free") AND transactions.user_id = ? THEN 1 END) > 0 as sudah_bergabung')
        )
            ->leftJoin('transactions', function ($join) use ($user_id) {
                $join->on('kelas.id', '=', 'transactions.kelas_id')
                    ->where(function ($query) use ($user_id) {
                        $query->where(function ($subQuery) {
                            $subQuery->where('transactions.status', '=', 'paid');
                        })
                            ->orWhere(function ($subQuery) use ($user_id) {
                                $subQuery->where('transactions.status', '=', 'free')
                                    ->where('transactions.user_id', '=', $user_id);
                            });
                    });
            })
            ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
            ->where('kelas.status', 'disetujui')
            ->where('kelas.id', '!=', $kelas->id)
            ->where('kelas.user_id', $kelas->user_id)
            ->groupBy('kelas.id')
            ->addBinding([$user_id], 'select')
            ->with(['type', 'category', 'level'])
            ->latest('kelas.created_at')
            ->limit(4)
            ->get();

        $sudahBergabung = Transaction::where('kelas_id', $kelas->id)
            ->where(function ($query) use ($user_id) {
                $query->where('status', 'paid')
                    ->orWhere(function ($subQuery) use ($user_id) {
                        $subQuery->where('status', 'free')
                            ->where('user_id', $user_id);
                    });
            })
            ->exists();

        $allclass = $allclass->map(function ($kelasItem) {
            $kelasArray = $kelasItem->toArray();
            $kelasArray['sudah_bergabung'] = (bool) $kelasItem->sudah_bergabung;
            return $kelasArray;
        });

        return response()->json([
            'setting' => $setting,
            'kelas' => $kelas->load(['level', 'type', 'category', 'user']),
            'sections' => $sections,
            'videos' => $videos,
            'testimoni' => $testimoni,
            'allclass' => $allclass,
            'studentjoin' => $kelasDetail->total_transaksi ?? 0,
            'totalvideo' => $totalvideo,
            'totalstar' => $kelasDetail->total_star ?? 0,
            'averageRating' => $kelasDetail->average_rating ?? 0,
            'totalkelasmentor' => $mentorStats->total_kelas_mentor ?? 0,
            'totalsiswa' => $mentorStats->mentor_total_siswa ?? 0,
            'totalulasan' => $kelasDetail->total_ulasan ?? 0,
            'sudah_bergabung' => $sudahBergabung,

        ]);
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
            if (!Auth::attempt($request->only('email', 'password'))) {
                throw ValidationException::withMessages([
                    'email' => ['Kredensial yang diberikan tidak cocok dengan catatan kami.'],
                ]);
            }
            $user = Auth::user();
            if ($user->role !== 'student') {
                Auth::logout();
                return response()->json([
                    'message' => 'Hanya pengguna dengan role student yang diperbolehkan login.',
                ], 403);
            }

            if ($user->status != 1) {
                Auth::logout();
                return response()->json([
                    'message' => 'Akun Anda tidak aktif. Silakan hubungi administrator.',
                ], 403);
            }
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'message' => 'Login berhasil!',
                'user' => $user,
                'role' => $user->role,
                'token' => $token,
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Login gagal',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'User profile fetched successfully.',
            'user' => $request->user(),
        ]);
    }

    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'nullable|image|mimes:jpg,png,jpeg|max:5048',
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::findOrFail(Auth::id());

        if ($request->hasFile('image')) {
            $filename = $request->file('image')->store('profile', 'public');
            $user->image = $filename;
        }

        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->tempat_lahir = $request->tempat_lahir;

        if ($request->filled('tanggal_lahir')) {
            $tanggalLahir = Carbon::parse($request->tanggal_lahir);
            $user->tanggal_lahir = $request->tanggal_lahir;
            $user->umur = $tanggalLahir->diffInYears(Carbon::now());
        }

        $user->jk = $request->jk;
        $user->phone = $request->phone;
        $user->alamat = $request->alamat;

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Profil berhasil diperbarui',
            'data' => $user
        ]);
    }

    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Password saat ini tidak sesuai.'],
            ]);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Password berhasil diperbarui!',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil!'
        ], 200);
    }
}
