<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProgress extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'kelas_id',
        'watched_videos',
        'current_video_index',
        'overall_progress',
        'last_accessed_at'
    ];

    protected $casts = [
        'watched_videos' => 'array',
        'overall_progress' => 'decimal:2',
        'last_accessed_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }
}
