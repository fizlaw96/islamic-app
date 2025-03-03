<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\IslamicContentController;
use App\Http\Controllers\ContentInteractionController;
use Inertia\Inertia;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/favorite', [ContentInteractionController::class, 'toggleFavorite']);
Route::post('/history', [ContentInteractionController::class, 'addToHistory']);
Route::get('/favorites', [ContentInteractionController::class, 'getFavorites']);
Route::get('/history', [ContentInteractionController::class, 'getHistory']);

// Fetch all Islamic content topics
Route::get('/islamic-contents', [IslamicContentController::class, 'index']);
