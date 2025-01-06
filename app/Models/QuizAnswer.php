<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class QuizAnswer extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $with = ['quiz'];

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    public function userAnswer(): HasMany
    {
        return $this->hasMany(UserAnswer::class);
    }
}
