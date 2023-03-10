<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable =
    [
        "title",
        "desc",
        "date",
    ];

    protected static $logAttributes =
    [
    "title",
    "desc",
    "date",
    ];
}