<?php

namespace App\Models;

use App\Models\Customer\Group;
use App\Models\CircuitCategory;
use App\Models\Customer\Customer;
use App\Models\Configuration\Service;
use Illuminate\Database\Eloquent\Model;
use App\Models\Configuration\SubService;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ColocationBillAdjustment extends Model
{
    use HasFactory, LogsActivity;
     protected $guarded = [];


      public function customers()
      {
      return $this->belongsTo(Customer::class , 'customer_id');
      }

      public function services()
      {
      return $this->belongsTo(Service::class , 'service_id');
      }

      public function subservice()
      {
      return $this->belongsTo(SubService::class , 'sub_service_id');
      }



      public function circuit()
      {
      return $this->belongsTo(CircuitCategory::class , 'circuit_id');
      }


      public function groups()
      {
      return $this->belongsTo(Group::class , 'group_id')
      ->withDefault(['group_name' => 'Not Find a Group']);
      }
}
