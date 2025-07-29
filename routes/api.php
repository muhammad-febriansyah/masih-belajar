<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\EmailSending;
use App\Http\Controllers\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/midtrans-callback', [PaymentController::class, 'midtransCallback'])->name('midtrans-callback');
Route::get('/setting', [ApiController::class, 'setting'])->name('setting');
Route::post('/register', [ApiController::class, 'register'])->name('api.register');
Route::post('/verify-otp', [ApiController::class, 'verifyRegistrationOtp']);
Route::post('/resend-otp', [ApiController::class, 'resendRegistrationOtp']);
Route::post('/login', [ApiController::class, 'login'])->name('api.login');
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [ApiController::class, 'user'])->name('user');
    Route::get('/home', [ApiController::class, 'home'])->name('api.home');

    Route::get('/usershow', [ApiController::class, 'show']);
    Route::post('/user/update', [ApiController::class, 'updateProfile']);
    Route::post('/user/change-password', [ApiController::class, 'updatePassword']);


    Route::get('/kategori', [ApiController::class, 'kategori'])->name('kategori');
    Route::get('/event', [ApiController::class, 'event'])->name('event');
    Route::get('/faq', [ApiController::class, 'faq'])->name('faq');
    Route::get('/about', [ApiController::class, 'about'])->name('about');
    Route::get('/term_condition', [ApiController::class, 'term_condition'])->name('term_condition');
    Route::get('/trx', [ApiController::class, 'trx'])->name('trx');
    Route::get('/kelasApi', [ApiController::class, 'kelasApi'])->name('kelasApi');
    Route::get('/kelassaya', [ApiController::class, 'kelassaya'])->name('kelassaya');
    Route::get('/apiDetailKelas/{slug}', [ApiController::class, 'apiDetailKelas'])->name('apiDetailKelas');


    Route::get('/belajar/{slug}', [ApiController::class, 'belajar'])
        ->name('api.belajar');
    Route::post('/video-reader/mark-as-read', [ApiController::class, 'markAsRead']);
    Route::get('/video-reader/progress', [ApiController::class, 'getVideoProgress']);

    Route::post('/video-reader/mark-as-unread', [ApiController::class, 'markAsUnread']);
    Route::post('/video-reader/toggle', [ApiController::class, 'toggleVideoStatus']);
    Route::get('/video-reader/statistics', [ApiController::class, 'getLearningStatistics']);
    Route::get('/video-reader/all-progress', [ApiController::class, 'getAllCoursesProgress']);

    Route::get('/downloadsertif', [ApiController::class, 'sertifikat']);
    Route::get('/generateSertifikat/{id}', [ApiController::class, 'generateSertifikat']);

    Route::post('/diskusi/send', [ApiController::class, 'sendDiskusi']);
    Route::post('/diskusi/balas', [ApiController::class, 'balasDiskusi']);
    // Route::get('/{id}', [ApiController::class, 'getDiskusi']);
    Route::get('/kelas/{kelasId}', [ApiController::class, 'getDiskusiByKelas']);

    Route::post('/sendTestimonial', [ApiController::class, 'sendTestimonial']);

    Route::post('/testimonials', [ApiController::class, 'sendTestimonial']);
    Route::put('/testimonials/{id}', [ApiController::class, 'updateTestimonial']);
    Route::delete('/testimonials/{id}', [ApiController::class, 'deleteTestimonial']);
    Route::get('/testimonials/my', [ApiController::class, 'getMyTestimonials']);

    Route::get('/exam/{slug}', [ApiController::class, 'exam']);
    Route::get('/examend/{slug}', [ApiController::class, 'examEnd']);
    Route::post('/examanswer', [ApiController::class, 'examanswer'])->name('examanswer');

    Route::post('/createTransaction', [PaymentController::class, 'createTransaction']);
    Route::post('/createTransactionWithSnapToken', [PaymentController::class, 'createTransactionWithSnapToken']);
    Route::post('/createFreeTransaction', [PaymentController::class, 'createFreeTransaction']);
    Route::get('/invoice/{invoiceNumber}', [PaymentController::class, 'getInvoiceDetails']);
    Route::get('/transaction-status/{invoiceNumber}', [PaymentController::class, 'checkTransactionStatus']);
    Route::get('/my-transactions', [PaymentController::class, 'getUserTransactions']);
});
