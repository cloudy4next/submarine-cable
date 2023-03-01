<?php

namespace App\Models\Customer;

use App\Models\Customer\CustomerType;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    use HasFactory, LogsActivity;
    protected $guarded = [];

    protected $table = 'customers';

    protected $fillable = [
        'com_name',
        'name',
        'customer_type_id',
        'email',
        'phone',
        'bin_vat_etc',
        'tin',
        'address',
    ];

    protected static $logAttributes = [
        'com_name',
        'name',
        'customer_type_id',
        'email',
        'phone',
        'bin_vat_etc',
        'tin',
        'address',
    ];


     public function custype()
    {
        return $this->belongsTo(CustomerType::class, 'customer_type_id');
    }


}