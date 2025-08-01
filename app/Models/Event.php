<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $with = ['user'];
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
