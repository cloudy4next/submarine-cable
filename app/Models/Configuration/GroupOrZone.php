<?php

namespace App\Models\Configuration;

use App\Models\Customer\Group;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GroupOrZone extends Model
{
    use HasFactory, LogsActivity;

    protected $guarded = [];
    protected $table = 'group_or_zones';

    public function sub_services()
    {
        return $this->hasMany(SubService::class, 'sub_service_id', 'id');
    }

    public function zone_list()
    {
        return $this->hasMany(TariffCapacity::class, 'capacity_id', 'id');
    }

    public function groups()
    {
        return $this->belongsTo(Group::class, 'grp_or_zone','id')->withDefault(['group_name' => 'Not Found
        Group Name',]);
    }
}
