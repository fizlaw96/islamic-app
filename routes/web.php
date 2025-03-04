<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\IslamicContentController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Drawer Menu
Route::get('/history', function () {
    return Inertia::render('History');
})->name('history');


// Bottom Menu
Route::get('/favourite', function () {
    return Inertia::render('Favourite');
})->name('favourite');

Route::get('/settings', function () {
    return Inertia::render('Setting');
})->name('settings');

Route::get('/islamic-topics', [IslamicContentController::class, 'index']);
Route::get('/islamic-content/{slug}', [IslamicContentController::class, 'show'])->name('islamic-content.show');
Route::get('/topic/{id}', [IslamicContentController::class, 'listByTopic'])
    ->name('topic.show');

Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard'); // ✅ Correct path for Dashboard inside Admin folder
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
