<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\BalasDiskusi;
use App\Models\Category;
use App\Models\Diskusi;
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
            $averageRating = number_format($averageRating, 1); // Format rating menjadi satu desimal
        } else {
            $averageRating = 0; // Jika tidak ada testimoni
        }
        $totalulasan = Testimoni::where('kelas_id', $kelas->id)->whereHas('kelas', function ($query) use ($kelas) {
            $query->where('user_id', $kelas->user_id);
        })->count();
        $totalsiswa = Testimoni::where('kelas_id', $kelas->id)->whereHas('kelas', function ($query) use ($kelas) {
            $query->where('user_id', $kelas->user_id);
        })->count();
        $totalkelasmentor = Kelas::where('user_id', $kelas->user_id)->count();
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
            'auth' => $auth,
            'averageRating' => $averageRating,
            'totalulasan' => $totalulasan,
            'totalkelasmentor' => $totalkelasmentor,
            'totalsiswa' => $totalsiswa,
        ]);
    }

    public function createFreeTransaction(Request $request)
    {
        try {
            $trx = new Transaction();
            $trx->kelas_id = $request->kelas_id;
            $trx->user_id = Auth::user()->id;
            $trx->invoice_number = 'COURSE' . time();
            $trx->amount = 0;
            $trx->payment_method = 'manual';
            $trx->status = 'free';
            $trx->payment_url = "-";
            $trx->save();
            return to_route('dashboard.kelassaya');
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
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
            DB::raw('COUNT(transactions.id) as total_transaksi'),
            DB::raw('AVG(testimonis.rating) as average_rating'),
        )
            ->leftJoin('transactions', 'kelas.id', '=', 'transactions.kelas_id')
            ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
            ->where('kelas.status', 'disetujui')
            ->where('transactions.user_id', $user_id)
            ->where('transactions.status', 'paid')
            ->Orwhere('transactions.status', 'free')
            ->groupBy('kelas.id')
            ->orderByDesc('total_transaksi')
            ->get();

        // Ambil semua ID kelas yang sesuai
        $kelasIds = $data->pluck('id');

        // Ambil video yang sudah dibaca oleh pengguna dalam kelas-kelas ini
        $videoreadGrouped = Video::whereHas('section', function ($query) use ($kelasIds) {
            $query->whereIn('kelas_id', $kelasIds);
        })
            ->where('status', 1)
            ->get()
            ->groupBy('section.kelas_id');

        // Menghitung progress untuk setiap kelas
        $kelasWithProgress = $data->map(function ($kelas) use ($videoreadGrouped) {
            $totalVideos = Video::whereHas('section', function ($query) use ($kelas) {
                $query->where('kelas_id', $kelas->id);
            })->count();
            $videosRead = $videoreadGrouped->get($kelas->id, collect())->count();

            $progress = $totalVideos > 0 ? ($videosRead / $totalVideos) * 100 : 0;

            // Menambahkan field progress ke data kelas
            $kelas->progress = round($progress, 2);

            return $kelas;
        });

        $setting = Setting::first();
        $auth = User::findOrFail(Auth::user()->id);
        return Inertia::render('Main/Kelas/KelasSaya', ['setting' => $setting, 'auth' => $auth, 'kelas' => $kelasWithProgress, 'videoread' => $videoreadGrouped]);
    }

    public function belajar($slug)
    {
        $kelas = Kelas::where('slug', $slug)->first(); // Ambil satu kelas berdasarkan slug
        $sections = Section::where('kelas_id', $kelas->id)
            ->withCount('videos') // Menghitung jumlah video pada setiap section
            ->get();
        $videos = Video::whereIn('section_id', $sections->pluck('id'))->get();
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
            $averageRating = number_format($averageRating, 1); // Format rating menjadi satu desimal
        } else {
            $averageRating = 0; // Jika tidak ada testimoni
        }
        $totalulasan = Testimoni::where('kelas_id', $kelas->id)->whereHas('kelas', function ($query) use ($kelas) {
            $query->where('user_id', $kelas->user_id);
        })->count();
        $totalsiswa = Testimoni::where('kelas_id', $kelas->id)->whereHas('kelas', function ($query) use ($kelas) {
            $query->where('user_id', $kelas->user_id);
        })->count();
        $totalkelasmentor = Kelas::where('user_id', $kelas->user_id)->count();

        // Kirim data ke frontend menggunakan Inertia
        return Inertia::render('Main/Belajar/Index', [
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
            'totalkelasmentor' => $totalkelasmentor
        ]);
    }




    public function getReadVideos()
    {
        $readVideos = VideoReader::whereHas('section', function ($query) {
            $query->where('kelas_id', Auth::user()->kelas_id);
        })->where('user_id', Auth::user()->id)->get();
        return response()->json($readVideos); // Kembalikan data dalam bentuk JSON
    }

    public function videoRead(Request $request)
    {
        $existingVideoReader = VideoReader::where('user_id', Auth::user()->id)
            ->where('section_id', $request->section_id)
            ->where('video_id', $request->video_id)
            ->exists();
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
        $video->save();
        // $previousVideos = Video::where('section_id', $request->section_id)
        //     ->where('id', '<', $request->video_id)
        //     ->get();

        // foreach ($previousVideos as $previousVideo) {
        //     $previousVideo->status = 1;
        //     $previousVideo->save();
        // }
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

    public function sendDiskusi(Request $request)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:3048', // Validasi file image
            'subject' => 'required|string',  // Tambahkan validasi subject
            'title' => 'required|string',    // Tambahkan validasi title
            'body' => 'required|string',     // Tambahkan validasi body
            'kelasId' => 'required|integer', // Validasi kelasId
        ]);
        $q = new Diskusi();
        if ($request->hasFile('image')) {
            $filename = $request->image->store('images', 'public');  // Simpan file di storage/public/images
            $q->image = $filename;
        }
        $q->user_id = Auth::user()->id;
        $q->kelas_id = $request->kelasId;
        $q->subject = $request->subject;
        $q->title = $request->title;
        $q->body = $request->body;
        $q->save();
    }

    public function balasDiskusi(Request $request)
    {
        $q = new BalasDiskusi();
        $q->user_id = Auth::user()->id;
        $q->diskusi_id = $request->diskusiId;
        $q->body = $request->balas;
        $q->save();
    }

    public function exam($slug)
    {
        $setting = Setting::first();
        return Inertia::render('Main/Exam/Index', ['setting' => $setting]);
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
