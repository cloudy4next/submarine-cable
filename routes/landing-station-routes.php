<?php
use App\Http\Controllers\Customer\LandingstationController;
use Illuminate\Support\Facades\Route;

 //lANDING stations
 Route::get('/get-landing-stations',[LandingstationController::class,'getstations'])->name('get-landing-stations');
 Route::post('/store-landing-stations', [LandingstationController::class,
 'storestations'])->name('store-landing-stations');
 Route::post('/store-landing-group', [LandingstationController::class, 'storeGroup'])->name('store-landing-group');
 Route::post('/group-id/wise/get-country', [LandingstationController::class,
 'getGroupIdWiseCountry'])->name('group-id-wise-get-country');
 Route::get('/get-landing-group', [LandingstationController::class, 'getlandinGroup'])->name('get-landing-group');
 Route::post('/get-group/zone', [LandingstationController::class,
 'serviceAndSubServiceIdWiseGroupZoneGet'])->name('get-zone-group');
 Route::get("/get-group-zone-pop-list/{id}", [LandingstationController::class,
 'groupZoneOrPop'])->name('get-group-zone-pop-list');