<?php

namespace App\Models\Customer;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LandingStation extends Model
{
    use HasFactory, LogsActivity;

    protected $table = 'landing_stations';

    protected $fillable =["country_name","group_id"];

    protected static $logAttributes =["country_name","group_id"];

    public function landgroup(){

        return $this->belongsTo(Group::class,'group_id');
    }
}
