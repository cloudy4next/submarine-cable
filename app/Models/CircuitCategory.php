<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CircuitCategory extends Model
{
    use HasFactory, LogsActivity;

    protected $table = 'circuit_categories';

    public function circuitDemandnote()
    {
    return $this->hasMany(DemandNote::class , 'circuit_id');
    }
    public function demand_notes()
    {
    return $this->hasMany(DemandNote::class);
    }
}
