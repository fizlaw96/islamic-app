<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\IslamicContentController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\UserJourneyController;

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
Route::get('/journey', function () {
    return Inertia::render('Journey');
})->name('journey');

Route::get('/lesson/{id}', [LessonController::class, 'show'])->name('lesson.show');
Route::get('/lesson-complete', function () {
    return Inertia::render('Journey/LessonComplete', [
        'score' => request('score'), // Get score from query string
        'total' => request('total'), // Get total questions from query string
    ]);
});

Route::get('/favourite', function () {
    return Inertia::render('Favourite');
})->name('favourite');

Route::get('/settings', function () {
    return Inertia::render('Setting');
})->name('settings');

Route::get('/islamic-topics', [IslamicContentController::class, 'indexUser']);
Route::get('/islamic-content/{slug}', [IslamicContentController::class, 'showUser'])->name('islamic-content.show');
Route::get('/topic/{id}', [IslamicContentController::class, 'listByTopic'])
    ->name('topic.show');

// ✅ Corrected Paths (No extra "Pages/")
Route::get('/special/{event}', function ($event) {
    // Capitalize first letter to match folder structure
    $event = ucfirst(str_replace('-', '', $event));

    return Inertia::render("SpecialButton/{$event}");
})->name('special.event');

// Login
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard'); // Accessible to all authenticated users
    })->name('dashboard');

    Route::get('/journey-loggedin', [UserJourneyController::class, 'index'])->name('journey.loggedin');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['role:admin'])->group(function () {
    Route::get('/admin/islamic-contents', [IslamicContentController::class, 'index'])->name('admin.islamic-contents.index');
    Route::get('/islamic-contents/create', [IslamicContentController::class, 'create'])->name('admin.islamic-contents.create');
    Route::post('/islamic-contents', [IslamicContentController::class, 'store'])->name('admin.islamic-contents.store');
    Route::get('/islamic-contents/{id}/edit', [IslamicContentController::class, 'edit'])->name('admin.islamic-contents.edit');
    Route::put('/islamic-contents/{id}', [IslamicContentController::class, 'update'])->name('admin.islamic-contents.update');
    Route::delete('/islamic-contents/{id}', [IslamicContentController::class, 'destroy'])->name('admin.islamic-contents.destroy');
    Route::get('/islamic-contents/{id}', [IslamicContentController::class, 'show'])->name('admin.islamic-contents.show');
});

require __DIR__.'/auth.php';
