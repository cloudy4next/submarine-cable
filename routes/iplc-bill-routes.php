<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IplcBillController;
use App\Http\Controllers\ColocationBillController;
use App\Http\Controllers\Customer\BillingController;



  Route::get("/get/colocation/port-billing-list/{id}", [ColocationBillController::class,'billingList'])->name('get-colocation-port-billing-list');
  Route::post("/get/date/wise/colocation/port-billing-list", [ColocationBillController::class,'dateWiseBillingList'])->name('get-date-wise-colocation-port-billing-list');
  Route::post("/bill-rocess/colocation/port", [ColocationBillController::class, 'billProcessColocationPort'])->name('store.bill-process-colocation-port');
  Route::post("/bill-rocess/colocation/power", [ColocationBillController::class,
  'billProcessColocationPower'])->name('store.bill-process-colocation-power');
  Route::post("/get/colocation/port/single/bill-info",
   [ColocationBillController::class,'singleBillInfo'])->name('get-colocation-port-single-bill-info');
  Route::get("/colocation/port-bill/permission/approval/{id}", [ColocationBillController::class,
    'approvePermission'])->name('colocation-port-bill-invoice-permission');
  Route::post("/colocation/port-bill/invoice-ganarete", [ColocationBillController::class,
   'invoiceGanarete'])->name('colocation-port-bill-invoice-ganarete');
  Route::post("/colocation/power/rack-bill/invoice-ganarete", [ColocationBillController::class,
  'powerInvoiceGanarete'])->name('colocation-power-rack--bill-invoice-ganarete');




  Route::get("/get-total-revenu-report-list", [IplcBillController::class, 'revenuReport'])->name('get-total-revenu-report-list');
  Route::post("/get-date-wise/total-revenu-report-list", [IplcBillController::class, 'dateWiseRevenuReport'])->name('get-date-wise-total-revenu-report-list');


  Route::post("/bill-rocess", [IplcBillController::class, 'billProcess'])->name('store.bill-rocess');
  Route::post("/bill-rocess/ip-transit", [IplcBillController::class,
  'billProcessIptransit'])->name('store.bill-rocess-ip-transit');

 Route::post("/update/processing-bill-info", [IplcBillController::class,
 'billUpdate'])->name('update-rocessing-bill-info');
 Route::get("/get/iplc-billing-list/{id}", [IplcBillController::class, 'billingList'])->name('get-iplc-billing-list');
 Route::post("/get/date/wise/iplc-billing-list", [IplcBillController::class,
 'dateWiseBillingList'])->name('get-date-wise-iplc-billing-list');

 Route::get("/get/iplc-invoice-list/{id}", [IplcBillController::class, 'invoiceList'])->name('get-iplc-invoice-list');
 Route::get("/get/ip-transit-invoice-list/{id}", [IplcBillController::class, 'invoiceList'])->name('get-ip-transit-invoice-list');
 Route::post("/get/iplc/single/bill-info-report",[IplcBillController::class,'singleBillReport'])->name('get-iplc-single-bill-info-report');
 Route::post("/get/iplc/single/bill-info", [IplcBillController::class,'singleBillInfo'])->name('get-iplc-single-bill-info');
 Route::post("/iplc-bill-permission/for/invoice-ganarete", [IplcBillController::class,
 'invoiceGanaretePermission'])->name('iplc-bill-permission-for-invoice-ganarete');
 Route::post("/iplc-bill/invoice-ganarete", [IplcBillController::class, 'invoiceGanarete'])->name('ip-transit-bill-invoice-ganarete');
 Route::post("/ip-transit-bill/invoice-ganarete", [IplcBillController::class, 'iptInvoiceGanarete'])->name('iplc-bill-invoice-ganarete');
 Route::get("/iplc-bill/permission/approval/{id}", [IplcBillController::class,
 'approvePermission'])->name('iplc-bill-invoice-permission');
 Route::get("/get/customer/invoice-id/wise/bill/adjustment/{id}", [IplcBillController::class,'getIplcAdjustList'])->name('get-bill-adjustment');
 Route::get("/delete/iplc/bill/adjustment/{id}",
 [IplcBillController::class,'deleteIplcAdjust'])->name('delete-bill-adjustment');
 Route::post("/customer/invoice-id/wise/bill/adjustment", [IplcBillController::class,'billAdjust'])->name('bill-adjustment');
 Route::post("/customer/invoice-id/wise/port/bill/adjustment", [IplcBillController::class,'portBillAdjust'])->name('port-bill-adjustment');
 Route::post("/customer/invoice-id/wise/ipt/bill/adjustment",
 [IplcBillController::class,'iptBillAdjust'])->name('ipt-bill-adjustment');
 Route::post("/customer/wise/ip-transit/mrc/for/bill/adjustment",
 [IplcBillController::class,'iptBillCalculationForAdjustment'])->name('bill-adjustment-ipt-for-mrc');

 Route::post("/customer/wise/mrc/for/bill/adjustment", [IplcBillController::class,'billCalculationFrAdjustment'])->name('bill-adjustment-for-mrc');

 Route::post("/customer/wise/mrc/for/port/bill/adjustment", [IplcBillController::class,'portBillCalculationFrAdjustment'])->name('bill-adjustment-port-for-mrc');
 Route::get("/invoice-id/wise/bill/details/", [IplcBillController::class,'idWiseBillDetails'])->name('id-wise-bill-details');
 Route::post("/get-client-billing", [BillingController::class, 'getBills'])->name('get.client.billing');
 Route::post("/create-invoice", [BillingController::class, 'storeInvoice'])->name('store.invoice');

 Route::get('/our_backup_database', [BillingController::class, 'our_backup_database'])->name('our_backup_database');