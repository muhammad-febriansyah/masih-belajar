<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAnswer extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $with = ['quiz', 'quizAnswer', 'user', 'kelas'];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function quizAnswer()
    {
        return $this->belongsTo(QuizAnswer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }
}
