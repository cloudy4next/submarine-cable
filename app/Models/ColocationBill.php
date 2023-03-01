<?php

namespace App\Models;

use App\Models\Customer\Group;
use App\Models\Customer\Customer;
use App\Models\Configuration\Service;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ColocationBill extends Model
{
    use HasFactory, LogsActivity;

     protected $fillable = [
     'service_id',
     'cus_type_id',
     'grp_zone_id',
     'billing_month',
     'bill_process_date',
     'total_custonmer',
     'total_mrc',
     'total_mbc',
     'total_vat',
     'total_mrc_after_discount',
     'net_total',
     'total_adjust',
     'bill_creator'
     ];

     protected static $logAttributes =[
     'service_id',
     'cus_type_id',
     'grp_zone_id',
     'billing_month',
     'bill_process_date',
     'total_custonmer',
     'total_mrc',
     'total_mbc',
     'total_vat',
     'total_mrc_after_discount',
     'net_total',
     'total_adjust',
     'bill_creator'
     ];



     public function groups()
     {
     return $this->belongsTo(Group::class, 'grp_zone_id');
     }


     public function customers(){

     return $this->belongsTo(Customer::class,'customer_id');
     }

     public function services(){

     return $this->belongsTo(Service::class,'service_id');
     }


}