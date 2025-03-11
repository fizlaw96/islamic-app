<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_journeys', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // User tracking
            $table->foreignId('lesson_id')->constrained()->onDelete('cascade'); // Lesson tracking
            $table->integer('score')->nullable(); // Store user score
            $table->boolean('completed')->default(false); // Track if the lesson is completed
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_journeys');
    }
};
