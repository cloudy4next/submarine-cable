<?php

use App\Http\Controllers\Configuration\RoleController;
use App\Http\Controllers\Configuration\RolePermissionController;
use App\Http\Controllers\PermissionController;
use Illuminate\Support\Facades\Route;

 Route::get("/get-permissions",[RoleController::class,'getPermissions'])->name('get.permissions');
 Route::post("/store-role",[RoleController::class,'storeRole'])->name('user.store.Role');
 Route::get("/get-role-list",[RoleController::class,'getRoles'])->name('get.role.list');
 Route::post('/role-Delete', [RoleController::class, 'roleDelete'])->name('role.permission.roleDelete');