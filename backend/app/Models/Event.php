<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Event extends Model
{
    protected $fillable = [
        'event', 'source', 'product_slug', 'product_name', 'page', 'country', 'ts',
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
