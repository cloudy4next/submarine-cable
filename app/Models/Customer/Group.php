<?php

namespace App\Models\Customer;

use App\Models\Configuration\Service;
use Illuminate\Database\Eloquent\Model;
use App\Models\Configuration\SubService;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Group extends Model
{
    use HasFactory, LogsActivity;

    protected $table ='groups';

    public function services()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

    public function subservice()
    {
        return $this->belongsTo(SubService::class, 'sub_service_id')->withDefault(['sub_service_name' => 'Not Found
        Sub service']);
    }

}
