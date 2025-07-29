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
use App\Models\Quiz;
use App\Models\QuizAnswer;
use App\Models\Section;
use App\Models\Setting;
use App\Models\TemplateSertifikat;
use App\Models\Testimoni;
use App\Models\Transaction;
use App\Models\Type;
use App\Models\User;
use App\Models\UserAnswer;
use App\Models\Video;
use App\Models\VideoReader;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use setasign\Fpdi\Fpdi;

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
        $testimoni = Testimoni::latest()->get();
        $kelaspopuler = Kelas::select(
            'kelas.*',
            DB::raw('COUNT(transactions.id) as total_transaksi'),
            DB::raw('SUM(testimonis.rating) as average_rating')
        )
            ->leftJoin('transactions', 'kelas.id', '=', 'transactions.kelas_id')
            ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
            ->where('kelas.status', 'disetujui')
            ->groupBy('kelas.id')
            ->orderByDesc('total_transaksi')
            ->limit(3)
            ->get();
        return Inertia::render('Main/Home/Index', [
            'setting' => $setting,
            'about' => $about,
            'totaluser' => $totaluser,
            'totalstar' => $totalstar,
            'totalkelas' => $totalkelas,
            'faq' => $faq,
            'kelaspopuler' => $kelaspopuler,
            'auth' => $auth,
            'testimoni' => $testimoni
        ]);
    }

    public function kelas()
    {
        $auth = Auth::user();
        $user_id = Auth::id();
        $setting = Setting::first();

        $data = Kelas::select(
            'kelas.*',
            DB::raw('COUNT(transactions.id) as total_transaksi'),
            DB::raw('SUM(testimonis.rating) as average_rating')
        )
            ->selectRaw('COUNT(CASE WHEN transactions.status = "paid" AND transactions.user_id = ? THEN 1 END) as total_bergabung', [$user_id])
            ->leftJoin('transactions', 'kelas.id', '=', 'transactions.kelas_id')
            ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
            ->where('kelas.status', 'disetujui')
            ->groupBy('kelas.id')
            ->orderByDesc('total_transaksi')
            ->paginate(6);

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

        $kelas = Kelas::selectRaw(
            'kelas.*, COUNT(CASE WHEN transactions.status = "paid" AND transactions.user_id = ? THEN 1 END) as total_bergabung',
            [$user_id]
        )
            ->leftJoin('transactions', 'kelas.id', '=', 'transactions.kelas_id')
            ->where('kelas.slug', $slug)
            ->groupBy('kelas.id') // Add this since you're using COUNT
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

        $totalstartmentor = Testimoni::whereHas('kelas', function ($query) use ($kelas) {
            $query->where('user_id', $kelas->user_id);
        })->sum('rating');

        $totalTestimoni = Testimoni::whereHas('kelas', function ($query) use ($kelas) {
            $query->where('user_id', $kelas->user_id);
        })->count();

        if ($totalTestimoni > 0) {
            $averageRating = $totalstartmentor / $totalTestimoni;
            $averageRating = number_format($averageRating, 1);
        } else {
            $averageRating = 0;
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
            DB::raw('COUNT(transactions.id) as total_transaksi'),
            DB::raw('SUM(testimonis.rating) as average_rating')
        )
            ->selectRaw('COUNT(CASE WHEN transactions.status = "paid" AND transactions.user_id = ? THEN 1 END) as total_bergabung', [$user_id])
            ->leftJoin('transactions', 'kelas.id', '=', 'transactions.kelas_id')
            ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
            ->where('kelas.status', 'disetujui')
            ->where('kelas.id', '!=', $kelas->id)
            ->where('kelas.user_id', $kelas->user_id)
            ->groupBy('kelas.id')
            ->orderByDesc('total_transaksi')
            ->limit(4)
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
            DB::raw('COUNT(transactions.id) as total_transaksi'),
            DB::raw('SUM(testimonis.rating) as average_rating')
        )
            ->leftJoin('transactions', 'kelas.id', '=', 'transactions.kelas_id')
            ->leftJoin('testimonis', 'kelas.id', '=', 'testimonis.kelas_id')
            ->where('kelas.status', 'disetujui')
            ->where('kelas.slug', $slug)
            ->groupBy('kelas.id')
            ->orderByDesc('total_transaksi')->first();
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
                    'discount' => $promo->discount,
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
        try {
            $user_id = Auth::id();

            if (!$user_id) {
                return redirect()->route('login');
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
                    'level:id,name,image',
                    'type:id,name',
                    'user:id,name,email,image,bio,role'
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
                    ->where('videos.status', 1)
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

                $kelas->joined_at_formatted = $kelas->joined_at ?
                    \Carbon\Carbon::parse($kelas->joined_at)->format('d M Y') : null;

                unset($kelas->joined_at);

                return $kelas;
            });

            $setting = Setting::first();
            $auth = User::select('id', 'name', 'email', 'image', 'bio', 'role')
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

            return Inertia::render('Main/Kelas/KelasSaya', [
                'setting' => $setting,
                'auth' => $auth,
                'kelas' => $kelasWithProgress,
                'statistics' => $statistics
            ]);
        } catch (\Exception $e) {
            Log::error('Error in kelassaya method: ' . $e->getMessage(), [
                'user_id' => Auth::id(),
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()->back()->with('error', 'Terjadi kesalahan saat mengambil data kelas.');
        }
    }

    public function belajar($slug)
    {
        $kelas = Kelas::where('slug', $slug)->first();
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
        $totalulasan = Testimoni::where('kelas_id', $kelas->id)->whereHas('kelas', function ($query) use ($kelas) {
            $query->where('user_id', $kelas->user_id);
        })->count();
        $totalsiswa = Testimoni::where('kelas_id', $kelas->id)->whereHas('kelas', function ($query) use ($kelas) {
            $query->where('user_id', $kelas->user_id);
        })->count();
        $totalkelasmentor = Kelas::where('user_id', $kelas->user_id)->count();

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
            'totalkelasmentor' => $totalkelasmentor,
            'videoRead' => $videoRead
        ]);
    }

    public function getReadVideos(Request $request)
    {
        $user_id = Auth::id();
        $kelas_id = $request->input('kelas_id');

        try {
            if ($kelas_id) {
                $readVideos = VideoReader::whereHas('video.section', function ($query) use ($kelas_id) {
                    $query->where('kelas_id', $kelas_id);
                })
                    ->where('user_id', $user_id)
                    ->where('status', 1)
                    ->select('section_id', 'video_id', 'status') // Hanya ambil kolom yang diperlukan
                    ->distinct() // Pastikan tidak ada duplicate
                    ->get();
            } else {
                $readVideos = VideoReader::where('user_id', $user_id)
                    ->where('status', 1)
                    ->select('section_id', 'video_id', 'status')
                    ->distinct()
                    ->get();
            }

            // Format data untuk frontend
            $formattedData = $readVideos->map(function ($item) {
                return [
                    'section_id' => (int) $item->section_id,
                    'video_id' => (int) $item->video_id,
                    'status' => (int) $item->status
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $formattedData
            ]);
        } catch (\Exception $e) {
            \Log::error('Error getting read videos: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data video yang sudah dibaca'
            ], 500);
        }
    }

    public function videoRead(Request $request)
    {
        $user_id = Auth::id();

        $request->validate([
            'section_id' => 'required|integer',
            'video_id' => 'required|integer',
        ]);

        try {
            // Cek apakah sudah ada record untuk kombinasi user + section + video
            $existingRecord = VideoReader::where('user_id', $user_id)
                ->where('section_id', $request->section_id)
                ->where('video_id', $request->video_id)
                ->first();

            if ($existingRecord) {
                // Jika sudah ada, update status jadi 1 (jika belum)
                if ($existingRecord->status != 1) {
                    $existingRecord->update(['status' => 1]);
                    return response()->json([
                        'success' => true,
                        'message' => 'Progress video berhasil diupdate',
                        'data' => [
                            'section_id' => (int) $existingRecord->section_id,
                            'video_id' => (int) $existingRecord->video_id,
                            'status' => 1
                        ]
                    ]);
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Video sudah pernah ditonton',
                    'already_watched' => true,
                    'data' => [
                        'section_id' => (int) $existingRecord->section_id,
                        'video_id' => (int) $existingRecord->video_id,
                        'status' => (int) $existingRecord->status
                    ]
                ]);
            }

            // Validasi video exists dan aktif
            $video = Video::where('id', $request->video_id)
                ->where('section_id', $request->section_id)
                ->where('status', 1)
                ->first();

            if (!$video) {
                return response()->json([
                    'success' => false,
                    'message' => 'Video tidak ditemukan atau tidak aktif'
                ], 404);
            }

            // Buat record baru
            $videoReader = VideoReader::create([
                'user_id' => $user_id,
                'section_id' => $request->section_id,
                'video_id' => $request->video_id,
                'status' => 1
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Progress video berhasil disimpan',
                'data' => [
                    'section_id' => (int) $videoReader->section_id,
                    'video_id' => (int) $videoReader->video_id,
                    'status' => (int) $videoReader->status
                ]
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            // Handle duplicate entry error (jika ada unique constraint)
            if ($e->errorInfo[1] == 1062) { // Duplicate entry error code
                return response()->json([
                    'success' => true,
                    'message' => 'Video sudah pernah ditonton',
                    'already_watched' => true
                ]);
            }

            \Log::error('Database error in videoRead: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan progress video'
            ], 500);
        } catch (\Exception $e) {
            \Log::error('Error in videoRead: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan progress video'
            ], 500);
        }
    }

    // Fungsi tambahan untuk cleanup duplicate data (jika ada)
    public function cleanupDuplicateVideoReaders()
    {
        try {
            // Ambil semua duplicate records
            $duplicates = VideoReader::select('user_id', 'section_id', 'video_id')
                ->groupBy('user_id', 'section_id', 'video_id')
                ->havingRaw('COUNT(*) > 1')
                ->get();

            $cleanedCount = 0;

            foreach ($duplicates as $duplicate) {
                // Ambil semua records untuk kombinasi ini
                $records = VideoReader::where('user_id', $duplicate->user_id)
                    ->where('section_id', $duplicate->section_id)
                    ->where('video_id', $duplicate->video_id)
                    ->orderBy('created_at', 'desc')
                    ->get();

                // Hapus semua kecuali yang pertama (terbaru)
                $records->skip(1)->each(function ($record) use (&$cleanedCount) {
                    $record->delete();
                    $cleanedCount++;
                });
            }

            return response()->json([
                'success' => true,
                'message' => "Berhasil membersihkan {$cleanedCount} duplicate records"
            ]);
        } catch (\Exception $e) {
            \Log::error('Error cleaning duplicates: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal membersihkan duplicate data'
            ], 500);
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

    public function sendDiskusi(Request $request)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:3048',
            'subject' => 'required|string',
            'title' => 'required|string',
            'body' => 'required|string',
            'kelasId' => 'required|integer',
        ]);
        $q = new Diskusi();
        if ($request->hasFile('image')) {
            $filename = $request->image->store('images', 'public');
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
        $kelas = Kelas::where('slug', $slug)->first();
        $setting = Setting::first();
        $exam = Quiz::where('kelas_id', $kelas->id)->get();
        $examanswer = QuizAnswer::whereIn('quiz_id', $exam->pluck('id'))->get();
        return Inertia::render('Main/Exam/Index', ['setting' => $setting, 'kelas' => $kelas, 'quiz' => $exam, 'examanswer' => $examanswer]);
    }

    public function examEnd($slug)
    {
        $kelas = Kelas::where('slug', $slug)->first();
        $setting = Setting::first();
        $exam = Quiz::where('kelas_id', $kelas->id)->get();
        $examanswer = QuizAnswer::whereIn('quiz_id', $exam->pluck('id'))->get();
        $data = UserAnswer::where('user_id', Auth::user()->id)->get();
        $userAnswers = $data->pluck('answer_id', 'quiz_id')->toArray();
        $totalPoint = $data->sum('point');
        return Inertia::render('Main/Exam/Selesai', [
            'setting' => $setting,
            'data' => $data,
            'totalPoint' => $totalPoint,
            'kelas' => $kelas,
            'quiz' => $exam,
            'examanswer' => $examanswer,
            'userAnswers' => $userAnswers,
        ]);
    }


    public function examanswer(Request $request)
    {
        $request->validate([
            'answers' => 'required|array',
            'answers.*.quiz_id' => 'required|integer',
            'answers.*.quiz_answer_id' => 'required|integer',
            'answers.*.point' => 'required|integer',
        ]);

        foreach ($request->answers as $answer) {
            $existingAnswer = UserAnswer::where('user_id', Auth::user()->id)
                ->where('quiz_id', $answer['quiz_id'])
                ->first();

            if ($existingAnswer) {
                if ($existingAnswer->edit_count >= 3) {
                    return response()->json(['message' => 'Anda telah melebihi batas untuk mengedit ujian ini.'], 400);
                }

                $existingAnswer->edit_count += 1;
                $existingAnswer->quiz_answer_id = $answer['quiz_answer_id'];
                $existingAnswer->point = $answer['point'];
                $existingAnswer->save();
            } else {
                $kelas = \App\Models\Kelas::find($answer['kelas_id']);
                $namaKelas = $kelas ? strtoupper($kelas->nama) : 'UNKNOWN';
                $namaKelas = preg_replace('/[^A-Z0-9]/', '', $namaKelas);

                $randomNumber = rand(1000, 9999);
                $tanggal = date('d');
                $bulan = date('m');
                $tahun = date('Y');

                $noSertifikat = "MBI/{$namaKelas}/{$randomNumber}/{$tanggal}/{$bulan}/{$tahun}";

                $q = new UserAnswer();
                $q->user_id = Auth::user()->id;
                $q->kelas_id = $answer['kelas_id'];
                $q->quiz_id = $answer['quiz_id'];
                $q->no_sertifikat = $noSertifikat;
                $q->quiz_answer_id = $answer['quiz_answer_id'];
                $q->point = $answer['point'];
                $q->edit_count = 1;
                $q->save();
            }
        }

        return response()->json(['message' => 'Answers saved successfully.']);
    }

    public function sertifikat()
    {
        $setting = Setting::first();
        $auth = User::findOrFail(Auth::user()->id);

        $userAnswers = UserAnswer::where('user_id', Auth::user()->id)
            ->groupBy('kelas_id')
            ->selectRaw('*, SUM(point) as total_point')
            ->get();

        $totalPoint = $userAnswers->sum('point');

        return Inertia::render('Main/Sertifikat/Index', [
            'setting' => $setting,
            'auth' => $auth,
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
