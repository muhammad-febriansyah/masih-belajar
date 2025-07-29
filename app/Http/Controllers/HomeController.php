<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\Category;
use App\Models\Event;
use App\Models\Faq;
use App\Models\Kelas;
use App\Models\Level;
use App\Models\PromoCode;
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
use Carbon\Carbon;
use Filament\Notifications\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use setasign\Fpdi\Fpdi;

class HomeController extends Controller
{
    public function index()
    {
        $setting = Setting::first();
        $about = About::all();
        $faq = Faq::latest()->get();
        $totaluser = User::where('role', 'admin')->count();
        $totalstar = Testimoni::sum('rating');
        $totalkelas = Kelas::where('status', 'disetujui')->count();
        $testimoni = Testimoni::latest()->get();
        $promo = PromoCode::where('status', 'active')->first();
        $kelaspopuler = Kelas::select(
            'kelas.*',
            DB::raw('COUNT(transactions.id) as total_transaksi'), // Menghitung jumlah transaksi
            DB::raw('SUM(testimonis.rating) as average_rating') // Menghitung rata-rata rating
        )
            ->leftJoin('transactions', 'kelas.id', '=', 'transactions.kelas_id')
            ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
            ->where('kelas.status', 'disetujui')
            ->groupBy('kelas.id')
            ->orderByDesc('total_transaksi') // Mengurutkan berdasarkan jumlah transaksi terbanyak
            ->limit(3) // Mengambil 3 kelas terlaris
            ->get();
        return Inertia::render('Home/Home/Index', [
            'setting' => $setting,
            'about' => $about,
            'totaluser' => $totaluser,
            'totalstar' => $totalstar,
            'totalkelas' => $totalkelas,
            'faq' => $faq,
            'kelaspopuler' => $kelaspopuler,
            'promo' => $promo,
            'testimoni' => $testimoni
        ]);
    }

    public function event()
    {
        $setting = Setting::first();
        $data = Event::latest()->get();
        return Inertia::render('Home/Agenda/Index', [
            'setting' => $setting,
            'data' => $data,
        ]);
    }

    public function detailevent($slug)
    {
        $setting = Setting::first();
        $data = Event::where('slug', $slug)->first();
        $data->views = $data->views + 1;
        $data->save();
        return Inertia::render('Home/Agenda/Detail', [
            'setting' => $setting,
            'data' => $data,
        ]);
    }

    public function kelas()
    {
        $setting = Setting::first();
        $data = Kelas::select(
            'kelas.*',
            DB::raw('COUNT(transactions.id) as total_transaksi'), // Menghitung jumlah transaksi
            DB::raw('SUM(testimonis.rating) as average_rating')
        )
            ->leftJoin('transactions', 'kelas.id', '=', 'transactions.kelas_id')
            ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
            ->where('kelas.status', 'disetujui')
            ->groupBy('kelas.id')
            ->orderByDesc('total_transaksi')->paginate(6);
        $category = Category::all();
        $tipekelas = Type::all();
        $level = Level::all();
        return Inertia::render('Home/Kelas/Index', [
            'setting' => $setting,
            'kelas' => $data,
            'category' => $category,
            'tipekelas' => $tipekelas,
            'level' => $level
        ]);
    }

    public function searchKelas(Request $request)
    {
        $query = $request->input('query');
        $kelas = Kelas::when($query, function ($q) use ($query) {
            return $q->where('title', 'like', "%{$query}%")->orWhereHas('category', function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%");
            });
        })->where('status', 'disetujui')->get();
        return response()->json($kelas);
    }

    public function detailkelas($slug)
    {
        $kelas = Kelas::where('slug', $slug)->first();
        $kelas->views = $kelas->views + 1;
        $kelas->save();
        $setting = Setting::first();
        $sections = Section::where('kelas_id', $kelas->id)->get();
        $videos = Video::whereIn('section_id', $sections->pluck('id'))->get();
        $studentjoin = Transaction::where('kelas_id', $kelas->id)->count();
        $totalvideo = Video::whereHas('section', function ($query) use ($kelas) {
            $query->where('kelas_id', $kelas->id);
        })->count();
        $totalstar = Testimoni::where('kelas_id', $kelas->id)->sum('rating');
        $testimoni = Testimoni::where('kelas_id', $kelas->id)
            ->latest()
            ->get();
        $totalstartmentor = Testimoni::whereHas('kelas', function ($query) use ($kelas) {
            $query->where('user_id', $kelas->user_id);
        })
            ->sum('rating');
        $totalTestimoni = Testimoni::whereHas('kelas', function ($query) use ($kelas) {
            $query->where('user_id', $kelas->user_id);
        })
            ->count();

        if ($totalTestimoni > 0) {
            $averageRating = $totalstartmentor / $totalTestimoni;
            $averageRating = number_format($averageRating, 1); // Format rating menjadi satu desimal
        } else {
            $averageRating = 0; // Jika tidak ada testimoni
        }
        $totalulasan = Testimoni::whereHas('kelas', function ($query) use ($kelas) {
            $query->where('user_id', $kelas->user_id);
        })->count();
        $totalsiswa = Testimoni::whereHas('kelas', function ($query) use ($kelas) {
            $query->where('user_id', $kelas->user_id);
        })->count();
        $totalkelasmentor = Kelas::where('user_id', $kelas->user_id)->count();
        $allclass = Kelas::select(
            'kelas.*',
            DB::raw('SUM(testimonis.rating) as average_rating')
        )
            ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
            ->where('kelas.status', 'disetujui')
            ->where('kelas.id', '!=', $kelas->id)
            ->where('kelas.user_id', $kelas->user_id)
            ->groupBy('kelas.id')
            ->latest()
            ->limit(4)
            ->get();
        return Inertia::render('Home/Kelas/Detail', [
            'setting' => $setting,
            'kelas' => $kelas,
            'sectionData' => $sections,
            'video' => $videos,
            'testimoni' => $testimoni,
            'allclass' => $allclass,
            'studentjoin' => $studentjoin,
            'totalvideo' => $totalvideo,
            'totalstar' => $totalstar,
            'averageRating' => $averageRating,
            'totalkelasmentor' => $totalkelasmentor,
            'totalsiswa' => $totalsiswa,
            'totalulasan' => $totalulasan,
        ]);
    }

    public function login()
    {
        $setting = Setting::first();
        return Inertia::render('Home/Login/Index', [
            'setting' => $setting
        ]);
    }

    public function checklogin(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password, 'status' => 1, 'role' => 'student'])) {
            $request->session()->regenerate();
            return to_route('dashboard.home');
        }
        return to_route('masuk')->withErrors(['email' => 'Email ini tidak terdaftar.']);
    }

    public function termcondition()
    {
        $setting = Setting::first();
        $term = TermCondition::first();
        return Inertia::render('Home/Terms/Index', [
            'setting' => $setting,
            'term' => $term,
        ]);
    }

    public function register()
    {
        $setting = Setting::first();
        return Inertia::render('Home/Register/Index', [
            'setting' => $setting
        ]);
    }
    public function saveregister(Request $request)
    {
        try {
            Log::info('Register attempt', [
                'email' => $request->email,
                'name' => $request->name,
                'phone' => $request->phone
            ]);

            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:6',
                'tempat_lahir' => 'required|string|max:100',
                'tanggal_lahir' => 'required|date',
                'jk' => 'required',
                'phone' => [
                    'required',
                ],
            ], [
                'phone.min' => 'Nomor telepon minimal 10 digit',
                'phone.max' => 'Nomor telepon maksimal 15 digit',
                'phone.regex' => 'Format nomor telepon tidak valid. Gunakan format: 08xxxxxxxxxx (contoh: 08123456789)',
                'phone.unique' => 'Nomor telepon sudah terdaftar'
            ]);

            Log::info('Validation passed');

            // Check if user already exists (tambahan safety check)
            $check = User::where('email', $request->email)->first();
            if ($check) {
                return back()->withInput()->withErrors([
                    'email' => 'Email sudah terdaftar'
                ]);
            }

            // Calculate age
            $tanggalLahir = Carbon::parse($request->tanggal_lahir);
            $umur = $tanggalLahir->diffInYears(Carbon::now());

            // Generate OTP
            $otp = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
            $expiredOtp = Carbon::now()->addMinutes(5);

            Log::info('Creating user with OTP', [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'otp' => $otp
            ]);

            // Create user with OTP
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->tempat_lahir = $request->tempat_lahir;
            $user->tanggal_lahir = $request->tanggal_lahir;
            $user->umur = $umur;
            $user->jk = $request->jk;
            $user->phone = $request->phone;
            $user->role = "student";
            $user->status = 0; // Set to 0 (unverified) until OTP verification
            $user->otp = $otp;
            $user->expired_otp = $expiredOtp;
            $user->save();

            Log::info('User created successfully', ['user_id' => $user->id]);

            // Send OTP via WhatsApp
            $otpSent = false;
            $whatsappError = null;

            try {
                $this->sendOtpWhatsApp($user->phone, $otp, $user->name);
                Log::info('WhatsApp OTP sent successfully');
                $otpSent = true;
            } catch (\Exception $waError) {
                Log::error('WhatsApp sending failed', [
                    'error' => $waError->getMessage(),
                    'user_id' => $user->id
                ]);
                $whatsappError = $waError->getMessage();

                // If WhatsApp fails, we still continue but notify user
                if (strpos($waError->getMessage(), 'not registered on WhatsApp') !== false) {
                    $whatsappError = 'Nomor telepon tidak terdaftar di WhatsApp. Pastikan nomor sudah terdaftar dan aktif.';
                } else {
                    $whatsappError = 'Gagal mengirim OTP via WhatsApp. Anda masih bisa melanjutkan dengan OTP manual.';
                }
            }

            // Send notification to admins
            Notification::make()
                ->success()
                ->title("Student $user->name berhasil mendaftar (menunggu verifikasi OTP)")
                ->sendToDatabase(User::where('role', 'admin')->get());

            Log::info('Registration completed, awaiting OTP verification', [
                'user_id' => $user->id,
                'otp_for_testing' => $otp
            ]);

            // Redirect to OTP verification page with success message
            $message = $otpSent
                ? 'Registrasi berhasil! Kode OTP telah dikirim ke WhatsApp Anda.'
                : 'Registrasi berhasil! ' . $whatsappError;

            return redirect()->route('verify-otp')->with([
                'success' => $message,
                'email' => $user->email,
                'otp_sent' => $otpSent,
                'otp_for_testing' => env('APP_DEBUG') ? $otp : null,
                'whatsapp_error' => $whatsappError
            ]);
        } catch (ValidationException $e) {
            Log::warning('Validation failed', [
                'errors' => $e->errors(),
                'request' => $request->all()
            ]);

            return back()->withErrors($e->errors())->withInput();
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error('Database error during registration', [
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ]);

            if ($e->getCode() == 23000) {
                return back()->withInput()->withErrors([
                    'email' => 'Email atau nomor telepon sudah terdaftar'
                ]);
            }

            return back()->withInput()->withErrors([
                'email' => 'Terjadi kesalahan database. Silakan coba lagi.'
            ]);
        } catch (\Exception $e) {
            Log::error('General error during registration', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withInput()->withErrors([
                'email' => 'Registrasi gagal. Silakan coba lagi.'
            ]);
        }
    }

    // Function untuk menampilkan halaman verifikasi OTP
    public function showVerifyOtp(Request $request)
    {
        $setting = Setting::first();

        // Ambil email dari session atau request parameter
        $email = session('email') ?? $request->get('email');

        // Jika tidak ada email, redirect ke halaman daftar
        if (!$email) {
            return redirect()->route('daftar')->with('error', 'Session expired. Silakan daftar ulang.');
        }

        return Inertia::render('Home/Otp/Index', [
            'setting' => $setting,
            'email' => $email,
            'otp_for_testing' => session('otp_for_testing'),
            'whatsapp_error' => session('whatsapp_error')
        ]);
    }

    // Function untuk verifikasi OTP dengan auto login
    public function verifyOtp(Request $request)
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
                return back()->withErrors(['otp' => 'OTP tidak ditemukan. Silakan minta OTP baru.']);
            }

            if (Carbon::now()->gt($user->expired_otp)) {
                Log::warning('OTP expired', [
                    'email' => $request->email,
                    'expired_at' => $user->expired_otp
                ]);
                return back()->withErrors(['otp' => 'OTP telah kadaluarsa. Silakan minta OTP baru.']);
            }

            if ($user->otp !== $request->otp) {
                Log::warning('Invalid OTP', [
                    'email' => $request->email,
                    'provided_otp' => $request->otp,
                    'expected_otp' => $user->otp
                ]);
                return back()->withErrors(['otp' => 'OTP tidak valid.']);
            }

            if ($user->role !== 'student') {
                Log::warning('Non-student user attempting OTP verification', [
                    'email' => $request->email,
                    'role' => $user->role
                ]);
                return back()->withErrors(['email' => 'Hanya pengguna dengan role student yang diperbolehkan.']);
            }

            // Update user status to verified
            $user->update([
                'status' => 1,
                'otp' => null,
                'expired_otp' => null,
                'email_verified_at' => Carbon::now(),
            ]);

            Log::info('OTP verification successful', ['user_id' => $user->id]);

            // Auto login user after successful verification
            Auth::login($user);
            $request->session()->regenerate();

            Log::info('User auto-logged in after OTP verification', ['user_id' => $user->id]);

            // Send welcome message
            try {
                $this->sendWelcomeMessage($user->phone, $user->name);
            } catch (\Exception $e) {
                Log::error('Welcome message failed: ' . $e->getMessage());
            }

            // Send notification to admins about successful verification
            Notification::make()
                ->success()
                ->title("Student $user->name berhasil verifikasi akun dan login")
                ->sendToDatabase(User::where('role', 'admin')->get());

            // Redirect to dashboard with welcome message
            return redirect()->route('dashboard.home')->with([
                'success' => 'Selamat datang! Akun Anda berhasil diverifikasi dan Anda sudah login.',
                'welcome' => true,
                'user_name' => $user->name
            ]);
        } catch (ValidationException $e) {
            Log::warning('OTP validation failed', ['errors' => $e->errors()]);
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            Log::error('OTP verification error: ' . $e->getMessage());
            return back()->withErrors(['otp' => 'Gagal memverifikasi OTP: ' . $e->getMessage()]);
        }
    }
    // Function untuk resend OTP
    public function resendOtp(Request $request)
    {
        try {
            Log::info('Resend OTP attempt', ['email' => $request->email]);

            $request->validate([
                'email' => 'required|email|exists:users,email',
            ]);

            $user = User::where('email', $request->email)->first();

            if ($user->status == 1) {
                Log::warning('User already verified', ['email' => $request->email]);
                return back()->withErrors(['email' => 'Akun sudah terverifikasi.']);
            }

            // Rate limiting: check if user requested OTP less than 1 minute ago
            if ($user->expired_otp && Carbon::now()->lt($user->expired_otp->subMinutes(4))) {
                Log::warning('Rate limit hit', ['email' => $request->email]);
                return back()->withErrors(['email' => 'Tunggu 1 menit sebelum meminta OTP baru.']);
            }

            // Generate new OTP
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

            // Send new OTP via WhatsApp
            try {
                $this->sendOtpWhatsApp($user->phone, $otp, $user->name);
                $otpSent = true;
                Log::info('New OTP sent via WhatsApp');
            } catch (\Exception $e) {
                Log::error('WhatsApp resend failed: ' . $e->getMessage());
                $otpSent = false;
            }

            return back()->with([
                'success' => 'OTP baru telah dikirim ke WhatsApp Anda.',
                'otp_for_testing' => env('APP_DEBUG') ? $otp : null
            ]);
        } catch (\Exception $e) {
            Log::error('Resend OTP error: ' . $e->getMessage());
            return back()->withErrors(['email' => 'Gagal mengirim ulang OTP: ' . $e->getMessage()]);
        }
    }

    // Private helper functions
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
        // Remove all non-numeric characters
        $waNumber = preg_replace('/[^0-9]/', '', $phoneNumber);

        // Convert to WhatsApp format
        if (substr($waNumber, 0, 1) === '0') {
            // 08xxx menjadi 628xxx
            $waNumber = '62' . substr($waNumber, 1);
        } elseif (substr($waNumber, 0, 2) !== '62') {
            // 8xxx menjadi 628xxx
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

    public function ceksertifikat(Request $request)
    {
        $setting = Setting::first();
        return Inertia::render('Home/Sertifikat/Index', [
            'setting' => $setting,
            'userAnswers' => [],
            'totalPoint' => 0,
            'search' => ''
        ]);
    }

    public function searchSertifikat(Request $request)
    {
        $search = $request->input('search');
        $userAnswers = UserAnswer::whereHas('user', function ($query) use ($search) {
            if (!empty($search)) {
                $query->where('name', 'like', "%{$search}%");
            }
        })
            ->whereNotNull('kelas_id')
            ->groupBy('kelas_id')
            ->selectRaw('*, SUM(point) as total_point')
            ->get();

        $totalPoint = $userAnswers->sum('total_point');

        return response()->json([
            'userAnswers' => $userAnswers,
            'totalPoint' => $totalPoint
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

        $backgroundPdf = Storage::disk('public')->path($template->file);

        $fileName = "sertifikat-{$data->user->name}.pdf";
        $sertifikatPath = "sertifikat/{$fileName}";

        if (!Storage::disk('public')->exists($template->file)) {
            return response()->json(['error' => 'Template sertifikat tidak ditemukan'], 404);
        }

        $pdf = new Fpdi();
        $pdf->setSourceFile($backgroundPdf);
        $tplId = $pdf->importPage(1);
        $size = $pdf->getTemplateSize($tplId);

        $pdf->AddPage($size['orientation'], [$size['width'], $size['height']]);
        $pdf->useTemplate($tplId, 0, 0, $size['width'], $size['height']);

        $pdf->SetFont('Arial', 'B', 18);

        $pdf->SetXY(15, 15);
        $pdf->SetFont('Arial', '', 12);
        $pdf->Cell(0, 10, $data->no_sertifikat, 0, 1, 'L');

        $pdf->SetTextColor(0, 0, 110);

        $pdf->SetXY(7, 115);
        $pdf->SetFont('Arial', 'B', 28);
        $pdf->Cell(0, 10, $data->user->name, 0, 1, 'C');

        $pdf->SetXY(7, 130);
        $pdf->SetFont('Arial', '', 15);
        $pdf->Cell(0, 10, "atas keberhasilan dalam", 0, 1, 'C');

        $judulKelas = $data->kelas->title ?? '-';
        $pengajar = $data->kelas->user->name ?? '-';
        $teks = "menyelesaikan kursus \"$judulKelas\" bersama $pengajar";
        $pdf->SetFont('Arial', '', 15);
        $pdf->SetXY(45, 140);
        $pdf->MultiCell(206, 8, $teks, 0, 'C');

        $content = $pdf->Output('', 'S');

        Storage::disk('public')->put($sertifikatPath, $content);

        return Storage::disk('public')->download($sertifikatPath, $fileName);
    }
}
