<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InstagramPost extends Model
{
    protected $fillable = [
        'image_url',
        'caption',
        'post_url',
        'likes',
        'is_featured',
        'sort_order',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'likes'       => 'integer',
        'sort_order'  => 'integer',
    ];
}
