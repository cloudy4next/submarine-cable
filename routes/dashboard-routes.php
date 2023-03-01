<?php
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

 Route::get("/get-invoice-info", [DashboardController::class, 'getTotalinvoice'])->name('get.dashbaord.info');
 Route::get("/get-demand-info", [DashboardController::class, 'getDemandNote'])->name('get.demand.total');
 Route::get("/get-customer-info", [DashboardController::class, 'getCustomers'])->name('get.customer.total');
 Route::get("/get-license-info", [DashboardController::class, 'gettotalLicense'])->name('get.license.total');
 Route::get("/get-auth-user", [DashboardController::class, 'authUserName'])->name('get.auth.UserName');

 // Route::get('/www.dream71.com', [DashboardController::class, 'index'])->name('dashboard');
//  Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');


//  Route::get('{any}', function () {
//  return view('welcome');
//  })->where('any', '.*');
