<?php
// Run with: php artisan db:seed --class=LessonSeeder

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use League\Csv\Reader;
use Illuminate\Support\Str;
use Carbon\Carbon;

class LessonSeeder extends Seeder {
    public function run()
    {
        $this->command->info('📥 Starting LessonSeeder...');

        // ✅ Seed Lessons and store inserted IDs
        $lessonIds = $this->seedLessons();

        // ✅ Seed Questions and store inserted IDs
        $questionIds = $this->seedQuestions($lessonIds);

        // ✅ Seed Question Options
        $this->seedQuestionOptions($questionIds);

        $this->command->info('✅ All CSV data imported successfully!');
    }

    /**
     * Seed lessons from CSV file
     */
    private function seedLessons()
    {
        $filePath = base_path('public/storage/assets/csv/Lesson.csv');

        if (!file_exists($filePath)) {
            $this->command->error("❌ Lessons CSV file not found: $filePath");
            return [];
        }

        $csv = Reader::createFromPath($filePath, 'r');
        $csv->setHeaderOffset(0);
        $records = $csv->getRecords();

        $lessonIds = [];

        foreach ($records as $record) {
            if (empty($record['lesson_id']) || empty($record['title_bm']) || empty($record['title_en'])) {
                $this->command->warn("⚠️ Skipping lesson: Missing required fields.");
                continue;
            }

            $lessonId = DB::table('lessons')->insertGetId([
                'id'            => $record['lesson_id'],
                'title_bm'      => $record['title_bm'],
                'title_en'      => $record['title_en'],
                'description_bm'=> $record['description_bm'] ?? null,
                'description_en'=> $record['description_en'] ?? null,
                'level'         => $record['level'] ?? 1,
                'created_at'    => Carbon::now(),
                'updated_at'    => Carbon::now(),
            ]);

            $lessonIds[$record['lesson_id']] = $lessonId;
        }

        $this->command->info('✅ Lessons seeded successfully!');
        return $lessonIds;
    }

    /**
     * Seed questions from CSV file
     */
    private function seedQuestions($lessonIds)
    {
        $filePath = base_path('public/storage/assets/csv/Question.csv');

        if (!file_exists($filePath)) {
            $this->command->error("❌ Questions CSV file not found: $filePath");
            return [];
        }

        $csv = Reader::createFromPath($filePath, 'r');
        $csv->setHeaderOffset(0);
        $records = $csv->getRecords();

        $questionIds = [];

        foreach ($records as $record) {
            if (empty($record['question_id']) || empty($record['lesson_id']) || empty($record['question_text_bm']) || empty($record['question_text_en'])) {
                $this->command->warn("⚠️ Skipping question: Missing required fields.");
                continue;
            }

            if (!isset($lessonIds[$record['lesson_id']])) {
                $this->command->warn("⚠️ Skipping question: Lesson ID {$record['lesson_id']} not found.");
                continue;
            }

            $questionId = DB::table('questions')->insertGetId([
                'id'             => $record['question_id'],
                'lesson_id'      => $lessonIds[$record['lesson_id']],
                'question_type'  => $record['question_type'] ?? 'mcq',
                'question_text_bm'=> $record['question_text_bm'],
                'question_text_en'=> $record['question_text_en'],
                'level'          => $record['level'] ?? 1,
                'created_at'     => Carbon::now(),
                'updated_at'     => Carbon::now(),
            ]);

            $questionIds[$record['question_id']] = $questionId;
        }

        $this->command->info('✅ Questions seeded successfully!');
        return $questionIds;
    }

    /**
     * Seed question options from CSV file
     */
    private function seedQuestionOptions($questionIds)
    {
        $filePath = base_path('public/storage/assets/csv/QuestionOption.csv');

        if (!file_exists($filePath)) {
            $this->command->error("❌ Question Options CSV file not found: $filePath");
            return;
        }

        $csv = Reader::createFromPath($filePath, 'r');
        $csv->setHeaderOffset(0);
        $records = $csv->getRecords();

        foreach ($records as $record) {
            if (empty($record['option_id']) || empty($record['question_id']) || empty($record['option_text_bm']) || empty($record['option_text_en'])) {
                $this->command->warn("⚠️ Skipping option: Missing required fields.");
                continue;
            }

            if (!isset($questionIds[$record['question_id']])) {
                $this->command->warn("⚠️ Skipping option: Question ID {$record['question_id']} not found.");
                continue;
            }

            DB::table('question_options')->insert([
                'id'             => $record['option_id'],
                'question_id'    => $questionIds[$record['question_id']],
                'option_text_bm' => $record['option_text_bm'],
                'option_text_en' => $record['option_text_en'],
                'is_correct'     => ($record['is_correct'] === "NULL" || $record['is_correct'] === "") ? null : $record['is_correct'],
                'order'          => (isset($record['order']) && trim($record['order']) !== '' && $record['order'] !== "NULL") ? (int)$record['order'] : null,
                'created_at'     => Carbon::now(),
                'updated_at'     => Carbon::now(),
            ]);
        }

        $this->command->info('✅ Question Options seeded successfully!');
    }
}
