<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\Category;
use App\Models\Faq;
use App\Models\Kelas;
use App\Models\Level;
use App\Models\PromoCode;
use App\Models\Section;
use App\Models\Setting;
use App\Models\Testimoni;
use App\Models\Transaction;
use App\Models\Type;
use App\Models\User;
use App\Models\Video;
use App\Models\VideoReader;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MainController extends Controller
{
    public function index()
    {
        $auth = Auth::user();
        $setting = Setting::first();
        $about = About::all();
        $faq = Faq::latest()->get();
        $totaluser = User::where('role', 'admin')->count();
        $totalstar = Testimoni::sum('rating');
        $totalkelas = Kelas::where('status', 'disetujui')->count();
        $kelaspopuler = Kelas::select(
            'kelas.*',
            DB::raw('COUNT(transactions.id) as total_transaksi'), // Menghitung jumlah transaksi
            DB::raw('AVG(testimonis.rating) as average_rating') // Menghitung rata-rata rating
        )
            ->leftJoin('transactions', 'kelas.id', '=', 'transactions.kelas_id')
            ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
            ->where('kelas.status', 'disetujui')
            ->groupBy('kelas.id')
            ->orderByDesc('total_transaksi') // Mengurutkan berdasarkan jumlah transaksi terbanyak
            ->limit(3) // Mengambil 3 kelas terlaris
            ->get();
        return Inertia::render('Main/Home/Index', [
            'setting' => $setting,
            'about' => $about,
            'totaluser' => $totaluser,
            'totalstar' => $totalstar,
            'totalkelas' => $totalkelas,
            'faq' => $faq,
            'kelaspopuler' => $kelaspopuler,
            'auth' => $auth
        ]);
    }

    public function kelas()
    {
        $auth = Auth::user();
        $user_id = Auth::id();
        $setting = Setting::first();
        $data = Kelas::select(
            'kelas.*',
            DB::raw('COUNT(transactions.id) as total_transaksi'), // Menghitung jumlah transaksi
            DB::raw('AVG(testimonis.rating) as average_rating'),
            DB::raw('COUNT(CASE WHEN transactions.status = "paid" AND transactions.user_id = ? THEN 1 END) as total_bergabung', [$user_id])
        )
            ->leftJoin('transactions', 'kelas.id', '=', 'transactions.kelas_id')
            ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
            ->where('kelas.status', 'disetujui')
            ->groupBy('kelas.id')
            ->orderByDesc('total_transaksi')->addBinding(['user_id' => $user_id], 'select')->paginate(6);
        $category = Category::all();
        $tipekelas = Type::all();
        $level = Level::all();
        return Inertia::render('Main/Kelas/Index', [
            'setting' => $setting,
            'kelas' => $data,
            'category' => $category,
            'tipekelas' => $tipekelas,
            'level' => $level,
            'auth' => $auth
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
        $auth = Auth::user();
        $user_id = Auth::id();
        $kelas = Kelas::select(
            'kelas.*',
            DB::raw('COUNT(CASE WHEN transactions.status = "paid" AND transactions.user_id = ? THEN 1 END) as total_bergabung')
        )
            ->leftJoin('transactions', 'kelas.id', '=', 'transactions.kelas_id')
            ->where('kelas.slug', $slug)
            ->addBinding([$auth->id], 'select')  // Binding positional parameter
            ->first();
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
        $allclass = Kelas::select(
            'kelas.*',
            DB::raw('COUNT(transactions.id) as total_transaksi'), // Menghitung jumlah transaksi
            DB::raw('AVG(testimonis.rating) as average_rating'),
            DB::raw('COUNT(CASE WHEN transactions.status = "paid" AND transactions.user_id = ? THEN 1 END) as total_bergabung', [$user_id])
        )
            ->leftJoin('transactions', 'kelas.id', '=', 'transactions.kelas_id')
            ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
            ->where('kelas.status', 'disetujui')
            ->where('kelas.id', '!=', $kelas->id)
            ->where('kelas.user_id', $kelas->user_id)
            ->groupBy('kelas.id')
            ->orderByDesc('total_transaksi')->addBinding(['user_id' => $user_id], 'select')->limit(4)
            ->get();
        return Inertia::render('Main/Kelas/Detail', [
            'setting' => $setting,
            'kelas' => $kelas,
            'sectionData' => $sections,
            'video' => $videos,
            'testimoni' => $testimoni,
            'allclass' => $allclass,
            'studentjoin' => $studentjoin,
            'totalvideo' => $totalvideo,
            'totalstar' => $totalstar,
            'auth' => $auth
        ]);
    }
    public function checkout($slug)
    {
        $auth = Auth::user();
        $kelas = Kelas::select(
            'kelas.*',
            DB::raw('COUNT(transactions.id) as total_transaksi'), // Menghitung jumlah transaksi
            DB::raw('AVG(testimonis.rating) as average_rating')
        )
            ->leftJoin('transactions', 'kelas.id', '=', 'transactions.kelas_id')
            ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
            ->where('kelas.status', 'disetujui')
            ->where('kelas.slug', $slug)
            ->groupBy('kelas.id')
            ->orderByDesc('total_transaksi')->first();
        $kodepromo = PromoCode::where('status', 'active')->first();
        $setting = Setting::first();
        return Inertia::render('Main/Kelas/CheckOut', [
            'setting' => $setting,
            'kelas' => $kelas,
            'auth' => $auth
        ]);
    }

    public function checkPromoCode(Request $request)
    {
        try {
            $kodePromo = $request->input('kode');
            $promo = PromoCode::where('code', $kodePromo)
                ->where('status', 'active')
                ->first();

            if ($promo) {
                return response()->json([
                    'status' => 'success',
                    'discount' => $promo->discount, // Diskon dalam bentuk nominal
                    'message' => 'Kode promo berhasil diterima',
                    'code' => 200,
                ]);
            }

            return response()->json([
                'status' => 'error',
                'code' => 404,
                'message' => 'Kode promo tidak ditemukan atau tidak aktif',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => 'Terjadi kesalahan. Silakan coba lagi.',
            ]);
        }
    }


    public function kelassaya()
    {
        $user_id = Auth::id();
        $data = Kelas::select(
            'kelas.*',
            DB::raw('COUNT(transactions.id) as total_transaksi'), // Menghitung jumlah transaksi
            DB::raw('AVG(testimonis.rating) as average_rating'),
        )
            ->leftJoin('transactions', 'kelas.id', '=', 'transactions.kelas_id')
            ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
            ->where('kelas.status', 'disetujui')
            ->where('transactions.user_id', $user_id)
            ->where('transactions.status', 'paid')
            ->groupBy('kelas.id')
            ->orderByDesc('total_transaksi')->get();
        $setting = Setting::first();
        $auth = User::findOrFail(Auth::user()->id);
        return Inertia::render('Main/Kelas/KelasSaya', ['setting' => $setting, 'auth' => $auth, 'kelas' => $data]);
    }

    public function belajar($slug)
    {
        $kelas = Kelas::where('slug', $slug)->first();
        $sections = Section::where('kelas_id', $kelas->id)
            ->withCount('videos')  // Menghitung jumlah video terkait dengan setiap Section
            ->get();
        $videos = Video::whereIn('section_id', $sections->pluck('id'))->get();
        $testimoni = Testimoni::where('kelas_id', $kelas->id)->get();
        $setting = Setting::first();
        $auth = User::findOrFail(Auth::user()->id);
        return Inertia::render('Main/Belajar/Index', ['setting' => $setting, 'auth' => $auth, 'kelas' => $kelas, 'sectionData' => $sections, 'video' => $videos, 'testimoni' => $testimoni]);
    }

    public function getReadVideos()
    {
        $readVideos = VideoReader::all(); // Ambil seluruh data dari tabel read_videos
        return response()->json($readVideos); // Kembalikan data dalam bentuk JSON
    }

    public function videoRead(Request $request)
    {
        $existingVideoReader = VideoReader::where('user_id', Auth::user()->id)
            ->where('section_id', $request->section_id)
            ->where('video_id', $request->video_id)
            ->exists(); // Hanya memeriksa keberadaan data
        if (!$existingVideoReader) {
            $videoReader = new VideoReader();
            $videoReader->user_id = Auth::user()->id;
            $videoReader->section_id = $request->section_id;
            $videoReader->video_id = $request->video_id;
            $videoReader->status = 1;
            $videoReader->save();
        }

        $video = Video::find($request->video_id);
        $video->status = 1;

        $previousVideos = Video::where('section_id', $request->section_id)
            ->where('id', '<', $request->video_id)
            ->get();

        foreach ($previousVideos as $previousVideo) {
            $previousVideo->status = 1;
            $previousVideo->save();
        }
    }

    public function sendTestimonial(Request $request)
    {
        $q = new Testimoni();
        $q->user_id = Auth::user()->id;
        $q->rating = $request->rating;
        $q->body = $request->testimonial;
        $q->kelas_id = $request->kelasId;
        $q->save();
    }



    public function sertifikat()
    {
        $setting = Setting::first();
        $auth = User::findOrFail(Auth::user()->id);
        return Inertia::render('Main/Sertifikat/Index', ['setting' => $setting, 'auth' => $auth]);
    }

    public function profile()
    {
        $auth = User::findOrFail(Auth::user()->id);
        $setting = Setting::first();
        return Inertia::render('Main/Profile/Index', ['auth' => $auth, 'setting' => $setting,]);
    }

    public function updateprofile(Request $request)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:3048',
        ]);
        $user = User::findOrFail(Auth::user()->id);
        if ($request->file('image')) {
            $filename = $request->image->store('profile', 'public');
            $user->image = $filename;
        }
        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->has('password') && $request->password) {
            $user->password = Hash::make($request->password);
        }
        $user->tempat_lahir = $request->tempat_lahir;
        $tanggalLahir = Carbon::parse($request->tanggal_lahir);
        $umur = $tanggalLahir->diffInYears(Carbon::now());
        $user->tanggal_lahir = $request->tanggal_lahir;
        $user->umur = $umur;
        $user->jk = $request->jk;
        $user->phone = $request->phone;
        $user->alamat = $request->alamat;
        $user->save();
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return to_route('home');
    }
}
