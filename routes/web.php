<?php

use App\Http\Controllers\EmailSending;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/kelas', [HomeController::class, 'kelas'])->name('kelas');
Route::get('/searchKelas', [HomeController::class, 'searchKelas'])->name('searchKelas');
Route::get('/detailkelas/{slug}', [HomeController::class, 'detailkelas'])->name('detailkelas');
Route::get('/event', [HomeController::class, 'event'])->name('event');
Route::get('/detailevent/{slug}', [HomeController::class, 'detailevent'])->name('detailevent');
Route::get('/masuk', [HomeController::class, 'login'])->name('masuk');
Route::get('/daftar', [HomeController::class, 'register'])->name('daftar');
Route::get('/tentangkami', [HomeController::class, 'tentangkami'])->name('tentangkami');
Route::get('/term-condition', [HomeController::class, 'termcondition'])->name('termcondition');
Route::get('/cek-sertifikat', [HomeController::class, 'ceksertifikat'])->name('ceksertifikat');
Route::post('/checklogin', [HomeController::class, 'checklogin'])->name('checklogin');
Route::post('/saveregister', [HomeController::class, 'saveregister'])->name('saveregister');
Route::get('/verify-otp', [HomeController::class, 'showVerifyOtp'])->name('verify-otp');
Route::post('/verify-otp', [HomeController::class, 'verifyOtp'])->name('verify-otp.post');
Route::post('/resend-otp', [HomeController::class, 'resendOtp'])->name('resend-otp');
Route::get('/send-email', [EmailSending::class, 'sendEmail'])->name('sendEmail');
Route::post('/ceksertifikat/search', [HomeController::class, 'searchSertifikat'])->name('ceksertifikat.search');
Route::get('/generateSertifikat/{id}', [HomeController::class, 'generateSertifikat'])->name('generateSertifikat');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard/home', [MainController::class, 'index'])->name('dashboard.home');
    Route::get('/dashboard/tentangkami', [MainController::class, 'tentangkami'])->name('dashboard.tentangkami');
    Route::get('/dashboard/kelas', [MainController::class, 'kelas'])->name('dashboard.kelas');
    Route::get('/dashboard/searchKelas', [MainController::class, 'searchKelas'])->name('dashboard.searchKelas');
    Route::get('/dashboard/detailkelas/{slug}', [MainController::class, 'detailkelas'])->name('dashboard.detailkelas');
    Route::get('/dashboard/check-out/{slug}', [MainController::class, 'checkout'])->name('dashboard.checkout');
    Route::post('/dashboard/createTransaction', [PaymentController::class, 'createTransaction'])->name('dashboard.createTransaction');
    Route::post('/dashboard/checkPromoCode', [MainController::class, 'checkPromoCode'])->name('dashboard.checkPromoCode');
    Route::get('/dashboard/kelas-saya', [MainController::class, 'kelassaya'])->name('dashboard.kelassaya');
    Route::get('/dashboard/my-profile', [MainController::class, 'profile'])->name('dashboard.myprofile');
    Route::get('/dashboard/belajar/{slug}', [MainController::class, 'belajar'])->name('dashboard.belajar');
    Route::get('/dashboard/exam/{slug}', [MainController::class, 'exam'])->name('dashboard.exam');
    Route::post('/dashboard/videoRead', [MainController::class, 'videoRead'])->name('dashboard.videoRead');
    Route::get('/dashboard/getReadVideos', [MainController::class, 'getReadVideos'])->name('dashboard.getReadVideos');
    Route::get('/dashboard/list-sertifikat', [MainController::class, 'sertifikat'])->name('dashboard.sertifikat');
    Route::get('/dashboard/generateSertifikat/{id}', [MainController::class, 'generateSertifikat'])->name('dashboard.generateSertifikat');
    Route::get('/dashboard/examEnd/{slug}', [MainController::class, 'examEnd'])->name('dashboard.examEnd');
    Route::post('/dashboard/updateprofile', [MainController::class, 'updateprofile'])->name('dashboard.updateprofile');
    Route::post('/dashboard/sendTestimonial', [MainController::class, 'sendTestimonial'])->name('dashboard.sendTestimonial');
    Route::post('/dashboard/sendDiskusi', [MainController::class, 'sendDiskusi'])->name('dashboard.sendDiskusi');
    Route::post('/dashboard/balasDiskusi', [MainController::class, 'balasDiskusi'])->name('dashboard.balasDiskusi');
    Route::post('/dashboard/createFreeTransaction', [MainController::class, 'createFreeTransaction'])->name('dashboard.createFreeTransaction');
    Route::post('/dashboard/examanswer', [MainController::class, 'examanswer'])->name('dashboard.examanswer');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/logout', [MainController::class, 'logout'])->name('logout');

    Route::get('/dashboard/event', [MainController::class, 'event'])->name('dashboard.event');
    Route::get('/dashboard/detailevent/{slug}', [MainController::class, 'detailevent'])->name('dashboard.detailevent');
});

require __DIR__ . '/auth.php';
