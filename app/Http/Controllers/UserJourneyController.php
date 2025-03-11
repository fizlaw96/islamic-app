<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Lesson;
use App\Models\UserJourney;

class UserJourneyController extends Controller
{
    public function index()
    {
        if (!Auth::check()) {
            abort(403, 'Unauthorized action.');
        }

        $user = Auth::user();
        $lessons = Lesson::all();

        $progress = UserJourney::where('user_id', $user->id)->get()->keyBy('lesson_id');

        return Inertia::render('JourneyLoggedIn', [
            'user' => $user,
            'lessons' => $lessons,
            'progress' => $progress, // ✅ Pass progress data
        ]);
    }

    public function storeScore(Request $request)
    {
        try {
            // ✅ Validate Request
            $validated = $request->validate([
                'user_id' => 'required|integer|exists:users,id', // Ensure user_id exists in users table
                'lesson_id' => 'required|integer|exists:lessons,id', // Ensure lesson_id is valid
                'score' => 'required|integer|min:0|max:100', // Ensure score is between 0-100
            ]);

            // ✅ Check if user already has an entry for this lesson
            $journey = UserJourney::where('user_id', $validated['user_id'])
                ->where('lesson_id', $validated['lesson_id'])
                ->first();

            if ($journey) {
                // ✅ If the new score is higher, update it
                if ($validated['score'] > $journey->score) {
                    $journey->update([
                        'score' => $validated['score'],
                        'completed' => $validated['score'] >= 70,
                    ]);

                    return response()->json([
                        'message' => 'Score updated successfully',
                        'data' => $journey,
                    ], 200);
                } else {
                    return response()->json([
                        'message' => 'Score not updated because the new score is lower than the existing score.',
                        'data' => $journey,
                    ], 200);
                }
            } else {
                // ✅ If no previous entry exists, create a new one
                $journey = UserJourney::create([
                    'user_id' => $validated['user_id'],
                    'lesson_id' => $validated['lesson_id'],
                    'score' => $validated['score'],
                    'completed' => $validated['score'] >= 70,
                ]);

                return response()->json([
                    'message' => 'New score saved successfully',
                    'data' => $journey,
                ], 201);
            }
        } catch (\Exception $e) {
            // ✅ Log any errors for debugging
            \Log::error("Failed to save/update score: " . $e->getMessage());

            return response()->json([
                'error' => 'Something went wrong while saving the score.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }

    public function getUserProgress()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $progress = UserJourney::where('user_id', $user->id)->pluck('score', 'lesson_id');

        return response()->json($progress);
    }
}
