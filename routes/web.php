<?php

use App\Http\Controllers\HomeController;
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
Route::get('/home/kelas', [HomeController::class, 'kelas'])->name('home.kelas');
Route::get('/home/detailkelas/{slug}', [HomeController::class, 'detailkelas'])->name('home.detailkelas');
Route::get('/home/login', [HomeController::class, 'login'])->name('home.login');
Route::get('/home/register', [HomeController::class, 'register'])->name('home.register');
Route::post('/home/checklogin', [HomeController::class, 'checklogin'])->name('home.checklogin');
Route::post('/home/saveregister', [HomeController::class, 'saveregister'])->name('home.saveregister');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
