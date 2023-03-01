<?php
use App\Http\Controllers\FileImportController;
use Illuminate\Support\Facades\Route;

Route::post('/user-import', [FileImportController::class, 'user_import'])->name('user.import');