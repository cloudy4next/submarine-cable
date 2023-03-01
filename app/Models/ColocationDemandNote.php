<?php
namespace App\Models;

use App\Models\Customer\Group;
use App\Models\CircuitCategory;
use App\Models\Customer\Customer;
use App\Models\Configuration\Service;
use Illuminate\Database\Eloquent\Model;
use App\Models\Configuration\SubService;
use App\Models\Configuration\GroupOrZone;
use Spatie\Activitylog\Traits\LogsActivity;
use App\Models\Configuration\TariffCapacity;
use App\Http\Controllers\Customer\BillingController;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ColocationDemandNote extends Model
{
    use HasFactory, LogsActivity;

    protected $table = 'colocation_demand_notes';

    protected $guarded = [];

    public function customers()
    {

        return $this->belongsTo(Customer::class , 'customer_id')->withDefault(['name' => 'Not Found Customer name']);
    }

    public function services()
    {
        return $this->belongsTo(Service::class , 'service_id');
    }

    public function subservice()
    {
        return $this->belongsTo(SubService::class , 'sub_service_id')->withDefault(['sub_service_name' => 'Not Found Sub-Service']);
    }

    public function capacity()
    {
        return $this->belongsTo(TariffCapacity::class , 'capacity_id')->withDefault(['capacity_name' => 'Not Found
        capacity name']);
    }

    public function circuit()
    {
        return $this->belongsTo(CircuitCategory::class , 'circuit_id')->withDefault(['circuit_name' => 'Not Found
        circuit name']);
    }

    public function zonelist()
    {
        return $this->belongsTo(GroupOrZone::class , 'grp_or_zone')->withDefault(['groups' => 'Not Find a Group',
        ]);
    }

    public function groups()
    {
        return $this->belongsTo(Group::class , 'group_id')->withDefault(['group_name' => 'Not Find a Group', ]);
    }

    public function customerIdWiseTotalBandwidthCalculation($customerId)
    {
        $total = $this->where('customer_id', $customerId)->where('approval_status', 2)
            ->sum('max');
        $data = $this->where('customer_id', $customerId)->where('approval_status', 2)
            ->sum('downgrade');
        return $total - $data;
    }

    public function customerIdAndCableWiseTotalBandwidthCalculation($customerId, $serviceId, $subServiceId, $groupId)
    {

        if ($serviceId == 1)
        {
            $var = $subServiceId;
            $colName = 'sub_service_id';
        }
        else
        {
            $colName = 'group_id';
            $var = $groupId;
        }
        return $data = $this->where('customer_id', $customerId)->where('approval_status', 2)
            ->where($colName, $var)->sum('max');

    }

    public function checkPrevMonthDemandNoteInActiveInactive($customerId)
    {
        $billingConObj = new BillingController();
        return $PrevMonthDemandNoteActiveInactiveChech =
        $billingConObj->checkPrevMonthDemandNoteActiveInactive($customerId);
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

    public function getRacks($customerId)
    {
        $customerRacks = $this->where('approval_status', 2)->where('customer_id', $customerId)->get();
        $cData = [];
        foreach ($customerRacks as $key => $c)
        {
            $rackName = '';
            $rate = '';
            $rate = $c->rack*$c->rackQty;
            if($c->rack == 6000){
                $rackName = '4U Space';
             }elseif($c->rack == 40000){
                $rackName = '42U-Full Rack';
             }

            $cData[] = [
              'name' => $rackName,
              'id' => $c->id,
              'rate' => $rate,
              'price' => $c->rack,
              'rackQty' => $c->rackQty,
            ];
        }
        return $cData;
    }


    public function getPowers($customerId)
    {
        $customerPower = $this->where('approval_status', 2)->where('customer_id', $customerId)->get();
        $cData = [];
        foreach ($customerPower as $key => $c)
        {

        $rate = '';
        $rate = $c->Power*$c->PowerQty;
        $powerName = '';
            if($c->Power == 18){
        $powerName = '> 1 KW';
        }elseif($c->Power == 18000){
        $powerName = '1 ~5 KW';
        }elseif($c->Power == 15000){
        $powerName = '< 5 KW';
        }

            $cData[] = [
                'name' => $powerName,
                'id' => $c->id,
                'price' => $c->Power,
                'rate' => $rate,
                'PowerQty' => $c->PowerQty,
            ];
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
            $cData[] = ['name' => $c
                ->circuit->circuit_name, 'id' => $c->circuit_id, 'remarks' => $c->remarks, 'circuit_designation' => $c->circuit_designation, 'approved_date' => $c->approved_date, 'charge' => $c->charge, 'max' => $c->max, 'discount' => $c->discount, 'mrc' => $c->mrc, ];
        }
        return $cData;
    }


    public function getCircuitsWiseBill($customerId, $subServiceId, $group_id, $service_id, $circuit_id)
    {

        $billingConObj = new BillingController();
        $allCircuitData = $this->getCircuits($customerId);
        $cableWiseCircuitData = $this->getCablWiseCircuits($customerId, $subServiceId);
        $CablAndGroupWiseCircuits = $this->getCablAndGroupWiseCircuits($customerId, $subServiceId, $group_id);
        $max = $this->customerIdWiseTotalBandwidthCalculation($customerId);
        $maxManipulate = $this->customerIdWiseTotalBandwidthCalculation($customerId);

        $price100g = 0;
        $price10g = 0;
        $priceStm16 = 0;
        $price3 = 0;
        $price4 = 0;

        $countCircuit3 = 0;
        $countCircuit4 = 0;
        $countCircuit5 = 0;
        $countCircuit6 = 0;
        $countCircuit7 = 0;

        $cableWiseCountCircuit3 = 0;
        $cableWiseCountCircuit4 = 0;
        $cableWiseCountCircuit5 = 0;
        $cableWiseCountCircuit6 = 0;
        $cableWiseCountCircuit7 = 0;


        $cableAndGroupWiseCountCircuit3 = 0;
        $cableAndGroupWiseCountCircuit4 = 0;
        $cableAndGroupWiseCountCircuit5 = 0;
        $cableAndGroupWiseCountCircuit6 = 0;
        $cableAndGroupWiseCountCircuit7 = 0;

        if ($service_id == 13)
        {

            foreach ($cableWiseCircuitData as $key => $circuit)
            {
                if ($circuit['id'] == 3)
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

            }

            foreach ($CablAndGroupWiseCircuits as $key => $cVal)
            {
                if ($cVal['id'] == 3)
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

            }

            foreach ($allCircuitData as $key => $value)
            {

                $cId = $value['id'];
                if ($cId == 3)
                {
                    $countCircuit3++;
                    $price3 = $billingConObj->colocationMrcCalculate($max, $cId, $group_id, $countCircuit3);
                    // $price3 = $price3*$cableWiseCountCircuit3;
                    $price3 = $price3 * $cableAndGroupWiseCountCircuit3;
                }
                elseif ($cId == 4)
                {
                    $countCircuit4++;
                    $price4 = $billingConObj->colocationMrcCalculate($max, $cId, $group_id, $countCircuit4);
                    // $price4 = $price4*$cableWiseCountCircuit4;
                    $price4 = $price4 * $cableAndGroupWiseCountCircuit4;

                }
                elseif ($cId == 5)
                { //stm 16
                    $countCircuit5++;
                    $priceStm16 = $billingConObj->colocationMrcCalculate($max, $cId, $group_id, $countCircuit5);
                    $priceStm16 = $priceStm16 * $cableAndGroupWiseCountCircuit5;
                }
                elseif ($cId == 6)
                { //10 g
                    $countCircuit6++;
                    $maxDiv10 = $max / 10;
                    $price10g = $billingConObj->colocationMrcCalculate($max, $cId, $group_id, $maxDiv10);

                }
                elseif ($cId == 7)
                { //100 g
                    $countCircuit7++;
                    $price100g += $billingConObj->colocationMrcCalculate($max, $cId, $group_id, $countCircuit7);
                }
            }




            $priceOfMrcCircuit = 0;

            $maxMult = $cableAndGroupWiseCountCircuit6 * 10;

            if ($price10g != 0)
            {
                $priceOfMrcCircuit = ($price10g / $maxManipulate) * $maxMult;

            }

            if ($cableAndGroupWiseCountCircuit7 != 0)
            {
                $priceOfMrcCircuit += $price100g;
            }

            $nonMrcPrice = $price4 + $price3 + $priceStm16;

            return $priceOfMrcCircuit + $nonMrcPrice;
        }
        else
        {
            return $totalPrice = $billingConObj->colocationPowerRackCalculate($customerId, $group_id);
        }
    }

}
