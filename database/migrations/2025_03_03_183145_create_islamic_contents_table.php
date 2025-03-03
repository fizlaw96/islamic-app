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
        Schema::create('islamic_contents', function (Blueprint $table) {
            $table->id();
            $table->string('topic_bm');
            $table->string('title_bm');
            $table->text('content_bm');
            $table->string('category_bm')->nullable();
            $table->string('topic_en');
            $table->string('title_en');
            $table->text('content_en');
            $table->string('category_en')->nullable();
            $table->string('banner')->nullable();
            $table->string('media')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('islamic_contents');
    }
};
