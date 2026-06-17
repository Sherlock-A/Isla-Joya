<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'slug', 'name', 'material', 'description', 'price', 'category', 'badge',
        'rating', 'reviews', 'tone', 'is_bestseller', 'is_new', 'is_active', 'images',
    ];

    protected $casts = [
        'price'         => 'decimal:2',
        'rating'        => 'decimal:1',
        'is_bestseller' => 'boolean',
        'is_new'        => 'boolean',
        'is_active'     => 'boolean',
        'images'        => 'array',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeBestsellers(Builder $query): Builder
    {
        return $query->where('is_bestseller', true);
    }

    public function scopeNewArrivals(Builder $query): Builder
    {
        return $query->where('is_new', true);
    }

    public function scopeByCategory(Builder $query, string $category): Builder
    {
        return $query->where('category', $category);
    }
}
