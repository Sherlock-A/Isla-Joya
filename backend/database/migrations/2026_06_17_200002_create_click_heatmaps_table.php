<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('click_heatmaps', function (Blueprint $table) {
            $table->id();
            $table->string('page');
            $table->decimal('x_pct', 5, 2);
            $table->decimal('y_pct', 5, 2);
            $table->smallInteger('viewport_w')->unsigned()->nullable();
            $table->string('element', 120)->nullable();
            $table->string('session_id', 36)->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->index('page');
            $table->index('session_id');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('click_heatmaps');
    }
};
