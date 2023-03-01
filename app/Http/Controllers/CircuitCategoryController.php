<?php

namespace App\Http\Controllers;

use App\Models\Port;
use Illuminate\Http\Request;
use App\Models\CircuitCategory;
use App\Http\Controllers\CustomerController;

class CircuitCategoryController extends Controller
{

    public function sevrWiseGetCitcuit($id)
    {
       return $data = CircuitCategory::where('service_id',$id)->orderBy('id', 'ASC')->get();
    }

    public function licenceWiseGetPort($id)
    {
       return $data = Port::where('licence_id',$id)->orderBy('id', 'ASC')->get();
    }

    public function ipTransitWiseCircuitList(){
        $data = (new CustomerController)->serviceIdWiseCustomerType(7);
        return response([
            'msg' => 'Success',
            'data' => $data
        ], 200);
    }

    public function getCitcuit()
    {
       $data = $this->sevrWiseGetCitcuit(1);
        return response([
            'msg' => 'Success',
            'data' => $data
        ], 200);
    }


    public function getPort(Request $request)
    {
        // return $request->id;
       $data = $this->licenceWiseGetPort($request->id);
        return response([
            'msg' => 'Success',
            'data' => $data
        ], 200);
    }

}
