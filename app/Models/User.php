<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Models\Permission;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use LaravelAndVueJS\Traits\LaravelPermissionToVueJS;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

// Spatie package

// use Spatie\Permission\Models\Permission;

class User extends Authenticatable
{

    use LaravelPermissionToVueJS;

    use HasApiTokens, HasFactory, Notifiable, HasRoles, LogsActivity;

    // Spatie package
    // use HasRoles;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'type',
        'designation',
        'password'
    ];

    protected static $logAttributes = [
        'name',
        'email',
        'phone',
        'address',
        'type',
        'designation',
        'password'
    ];

    // public function setPasswordAttribute($value)
    // {
    //     $this->attributes['password'] = Hash::make($value);
    // }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function jsPermissions()
    {
        return json_encode([
                'roles' => $this->getRoleNames(),
                'permissions' => $this->getAllPermissions()->pluck('name'),
            ]);
    }

    // public function getAllPermissionsAttribute() {
    //     return Auth::user()->$this->getAllPermissions()->pluck('name');
    // }

    // public function getAllPermissionsAttribute()
    // {
    //     return $this->getAllPermissions();
    // }

     /**
     * Get all user permissions in a flat array.
     *
     * @return array
     */
    // public function getCanAttribute()
    // {
    //     $permissions = [];
    //     foreach (Permission::all() as $permission) {
    //         if (Auth::user()->can($permission->name)) {
    //             $permissions[$permission->name] = true;
    //         } else {
    //             $permissions[$permission->name] = false;
    //         }
    //     }
    //     return $permissions;
    // }

    // public function getAllPermissionsAttribute() {
    //     $permissions = [];
    //       foreach (Permission::all() as $permission) {
    //         if (Auth::user()->can($permission->name)) {
    //           $permissions[] = $permission->name;
    //         }
    //       }
    //       return $permissions;
    //   }


      public function getAllPermissionsAttribute()
      {
          return Auth::user()->getAllPermissions()->pluck('name');
      }


    //   public function role()
    //   {
    //       return $this->belongsTo(Role::class, 'role_id');
    //   }




    // protected $appends = ['all_permissions','can'];





}
