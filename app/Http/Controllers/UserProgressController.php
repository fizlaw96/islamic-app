<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class UserProgressController extends Controller
{
    // ✅ Get user progress using UUID from frontend
    public function getProgress(Request $request)
    {
        $request->validate([
            'session_id' => 'required|string'
        ]);

        $progress = Cache::get("user_progress_{$request->session_id}", []);

        return response()->json(['progress' => $progress]);
    }

    // ✅ Update progress for guest users
    public function updateProgress(Request $request)
    {
        $request->validate([
            'session_id' => 'required|string',
            'lesson_id' => 'required|integer',
            'question_id' => 'required|integer',
        ]);

        $progressKey = "user_progress_{$request->session_id}";
        $progress = Cache::get($progressKey, []);

        if (!in_array($request->question_id, $progress)) {
            $progress[] = $request->question_id;
            Cache::put($progressKey, $progress, now()->addDays(30)); // ✅ Store progress for 30 days
        }

        return response()->json(['message' => 'Progress updated', 'progress' => $progress]);
    }
}
