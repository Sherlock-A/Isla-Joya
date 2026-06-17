<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClickHeatmap extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'page', 'x_pct', 'y_pct', 'viewport_w', 'element', 'session_id',
    ];

    protected $casts = [
        'x_pct'      => 'decimal:2',
        'y_pct'      => 'decimal:2',
        'created_at' => 'datetime',
    ];

    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;
}
