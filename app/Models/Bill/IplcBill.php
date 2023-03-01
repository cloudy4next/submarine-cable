<?php

namespace App\Models\Bill;


use App\Models\Customer\Group;
use App\Models\Customer\Customer;
use App\Models\Configuration\Service;
use App\Models\Customer\CustomerType;
use Illuminate\Database\Eloquent\Model;
use App\Models\Configuration\SubService;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class IplcBill extends Model
{
    use HasFactory, LogsActivity;

    protected $guarded = [];

    protected $table = 'iplc_bills';

     protected $fillable = [
        'service_id',
        'sub_service_id',
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
     protected static $logAttributes = [
        'service_id',
        'sub_service_id',
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
        return $this->belongsTo(Group::class, 'grp_zone_id')->withDefault(['group_name' => 'Not Found group_name']);
    }


    public function customers(){

        return $this->belongsTo(Customer::class,'customer_id')->withDefault(['com_name' => 'Not Found com_name']);
    }

    public function services(){

        return $this->belongsTo(Service::class,'service_id')->withDefault(['service' => 'Not Found service']);
    }

    public function custype()
    {
        return $this->belongsTo(CustomerType::class, 'cus_type_id')->withDefault(['cus_type_name' => 'Not Found
        cus_type_name']);
    }

    public function subservice()
    {
        return $this->belongsTo(SubService::class, 'sub_service_id')->withDefault(['sub_service_name' => 'Not Found
        sub_service_name']);
    }





}