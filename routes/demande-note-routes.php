<?php

use App\Http\Controllers\Customer\DemandNoteController;
use Illuminate\Support\Facades\Route;

 Route::post('/demand-note/view', [DemandNoteController::class, 'demandNoteView'])->name('demandNote.view');
 //Demand Note - Report - Activation
 Route::get('/get-demand-note/{id}',[DemandNoteController::class,'getdemandNote'])->name('get.demand.note');
 Route::get('/get-colocation/demand-note/{id}',[DemandNoteController::class,'getColocationDemandNote'])->name('get.colocation.demand.note');
 Route::post('/count-total-demand-note',[DemandNoteController::class,'countdemandNote'])->name('count.total.demand.note');
 Route::post('/create-demand-note', [DemandNoteController::class, 'createDemandNote'])->name('create-demand-note');
 Route::post('/create-CoLocation/demand-note', [DemandNoteController::class,
 'createCoLocationDemandNote'])->name('create-CoLocation.demand-note');
 Route::post('/mrc/calculate', [DemandNoteController::class, 'mrcCalculate'])->name('iplc.mrc.calculate');
 Route::post('/colocation/mrc/calculate', [DemandNoteController::class, 'colocationMrcCalculate'])->name('iplc.colocation.mrc.calculate');
 Route::post('/get-demand-note-info',[DemandNoteController::class,'finddemandNote'])->name('find.demand.note');
 Route::post('/get-colocation/demand-note-info',[DemandNoteController::class,'findColocationDemandNote'])->name('find.colocation.demand.note');
 Route::post("/demandnote-active",[DemandNoteController::class,'demandNoteActivation']);
 Route::post("/colocation/demandnote-active",[DemandNoteController::class,'colocationDemandNoteActivation']);

 Route::post("/get-circuit-type", [DemandNoteController::class, 'getCircuitType'])->name('get.circuitype');

 Route::post("/get-customer/connection/information/{customerId}/{sub_service_id}", [DemandNoteController::class,
 'getconnectionInformation'])->name('get-customer-connection-information');

 Route::post("/get-invoice-customer", [DemandNoteController::class,
 'getInvoiceCustomer'])->name('get.invoice.customer');

 Route::post("/get/service/sub-service/group-zone/wise/customer", [DemandNoteController::class,
 'getServiceSubServiceGroupZoneWiseCustomer'])->name('get-service-sub-service-group-zone-wise-customer');

 Route::post("/get/service/group-zone/wise/customer", [DemandNoteController::class,
 'getServiceGroupZoneWiseColocationCustomer'])->name('get-service-group-zone-wise-customer');

 Route::post("/get/service/group-zone/wise/power/customer", [DemandNoteController::class,
 'getServiceGroupZoneWiseColocationPowerCustomer'])->name('get-service-group-zone-wise-power-customer');

 Route::post("/get/service/sub-service/group-zone/customer/wise/demandNote", [DemandNoteController::class,'getServiceSubServiceGroupZoneCustomerWiseDemandNote'])->name('get-service-sub-service-group-zone-customer-wise-demandNote');
 Route::post("/get/service/sub-service/group-zone/customer/wise/demandNote/report", [DemandNoteController::class,'getServiceSubServiceGroupZoneCustomerWiseDemandNoteReport'])->name('get-service-sub-service-group-zone-customer-wise-demandNote-report');
 Route::post("/get/month/wise/total/revenue/report", [DemandNoteController::class,'monthWiseTotalRevenueReport'])->name('month-wise-total-revenue-report');

 Route::post("/get/service/group-zone/customer/wise/colocation-demandNote",[DemandNoteController::class,'getServiceGroupZoneCustomerWiseColocationDemandNote'])->name('get-service-group-zone-customer-wise-colocation-demandNote');
 Route::get("/customer/wise/total-bandwidth/{id}", [DemandNoteController::class, 'customerIdWiseTotalCalculation'])->name('customer-group-wise-total-bandwidth');
 Route::get("/customer/group/pop/wise/total-bandwidth/{id}/{groupZoneId}", [DemandNoteController::class,
 'customerIdAndPopWiseTotalCalculation'])->name('customer-wise-total-bandwidth');
 Route::get("/customer/wise/first-activation-date/{id}", [DemandNoteController::class,
 'customerIdWiseFirstActivationDate'])->name('customer-wise-first-activation-date');
 Route::post('/delete-demand-note', [DemandNoteController::class, 'destroy']);
