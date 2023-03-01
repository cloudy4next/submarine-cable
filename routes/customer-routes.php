<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CircuitCategoryController;


Route::post('/service-id/wise/get-customer-list', [CustomerController::class, 'serviceWiseCustomer'])->name('service-id-customer.list');
Route::get('/get-customer-list/{id}', [CustomerController::class, 'customer'])->name('customer.list');
Route::post('/customer/store', [CustomerController::class, 'customerStore'])->name('customer.store');
Route::post('/customer/id/wise/circuit', [CustomerController::class, 'customerIdWiseCircuit'])->name('customer.id-wise-circuit');
Route::post('/pop/up-down/bandwith/search', [CustomerController::class,'popOrUpDownWiseBHSearch'])->name('pop-up-down-bandwith-search');
Route::post('/customer/wisw/bandwith/downgrade', [CustomerController::class,'customerIdWiseBandwithDowngrade'])->name('customer.id-wise-bandwith.downgrade');
Route::post('/customer/wisw/circuit/deactivation', [CustomerController::class,'customerIdWiseCircuitDeactive'])->name('customer.id-wise-circuit.deactive');

//Customer Type List

Route::get('/get-customer-type-list', [CustomerController::class, 'customerType'])->name('customer.type.list');
Route::post('/store-customer-type', [CustomerController::class, 'storeCustomerType'])->name('store.customer.type');

Route::get('/get-customer-serve/wise/type-list', [CircuitCategoryController::class,
'ipTransitWiseCircuitList'])->name('customer.serve.type.list');
 Route::post("/get-license-type", [CustomerController::class, 'getLicense'])->name('get.service.license');