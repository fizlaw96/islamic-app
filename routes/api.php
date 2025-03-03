<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/favorite', [ContentInteractionController::class, 'toggleFavorite']);
Route::post('/history', [ContentInteractionController::class, 'addToHistory']);
Route::get('/favorites', [ContentInteractionController::class, 'getFavorites']);
Route::get('/history', [ContentInteractionController::class, 'getHistory']);
