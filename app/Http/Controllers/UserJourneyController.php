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
use App\Models\Streak;

class UserJourneyController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();

        // ✅ Fetch all lessons count for progress calculation
        $totalLessons = Lesson::count();

        // ✅ Fetch completed lesson IDs
        $completedLessonIds = UserJourney::where('user_id', $user->id)
            ->where('completed', true)
            ->pluck('lesson_id');

        // ✅ Count completed lessons
        $completedLessons = $completedLessonIds->count();

        // ✅ Fetch last 3 completed lessons with lesson details
        $latestLessons = UserJourney::where('user_id', $user->id)
            ->where('completed', true)
            ->with('lesson:id,title_bm') // ✅ Use `title_bm`
            ->orderBy('updated_at', 'desc')
            ->take(3)
            ->get();

        // ✅ Find the next lesson to unlock
        $nextLesson = Lesson::whereNotIn('id', $completedLessonIds)->first();

        return Inertia::render('Admin/Dashboard', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'profile_image' => $user->profile_image ?? 'storage/assets/avatars/avatar.png',
            ],
            'totalLessons' => $totalLessons,
            'completedLessonIds' => $completedLessonIds->toArray(),
            'completedLessons' => $completedLessons,
            'latestLessons' => $latestLessons,
            'nextLesson' => $nextLesson,
        ]);
    }


    public function getStreak(Request $request)
    {
        $userId = $request->user_id; // ✅ Get user_id from request

        if (!$userId) {
            return response()->json(['error' => 'Invalid user ID'], 400);
        }

        // ✅ Find the user's streak record
        $streak = Streak::where('user_id', $userId)->first();

        if (!$streak) {
            return response()->json(['streak' => 0]); // ✅ Default to 0 if streak does not exist
        }

        // ✅ If last_completed_date is NULL (first-time), return 0
        if (is_null($streak->last_completed_date)) {
            return response()->json(['streak' => 0]);
        }

        // ✅ Check if user skipped a day
        $lastCompleted = \Carbon\Carbon::parse($streak->last_completed_date);
        $daysDifference = $lastCompleted->diffInDays(now());

        if ($daysDifference > 1) {
            // ✅ Reset streak to 0 if user skipped a day
            $streak->streak_count = 0;
            $streak->save();
        }

        return response()->json(['streak' => $streak->streak_count]);
    }

    public function updateStreak(Request $request)
    {
        // ✅ Validate `user_id`
        $userId = $request->user_id;

        if (!$userId) {
            return response()->json(['error' => 'Invalid user ID'], 400);
        }

        // ✅ Get today's date
        $today = now()->toDateString();

        // ✅ Find the existing streak record for the user
        $streak = Streak::where('user_id', $userId)->first();

        // ✅ If streak record does not exist, return an error
        if (!$streak) {
            return response()->json(['error' => 'Streak record not found'], 404);
        }

        // ✅ If the last completed date is today, do nothing (prevent double count)
        if ($streak->last_completed_date === $today) {
            return response()->json([
                'message' => 'Streak already updated today',
                'streak' => $streak->streak_count
            ]);
        }

        // ✅ If last_completed_date is NULL (first-time update), start streak
        if (is_null($streak->last_completed_date)) {
            $streak->streak_count = 1;
        } else {
            // ✅ Calculate the difference in days
            $lastCompleted = \Carbon\Carbon::parse($streak->last_completed_date);
            $daysDifference = $lastCompleted->diffInDays(now());

            if ($daysDifference === 1) {
                // ✅ If the last update was yesterday, increase streak
                $streak->streak_count += 1;
            } else {
                // ✅ If the user skipped a day, reset streak to 1
                $streak->streak_count = 1;
            }
        }

        // ✅ Update last completed date
        $streak->last_completed_date = $today;
        $streak->save();

        return response()->json([
            'message' => 'Streak updated successfully',
            'streak' => $streak->streak_count
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
        $user = User::findOrFail($request->user_id);

        // ✅ Delete old image if exists and is not the default avatar
        if ($user->profile_image && strpos($user->profile_image, 'default_avatar.png') === false) {
            $oldImagePath = str_replace('/storage/', '', $user->profile_image); // ✅ Remove /storage/ from path
            Storage::disk('public')->delete($oldImagePath);
        }

        // ✅ Store new image
        $file = $request->file('profile_image');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('profile_images', $fileName, 'public');

        // ✅ Update user profile image path correctly
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
        $lessons = Lesson::orderBy('level')->orderBy('id')->get(); // ✅ Order lessons by level
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
