<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BalasDiskusi extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $with = ['diskusi', 'user'];

    public function diskusi()
    {
        return $this->belongsTo(Diskusi::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
