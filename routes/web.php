<?php


use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\IplcBillController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FileImportController;
use App\Http\Controllers\CircuitCategoryController;
use App\Http\Controllers\Customer\BillingController;
use App\Http\Controllers\Configuration\RoleController;
use App\Http\Controllers\Customer\DemandNoteController;
use App\Http\Controllers\Configuration\ServiceController;
use App\Http\Controllers\Customer\LandingstationController;
use App\Http\Controllers\Configuration\RolePermissionController;



// Route::get('/{any}', function () {
//     $data = auth()->user();
//         return view('layouts.app',[
//             'data'=>$data
//         ]);
// })->where('any','.*');



// auth Route
include_once 'auth-guest-routes.php';

Route::group(['middleware' => ['auth']],function(){
        // auth Route
        include_once 'auth-routes.php';

        //File Import Route
        include_once 'file-import-routes.php';

        // Customer Route
        include_once 'customer-routes.php';

         //lANDING stations
        include_once 'landing-station-routes.php';

        //Services Routes
        include_once 'service-routes.php';

        // demand note view
        include_once 'demande-note-routes.php';

        // circuit route
        include_once 'circuit-route.php';

        // Invoice & Billing Report
        include_once 'iplc-bill-routes.php';

        //role-permission
        include_once 'role-permission-routes.php';

        // user controller routes
        include_once 'user-routes.php';

        //Dashboard Information
        include_once 'dashboard-routes.php';

         Route::get('/database-bekup', [DashboardController::class, 'createDB'])->name('database-bekup');

        //  Route::get('/database-bekup',function(){
        //     // \Artisan::call('backup:run');
        //     // \Artisan::queue('backup:run--only-db');
        //     //  \Artisan::call('backup:run' ,['--only-db' => true]);
        //     return redirect()->back();
        //  });



        //  Route::get('/database-bekup',function(){
        //     if(function_exists('shell_exec')) {
        //     echo "shell_exec is enabled";
        //     shell_exec("C:/xampp/mysql/bin/mysqldump -h 127.0.0.1 -u root test > C:/xampp/htdocs/submarine-billing/bsccl_billing.sql");
        //      \Artisan::call('backup:run' ,['--only-db' => true]);
        //      return "do something";
        //     // return redirect()->route('database-bekup');
        //     }
        //  });

        Route::get('{any}', [DashboardController::class, 'index'])
            ->name('dashboard')
            ->where('any', '.*');
});
// });