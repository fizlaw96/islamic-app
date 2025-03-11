<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

use App\Models\Lesson;
use App\Models\UserJourney;
use App\Models\User;

class UserJourneyController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();

        // ✅ Count completed lessons
        $completedLessons = UserJourney::where('user_id', $user->id)
            ->where('completed', true)
            ->count();

        // ✅ Fetch last 3 completed lessons
        $latestLessons = UserJourney::where('user_id', $user->id)
            ->with('lesson')
            ->where('completed', true)
            ->orderBy('updated_at', 'desc')
            ->take(3)
            ->get();

        // ✅ Find the next lesson to unlock
        $nextLesson = Lesson::whereNotIn('id', function ($query) use ($user) {
            $query->select('lesson_id')->from('user_journeys')->where('user_id', $user->id);
        })->first();

        // ✅ Calculate Streak
        $streak = 0;
        $today = Carbon::today();
        $dates = UserJourney::where('user_id', $user->id)
            ->where('completed', true)
            ->pluck('updated_at')
            ->map(fn ($date) => Carbon::parse($date)->toDateString()) // Convert timestamps to (Y-m-d)
            ->sortDesc();

        foreach ($dates as $index => $date) {
            if ($index === 0 && $date === $today->toDateString()) {
                $streak = 1;
            } elseif ($index > 0 && Carbon::parse($dates[$index - 1])->diffInDays($date) === 1) {
                $streak++;
            } else {
                break;
            }
        }

        return Inertia::render('Admin/Dashboard', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'profile_image' => $user->profile_image ?? '/assets/avatars/avatar.png', // ✅ Default Avatar
            ],
            'completedLessons' => $completedLessons,
            'latestLessons' => $latestLessons,
            'nextLesson' => $nextLesson,
            'streak' => $streak
        ]);
    }

    public function updateProfileImage(Request $request)
    {
        // Validate request
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Get user by user_id
        $user = User::find($request->user_id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Delete old image if exists
        if ($user->profile_image) {
            $oldImagePath = str_replace('/storage/', '', $user->profile_image);
            Storage::disk('public')->delete($oldImagePath);
        }

        // Store new image
        $file = $request->file('profile_image');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('profile_images', $fileName, 'public');

        // Update user profile image path
        $user->profile_image = "/storage/" . $filePath;
        $user->save();

        return response()->json([
            'message' => 'Profile image updated successfully',
            'profile_image' => $user->profile_image
        ]);
    }

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
