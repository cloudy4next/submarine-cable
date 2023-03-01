<?php

namespace App\Models\Customer;

use App\Models\DemandNote;
use App\Models\Customer\Customer;
use App\Models\Configuration\Service;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Invoice extends Model
{
    use HasFactory, LogsActivity;

    protected $table ='invoices';

    // public function customers(){

    //     return $this->belongsTo(Customer::class,'customer_id');
    // }


    public function services()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

    public function demand(){

        return $this->belongsTo(DemandNote::class,'demand_note_id');
    }

    public function customers(){

        return $this->belongsTo(Customer::class,'customer_id');
    }





}
