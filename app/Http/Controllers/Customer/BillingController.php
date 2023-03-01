<?php
namespace App\Http\Controllers\Customer;

use App\Models\DemandNote;
use Illuminate\Http\Request;
use App\Models\Customer\Invoice;
use App\Models\Customer\Customer;
use App\Http\Controllers\Controller;
use App\Models\ColocationDemandNote;
use App\Models\Configuration\Service;
use App\Models\Customer\CustomerType;
use App\Models\Configuration\GroupOrZone;
use App\Http\Controllers\Configuration\ServiceController;

class BillingController extends Controller
{

    public function calculate($max, $circuitId, $grp_or_zone)
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
        return (int)$price;
    }

    public function mrcCalculate($max, $circuitId, $grp_or_zone, $countCircuit6)
    {
        $price = 0;
        if ($circuitId == 5)
        { //stm 16
            if ($max >= 0 && $max <= 30)
            {
                return $price = $this->calculate(30, $circuitId, $grp_or_zone);
            }
            elseif ($max > 30 && $max <= 50)
            {
                return $price = $this->calculate(50, $circuitId, $grp_or_zone);
            }
            elseif ($max > 50 && $max <= 100)
            {
                // return $max;
                return $price = $this->calculate(100, $circuitId, $grp_or_zone);
            }
            elseif ($max > 100 && $max <= 150)
            {
                return $price = $this->calculate(150, $circuitId, $grp_or_zone);
            }
            elseif ($max > 150 && $max <= 200)
            {
                return $price = $this->calculate(200, $circuitId, $grp_or_zone);
            }
            else
            {
                return $price = $this->calculate(220, $circuitId, $grp_or_zone);
            }

        }
        if ($circuitId == 6)
        { // 10g
            if ($max >= 0 && $max <= 50)
            {
                $price = $this->calculate(50, $circuitId, $grp_or_zone);
                return $price * $countCircuit6;

            }
            elseif ($max > 50 && $max <= 100)
            {
                $maxCalculat = $countCircuit6 - 5;
                $val5 = $this->calculate(50, $circuitId, $grp_or_zone);
                $val10 = $this->calculate(100, $circuitId, $grp_or_zone);
                return $price = ($val5 * 5) + ($val10 * $maxCalculat);

            }
            elseif ($max > 100 && $max <= 150)
            {
                $maxCalculat = $countCircuit6 - 10;
                $val5 = $this->calculate(50, $circuitId, $grp_or_zone);
                $val10 = $this->calculate(100, $circuitId, $grp_or_zone);
                $val15 = $this->calculate(150, $circuitId, $grp_or_zone);

                return $price = ($val5 * 5) + ($val10 * 5) + ($val15 * $maxCalculat);

            }
            elseif ($max > 150 && $max <= 200)
            {
                $maxCalculat = $countCircuit6 - 15;
                $val5 = $this->calculate(50, $circuitId, $grp_or_zone);
                $val10 = $this->calculate(100, $circuitId, $grp_or_zone);
                $val15 = $this->calculate(150, $circuitId, $grp_or_zone);
                $val20 = $this->calculate(200, $circuitId, $grp_or_zone);

                return $price = ($val5 * 5) + ($val10 * 5) + ($val15 * 5) + ($val20 * $maxCalculat);

            }
            elseif ($max > 200 && $max <= 250)
            {
                $maxCalculat = $countCircuit6 - 20;
                $val5 = $this->calculate(50, $circuitId, $grp_or_zone);
                $val10 = $this->calculate(100, $circuitId, $grp_or_zone);
                $val15 = $this->calculate(150, $circuitId, $grp_or_zone);
                $val20 = $this->calculate(200, $circuitId, $grp_or_zone);
                $val25 = $this->calculate(250, $circuitId, $grp_or_zone);

                return $price = ($val5 * 5) + ($val10 * 5) + ($val15 * 5) + ($val20 * 5) + ($val25 * $maxCalculat);

            }
            elseif ($max > 250 && $max <= 300)
            {
                $maxCalculat = $countCircuit6 - 25;
                $val5 = $this->calculate(50, $circuitId, $grp_or_zone);
                $val10 = $this->calculate(100, $circuitId, $grp_or_zone);
                $val15 = $this->calculate(150, $circuitId, $grp_or_zone);
                $val20 = $this->calculate(200, $circuitId, $grp_or_zone);
                $val25 = $this->calculate(250, $circuitId, $grp_or_zone);
                $val30 = $this->calculate(300, $circuitId, $grp_or_zone);

                return $price = ($val5 * 5) + ($val10 * 5) + ($val15 * 5) + ($val20 * 5) + ($val25 * 5) + ($val30 * $maxCalculat);

            }
            elseif ($max > 300 && $max <= 350)
            {
                $maxCalculat = $countCircuit6 - 30;
                $val5 = $this->calculate(50, $circuitId, $grp_or_zone);
                $val10 = $this->calculate(100, $circuitId, $grp_or_zone);
                $val15 = $this->calculate(150, $circuitId, $grp_or_zone);
                $val20 = $this->calculate(200, $circuitId, $grp_or_zone);
                $val25 = $this->calculate(250, $circuitId, $grp_or_zone);
                $val30 = $this->calculate(300, $circuitId, $grp_or_zone);
                $val35 = $this->calculate(350, $circuitId, $grp_or_zone);

                return $price = ($val5 * 5) + ($val10 * 5) + ($val15 * 5) + ($val20 * 5) + ($val25 * 5) + ($val30 * 5) + ($val35 * $maxCalculat);

            }
            else
            {
                $maxCalculat = $countCircuit6 - 35;
                $val5 = $this->calculate(50, $circuitId, $grp_or_zone);
                $val10 = $this->calculate(100, $circuitId, $grp_or_zone);
                $val15 = $this->calculate(150, $circuitId, $grp_or_zone);
                $val20 = $this->calculate(200, $circuitId, $grp_or_zone);
                $val25 = $this->calculate(250, $circuitId, $grp_or_zone);
                $val30 = $this->calculate(300, $circuitId, $grp_or_zone);
                $val35 = $this->calculate(350, $circuitId, $grp_or_zone);
                $val40 = $this->calculate(400, $circuitId, $grp_or_zone);

                return $price = ($val5 * 5) + ($val10 * 5) + ($val15 * 5) + ($val20 * 5) + ($val25 * 5) + ($val30 * 5) + ($val35 * 5) + ($val40 * $maxCalculat);
            }

        }

        elseif ($circuitId == 7)
        { // 100 g
            if ($max < 200)
            {
                return $price = $this->calculate(100, $circuitId, $grp_or_zone);
            }
            elseif ($max >= 200 && $max < 300)
            {
                return $price = $this->calculate(200, $circuitId, $grp_or_zone);
            }
            elseif ($max >= 300 && $max < 400)
            {
                return $price = $this->calculate(300, $circuitId, $grp_or_zone);
            }
            else
            {
                return $price = $this->calculate(400, $circuitId, $grp_or_zone);
            }
        }
        else
        {
            // $price = $this->calculate(0, $circuitId, $grp_or_zone);
            // return;
            $val = GroupOrZone::where('circuit_id', $circuitId)->where('grp_or_zone', $grp_or_zone)->first();
            // if($circuitId == 10){
            //   dd("asdad",$val);
            // }
            if (is_null($val))
            {
                $price = 0;
            }
            else
            {
                $price = intval($val->charge);
            }

        }

        return $price;

    }

    public function iptransitMrcCalculate($max, $circuitId, $grp_or_zone)
    { //ip transit isp or iig
        // return $grp_or_zone;
        if ($max > 0 && $max < 5000)
        {
            $max = 5000;
        }
        elseif ($max >= 5000 && $max < 10000)
        {
            $max = 10000;
        }
        elseif ($max >= 10000 && $max < 20000)
        {
            $max = 20000;
        }
        elseif ($max >= 20000 && $max < 30000)
        {
            $max = 30000;
        }
        elseif ($max >= 30000 && $max < 40000)
        {
            $max = 40000;
        }
        elseif ($max >= 40000 && $max < 50000)
        {
            $max = 50000;
        }
        elseif ($max >= 50000 && $max < 65000)
        {
            $max = 65000;
        }
        elseif ($max >= 65000 && $max < 80000)
        {
            $max = 80000;
        }
        elseif ($max >= 80000 && $max < 100000)
        {
            $max = 100000;
        }
        else
        {
            $max = 110000;
        }

        return $price = $this->calculate($max, $circuitId, $grp_or_zone);

    }

    public function colocationMrcCalculate($max, $circuitId, $grp_or_zone, $maxPer10g)
    {

        if ($circuitId == 6)
        {
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
            elseif ($max > 30 && $max <= 40)
            {
                $price = $this->calculate(40, $circuitId, $grp_or_zone);

            }
            elseif ($max > 40 && $max <= 50)
            {
                $price = $this->calculate(50, $circuitId, $grp_or_zone);
            }
            elseif ($max > 50 && $max <= 60)
            {
                $price = $this->calculate(60, $circuitId, $grp_or_zone);
            }
            elseif ($max > 60 && $max <= 70)
            {
                $price = $this->calculate(70, $circuitId, $grp_or_zone);
            }
            elseif ($max > 70 && $max <= 80)
            {
                $price = $this->calculate(80, $circuitId, $grp_or_zone);
            }
            elseif ($max > 80 && $max <= 90)
            {
                $price = $this->calculate(90, $circuitId, $grp_or_zone);
            }
            elseif ($max > 90 && $max <= 100)
            {
                $price = $this->calculate(100, $circuitId, $grp_or_zone);
            }
            elseif ($max > 100 && $max <= 200)
            {
                $maxCalculat = $maxPer10g - 10;
                $price10 = $this->calculate(100, $circuitId, $grp_or_zone);

                $price20 = $this->calculate(200, $circuitId, $grp_or_zone);

                $price = $price10  + ($price20 * $maxCalculat);

            }
            elseif ($max > 200 && $max <= 300)
            {
                $maxCalculat = $maxPer10g - 20;
                $price10 = $this->calculate(100, $circuitId, $grp_or_zone);
                $price20 = $this->calculate(200, $circuitId, $grp_or_zone);
                $price30 = $this->calculate(300, $circuitId, $grp_or_zone);
                $price = $price10 + ($price20 * 10) + ($price30 * $maxCalculat);

            }
            else
            {
                $maxCalculat = $maxPer10g - 30;
                $price10 = $this->calculate(100, $circuitId, $grp_or_zone);
                $price20 = $this->calculate(200, $circuitId, $grp_or_zone);
                $price30 = $this->calculate(300, $circuitId, $grp_or_zone);
                $price40 = $this->calculate(400, $circuitId, $grp_or_zone);
                $price = $price10 + ($price20 * 10) + ($price30 * 10) + ($price40 * $maxCalculat);
            }

        }
        elseif ($circuitId == 7)
        { // 100 g
            if ($max <= 300)
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

        }
        return (int)$price;

    }


    public function colocationPowerRackCalculate($customerId, $group_id){
        $price = ColocationDemandNote::where('customer_id',$customerId)->where('group_id',$group_id)->get();
        $mrc2 = 0;
        foreach($price as $data){
            $mrc2+= $data->mrc2;
        }
        return $mrc2;
    }



    public function checkPrevMonthDemandNoteActiveInactive($customerId)
    {

        $from = date("Y-m-d", mktime(0, 0, 0, date("m") - 1, 1));
        $to = date("Y-m-d", mktime(0, 0, 0, date("m") , 0));

        return $fDate = DemandNote::where('customer_id', $customerId)->whereBetween('approved_date', [$from, $to])->first();

        // $Y_M = date("Y-m", strtotime($from));
        // $Y = date("Y", strtotime($from));
        // $m = date("m", strtotime($from));
        // $number = cal_days_in_month(CAL_GREGORIAN, $m, $Y);
        // $from = date("Y-m-d", strtotime($Y_M.'-01'));
        // $to = date("Y-m-d", strtotime($Y_M.'-'.$number));

    }

    public function dayCountWiseBillCalculation()
    {

    }

    public function getBills()
    {

        $data = Invoice::with(['services', 'customers', 'demand'])->orderby('id', 'desc')
            ->get();

        return response(['msg' => 'success', 'data' => $data]);
    }

    public function storeInvoice(Request $request)
    {

        try
        {

            $invoice = new Invoice();
            $invoice->service_id = $request->service_id;
            $invoice->circuit_id = $request->circuit_id;
            $invoice->demand_note_id = $request->demand_note_id;
            $invoice->grp_or_zone = $request->grp_or_zone;
            $invoice->customer_id = $request->customer_id;
            $invoice->inv_date = $request->inv_date;
            $invoice->save();

            return response(['msg' => 'success'], 200);

        }
        catch(\Exception $e)
        {

            echo $e->getMessage();
        }

    }

}