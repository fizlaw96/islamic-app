<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class IslamicContent extends Model
{
    use HasFactory;

    protected $table = 'islamic_contents'; // Make sure this matches your database

    protected $fillable = [
        'topic_bm', 'title_bm', 'content_bm', 'category_bm',
        'topic_en', 'title_en', 'content_en', 'category_en',
        'slug', 'banner', 'media'
    ];

    public static function boot()
    {
        parent::boot();

        // Automatically create a slug when inserting
        static::creating(function ($content) {
            if (empty($content->slug)) {
                $content->slug = Str::slug($content->title_en);
            }
        });
    }
}
