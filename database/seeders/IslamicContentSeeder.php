<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use League\Csv\Reader;
use Illuminate\Support\Str;

class IslamicContentSeeder extends Seeder
{
    public function run()
    {
        $filePath = base_path('public/storage/assets/csv/islamic_content.csv');

        // Check if the file exists
        if (!file_exists($filePath)) {
            $this->command->error("CSV file not found at: $filePath");
            return;
        }

        $csv = Reader::createFromPath($filePath, 'r');
        $csv->setHeaderOffset(0); // Set header row
        $records = $csv->getRecords();

        // Debug: Check if records exist
        foreach ($records as $record) {
            dump($record); // ✅ Check CSV row output

            if (empty($record['topic_bm']) || empty($record['title_bm']) || empty($record['content_bm'])) {
                $this->command->warn("Skipping row due to missing data.");
                continue;
            }

            DB::table('islamic_contents')->insert([
                'topic_bm' => $record['topic_bm'],
                'title_bm' => $record['title_bm'],
                'content_bm' => $record['content_bm'],
                'category_bm' => $record['category_bm'] ?? null,
                'topic_en' => $record['topic_en'],
                'title_en' => $record['title_en'],
                'content_en' => $record['content_en'],
                'category_en' => $record['category_en'] ?? null,
                'banner' => $record['banner'] ?? null,
                'media' => $record['media'] ?? null,
                'slug' => Str::slug($record['title_en']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Stop script execution to debug
        exit();
    }
}
