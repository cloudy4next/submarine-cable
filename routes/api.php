<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiAuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::group(['middleware' => 'cors'], function () {

    Route::post('/login', 'Api\ApiAuthController@login')->name('login.api');
    Route::post('/register','Api\ApiAuthController@register')->name('register.api');
});

Route::middleware('auth:api')->group(function () {
    // our routes to be protected will go in here
    Route::post('/logout', 'Api\ApiAuthController@logout')->name('logout.api');
});


Route::group(['middleware' => ['auth:api','cors']], function () {

    Route::get('/demand-note', 'Api\ApiAuthController@demandNote')->name('demand_note');
    Route::get('/invoice', 'Api\ApiAuthController@invoice')->name('invoice');

});
