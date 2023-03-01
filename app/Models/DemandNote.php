<?php
namespace App\Models;

use App\Models\Port;
use App\Models\Customer\Group;
use App\Models\CircuitCategory;
use App\Models\Customer\Customer;
use App\Models\Configuration\Service;
use App\Models\Customer\CustomerType;
use App\Models\Customer\LandingStation;
use Illuminate\Database\Eloquent\Model;
use App\Models\Configuration\SubService;
use App\Models\Configuration\GroupOrZone;
use Spatie\Activitylog\Traits\LogsActivity;
use App\Models\Configuration\TariffCapacity;
use App\Http\Controllers\Customer\BillingController;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DemandNote extends Model
{
    use HasFactory, LogsActivity;

    protected $table = 'demand_notes';

    protected $guarded = [];

    // protected $fillable = [
    //     'customer_id', 'service_id', 'sub_service_id', 'capacity_id', 'grp_or_zone',
    //     'charge', 'discount', 'deposit', 'status', 'qty', 'mrc'
    // ];
    public function customers()
    {
        return $this->belongsTo(Customer::class , 'customer_id');
    }

    public function services()
    {
        return $this->belongsTo(Service::class , 'service_id');
    }

    public function subservice()
    {
        return $this->belongsTo(SubService::class , 'sub_service_id');
    }

    public function capacity()
    {
        return $this->belongsTo(TariffCapacity::class , 'capacity_id')
            ->withDefault(['capacity_name' => 'Not Found Capacity']);
    }

    public function circuit()
    {
        return $this->belongsTo(CircuitCategory::class , 'circuit_id');
    }
    
    public function circuit_categories()
    {
        return $this->belongsTo(CircuitCategory::class );
    }
    public function zonelist()
    {
        return $this->belongsTo(GroupOrZone::class , 'grp_or_zone');
    }

    public function ports()
    {
        return $this->belongsTo(Port::class , 'port');
    }

    public function groups()
    {
        return $this->belongsTo(Group::class , 'group_id')
            ->withDefault(['group_name' => 'Not Found a Group']);
    }

    public function countries()
    {
        return $this->belongsTo(LandingStation::class , 'country');
    }

    // public function zone(){
    //     return $this->belongsTo(Group::class,'group_id');
    // }
    public function customerIdWiseTotalBandwidthCalculation($customerId)
    {
        $total = $this->where('customer_id', $customerId)->where('approval_status', 2)->sum('max');
        $data = $this->where('customer_id', $customerId)->where('approval_status', 2)->sum('downgrade');
        return $total - $data;
    }

    public function customerIdAndCableWiseTotalBandwidthCalculation($customerId, $serviceId, $subServiceId, $groupId)
    {

        if ($serviceId == 1)
        {
            $var = $subServiceId;
            $colName = 'sub_service_id';

            return $data = $this->where('customer_id', $customerId)->where('approval_status', 2)
             ->where($colName, $var)->sum('max');
        }
        else
        {
            $colName = 'group_id';
            $var = $groupId;

             $total = $this->where('customer_id', $customerId)->where($colName, $var)->where('approval_status',
             2)->sum('max');
             $data = $this->where('customer_id', $customerId)->where($colName, $var)->where('approval_status',
             2)->sum('downgrade');
             return $total - $data;
        }




    }

    public function customerIdWiseFirstActivationDateCheck($id)
    {
        return $fDate = $this->where('customer_id', $id)->first('approved_date');
    }

    public function getCablWiseCircuits($customerId, $subServiceId)
    {
        $customerCircuits = $this->where('approval_status', 2)
            ->where('customer_id', $customerId)->where('sub_service_id', $subServiceId)->get();
        $cData = [];
        foreach ($customerCircuits as $key => $c)
        {
            $cData[] = ['name' => $c
                ->circuit->circuit_name, 'id' => $c->circuit_id, 'remarks' => $c->remarks, 'approved_date' => $c->approved_date, 'charge' => $c->charge, 'max' => $c->max, 'discount' => $c->discount, 'mrc' => $c->mrc, ];
        }
        return $cData;
    }

    public function getCircuits($customerId)
    {
        $customerCircuits = $this->where('approval_status', 2)
            ->where('customer_id', $customerId)->get();
        $cData = [];
        foreach ($customerCircuits as $key => $c)
        {
            $cData[] = ['name' => $c
                ->circuit->circuit_name, 'id' => $c->circuit_id, ];
        }
        return $cData;
    }

    public function getCablAndGroupWiseCircuits($customerId, $subServiceId, $groupId)
    {
        $customerCircuits = $this->where('approval_status', 2)
            ->where('customer_id', $customerId)->where('group_id', $groupId)->where('sub_service_id', $subServiceId)->get();

        $cData = [];
        foreach ($customerCircuits as $key => $c)
        {
            $cData[] = ['name' => $c->circuit->circuit_name,
             'id' => $c->circuit_id,
             'remarks' => $c->remarks,
             'circuit_designation' => $c->circuit_designation,
             'approved_date' => $c->approved_date,
             'charge' => $c->charge, 'max' => $c->max,
             'discount' => $c->discount, 'mrc' => $c->mrc, ];
        }
        return $cData;
    }

    public function checkPrevMonthDemandNoteInActiveInactive($customerId)
    {
        $billingConObj = new BillingController();
        return $PrevMonthDemandNoteActiveInactiveChech = $billingConObj->checkPrevMonthDemandNoteActiveInactive($customerId);
    }

    public function getCircuitsWiseBill($customerId, $subServiceId, $group_id, $service_id, $circuit_id)
    {

        $billingConObj = new BillingController();
        $allCircuitData = $this->getCircuits($customerId);
        $cableWiseCircuitData = $this->getCablWiseCircuits($customerId, $subServiceId);
        $CablAndGroupWiseCircuits = $this->getCablAndGroupWiseCircuits($customerId, $subServiceId, $group_id);
        $max = $this->customerIdWiseTotalBandwidthCalculation($customerId);
        $maxManipulate = $this->customerIdWiseTotalBandwidthCalculation($customerId);

        $price = 0;
        $price100g = 0;
        $price10g = 0;
        $priceStm16 = 0;
        $price1 = 0;
        $price2 = 0;
        $price3 = 0;
        $price4 = 0;
        $price10 = 0;
        $price11 = 0;
        $price12 = 0;
        $price13 = 0;

        $countCircuit1 = 0;
        $countCircuit2 = 0;
        $countCircuit3 = 0;
        $countCircuit4 = 0;
        $countCircuit5 = 0;
        $countCircuit6 = 0;
        $countCircuit7 = 0;
        $countCircuit10 = 0;
        $countCircuit11 = 0;
        $countCircuit12 = 0;
        $countCircuit13 = 0;

        $cableWiseCountCircuit1 = 0;
        $cableWiseCountCircuit2 = 0;
        $cableWiseCountCircuit3 = 0;
        $cableWiseCountCircuit4 = 0;
        $cableWiseCountCircuit5 = 0;
        $cableWiseCountCircuit6 = 0;
        $cableWiseCountCircuit7 = 0;
        $cableWiseCountCircuit10 = 0;
        $cableWiseCountCircuit11 = 0;
        $cableWiseCountCircuit12 = 0;
        $cableWiseCountCircuit13 = 0;

        $cableAndGroupWiseCountCircuit1 = 0;
        $cableAndGroupWiseCountCircuit2 = 0;
        $cableAndGroupWiseCountCircuit3 = 0;
        $cableAndGroupWiseCountCircuit4 = 0;
        $cableAndGroupWiseCountCircuit5 = 0;
        $cableAndGroupWiseCountCircuit6 = 0;
        $cableAndGroupWiseCountCircuit7 = 0;
        $cableAndGroupWiseCountCircuit10 = 0;
        $cableAndGroupWiseCountCircuit11 = 0;
        $cableAndGroupWiseCountCircuit12 = 0;
        $cableAndGroupWiseCountCircuit13 = 0;

        if ($service_id == 1)
        {

            foreach ($cableWiseCircuitData as $key => $circuit)
            {
                if ($circuit['id'] == 1)
                {
                    $cableWiseCountCircuit1++;
                }
                elseif ($circuit['id'] == 2)
                {
                    $cableWiseCountCircuit2++;
                }
                elseif ($circuit['id'] == 3)
                {
                    $cableWiseCountCircuit3++;
                }
                elseif ($circuit['id'] == 4)
                {
                    $cableWiseCountCircuit4++;
                }
                elseif ($circuit['id'] == 5)
                {
                    $cableWiseCountCircuit5++;
                }
                elseif ($circuit['id'] == 6)
                {
                    $cableWiseCountCircuit6++;
                }
                elseif ($circuit['id'] == 7)
                {
                    $cableWiseCountCircuit7++;
                }
                elseif ($circuit['id'] == 10)
                {
                    $cableWiseCountCircuit10++;
                }
                elseif ($circuit['id'] == 11)
                {
                    $cableWiseCountCircuit11++;
                }
                elseif ($circuit['id'] == 12)
                {
                    $cableWiseCountCircuit12++;
                }
                elseif ($circuit['id'] == 13)
                {
                    $cableWiseCountCircuit13++;
                }

            }

            foreach ($CablAndGroupWiseCircuits as $key => $cVal)
            {
                if ($cVal['id'] == 1)
                {
                    $cableAndGroupWiseCountCircuit1++;
                }
                elseif ($cVal['id'] == 2)
                {
                    $cableAndGroupWiseCountCircuit2++;
                }
                elseif ($cVal['id'] == 3)
                {
                    $cableAndGroupWiseCountCircuit3++;
                }
                elseif ($cVal['id'] == 4)
                {
                    $cableAndGroupWiseCountCircuit4++;
                }
                elseif ($cVal['id'] == 5)
                {
                    $cableAndGroupWiseCountCircuit5++;
                }
                elseif ($cVal['id'] == 6)
                {
                    $cableAndGroupWiseCountCircuit6++;
                }
                elseif ($cVal['id'] == 7)
                {
                    $cableAndGroupWiseCountCircuit7++;
                }
                elseif ($cVal['id'] == 10)
                {
                    $cableAndGroupWiseCountCircuit10++;
                }
                elseif ($cVal['id'] == 11)
                {
                    $cableAndGroupWiseCountCircuit11++;
                }
                elseif ($cVal['id'] == 12)
                {
                    $cableAndGroupWiseCountCircuit12++;
                }
                elseif ($cVal['id'] == 13)
                {
                    $cableAndGroupWiseCountCircuit13++;
                }

            }

            foreach ($allCircuitData as $key => $value)
            {

                $cId = $value['id'];
                if ($cId == 1)
                {
                    $countCircuit1++;
                    $price1 = $billingConObj->mrcCalculate($max, $cId, $group_id, $countCircuit1);
                    // $price1 = $price1*$cableWiseCountCircuit1;
                    $price1 = $price1 * $cableAndGroupWiseCountCircuit1;

                }
                elseif ($cId == 2)
                {
                    $countCircuit2++;
                    $price2 = $billingConObj->mrcCalculate($max, $cId, $group_id, $countCircuit2);
                    // $price2 = $price2*$cableWiseCountCircuit2;
                    $price2 = $price2 * $cableAndGroupWiseCountCircuit2;
                }
                elseif ($cId == 3)
                {
                    $countCircuit3++;
                    $price3 = $billingConObj->mrcCalculate($max, $cId, $group_id, $countCircuit3);
                    // $price3 = $price3*$cableWiseCountCircuit3;
                    $price3 = $price3 * $cableAndGroupWiseCountCircuit3;
                }
                elseif ($cId == 4)
                {
                    $countCircuit4++;
                    $price4 = $billingConObj->mrcCalculate($max, $cId, $group_id, $countCircuit4);
                    // $price4 = $price4*$cableWiseCountCircuit4;
                    $price4 = $price4 * $cableAndGroupWiseCountCircuit4;

                }
                elseif ($cId == 10)
                {
                    $countCircuit10++;
                    $price10 = $billingConObj->mrcCalculate($max, $cId, $group_id, $countCircuit10);
                    // $price10 = $price10*$cableWiseCountCircuit10;
                    $price10 = $price10 * $cableAndGroupWiseCountCircuit10;

                }
                elseif ($cId == 11)
                {
                    $countCircuit11++;
                    $price11 = $billingConObj->mrcCalculate($max, $cId, $group_id, $countCircuit11);
                    // $price11 = $price11*$cableWiseCountCircuit11;
                    $price11 = $price11 * $cableAndGroupWiseCountCircuit11;

                }
                elseif ($cId == 12)
                {
                    $countCircuit12++;
                    $price12 = $billingConObj->mrcCalculate($max, $cId, $group_id, $countCircuit12);
                    // $price12 = $price12*$cableWiseCountCircuit12;
                    $price12 = $price12 * $cableAndGroupWiseCountCircuit12;

                }
                elseif ($cId == 13)
                {
                    $countCircuit13++;
                    $price13 = $billingConObj->mrcCalculate($max, $cId, $group_id, $countCircuit13);
                    // $price13 = $price13*$cableWiseCountCircuit13;
                    $price13 = $price13 * $cableAndGroupWiseCountCircuit13;

                }
                elseif ($cId == 5)
                { //stm 16
                    $countCircuit5++;
                    $priceStm16 += $billingConObj->mrcCalculate($max, $cId, $group_id, $countCircuit5);

                }
                elseif ($cId == 6)
                { //10 g
                    $countCircuit6++;
                    // return $group_id.'='.$cId;
                    $maxDiv10 = $max/10;
                    $price10g = $billingConObj->mrcCalculate($max, $cId, $group_id, $maxDiv10);

                }
                elseif ($cId == 7)
                { //100 g
                    $countCircuit7++;
                    $price100g += $billingConObj->mrcCalculate($max, $cId, $group_id, $countCircuit7);
                }
            }


            $priceOfMrcCircuit = 0;

              $maxMult = ($cableAndGroupWiseCountCircuit6 * 10) + $cableAndGroupWiseCountCircuit5 * 2.5;

            if ($price10g !=0 || $priceStm16 !=0)
            {
                $priceOfMrcCircuit = (($price10g + $priceStm16) / $maxManipulate )*$maxMult;

            }

            if($cableAndGroupWiseCountCircuit7 != 0){
                $priceOfMrcCircuit+=$price100g;
            }


            $nonMrcPrice = $price4 + $price3 + $price2 + $price1 + $price10 + $price11 + $price12 + $price13;

            return $priceOfMrcCircuit+$nonMrcPrice;
        }
        else
        {
            return $totalPrice = $billingConObj->iptransitMrcCalculate($max, $circuit_id, $group_id);
        }
    }

}



// Cable wise charge calculation code start =====>>>>>
// if($price10g != 0 || $price100g != 0 || $priceStm16 != 0){
// $priceOf10g = (($price10g + $price100g + $priceStm16) /
// $max)*(($cableWiseCountCircuit6*10)+($cableWiseCountCircuit5*2.5)+ ($cableWiseCountCircuit7*100));
// }
// Cable wise charge calculation code End =====<<<<<<
