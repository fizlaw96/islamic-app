<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Streak extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'streak_count', 'last_completed_date'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
