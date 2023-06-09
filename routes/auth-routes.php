<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;


Route::post('/user-store', [AuthController::class, 'store'])->name('register.store');
Route::post('/event-store', [AuthController::class, 'eventStore'])->name('event.store');
Route::post('/password-reset', [AuthController::class, 'resetPass'])->name('reset.pass');

Route::post('/user-sign-store', [AuthController::class, 'signInfoUpdate'])->name('sign.store');
Route::post('/user-sign-img-store', [AuthController::class, 'signImgInfoUpdate'])->name('sign.img.store');
Route::post('/user-mail-store', [AuthController::class, 'mailInfoUpdate'])->name('mail.store');

Route::get('/get-allroles', [AuthController::class, 'getallroles'])->name('get.allroles');

Route::get('/get-roleName', [AuthController::class, 'getroleName'])->name('get.role.Name');

Route::get('/logout', [AuthController::class, 'destroy'])->name('user.logout');
