<?php

namespace App\Models\Configuration;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Service extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'service'
    ];

    protected static $logAttributes = [
         'service'
    ];

    public function sub_services()
    {
        return $this->hasMany(SubService::class, 'service_id');
    }


    public function subservices()
    {
        return $this->hasMany(SubService::class, 'service_id');
    }

    public function create_sub_service()
    {
        return $this->hasMany(SubService::class, 'service_id', 'id');
    }
}
