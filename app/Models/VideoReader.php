<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoReader extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $with = ['video', 'section'];

    public function video()
    {
        return $this->belongsTo(Video::class);
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }
}
