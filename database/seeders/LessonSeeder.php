<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lesson;
use App\Models\Question;
use App\Models\QuestionOption;

class LessonSeeder extends Seeder {
    public function run() {
        // ✅ Create a Lesson (BM & EN) - Level 1
        $lesson1 = Lesson::create([
            'title_bm' => 'Pengenalan kepada Islam',
            'title_en' => 'Introduction to Islam',
            'description_bm' => 'Pemahaman asas mengenai Islam.',
            'description_en' => 'Basic understanding of Islam.',
            'level' => 1
        ]);

        // ✅ Create a Lesson (BM & EN) - Level 2
        $lesson2 = Lesson::create([
            'title_bm' => 'Asas dalam Ibadah',
            'title_en' => 'Fundamentals of Worship',
            'description_bm' => 'Memahami asas dalam ibadah Islam.',
            'description_en' => 'Understanding the fundamentals of Islamic worship.',
            'level' => 2
        ]);

        // ✅ Multiple Choice Question (MCQ) - Level 1
        $question1 = Question::create([
            'lesson_id' => $lesson1->id,
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

        // ✅ Binary Question - Level 1
        $question2 = Question::create([
            'lesson_id' => $lesson1->id,
            'question_type' => 'binary',
            'question_text_bm' => 'Adakah babi halal?',
            'question_text_en' => 'Is pork halal?',
            'level' => 1
        ]);

        QuestionOption::insert([
            ['question_id' => $question2->id, 'option_text_bm' => 'Ya', 'option_text_en' => 'Yes', 'is_correct' => false],
            ['question_id' => $question2->id, 'option_text_bm' => 'Tidak', 'option_text_en' => 'No', 'is_correct' => true],
        ]);

        // ✅ Ordered Question - Level 1
        $question3 = Question::create([
            'lesson_id' => $lesson1->id,
            'question_type' => 'ordered',
            'question_text_bm' => 'Susun langkah Wudu dengan betul.',
            'question_text_en' => 'Arrange the steps of Wudu correctly.',
            'level' => 1
        ]);

        QuestionOption::insert([
            ['question_id' => $question3->id, 'option_text_bm' => 'Basuh tangan', 'option_text_en' => 'Wash hands', 'is_correct' => true, 'order' => 1],
            ['question_id' => $question3->id, 'option_text_bm' => 'Berkumur', 'option_text_en' => 'Rinse mouth', 'is_correct' => true, 'order' => 2],
            ['question_id' => $question3->id, 'option_text_bm' => 'Basuh muka', 'option_text_en' => 'Wash face', 'is_correct' => true, 'order' => 3],
            ['question_id' => $question3->id, 'option_text_bm' => 'Basuh kaki', 'option_text_en' => 'Wash feet', 'is_correct' => true, 'order' => 4],
        ]);

        // ✅ Multiple Choice Question (MCQ) - Level 2
        $question4 = Question::create([
            'lesson_id' => $lesson2->id,
            'question_type' => 'mcq',
            'question_text_bm' => 'Surah manakah yang dikenali sebagai "Ummul Kitab"?',
            'question_text_en' => 'Which surah is known as the "Mother of the Quran"?',
            'level' => 2
        ]);

        QuestionOption::insert([
            ['question_id' => $question4->id, 'option_text_bm' => 'Al-Fatihah', 'option_text_en' => 'Al-Fatihah', 'is_correct' => true],
            ['question_id' => $question4->id, 'option_text_bm' => 'Al-Baqarah', 'option_text_en' => 'Al-Baqarah', 'is_correct' => false],
            ['question_id' => $question4->id, 'option_text_bm' => 'Al-Ikhlas', 'option_text_en' => 'Al-Ikhlas', 'is_correct' => false],
            ['question_id' => $question4->id, 'option_text_bm' => 'An-Nas', 'option_text_en' => 'An-Nas', 'is_correct' => false],
        ]);

        // ✅ Binary Question - Level 2
        $question5 = Question::create([
            'lesson_id' => $lesson2->id,
            'question_type' => 'binary',
            'question_text_bm' => 'Adakah wajib berpuasa di bulan Ramadan?',
            'question_text_en' => 'Is it compulsory to fast during Ramadan?',
            'level' => 2
        ]);

        QuestionOption::insert([
            ['question_id' => $question5->id, 'option_text_bm' => 'Ya', 'option_text_en' => 'Yes', 'is_correct' => true],
            ['question_id' => $question5->id, 'option_text_bm' => 'Tidak', 'option_text_en' => 'No', 'is_correct' => false],
        ]);

        // ✅ Ordered Question - Level 2
        $question6 = Question::create([
            'lesson_id' => $lesson2->id,
            'question_type' => 'ordered',
            'question_text_bm' => 'Susun langkah solat dengan betul.',
            'question_text_en' => 'Arrange the steps of Salat correctly.',
            'level' => 2
        ]);

        QuestionOption::insert([
            ['question_id' => $question6->id, 'option_text_bm' => 'Takbiratul Ihram', 'option_text_en' => 'Takbiratul Ihram', 'is_correct' => true, 'order' => 1],
            ['question_id' => $question6->id, 'option_text_bm' => 'Rukuk', 'option_text_en' => 'Ruku\'', 'is_correct' => true, 'order' => 2],
            ['question_id' => $question6->id, 'option_text_bm' => 'Sujud', 'option_text_en' => 'Sujud', 'is_correct' => true, 'order' => 3],
            ['question_id' => $question6->id, 'option_text_bm' => 'Salam', 'option_text_en' => 'Salam', 'is_correct' => true, 'order' => 4],
        ]);
    }
}
