<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasAvatar;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements FilamentUser, HasAvatar
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [
        'id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'expired_otp' => 'datetime',
    ];

    public function canAccessPanel(Panel $panel): bool
    {
        $user = Auth::user();
        if ($panel->getId() === 'admin' && $user->role === 'admin') {
            return true;
        } elseif ($panel->getId() === 'mentor' && $user->role === 'mentor') {
            return true;
        } else {
            return false;
        }
    }

    public function getFilamentAvatarUrl(): ?string
    {
        return $this->avatar_url ? asset('storage/' . $this->image) : null;
    }

    public function kelas(): HasMany
    {
        return $this->hasMany(Kelas::class);
    }

    public function userAnswer(): HasMany
    {
        return $this->hasMany(UserAnswer::class);
    }

    public function testimoni(): HasMany
    {
        return $this->hasMany(Testimoni::class);
    }

    public function transaction(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function diskusi(): HasMany
    {
        return $this->hasMany(Diskusi::class);
    }

    public function BalasDiskusi()
    {
        return $this->hasMany(BalasDiskusi::class);
    }

    public function UserProgress()
    {
        return $this->hasMany(UserProgress::class);
    }

    public function event()
    {
        return $this->hasMany(Event::class);
    }
}
