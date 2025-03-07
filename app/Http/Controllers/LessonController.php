<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonController extends Controller
{
    // ✅ Get all lessons
    public function index()
    {
        return response()->json(Lesson::all());
    }

    // ✅ Get single lesson
    public function show($id)
    {
        $lesson = Lesson::findOrFail($id);
        $questions = Question::where('lesson_id', $id)->with('options')->get();

        return Inertia::render('Journey/Lesson', [
            'lesson' => $lesson,
            'questions' => $questions,
        ]);
    }
}
