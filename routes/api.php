<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\IslamicContentController;
use App\Http\Controllers\ContentInteractionController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\UserProgressController;

use Inertia\Inertia;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//<--                              UUID                                           -->//
Route::post('/session-id', function (Request $request) {
    $sessionId = $request->input('session_id');

    // Store session ID in Laravel's session if needed
    session()->put('custom_session_id', $sessionId);

    return response()->json(['message' => 'Session ID set successfully', 'session_id' => $sessionId]);
});

// 📌 Get Session ID
Route::get('/session-id', function () {
    return response()->json(['session_id' => session()->getId()]);
});

//<--                              ContentInteractionController                                           -->//
// 📌 Toggle Favorite
Route::post('/favorite', [ContentInteractionController::class, 'toggleFavorite']);
// 📌 Get Favorites
Route::post('/favorites', [ContentInteractionController::class, 'getFavorites']);

// 📌 Save History
Route::post('/history', [ContentInteractionController::class, 'addToHistory']);
// 📌 Get History
Route::post('/history/list', [ContentInteractionController::class, 'getHistory']);
// 📌 Clear History Route
Route::post('/history/clear', [ContentInteractionController::class, 'clearHistory']);

//<--                              IslamicContentController                                           -->//
// Fetch all Islamic content topics
Route::get('/islamic-contents', [IslamicContentController::class, 'indexUser']);
Route::post('/islamic-contents/{id}/update-media', [IslamicContentController::class, 'updateMedia']);

//<--                              Journey                                           -->//
Route::get('/lessons', [LessonController::class, 'index']);
Route::get('/lessons/{id}', [LessonController::class, 'show']);

Route::get('/questions/{lesson_id}', [QuestionController::class, 'index']);
Route::post('/questions/{question_id}/answer', [QuestionController::class, 'submitAnswer']);

Route::post('/user/progress', [UserProgressController::class, 'getProgress']);
Route::post('/user/progress/update', [UserProgressController::class, 'updateProgress']);
