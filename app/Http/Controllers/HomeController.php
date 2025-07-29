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
            'term' => $term
        ]);
    }

    public function register()
    {
        $setting = Setting::first();
        return Inertia::render('Home/Register/Index', [
            'setting' => $setting
        ]);
    }

    public  function saveregister(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'tempat_lahir' => 'required',
            'tanggal_lahir' => 'required',
            'jk' => 'required',
            'phone' => 'required',
        ]);
        $check = User::where('email', $request->email)->first();
        if ($check) {
            return to_route('daftar');
        }

        $q = new User();
        $q->name = $request->name;
        $q->email = $request->email;
        $q->password = Hash::make($request->password);
        $q->tempat_lahir = $request->tempat_lahir;
        $tanggalLahir = Carbon::parse($request->tanggal_lahir);
        $umur = $tanggalLahir->diffInYears(Carbon::now());
        $q->umur = $umur;
        $q->jk = $request->jk;
        $q->phone = $request->phone;
        $q->role = "student";
        $q->status = 1;
        $q->save();
        Notification::make()
            ->success()
            ->title("Student $q->name berhasil mendaftar")
            ->sendToDatabase(User::where('role', 'admin')->get());

        return to_route('masuk');
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
        $search = $request->input('search'); // Ambil nilai search dari body request

        $userAnswers = UserAnswer::whereHas('user', function ($query) use ($search) {
            if (!empty($search)) {
                $query->where('name', 'like', "%{$search}%");
            }
        })
            ->whereNotNull('kelas_id') // Pastikan kelas_id tidak null
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
        // Ambil data user answers dan total points
        $data = UserAnswer::where('id', $id)
            ->groupBy('kelas_id')
            ->selectRaw('*, sum(point) as total_point')
            ->first();

        if (!$data) {
            return response()->json(['error' => 'Data tidak ditemukan'], 404);
        }

        $template = TemplateSertifikat::where('status', 1)->first();
        $backgroundPdf = public_path('storage/' . $template->file); // Template sertifikat
        $folderPath = storage_path('app/public/sertifikat'); // Folder penyimpanan

        // Cek apakah folder ada, jika tidak buat foldernya
        if (!file_exists($folderPath)) {
            mkdir($folderPath, 0777, true);
        }

        // Lokasi penyimpanan file PDF
        $outputPdf = $folderPath . "/sertifikat-{$data->user->name}.pdf";

        // Pastikan file background tersedia
        if (!file_exists($backgroundPdf)) {
            return response()->json(['error' => 'Template sertifikat tidak ditemukan'], 404);
        }

        $pdf = new Fpdi();
        $pdf->setSourceFile($backgroundPdf);
        $tplId = $pdf->importPage(1);
        $size = $pdf->getTemplateSize($tplId);

        // Buat halaman dengan ukuran sesuai template
        $pdf->AddPage($size['orientation'], [$size['width'], $size['height']]);
        $pdf->useTemplate($tplId, 0, 0, $size['width'], $size['height']);

        // **Gunakan Arial sebagai font default**
        $pdf->SetFont('Arial', 'B', 18); // Arial Bold untuk judul

        // **Nomor Sertifikat**
        // $pdf->SetXY(85, 64);
        // $pdf->SetFont('Arial', 'B', 14);
        // $pdf->Cell(0, 10, "AC-999862" . $data->no_sertifikat . "-" . date('Y'), 0, 1, 'L');

        // // **Nama Peserta (Merah)**
        // $pdf->SetTextColor(255, 0, 0);
        // $pdf->SetXY(46, 98);
        // $pdf->SetFont('Arial', 'B', 26);
        // $pdf->Cell(0, 10, $data->user->name, 0, 1, 'L');

        // // **Nama Kursus**
        // $pdf->SetXY(46, 127);
        // $pdf->SetFont('Arial', 'B', 30);
        // $pdf->Cell(0, 10, $data->kelas->title, 0, 1, 'L');

        // // **Tanggal Sertifikat**
        // $tanggal = Carbon::parse($data->created_at)->locale('id')->translatedFormat('d F Y');
        // $pdf->SetTextColor(0, 0, 0);
        // $pdf->SetXY(73, 168);
        // $pdf->SetFont('Arial', '', 12);
        // $pdf->Cell(0, 10, $tanggal, 0, 1, 'L');
        $pdf->SetTextColor(32, 122, 54);
        $pdf->SetXY(45, 168);
        $pdf->SetFont('Arial', 'B', 28);
        $pdf->Cell(0, 10, $data->user->name, 0, 1, 'L');


        // Simpan file PDF
        $pdf->Output($outputPdf, 'F');

        // **Kembalikan response untuk mengunduh PDF**
        return response()->download($outputPdf, "sertifikat-{$data->user->name}.pdf");
    }
}
