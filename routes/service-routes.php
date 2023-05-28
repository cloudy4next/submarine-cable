<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Configuration\ServiceController;


Route::get('/service-list', [ServiceController::class, 'index'])->name('service.list');
Route::get('/get-service-list', [ServiceController::class, 'get_service'])->name('get.service.list');
Route::post('/get-sub-service-list', [ServiceController::class, 'get_sub_service'])->name('get.sub.service.list');
Route::post('/get-capacity-list', [ServiceController::class, 'get_capacity'])->name('get.capacity.list');
Route::post('/service-store', [ServiceController::class, 'store'])->name('service.store');
Route::post('/sub-service-store', [ServiceController::class, 'subStore'])->name('sub-service.store');
Route::post('/sub-service-update', [ServiceController::class, 'subServUpdate'])->name('sub-service.update');

//Specific Service
Route::get('/get-iplc', [ServiceController::class, 'getIplc'])->name('get.iplc.list');
Route::get('/get-iptransit', [ServiceController::class, 'getIptransit'])->name('get.iptransit.list');
Route::get('/get-colocation', [ServiceController::class, 'getColocation'])->name('get.colocation.list');
Route::get('/get-colocation-iplc', [ServiceController::class, 'getColocationIplc'])->name('get.colocation.iplc');


// tariff
Route::post('/tariff/add', [ServiceController::class, 'tariffUpdate'])->name('tariff.update');
Route::post('/tariff/delete-group', [ServiceController::class, 'destroyGroup'])->name('tariff.destroy.group');

Route::post('/change-service-status', [ServiceController::class, 'destroy'])->name('service.status.change');
Route::get('/get-iplc-list', [ServiceController::class, 'iplc_list'])->name('service.iplc');
Route::post('/capacity-update', [ServiceController::class, 'update_capacity'])->name('iplc.capacity.update');
//ZONE & PRICE LIST
Route::post("/get-zone-list", [ServiceController::class, 'getZone'])->name('get.zone.list');
Route::post("/get-colocation-charge", [
    ServiceController::class,
    'getColocationCharge'
])->name('get.colocation-charge');
Route::post("/get-zone-charge", [ServiceController::class, 'getcharge'])->name('get.zone.charge');
