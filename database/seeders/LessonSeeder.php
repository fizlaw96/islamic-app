<?php
// Run with: php artisan db:seed --class=LessonSeeder
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lesson;
use App\Models\Question;
use App\Models\QuestionOption;

class LessonSeeder extends Seeder {
    public function run() {
        // ✅ Create a Lesson (BM & EN)
        $lesson = Lesson::create([
            'title_bm' => 'Pengenalan kepada Islam',
            'title_en' => 'Introduction to Islam',
            'description_bm' => 'Pemahaman asas mengenai Islam.',
            'description_en' => 'Basic understanding of Islam.',
            'level' => 1
        ]);

        // ✅ Multiple Choice Question (MCQ)
        $question1 = Question::create([
            'lesson_id' => $lesson->id,
            'question_type' => 'mcq',
            'question_text_bm' => 'Apakah rukun Islam yang pertama?',
            'question_text_en' => 'What is the first pillar of Islam?',
            'level' => 1
        ]);

        QuestionOption::insert([
            ['question_id' => $question1->id, 'option_text_bm' => 'Syahadah', 'option_text_en' => 'Shahada', 'is_correct' => true],
            ['question_id' => $question1->id, 'option_text_bm' => 'Zakat', 'option_text_en' => 'Zakat', 'is_correct' => false],
            ['question_id' => $question1->id, 'option_text_bm' => 'Haji', 'option_text_en' => 'Hajj', 'is_correct' => false],
            ['question_id' => $question1->id, 'option_text_bm' => 'Sawm', 'option_text_en' => 'Sawm (Fasting)', 'is_correct' => false],
        ]);

        // ✅ Binary Question (Yes/No, Halal/Haram)
        $question2 = Question::create([
            'lesson_id' => $lesson->id,
            'question_type' => 'binary',
            'question_text_bm' => 'Adakah babi halal?',
            'question_text_en' => 'Is pork halal?',
            'level' => 1
        ]);

        QuestionOption::insert([
            ['question_id' => $question2->id, 'option_text_bm' => 'Ya', 'option_text_en' => 'Yes', 'is_correct' => false],
            ['question_id' => $question2->id, 'option_text_bm' => 'Tidak', 'option_text_en' => 'No', 'is_correct' => true],
        ]);

        // ✅ Ordered Question (Rearrange the steps)
        $question3 = Question::create([
            'lesson_id' => $lesson->id,
            'question_type' => 'ordered',
            'question_text_bm' => 'Susun langkah Wudu dengan betul.',
            'question_text_en' => 'Arrange the steps of Wudu correctly.',
            'level' => 2
        ]);

        QuestionOption::insert([
            ['question_id' => $question3->id, 'option_text_bm' => 'Basuh tangan', 'option_text_en' => 'Wash hands', 'is_correct' => true, 'order' => 1],
            ['question_id' => $question3->id, 'option_text_bm' => 'Berkumur', 'option_text_en' => 'Rinse mouth', 'is_correct' => true, 'order' => 2],
            ['question_id' => $question3->id, 'option_text_bm' => 'Basuh muka', 'option_text_en' => 'Wash face', 'is_correct' => true, 'order' => 3],
            ['question_id' => $question3->id, 'option_text_bm' => 'Basuh kaki', 'option_text_en' => 'Wash feet', 'is_correct' => true, 'order' => 4],
        ]);

        // ✅ Another Multiple Choice Question (MCQ)
        $question4 = Question::create([
            'lesson_id' => $lesson->id,
            'question_type' => 'mcq',
            'question_text_bm' => 'Berapa kali kita solat dalam sehari?',
            'question_text_en' => 'How many times do we pray in a day?',
            'level' => 1
        ]);

        QuestionOption::insert([
            ['question_id' => $question4->id, 'option_text_bm' => '3 kali', 'option_text_en' => '3 times', 'is_correct' => false],
            ['question_id' => $question4->id, 'option_text_bm' => '5 kali', 'option_text_en' => '5 times', 'is_correct' => true],
            ['question_id' => $question4->id, 'option_text_bm' => '7 kali', 'option_text_en' => '7 times', 'is_correct' => false],
            ['question_id' => $question4->id, 'option_text_bm' => '10 kali', 'option_text_en' => '10 times', 'is_correct' => false],
        ]);
    }
}
