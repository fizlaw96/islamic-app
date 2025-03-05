<?php
//       php artisan db:seed --class=LessonSeeder
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lesson;
use App\Models\Question;
use App\Models\QuestionOption;

class LessonSeeder extends Seeder {
    public function run() {
        // ✅ Create a Lesson
        $lesson = Lesson::create([
            'title' => 'Introduction to Islam',
            'description' => 'Basic understanding of Islam.',
            'level' => 1
        ]);

        // ✅ Create Multiple Choice Question
        $question1 = Question::create([
            'lesson_id' => $lesson->id,
            'question_type' => 'mcq',
            'question_text' => 'What is the first pillar of Islam?',
            'level' => 1
        ]);

        QuestionOption::insert([
            ['question_id' => $question1->id, 'option_text' => 'Shahada', 'is_correct' => true],
            ['question_id' => $question1->id, 'option_text' => 'Zakat', 'is_correct' => false],
            ['question_id' => $question1->id, 'option_text' => 'Hajj', 'is_correct' => false],
            ['question_id' => $question1->id, 'option_text' => 'Sawm', 'is_correct' => false],
        ]);

        // ✅ Create Binary Question
        $question2 = Question::create([
            'lesson_id' => $lesson->id,
            'question_type' => 'binary',
            'question_text' => 'Is pork halal?',
            'level' => 1
        ]);

        QuestionOption::insert([
            ['question_id' => $question2->id, 'option_text' => 'Yes', 'is_correct' => false],
            ['question_id' => $question2->id, 'option_text' => 'No', 'is_correct' => true],
        ]);

        // ✅ Create Ordered Question
        $question3 = Question::create([
            'lesson_id' => $lesson->id,
            'question_type' => 'ordered',
            'question_text' => 'Arrange the steps of Wudu correctly.',
            'level' => 2
        ]);

        QuestionOption::insert([
            ['question_id' => $question3->id, 'option_text' => 'Wash hands', 'is_correct' => true, 'order' => 1],
            ['question_id' => $question3->id, 'option_text' => 'Rinse mouth', 'is_correct' => true, 'order' => 2],
            ['question_id' => $question3->id, 'option_text' => 'Wash face', 'is_correct' => true, 'order' => 3],
        ]);
    }
}
