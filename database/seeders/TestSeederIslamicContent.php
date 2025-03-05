<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class IslamicContentSeeder extends Seeder
{
    public function run()
    {
        $contents = [
            [
                'topic_bm' => 'Asas Islam dan Gaya Hidup',
                'title_bm' => 'Asas Keimanan dalam Islam',
                'content_bm' => 'Keimanan kepada Allah, Malaikat, Kitab, Rasul, Hari Kiamat dan Qada dan Qadar.',
                'category_bm' => 'Keimanan',
                'topic_en' => 'Islamic Fundamentals and Lifestyle',
                'title_en' => 'The Fundamentals of Faith in Islam',
                'content_en' => 'Belief in Allah, Angels, Books, Prophets, the Day of Judgment, and Predestination.',
                'category_en' => 'Faith',
                'slug' => Str::slug('The Fundamentals of Faith in Islam'),
                'banner' => null,
                'media' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'topic_bm' => 'Kaifiat Solat dan Doa',
                'title_bm' => 'Panduan Solat Fardu',
                'content_bm' => 'Cara menunaikan solat fardu lima waktu dengan betul.',
                'category_bm' => 'Solat',
                'topic_en' => 'Prayer and Supplication Guide',
                'title_en' => 'Guide to the Five Daily Prayers',
                'content_en' => 'How to properly perform the five daily obligatory prayers.',
                'category_en' => 'Prayer',
                'slug' => Str::slug('Guide to the Five Daily Prayers'),
                'banner' => null,
                'media' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'topic_bm' => 'Sirah Nabi dan Sahabat',
                'title_bm' => 'Kisah Nabi Muhammad SAW',
                'content_bm' => 'Perjalanan hidup Nabi Muhammad SAW dan perjuangan Baginda.',
                'category_bm' => 'Sejarah Islam',
                'topic_en' => 'Prophet’s Biography and Companions',
                'title_en' => 'Life Story of Prophet Muhammad (PBUH)',
                'content_en' => 'The life journey and struggles of Prophet Muhammad (PBUH).',
                'category_en' => 'Islamic History',
                'slug' => Str::slug('Life Story of Prophet Muhammad (PBUH)'),
                'banner' => null,
                'media' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'topic_bm' => 'Sebalik Nama Surah',
                'title_bm' => 'Makna di Sebalik Surah Al-Fatihah',
                'content_bm' => 'Penerangan tentang keutamaan dan makna Surah Al-Fatihah.',
                'category_bm' => 'Al-Quran',
                'topic_en' => 'Meanings Behind Surah Names',
                'title_en' => 'The Meaning Behind Surah Al-Fatihah',
                'content_en' => 'Explanation of the importance and meaning of Surah Al-Fatihah.',
                'category_en' => 'Quran',
                'slug' => Str::slug('The Meaning Behind Surah Al-Fatihah'),
                'banner' => null,
                'media' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'topic_bm' => 'FAQ Islam',
                'title_bm' => 'Soalan Lazim tentang Islam',
                'content_bm' => 'Jawapan kepada soalan lazim berkaitan Islam.',
                'category_bm' => 'Soalan Umum',
                'topic_en' => 'Islamic FAQs',
                'title_en' => 'Common Questions about Islam',
                'content_en' => 'Answers to frequently asked questions about Islam.',
                'category_en' => 'General Questions',
                'slug' => Str::slug('Common Questions about Islam'),
                'banner' => null,
                'media' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'topic_bm' => 'Perasaan Anda Sekarang',
                'title_bm' => 'Panduan Ruqyah Syariah',
                'content_bm' => 'Cara-cara melakukan ruqyah secara syariah.',
                'category_bm' => 'Perubatan Islam',
                'topic_en' => 'Your Feeling Now',
                'title_en' => 'Guide to Islamic Ruqyah',
                'content_en' => 'How to perform ruqyah according to Islamic teachings.',
                'category_en' => 'Islamic Healing',
                'slug' => Str::slug('Guide to Islamic Ruqyah'),
                'banner' => null,
                'media' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        DB::table('islamic_contents')->insert($contents);
    }
}
