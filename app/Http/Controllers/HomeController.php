<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
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
}
