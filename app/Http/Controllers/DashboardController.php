<?php

namespace App\Http\Controllers;

use queue;
use \Exception;
use App\Models\DemandNote;
use Illuminate\Http\Request;
use App\Models\Customer\Invoice;
use App\Models\Customer\Customer;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\Customer\CustomerType;
use Illuminate\Support\Facades\Artisan;
use Spatie\Activitylog\Models\Activity;
use App\Models\Configuration\GroupOrZone;

class DashboardController extends Controller
{
    public function index()
    {
        // return Activity::all();

        $data = auth()->user();
        return view('layouts.app',[
            'data'=>$data
        ]);
    }


    public function createDB()
    {
        try {
            // Artisan::call('backup:run');
            Artisan::call('backup:run' ,['--only-db' => true]);
            $output = Artisan::output();
            Log::info("Backpack\BackupManager -- new backup started \r\n" . $output);

            // session()->flash('success', 'Successfully created backup!');
            return redirect()->back();
        } catch (\Exception $e) {
            // session()->flash('danger', $e->getMessage());
            return redirect()->back();
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function create()
    // {
    //     //
    // }


    // public function store(Request $request)
    // {
    //     //
    // }


    // public function show($id)
    // {
    //     //
    // }


    // public function edit($id)
    // {
    //     //
    // }


    // public function update(Request $request, $id)
    // {
    //     //
    // }


    // public function destroy($id)
    // {
    //     //
    // }

    public function getTotalinvoice(){

        // $data['customers'] =Customer::select('id')->count();
        // $data['demandNotes'] =DemandNote::select('id')->count();
        $totalinvoice =Invoice::select('id')->count();

        return response()->json($totalinvoice);



    }

    public function getDemandNote(){

        $totaldemand =DemandNote::select('id')->count();

        return response()->json($totaldemand);
    }

    public function getCustomers(){

        $totalcustomers =Customer::select('id')->count();
        return response()->json($totalcustomers);
    }


    public function gettotalLicense(){

        $totalcustomers =CustomerType::select('id')->count();
        return response()->json($totalcustomers);
    }


    public function authUserName(){

        $authName =Auth::user()->name;
        return response()->json($authName);
    }


}