<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Contracts\Permission;
// Spatie package
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Facades\Auth;


class PermissionController extends Controller
{

    function check($permissionName) {
        if (! Auth::user()->hasPermissionTo($permissionName)) {
             abort(403);
        }
        return response('', 204);
     }

}
