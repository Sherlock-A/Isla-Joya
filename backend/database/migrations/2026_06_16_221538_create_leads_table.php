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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('business')->nullable();
            $table->string('country')->nullable();
            $table->string('phone');
            $table->string('whatsapp')->nullable();
            $table->string('monthly_orders')->nullable();
            $table->string('source')->default('wholesale');
            $table->enum('status', ['new', 'contacted', 'converted'])->default('new');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
