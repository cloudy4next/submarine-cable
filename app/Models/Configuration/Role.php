<?php

namespace App\Models\Configuration;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'role_name'
    ];
    protected static $logAttributes = [
       'role_name'
    ];

    public function menus()
    {
        return $this->hasMany(Menu::class, 'role_id');
    }


}
