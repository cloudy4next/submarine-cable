<?php
use App\Http\Controllers\Auth\AuthController;

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'guest'], function () {
    Route::get('/login', function () {
    return view('pages.login');
    })->name('login');

    Route::get('/registration', [AuthController::class, 'index'])->name('register');

    Route::post('/user-login', [AuthController::class, 'login'])->name('user.login');
});