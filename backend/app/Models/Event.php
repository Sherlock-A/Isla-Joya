<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Event extends Model
{
    protected $fillable = [
        'event', 'session_id', 'source', 'product_slug', 'product_name',
        'page', 'country', 'ts', 'utm_source', 'utm_medium', 'utm_campaign', 'device_type',
    ];

    public function scopeByEvent(Builder $query, string $event): Builder
    {
        return $query->where('event', $event);
    }

    public function scopeRecent(Builder $query, int $days = 30): Builder
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }
}
