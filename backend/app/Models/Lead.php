<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Lead extends Model
{
    protected $fillable = [
        'name', 'email', 'business', 'country', 'phone', 'whatsapp',
        'monthly_orders', 'source', 'status', 'notes',
    ];

    public function scopeByStatus(Builder $query, string $status): Builder
    {
        return $query->where('status', $status);
    }

    public function scopeByCountry(Builder $query, string $country): Builder
    {
        return $query->where('country', $country);
    }
}
