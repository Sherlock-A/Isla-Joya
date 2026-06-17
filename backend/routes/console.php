<?php

use App\Models\Event;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::call(function () {
    Event::where('created_at', '<', now()->subDays(90))->delete();
})->weekly()->name('purge-old-events');
