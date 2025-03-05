<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->string('title_bm');
            $table->string('title_en');
            $table->text('description_bm')->nullable();
            $table->text('description_en')->nullable();
            $table->integer('level');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('lessons');
    }
};
