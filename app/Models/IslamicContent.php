<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class IslamicContent extends Model
{
    protected $fillable = [
        'topic_bm', 'title_bm', 'content_bm', 'category_bm',
        'topic_en', 'title_en', 'content_en', 'category_en',
        'slug', 'banner', 'media'
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($content) {
            $content->slug = Str::slug($content->title_en);
        });

        static::updating(function ($content) {
            $content->slug = Str::slug($content->title_en);
        });
    }
}
