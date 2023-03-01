<?php

namespace App\Models\Customer;

use App\Models\Customer\Customer;
use App\Models\Configuration\Service;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CustomerType extends Model
{
    use HasFactory, LogsActivity;

    protected $table = 'customer_types';

    protected $fillable= [
        'cus_type_name','service_id','status'

    ];

    protected static $logAttributes = [
        'cus_type_name','service_id','status'
    ];

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id','id');
    }

     public function customer()
    {
        return $this->hasMany(Customer::class, 'customer_type_id');
    }

}