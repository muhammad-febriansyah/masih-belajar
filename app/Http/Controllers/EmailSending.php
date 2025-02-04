<?php

namespace App\Http\Controllers;

use App\Mail\KirimPesan;
use App\Mail\SendEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailSending extends Controller
{
    public function sendEmail()
    {
        $user = 'Muhammad Febrian';  // Misalnya data yang ingin dikirim
        $sending = Mail::to('febrianxfanny@gmail.com')->send(new KirimPesan());
        if (!$sending) {
            return 'Email failed to send!';
        } else {
            return 'Email sent successfully!';
        }
    }
}
