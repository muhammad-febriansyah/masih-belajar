<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Video extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $with = ['section'];

    protected $casts = [
        'url' => 'array', // or 'json'
    ];

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }

    public function VideoReader()
    {
        return $this->hasMany(VideoReader::class);
    }
}
