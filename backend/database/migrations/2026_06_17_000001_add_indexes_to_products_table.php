<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->index('is_active');
            $table->index('is_bestseller');
            $table->index('is_new');
            $table->index('category');
            $table->index(['is_active', 'category']);
            $table->index(['is_active', 'is_bestseller']);
            $table->index(['is_active', 'is_new']);
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex(['is_active']);
            $table->dropIndex(['is_bestseller']);
            $table->dropIndex(['is_new']);
            $table->dropIndex(['category']);
            $table->dropIndex(['is_active', 'category']);
            $table->dropIndex(['is_active', 'is_bestseller']);
            $table->dropIndex(['is_active', 'is_new']);
        });
    }
};
