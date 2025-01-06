<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quiz extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $with = ['kelas'];

    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kelas::class);
    }

    public function quizAnswer(): HasMany
    {
        return $this->hasMany(QuizAnswer::class);
    }

    public function userAnswer(): HasMany
    {
        return $this->hasMany(UserAnswer::class);
    }
}
