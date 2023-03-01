<?php

namespace App\Models\Configuration;

use Illuminate\Database\Eloquent\Model;
use App\Models\Configuration\SubService;
use App\Models\Configuration\GroupOrZone;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TariffCapacity extends Model
{
    use HasFactory, LogsActivity;

    protected $guarded = [];

    public function subservice(){
        return $this->belongsTo(SubService::class, 'sub_service_id');
    }

    public function zone()
    {
        return $this->hasMany(GroupOrZone::class, 'capacity_id');
    }
}
