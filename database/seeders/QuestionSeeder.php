<?php
// php artisan db:seed --class=QuestionSeeder
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;
use App\Models\QuestionOption;
use League\Csv\Reader;
use Illuminate\Support\Facades\Storage;

class QuestionSeeder extends Seeder
{
    public function run()
    {
        $csv = Reader::createFromPath(storage_path('app/questions.csv'), 'r');
        $csv->setHeaderOffset(0);

        foreach ($csv as $record) {
            $question = Question::create([
                'lesson_id' => $record['lesson_id'],
                'question_text' => $record['question_text'],
                'type' => $record['type'],
            ]);

            foreach (['a', 'b', 'c', 'd'] as $option) {
                if (!empty($record[$option])) {
                    QuestionOption::create([
                        'question_id' => $question->id,
                        'option_text' => $record[$option],
                        'is_correct' => $record['correct_answer'] === $record[$option],
                    ]);
                }
            }
        }
    }
}
