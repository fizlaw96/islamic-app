<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\QuestionOption;

class QuestionController extends Controller
{
    // ✅ Get all questions for a lesson
    public function index($lesson_id)
    {
        $questions = Question::where('lesson_id', $lesson_id)->with('options')->get();
        return response()->json($questions);
    }

    // ✅ Submit an answer
    public function submitAnswer(Request $request, $question_id)
    {
        $request->validate(['answer' => 'required|string']);

        $question = Question::findOrFail($question_id);
        $correctOption = QuestionOption::where('question_id', $question_id)
            ->where('is_correct', true)
            ->pluck('option_text')
            ->toArray();

        if (in_array($request->answer, $correctOption)) {
            return response()->json(['correct' => true, 'message' => 'Correct answer!']);
        } else {
            return response()->json(['correct' => false, 'message' => 'Wrong answer, try again.']);
        }
    }
}
