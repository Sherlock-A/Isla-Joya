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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('material');
            $table->decimal('price', 8, 2);
            $table->enum('category', ['rings', 'necklaces', 'bracelets', 'earrings']);
            $table->enum('badge', ['new', 'bestseller', 'limited'])->nullable();
            $table->decimal('rating', 3, 1)->default(0.0);
            $table->unsignedInteger('reviews')->default(0);
            $table->enum('tone', ['gold', 'rose', 'ivory', 'champagne', 'nude', 'noir'])->default('gold');
            $table->boolean('is_bestseller')->default(false);
            $table->boolean('is_new')->default(false);
            $table->boolean('is_active')->default(true);
            $table->json('images')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
