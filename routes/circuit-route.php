<?php

use App\Http\Controllers\CircuitCategoryController;
use Illuminate\Support\Facades\Route;

Route::get("/get-circuit-list", [CircuitCategoryController::class, 'getCitcuit'])->name('get.circuit.list');
Route::post("/get-port", [CircuitCategoryController::class, 'getPort'])->name('get.port.list');