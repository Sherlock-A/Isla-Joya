<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->string('session_id', 36)->nullable()->after('id');
            $table->string('utm_source', 100)->nullable()->after('country');
            $table->string('utm_medium', 100)->nullable()->after('utm_source');
            $table->string('utm_campaign', 100)->nullable()->after('utm_medium');
            $table->enum('device_type', ['mobile', 'tablet', 'desktop'])->nullable()->after('utm_campaign');

            $table->index('session_id');
            $table->index('utm_source');
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropIndex(['session_id']);
            $table->dropIndex(['utm_source']);
            $table->dropColumn(['session_id', 'utm_source', 'utm_medium', 'utm_campaign', 'device_type']);
        });
    }
};
