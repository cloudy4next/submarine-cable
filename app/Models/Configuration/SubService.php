<?php

namespace App\Models\Configuration;

use App\Models\Customer\Group;
use App\Models\Configuration\Service;
use Illuminate\Database\Eloquent\Model;
use App\Models\Configuration\GroupOrZone;
use Spatie\Activitylog\Traits\LogsActivity;
use App\Models\Configuration\TariffCapacity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SubService extends Model
{
    use HasFactory, LogsActivity;

    protected $guarded = [];

    public function service(){
        return $this->belongsTo(Service::class,'service_id');
    }

    public function capacity()
    {
        return $this->hasMany(TariffCapacity::class, 'sub_service_id');
    }

    public function zone()
    {
        return $this->hasMany(GroupOrZone::class, 'sub_service_id');
    }


    public function create_capacity()
    {
        return $this->hasMany(TariffCapacity::class, 'sub_service_id');
    }
}
