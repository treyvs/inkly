<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'bio',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    // ── Role Helpers ──────────────────────────────────────────────

    public function isClient(): bool
    {
        return $this->role === 'client';
    }

    public function isFreelancer(): bool
    {
        return $this->role === 'freelancer';
    }

    // ── Relationships ──────────────────────────────────────────────

    /** Jobs posted by this user (clients only) */
    public function jobPostings(): HasMany
    {
        return $this->hasMany(JobPosting::class, 'client_id');
    }

    /** Bids submitted by this user (freelancers only) */
    public function bids(): HasMany
    {
        return $this->hasMany(Bid::class, 'freelancer_id');
    }
}