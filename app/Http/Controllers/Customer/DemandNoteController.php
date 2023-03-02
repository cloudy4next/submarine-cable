<?php
namespace App\Http\Controllers\Customer;

use App\Models\User;
use App\Models\DemandNote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\ColocationDemandNote;
use App\Models\Configuration\GroupOrZone;
use App\Http\Resources\DemandNoteResource;
use App\Models\Configuration\TariffCapacity;
use App\Http\Resources\DemandNoteReportResource;
use App\Http\Resources\TotalRevenueReportResource;
use App\Http\Resources\ColocationDemandNoteResource;
use App\Http\Controllers\Configuration\ServiceController;
use App\Models\CircuitCategory;
use Datetime;
use Illuminate\Support\Carbon;

class DemandNoteController extends Controller
{

    // customer id wise demand note
    public function customerIdWiseDemandNote($customer_id)
    {
        return $data = DemandNote::with(['groups', 'circuit', 'subservice', 'customers'])->where('customer_id',
        $customer_id)->orderBy('id', 'desc')
            ->get();
    }

    public function customerIdWiseTotalBandwidthCalculation($customerId)
    {
        $total = DemandNote::where('customer_id', $customerId)->where('approval_status', 2)
            ->sum('max');
        $data = DemandNote::where('customer_id', $customerId)->where('approval_status', 2)
            ->sum('downgrade');
        return $total - $data;
    }

    public function customerIdAndPopWiseWiseTotalBandwidthCalculation($customerId, $groupId)
    {
        $total = DemandNote::where('customer_id', $customerId)->where('group_id', $groupId)->where('approval_status',
        2)
            ->sum('max');
        $data = DemandNote::where('customer_id', $customerId)->where('group_id', $groupId)->where('approval_status',
        2)
            ->sum('downgrade');
        return $total - $data;
    }

    public function customerIdWiseFirstActivationDateCheck($id)
    {
        return $fDate = DemandNote::where('customer_id', $id)->first('approved_date');
    }

    public function getServiceSubServiceGroupZoneWiseCustomerInfo($serviceId, $subServiceId, $lincenceId, $groupId)
    {
        if ($serviceId == 1)
        {
            return $data = DemandNote::with('customers')->where('service_id', $serviceId)->where('sub_service_id', $subServiceId)->where('group_id', $groupId)->where('approval_status', 2)
                ->orderBy('id', 'desc')
                ->get();
        }
        else
        {
            return $data = DemandNote::with('customers')->where('service_id', $serviceId)->where('sub_service_id', $subServiceId)->where('circuit_id', $lincenceId)->where('group_id', $groupId)->where('approval_status', 2)
                ->orderBy('id', 'desc')
                ->get();
        }
    }

    public function getServiceAndGroupZoneWiseIplcColocationCustomerInfo($serviceId, $groupId)
    {
        // return ColocationDemandNote::all();
        return $data = ColocationDemandNote::with('customers')->where('service_id', $serviceId)->where('group_id', $groupId)->where('approval_status', 2)
            ->orderBy('id', 'desc')
            ->get();

    }

    public function existingCustomer($customerId, $serviceId)
    {
        return $existingCustomer = DemandNote::where('customer_id', $customerId)->where('service_id', $serviceId)->where('approval_status', '<', 3)
            ->first();
    }

    public function countCustomerDemandNote($customerId, $serviceId)
    {
        return $countCustomerDemandNote = DemandNote::where('customer_id', $customerId)->where('service_id', $serviceId)->where('approval_status', '<', 3)
            ->count();
    }


    public function existingColocationCustomer($customerId, $serviceId)
    {
        return $existingCustomer = ColocationDemandNote::where('customer_id', $customerId)
                ->where('service_id',$serviceId)->where('approval_status', '<', 3) ->first();
    }

    public function countColocationCustomerDemandNote($customerId, $serviceId)
    {
        return $countCustomerDemandNote = ColocationDemandNote::where('customer_id', $customerId)->where('service_id',$serviceId)
                ->where('approval_status', '<', 3)->count();
    }

    public function countdemandNote(Request $request)
    {
        $data = DemandNote::where('service_id', $request->id)
            ->count();
        return response(['msg' => 'success', 'data' => $data]);
    }

    // service id wise demand note
    public function getdemandNote($id)
    {

        $data = DemandNote::with('services', 'ports', 'customers.custype', 'subservice', 'circuit', 'groups', 'capacity', 'zonelist.groups')->where('service_id', $id)->orderBy('id', 'desc')
            ->get();

        return response(['msg' => 'success', 'data' => $data

        ]);
    }

    public function getColocationDemandNote($id)
    {

        $data = ColocationDemandNote::with('services', 'customers.custype', 'subservice', 'circuit', 'capacity', 'zonelist.groups', 'groups')->where('service_id', $id)->orderBy('id', 'desc')
            ->get();

        return response(['msg' => 'success', 'data' => $data

        ]);
    }

    public function finddemandNote(Request $request)
    {
        $oldMax = 0;

        $data = DemandNote::with('services', 'ports', 'customers.custype', 'subservice', 'capacity', 'zonelist', 'groups', 'countries', 'circuit')->where('id', $request->id)
            ->first();

        $totalBand = $this->customerIdWiseTotalBandwidthCalculation($data->customer_id);

        $manager = $data->service_id;
        if($data->service_id ==1){

            $manager = User::where('sign_iplc_demandnote' ,1)->where('sign_status',1)->get();
        }else{
            $manager = User::where('sign_ipt_demandnote' ,1)->where('sign_status',1)->get();
        }



         $customerCircuits = DemandNote::with('circuit')
         ->where('approval_status', 2)
         ->where('customer_id',$data->customer_id)
         ->select( 'circuit_id')
         ->groupBy('circuit_id')
         ->get();


        $second_last_circuit = DemandNote::with('circuit')
                    ->where('approval_status',2)
                    ->where('customer_id',$data->customer_id)
                    ->orderBy('created_at', 'desc')
                    ->skip(1)->take(1)
                    ->get();


         $connectionData = [];
         foreach ($customerCircuits as $key => $c)
         {
            $is_approved = DemandNote::where('circuit_id',$c->circuit_id)
                    ->where('approval_status',2)
                    ->where('customer_id',$data->customer_id)
                    ->first();

            // oldMax= $this->existingData($data->customer_id,$c->circuit_id);
            // dd($oldMax);
            $connectionData[] = [
                'name' => $c->circuit->circuit_name,
                'id' => $c->circuit_id,
                'qty' =>DemandNote::where('circuit_id',$c->circuit_id)
                    // ->where('approval_status',2)
                    ->where('customer_id',$data->customer_id)
                    ->whereDate('approved_date' ,'<=',Carbon::today()->toDateString())
                    ->count(),
                'prcessing_qty' => DemandNote::where('circuit_id',$c->circuit_id)
                    // ->where('approval_status',2)
                    ->where('customer_id',$data->customer_id)
                    ->whereDate('approved_date' ,'>',Carbon::today()->toDateString())
                    ->count(),
                'is_approved' => $is_approved->approval_status,

            ];
         }

        return response([
            'msg' => 'success',
            'data' => $data,
            'totalBand' => $totalBand,
            'manager' => $manager,
            'connectionData' => $connectionData,
            'second_last_circuit' =>$oldMax,

        ]);
    }

    public function findColocationDemandNote(Request $request)
    {
        $data = ColocationDemandNote::with('services', 'customers.custype', 'subservice', 'capacity', 'zonelist', 'circuit')->where('id', $request->id)
            ->first();


         $manager = $data->service_id;
         if($data->service_id ==13){

            $manager = User::where('sign_iplc_demandnote' ,1)->where('sign_status',1)->get();
         }else{
            $manager = User::where('sign_ipt_demandnote' ,1)->where('sign_status',1)->get();
         }
        return response(['msg' => 'success',
         'data' => $data,
         'manager' => $manager,

        ]);
    }

    public function existingData($customerId, $circuitId)
    {
        if ($circuitId == 6 || $circuitId == 7 || $circuitId == 5)
        {
            return $existingDemandNote = DemandNote::where('customer_id', $customerId)->where('circuit_id', '>=', 5)
                ->where('circuit_id', '<=', 7)
                ->where('approval_status', '<', 3)
                ->sum('max');
        }
        else
        {
            return $existingData = DemandNote::where('customer_id', $customerId)->where('circuit_id', $circuitId)->where('approval_status', '<', 3)
                ->sum('max');
        }
    }

    public function colocationExistingData($customerId, $circuitId)
    {
        if ($circuitId == 6 || $circuitId == 7)
        {
            return $existingDemandNote = ColocationDemandNote::where('customer_id', $customerId)->where('circuit_id', '>', 5)
                ->where('circuit_id', '<=', 7)
                ->where('approval_status', '<', 3)
                ->sum('max');
        }
        else
        {
            return $existingData = ColocationDemandNote::where('customer_id', $customerId)->where('circuit_id', $circuitId)->where('approval_status', '<', 3)
                ->sum('max');
        }
    }

    public function colocationExistingDemandNoteCheck($customerId, $circuitId)
    {
        if ($circuitId == 6 || $circuitId == 7)
        {
            return $existingDemandNote = ColocationDemandNote::where('customer_id', $customerId)->where('circuit_id', '>', 5)
                ->where('circuit_id', '<=', 7)
                ->where('approval_status', '<', 3)
                ->first();
        }
        else
        {
            return $existingDemandNote = ColocationDemandNote::where('customer_id', $customerId)->where('circuit_id', $circuitId)->where('approval_status', '<', 3)
                ->first();
        }
    }

    public function existingDemandNoteCheck($customerId, $circuitId)
    {
        if ($circuitId == 6 || $circuitId == 7 || $circuitId == 5)
        {
            return $existingDemandNote = DemandNote::where('customer_id', $customerId)->where('circuit_id', '>=', 5)
                ->where('circuit_id', '<=', 7)
                ->where('approval_status', '<', 3)
                ->first();
        }
        else
        {
            return $existingDemandNote = DemandNote::where('customer_id', $customerId)->where('circuit_id', $circuitId)->where('approval_status', '<', 3)
                ->first();
        }
    }

    public function calculate($max, $circuitId, $grp_or_zone)
    {
        // $val = GroupOrZone::where('max', $max)->where('circuit_id', $circuitId)->where('grp_or_zone', $grp_or_zone)->first();

        if($circuitId == 7)
        {
           $max =200;
        }
        $val = GroupOrZone::where('max', $max)->where('circuit_id', $circuitId)->where('grp_or_zone', $grp_or_zone)->first();

        // return $max;
        // dd($val);
        if (is_null($val))
        {
            $price = 0;
        }
        else
        {
            $price = intval($val->charge);
        }
        return (int)$price;
    }

    // MRC for demand note
    public function mrcCalculate(Request $request)
    {

        $customerId = $request->customer_id;
        $circuitId = $request->circuit_id;
        $max = $request->max;
        // dd($customerId, $circuitId, $max);
        // if ($circuitId == 5){
        //     $max = 2.5;
        // }elseif($circuitId == 6){
        //     $max = 10;
        // }elseif($circuitId == 7){
        //     $max = 100;
        // }  // jodi circuit wise max calculate na hoy


        $existingDemandNote = $this->existingDemandNoteCheck($customerId, $circuitId);

        $groupOrZone = GroupOrZone::where('id', $request->grp_or_zone)
            ->first();
        $grp_or_zone = $groupOrZone->grp_or_zone;

        $price = 0;

        if ($existingDemandNote != '')
        {
            $oldMax = $this->existingData($customerId, $circuitId);
            $max += $oldMax; // New Demand note + Existing Demand note

        }
        if ($circuitId == 5)
        { //stm 16
            if ($max > 0 && $max <= 30)
            {
                $price = $this->calculate(30, $circuitId, $grp_or_zone);
            }
            elseif ($max > 30 && $max <= 50)
            {
                $price = $this->calculate(50, $circuitId, $grp_or_zone);
            }
            elseif ($max > 50 && $max <= 100)
            {
                $price = $this->calculate(100, $circuitId, $grp_or_zone);
            }
            elseif ($max > 100 && $max <= 150)
            {
                $price = $this->calculate(150, $circuitId, $grp_or_zone);
            }
            elseif ($max > 150 && $max <= 200)
            {
                $price = $this->calculate(200, $circuitId, $grp_or_zone);
            }
            else
            {
                $price = $this->calculate(220, $circuitId, $grp_or_zone);
            }

        }
        elseif ($circuitId == 6)
        { //
            // dd("im here");
            $maxPer10g = $max / 10;
            if ($max > 0 && $max <= 10)
            {
                $price = $this->calculate(10, $circuitId, $grp_or_zone);
            }
            elseif ($max > 10 && $max <= 20)
            {
                $price = $this->calculate(20, $circuitId, $grp_or_zone);
            }
            elseif ($max > 20 && $max <= 30)
            {
                $price = $this->calculate(30, $circuitId, $grp_or_zone);
            }
            elseif ($max > 30 && $max <= 50)
            {
                $price = $this->calculate(50, $circuitId, $grp_or_zone);

            }
            elseif ($max > 50 && $max <= 100)
            {
                $maxCalculat = $maxPer10g - 5;
                $val5 = $this->calculate(50, $circuitId, $grp_or_zone);
                $val10 = $this->calculate(100, $circuitId, $grp_or_zone);

                $price = ($val5 * 5) + ($val10 * $maxCalculat);
                $price /= $maxPer10g;

            }
            elseif ($max > 100 && $max <= 150)
            {
                $maxCalculat = $maxPer10g - 10;
                $val5 = $this->calculate(50, $circuitId, $grp_or_zone);
                $val10 = $this->calculate(100, $circuitId, $grp_or_zone);
                $val15 = $this->calculate(150, $circuitId, $grp_or_zone);

                $price = ($val5 * 5) + ($val10 * 5) + ($val15 * $maxCalculat);
                $price /= $maxPer10g;

            }
            elseif ($max > 150 && $max <= 200)
            {
                $maxCalculat = $maxPer10g - 15;
                $val5 = $this->calculate(50, $circuitId, $grp_or_zone);
                $val10 = $this->calculate(100, $circuitId, $grp_or_zone);
                $val15 = $this->calculate(150, $circuitId, $grp_or_zone);
                $val20 = $this->calculate(200, $circuitId, $grp_or_zone);

                $price = ($val5 * 5) + ($val10 * 5) + ($val15 * 5) + ($val20 * $maxCalculat);
                $price /= $maxPer10g;

            }
            elseif ($max > 200 && $max <= 250)
            {
                $maxCalculat = $maxPer10g - 20;
                $val5 = $this->calculate(50, $circuitId, $grp_or_zone);
                $val10 = $this->calculate(100, $circuitId, $grp_or_zone);
                $val15 = $this->calculate(150, $circuitId, $grp_or_zone);
                $val20 = $this->calculate(200, $circuitId, $grp_or_zone);
                $val25 = $this->calculate(250, $circuitId, $grp_or_zone);

                $price = ($val5 * 5) + ($val10 * 5) + ($val15 * 5) + ($val20 * 5) + ($val25 * $maxCalculat);
                $price /= $maxPer10g;

            }
            elseif ($max > 250 && $max <= 300)
            {
                $maxCalculat = $maxPer10g - 25;
                $val5 = $this->calculate(50, $circuitId, $grp_or_zone);
                $val10 = $this->calculate(100, $circuitId, $grp_or_zone);
                $val15 = $this->calculate(150, $circuitId, $grp_or_zone);
                $val20 = $this->calculate(200, $circuitId, $grp_or_zone);
                $val25 = $this->calculate(250, $circuitId, $grp_or_zone);
                $val30 = $this->calculate(300, $circuitId, $grp_or_zone);

                $price = ($val5 * 5) + ($val10 * 5) + ($val15 * 5) + ($val20 * 5) + ($val25 * 5) + ($val30 * $maxCalculat);
                $price /= $maxPer10g;

            }
            elseif ($max > 300 && $max <= 350)
            {
                $maxCalculat = $maxPer10g - 30;
                $val5 = $this->calculate(50, $circuitId, $grp_or_zone);
                $val10 = $this->calculate(100, $circuitId, $grp_or_zone);
                $val15 = $this->calculate(150, $circuitId, $grp_or_zone);
                $val20 = $this->calculate(200, $circuitId, $grp_or_zone);
                $val25 = $this->calculate(250, $circuitId, $grp_or_zone);
                $val30 = $this->calculate(300, $circuitId, $grp_or_zone);
                $val35 = $this->calculate(350, $circuitId, $grp_or_zone);

                $price = ($val5 * 5) + ($val10 * 5) + ($val15 * 5) + ($val20 * 5) + ($val25 * 5) + ($val30 * 5) + ($val35 * $maxCalculat);
                $price /= $maxPer10g;

            }
            else
            {
                $maxCalculat = $maxPer10g - 35;
                $val5 = $this->calculate(50, $circuitId, $grp_or_zone);
                $val10 = $this->calculate(100, $circuitId, $grp_or_zone);
                $val15 = $this->calculate(150, $circuitId, $grp_or_zone);
                $val20 = $this->calculate(200, $circuitId, $grp_or_zone);
                $val25 = $this->calculate(250, $circuitId, $grp_or_zone);
                $val30 = $this->calculate(300, $circuitId, $grp_or_zone);
                $val35 = $this->calculate(350, $circuitId, $grp_or_zone);
                $val40 = $this->calculate(400, $circuitId, $grp_or_zone);

                $price = ($val5 * 5) + ($val10 * 5) + ($val15 * 5) + ($val20 * 5) + ($val25 * 5) + ($val30 * 5) + ($val35 * 5) + ($val40 * $maxCalculat);
                $price /= $maxPer10g;
            }

        }
        elseif ($circuitId == 7)
        { // 100 g

            if ($max < 200)
            {
                $price = $this->calculate(100, $circuitId, $grp_or_zone);

            }
            elseif ($max >= 200 && $max < 300)
            {
                $price = $this->calculate(200, $circuitId, $grp_or_zone);
            }
            elseif ($max >= 300 && $max < 400)
            {
                // dd($max);
                $price = $this->calculate(300, $circuitId, $grp_or_zone);
            }
            elseif ($max >= 400 && $max < 500)
            {
                $price = $this->calculate(400, $circuitId, $grp_or_zone);
            }
            elseif ($max >= 500 && $max < 600)
            {
                $price = $this->calculate(500, $circuitId, $grp_or_zone);
            }
            elseif ($max >=600  && $max < 700)
            {
                $price = $this->calculate(600, $circuitId, $grp_or_zone);
            }
            elseif ($max >=700  && $max < 800)
            {
                $price = $this->calculate(700, $circuitId, $grp_or_zone);
            }
            elseif ($max >=800  && $max < 900)
            {
                $price = $this->calculate(800, $circuitId, $grp_or_zone);
            }
            elseif ($max >=900  && $max < 1000)
            {
                $price = $this->calculate(900, $circuitId, $grp_or_zone);
            }
            else
            {
                $price = $this->calculate(1000, $circuitId, $grp_or_zone);
            }
        }
        else
        {
            $val = GroupOrZone::where('max', $max)->where('circuit_id', $circuitId)->where('grp_or_zone', $grp_or_zone)->first();

            if (is_null($val))
            {
                $price = 0;
            }
            else
            {
                $price = intval($val->charge);
            }
            // return (int)$price;

        }
        return response(['msg' => 'Success', 'dataMrc' => $price]);

    }

    // MRC for Colocation demand note
    public function colocationMrcCalculate(Request $request)
    {

        $customerId = $request->customer_id;
        $circuitId = $request->circuit_id;
        $max = $request->max;

        if($circuitId == 6){
        $max = 10;
        }elseif($circuitId == 7){
        $max = 100;
        } // jodi circuit wise max calculate na hoy


        $existingDemandNote = $this->colocationExistingDemandNoteCheck($customerId, $circuitId);

        $groupOrZone = GroupOrZone::where('id', $request->grp_or_zone)
            ->first();
        $grp_or_zone = $groupOrZone->grp_or_zone;

        $price = 0;

        if ($existingDemandNote != '')
        {
            $oldMax = $this->colocationExistingData($customerId, $circuitId);
            $max += $oldMax; // New Demand note + Existing Demand note

        }

        if ($circuitId == 6)
        { //
            $maxPer10g = $max / 10;
            if ($max > 0 && $max <= 10)
            {
                $price = $this->calculate(10, $circuitId, $grp_or_zone);
            }
            elseif ($max > 10 && $max <= 20)
            {
                $priceOld = $this->calculate(10, $circuitId, $grp_or_zone);
                $priceNew = $this->calculate(20, $circuitId, $grp_or_zone);
                $price = $priceNew - $priceOld;
            }
            elseif ($max > 20 && $max <= 30)
            {
                $priceOld = $this->calculate(20, $circuitId, $grp_or_zone);
                $priceNew = $this->calculate(30, $circuitId, $grp_or_zone);
                $price = $priceNew - $priceOld;
            }
            elseif ($max > 30 && $max <= 40)
            {
                $priceOld = $this->calculate(30, $circuitId, $grp_or_zone);
                $priceNew = $this->calculate(40, $circuitId, $grp_or_zone);
                $price = $priceNew - $priceOld;

            }elseif ($max > 40 && $max <= 50) {
               $priceOld = $this->calculate(40, $circuitId, $grp_or_zone);
               $priceNew = $this->calculate(50, $circuitId, $grp_or_zone);
               $price = $priceNew - $priceOld;
            }elseif ($max > 50 && $max <= 60) {
                $priceOld = $this->calculate(50, $circuitId, $grp_or_zone);
                $priceNew = $this->calculate(60, $circuitId, $grp_or_zone);
                $price = $priceNew - $priceOld;
            }elseif ($max > 60 && $max <= 70) {
                $priceOld = $this->calculate(60, $circuitId, $grp_or_zone);
                $priceNew = $this->calculate(70, $circuitId, $grp_or_zone);
                $price = $priceNew - $priceOld;
            }elseif ($max > 70 && $max <= 80) {
                $priceOld = $this->calculate(70, $circuitId, $grp_or_zone);
                $priceNew = $this->calculate(80, $circuitId, $grp_or_zone);
                $price = $priceNew - $priceOld;
            }elseif ($max > 80 && $max <= 90) {
               $priceOld = $this->calculate(80, $circuitId, $grp_or_zone);
               $priceNew = $this->calculate(90, $circuitId, $grp_or_zone);
               $price = $priceNew - $priceOld;

            }elseif ($max > 90 && $max <= 100) {
                $priceOld = $this->calculate(90, $circuitId, $grp_or_zone);
                $priceNew = $this->calculate(100, $circuitId, $grp_or_zone);
                $price = $priceNew - $priceOld;

            }elseif ($max > 100 && $max <= 200) {
                $price = $this->calculate(200, $circuitId, $grp_or_zone);

            }elseif ($max > 200 && $max <= 300) {
                $price = $this->calculate(300, $circuitId, $grp_or_zone);

            }else{
                $price = $this->calculate(400, $circuitId, $grp_or_zone);
            }

        }
        elseif ($circuitId == 7)
        { // 100 g
            if ($max < 300)
            {
                $price = $this->calculate(300, $circuitId, $grp_or_zone);
            }
            else
            {
                $price = $this->calculate(400, $circuitId, $grp_or_zone);
            }
        }
        else
        {
            $val = GroupOrZone::where('circuit_id', $circuitId)->where('grp_or_zone', $grp_or_zone)->first();

            if (is_null($val))
            {
                $price = 0;
            }
            else
            {
                $price = intval($val->charge);
            }
            // return (int)$price;

        }

        return response(['msg' => 'Success', 'dataMrc' => $price]);

    }

    public function createDemandNote(Request $request)
    {
        //    return $request->all();
        $count_demand_note = 1;
        $existCustomer = $this->existingCustomer($request->customer_id, $request->service_id);

        if ($existCustomer)
        {
            $coutnDemandNote = $this->countCustomerDemandNote($request->customer_id, $request->service_id);
            $count_demand_note += $coutnDemandNote;
        }

        if ($request->service_id == 7)
        {
            $request->max = $request->qty;
        }
        // if ($request->circuit_id == 7)
        // {
        //     $request->max = 10;
        // }
        $groupZoneInfo = (new ServiceController)->idWiseGroupZoneInfo($request->grp_or_zone);
        $groupId = $groupZoneInfo->grp_or_zone;
        try
        {
            // DemandNote::create($request->all());
            $data = new DemandNote();
            $data->count_demand_note = $count_demand_note;
            $data->customer_id = $request->customer_id;
            $data->service_id = $request->service_id;
            $data->sub_service_id = $request->sub_service_id;
            $data->capacity_id = $request->capacity_id;
            $data->grp_or_zone = $request->grp_or_zone;
            $data->charge = $request->charge;
            $data->circuit_id = $request->circuit_id;
            $data->discount = $request->discount;
            $data->qty = $request->qty;
            $data->group_id = $groupId;
            $data->mrc = $request->mrc;
            $data->max = $request->max;
            $data->country = $request->country;
            $data->port = $request->port;
            $data->portqty = $request->portqty;
            $data->specialDiscount = $request->specialDiscount;
            $data->deposit = $request->deposit;
            $data->add_sub = $request->byCalculate;
            $data->remarks = $request->remarks;
            $data->save();

            return response(['msg' => 'Success', 'redirect' => route('find.demand.note')
            ], 200);
        }
        catch(\Exception $e)
        {
            echo $e->getMessage();
        }
    }

    public function createCoLocationDemandNote(Request $request)
    {

        if ($request->circuit_id == 14)
        {
            $request->capacity_id = 0;
            $request->max = 0;
            $request->sub_service_id = 0;
            $groupId = $request->grp_or_zone;
        }else{
            $groupZoneInfo = (new ServiceController)->idWiseGroupZoneInfo($request->grp_or_zone);
            $groupId = $groupZoneInfo->grp_or_zone;
        }

        $count_demand_note = 1;
        $existCustomer = $this->existingColocationCustomer($request->customer_id, $request->service_id);

        if ($existCustomer)
        {
            $coutnDemandNote = $this->countColocationCustomerDemandNote($request->customer_id, $request->service_id);
            $count_demand_note += $coutnDemandNote;
        }


         if ($request->circuit_id == 7)
         {
            $request->max = 100;
         }

         if ($request->circuit_id == 6)
         {
            $request->max = 10;
         }

        try
        {
            $data = new ColocationDemandNote();
            $data->count_demand_note = $count_demand_note;
            $data->customer_id = $request->customer_id;
            $data->service_id = $request->service_id;
            $data->sub_service_id = $request->sub_service_id;
            $data->capacity_id = $request->capacity_id;
            $data->grp_or_zone = $request->grp_or_zone;
            $data->group_id = $groupId;
            $data->charge = $request->charge;
            $data->circuit_id = $request->circuit_id;
            $data->mrc = $request->mrc;
            $data->mrc2 = $request->mrc2;
            $data->max = $request->max;
            $data->rack = $request->rack;
            $data->Power = $request->Power;
            $data->PowerQty = $request->PowerQty;
            $data->rackQty = $request->rackQty;
            $data->specialDiscount = $request->specialDiscount;
            $data->discount = $request->discount;
            $data->deposit = $request->deposit;
            $data->add_sub = $request->byCalculate;
            $data->remarks = $request->remarks;
            $data->save();

            return response(['msg' => 'Success'

            ], 200);
        }
        catch(\Exception $e)
        {
            echo $e->getMessage();
        }
    }

    public function demandNoteActivation(Request $request)
    {
        try
        {
            $activation = DemandNote::find($request->id);
            $activation->approved_date = $request->approved_date;
            $activation->circuit_designation = $request->circuit_designation;
            $activation->backhole_port = $request->backhole_port;
            $activation->approval_status = $request->approval_status;
            // $activation->remarks = $request->remarks;
            $activation->save();

            return response(['msg' => 'Success'

            ], 200);

        }
        catch(\Exception $e)
        {
            echo $e->getMessage();
        }

    }

    public function colocationDemandNoteActivation(Request $request)
    {
        try
        {

            $activation = ColocationDemandNote::find($request->id);
            $activation->approved_date = $request->approved_date;
            $activation->circuit_designation = $request->circuit_designation;
            $activation->backhole_port = $request->backhole_port;
            $activation->approval_status = $request->approval_status;
            $activation->remarks = $request->remarks;
            $activation->save();

            return response(['msg' => 'Success'

            ], 200);

        }
        catch(\Exception $e)
        {
            echo $e->getMessage();
        }

    }

    public function getInvoiceCustomer(Request $request)
    {

        $data = DemandNote::with('customers')->where('circuit_id', $request->circuit_id)
            ->where('approval_status', 2)
            ->orderBy('id', 'desc')
            ->get();

        return response(['msg' => 'success', 'data' => $data, ]);

    }

    public function getServiceSubServiceGroupZoneWiseCustomer(Request $request)
    {

        $data = $this->getServiceSubServiceGroupZoneWiseCustomerInfo($request->service_id, $request->sub_service_id, $request->lincenceId, $request->grp_or_zone_id);

        $data = $data->groupBy('customer_id');

        return response(['msg' => 'success', 'data' => $data, ]);

    }

    public function getServiceSubServiceGroupZoneCustomerWiseDemandNoteInfo($request)
    {
        // dd($request->customer_id);
        if ($request->customer_id != 0)
        {
            $data = DemandNote::where('service_id', $request->service_id)
                ->where('sub_service_id', $request->sub_service_id)
                ->where('customer_id', $request->customer_id)
                ->where('group_id', $request->grp_or_zone_id)
                ->where('approval_status', 2)
                ->orderBy('id', 'desc')
                ->get();
        }
        else
        {
            $data = DemandNote::where('service_id', $request->service_id)
                ->where('sub_service_id', $request->sub_service_id)
                ->where('group_id', $request->grp_or_zone_id)
                ->where('approval_status', 2)
                ->orderBy('id', 'desc')
                ->get();
        }
        // dd($data);
        return DemandNoteResource::collection($data);
    }

    public function getServiceGroupZoneCustomerWiseColocationDemandNoteInfo($request)
    {
        if ($request->customer_id != 0)
        {
            $data = ColocationDemandNote::where('service_id', $request->service_id)
                ->where('customer_id', $request->customer_id)
                ->where('group_id', $request->grp_or_zone_id)
                ->where('approval_status', 2)
                ->orderBy('id', 'desc')
                ->get();
        }
        else
        {
            $data = ColocationDemandNote::where('service_id', $request->service_id)
                ->where('group_id', $request->grp_or_zone_id)
                ->where('approval_status', 2)
                ->orderBy('id', 'desc')
                ->get();
        }
        return ColocationDemandNoteResource::collection($data);
    }

    public function getServiceSubServiceGroupZoneCustomerWiseDemandNote(Request $request)
    {
        $data = $this->getServiceSubServiceGroupZoneCustomerWiseDemandNoteInfo($request);
        // dd( $data);

        // $data = $data->groupBy('customer_id');
        $formatedData = [];
        foreach ($data as $key => $d)
        {
            $formatedData[$d->customer_id] = $d;
        }

        return response(['msg' => 'success', 'data' => $formatedData, ]);

    }

    // Demand note Report comon function
    public function getServiceSubServiceGroupZoneCustomerWiseDemandNotereportList($request)
    {
        if ($request->customer_id != 0)
        {
            $data = DemandNote::where('service_id', $request->service_id)
                ->where('sub_service_id', $request->sub_service_id)
                ->where('customer_id', $request->customer_id)
                ->where('group_id', $request->grp_or_zone_id)
                ->where('approval_status', 2)
                ->orderBy('id', 'desc')
                ->get();
        }
        else
        {
            $data = DemandNote::where('service_id', $request->service_id)
                ->where('sub_service_id', $request->sub_service_id)
                ->where('group_id', $request->grp_or_zone_id)
                ->where('approval_status', 2)
                ->orderBy('id', 'desc')
                ->get();
        }
        return DemandNoteReportResource::collection($data);
    }


    public function monthWiseTotalRevenueReportComonMethod($request)
    {
        $a= DB::table('demand_notes')
        ->select(DB::raw('service_id'));

       $b = DB::table('colocation_demand_notes')
        ->select(DB::raw('service_id'))

            //$a = DemandNote::where('approval_status', 2);

            //$b = ColocationDemandNote::where('approval_status', 2)
                ->unionAll($a)
                ->get();

        return TotalRevenueReportResource::collection($b);
    }


    // demandnote repot method
    public function getServiceSubServiceGroupZoneCustomerWiseDemandNoteReport(Request $request)
    {

        $data = $this->getServiceSubServiceGroupZoneCustomerWiseDemandNotereportList($request);

        // $data = $data->groupBy('customer_id');
        $formatedData = [];
        foreach ($data as $key => $d)
        {
            $formatedData[$d->customer_id] = $d;
        }

        return response(['msg' => 'success', 'data' => $formatedData, ]);

    }


    public function monthWiseTotalRevenueReport(Request $request)
    {
        // dd($request->all());
        // return $request->all();
        $data = $this->monthWiseTotalRevenueReportComonMethod($request);

        $formatedData = [];

        // foreach ($data as $key => $d)
        // {
        //     $formatedData[$d->customer_id] = $d;
        // }

        return response(['msg' => 'success', 'data' => $data, ]);

    }


    public function getCircuitType(Request $request)
    {
        //  $data =DemandNote::with(['zonelist'])->where('circuit_id',$request->circuit_id)->orderBy('id','desc')->get();
        $data = $this->customerIdWiseDemandNote($request->customer_id);

        return response(['msg' => 'success', 'data' => $data], 200);

    }

    public function customerIdWiseTotalCalculation($id)
    {

        $data = $this->customerIdWiseTotalBandwidthCalculation($id);

        return response(['data' => $data, ], 200);
    }

    public function customerIdAndPopWiseTotalCalculation($id,$groupZoneId)
    {
        // dd($groupZoneId);
        $groupZoneInfo = (new ServiceController)->idWiseGroupZoneInfo($groupZoneId);
        $groupId = $groupZoneInfo->grp_or_zone;
        // dd($groupId);
        $data = $this->customerIdAndPopWiseWiseTotalBandwidthCalculation($id, $groupId);
        // dd($data);
        return response(['data' => $data, ], 200);
    }

    public function customerIdWiseFirstActivationDate($id)
    {

        $fDate = $this->customerIdWiseFirstActivationDateCheck($id);

        return response(['fDate' => $fDate->approved_date], 200);
    }

    // colocation service port
    public function getServiceGroupZoneWiseColocationCustomer(Request $request)
    {

        // return $request->grp_or_zone_id;
        // return $request->service_id;
        $data = $this->getServiceAndGroupZoneWiseIplcColocationCustomerInfo($request->service_id, $request->grp_or_zone_id);

        $data = $data->groupBy('customer_id');

        return response(['msg' => 'success', 'data' => $data, ]);

    }

    // colocation power

    public function getServiceAndGroupZoneWiseIplcColocationPowerCustomerInfo($serviceId, $groupId)
    {
    // return ColocationDemandNote::all();
    return $data = ColocationDemandNote::with('customers')
    ->where('service_id', $serviceId)->where('group_id',$groupId)
    ->where('approval_status', 2)
    ->orderBy('id', 'desc')
    ->get();

    }

     public function getServiceGroupZoneWiseColocationPowerCustomer(Request $request)
     {
     $data = $this->getServiceAndGroupZoneWiseIplcColocationPowerCustomerInfo($request->service_id,
     $request->grp_or_zone_id);

     $data = $data->groupBy('customer_id');

     return response(['msg' => 'success', 'data' => $data, ]);

     }




    public function getServiceGroupZoneCustomerWiseColocationDemandNote(Request $request)
    {
        // return $request->all();

        $data = $this->getServiceGroupZoneCustomerWiseColocationDemandNoteInfo($request);

        $formatedData = [];
        foreach ($data as $key => $d)
        {
            $formatedData[$d->customer_id] = $d;
        }

        return response(['msg' => 'success', 'data' => $formatedData,]);

    }

    public function getconnectionInformation($customerId,$sub_service_id){
        $customerCircuits =DemandNote::with('circuit')
        ->where('approval_status', 2)
        ->where('customer_id',$customerId)
        ->where('sub_service_id',$sub_service_id)
        ->select( 'circuit_id')
        ->groupBy('circuit_id')
        ->get();

        $data = [];
        foreach ($customerCircuits as $key => $c)
        {
            $data[] = [
                'name' => $c->circuit->circuit_name,
                'id' => $c->circuit_id,
                'qty' =>DemandNote::where('circuit_id',$c->circuit_id)
                ->where('approval_status',2)
                ->where('sub_service_id',$sub_service_id)
                ->where('customer_id',$customerId)->count(),
            ];
        }
        return response(['msg' => 'success', 'data' => $data]);


    }

}