<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Level extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function kelas(): HasMany
    {
        return $this->hasMany(Kelas::class);
    }
}
