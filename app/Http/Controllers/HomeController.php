<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $setting = Setting::first();
        return Inertia::render('Home/Home/Index', [
            'setting' => $setting
        ]);
    }

    public function kelas()
    {
        $setting = Setting::first();
        return Inertia::render('Home/Kelas/Index', [
            'setting' => $setting
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
            return to_route('student.home');
        }
        return to_route('home.login')->withErrors(['email' => 'Email ini tidak terdaftar.']);
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
            return to_route('home.register');
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
        return to_route('home.login');
    }
}
