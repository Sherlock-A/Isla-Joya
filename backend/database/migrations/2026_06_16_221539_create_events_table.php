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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('event');
            $table->string('source')->nullable();
            $table->string('product_slug')->nullable();
            $table->string('product_name')->nullable();
            $table->string('page')->nullable();
            $table->string('country')->nullable();
            $table->bigInteger('ts')->nullable();
            $table->timestamps();

            $table->index('event');
            $table->index('product_slug');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
