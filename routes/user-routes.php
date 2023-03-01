<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;



Route::get('/get-user-list', [UserController::class, 'index'])->name('user.list');
Route::get('/get-event-list', [UserController::class, 'eventList'])->name('event.list');
//Route::get('/get-customers', [CustomerController::class, 'getCustomers'])->name('customers.list');
Route::get('/system-user-list', [UserController::class, 'system_user'])->name('system.user.list');