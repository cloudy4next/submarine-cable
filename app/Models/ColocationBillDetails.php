<?php
namespace App\Models;

use App\Models\Customer\Customer;
use Illuminate\Database\Eloquent\Model;
use App\Models\ColocationBillAdjustment;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ColocationBillDetails extends Model
  {
    use HasFactory, LogsActivity;

    public function customers()
      {

        return $this->belongsTo(Customer::class , 'customer_id');
      }

    public function colocationBill()
      {

        return $this->belongsTo(ColocationBill::class , 'bill_id');
      }

    public function customerIdWiseTotalBandwidthCalculation($customerId)
      {
        return 'ookk';
        // return (new DemandNoteController)->customerIdWiseTotalBandwidthCalculation($customerId);

      }

    public function getRacks($customerId)
      {
        $customerRacks = ColocationDemandNote::where('approval_status', 2)
            ->where('customer_id', $customerId)->get();
        $cData = [];
        foreach ($customerRacks as $key => $c)
          {
            $rackName = '';
            $rate = '';
            $rate = $c->rack * $c->rackQty;

            if ($c->rack == 6000)
              {
                $rackName = '4U Space';
              }
            elseif ($c->rack == 40000)
              {
                $rackName = '42U-Full Rack';
              }

            $cData[] = ['name' => $rackName,
            'id' => $c->id,
            'rate' => $rate,
            'price' => $c->rack,
            'rackQty' => $c->rackQty, ];
          }
        return $cData;
      }


       public function getPowers($customerId)
       {
            $customerPower = ColocationDemandNote::where('approval_status', 2)
            ->where('customer_id', $customerId)->get();
            $cData = [];
            foreach ($customerPower as $key => $c)
            {

            $rate = '';
            $rate = $c->Power * $c->PowerQty;
            $powerName = '';
            if ($c->Power == 18)
            {
            $powerName = '> 1 KW';
            }
            elseif ($c->Power == 18000)
            {
            $powerName = '1 ~5 KW';
            }
            elseif ($c->Power == 15000)
            {
            $powerName = '< 5 KW'; }
            $cData[]=['name'=> $powerName,
            'id' => $c->id,
            'price' => $c->Power,
            'rate' => $rate,
             'PowerQty' => $c->PowerQty, ];
            }
            return $cData;
           }




    public function getconnectionInformation($customerId,$grp_zone_id){
    $customerCircuits =ColocationDemandNote::with('circuit')
      ->where('approval_status', 2)
      ->where('customer_id',$customerId)
      ->where('group_id',$grp_zone_id)
      ->select( 'circuit_id')
      ->groupBy('circuit_id')
      ->get();

      $data = [];
      foreach ($customerCircuits as $key => $c)
      {
      $data[] = [
      'name' => $c->circuit->circuit_name,
      'id' => $c->circuit_id,
      'qty'=>ColocationDemandNote::where('circuit_id',$c->circuit_id)->where('group_id',$grp_zone_id)->where('customer_id',$customerId)->count(),
      ];
      }
      return $data;

    }



    public function adjustableMonth($invoice_id)
      {
        $data = BillAdjustment::where('invoice_id', $invoice_id)->first();
        if ($data)
          {
            return $data->sdate;
          }
        else
          {
            return null;
          }

        // return $newDate = date('Y-m-d', strtotime($data. ' - 1 months'));

      }

    public function checkExistingDemandNote($customerId, $billing_month, $sub_service_id, $id)
      {

        $db_Date = $this->adjustableMonth($id);
        $Y_M = date("Y-m", strtotime($db_Date));

        $Y = date("Y", strtotime($db_Date));

        $m = date("m", strtotime($db_Date));

        $number = cal_days_in_month(CAL_GREGORIAN, $m, $Y);

        $from = date("Y-m-d", strtotime($Y_M . '-01'));

        $to = date("Y-m-d", strtotime($Y_M . '-' . $number));

        $getExistingDemandnote = ColocationDemandNote::where('sub_service_id', $sub_service_id)->where('customer_id', $customerId)->where('approval_status', 2)
            ->whereBetween('approved_date', [$from, $to])->first();

        if ($getExistingDemandnote != null)
          {
            $data = $getExistingDemandnote->mrc / 100 * 10;
            return $getExistingDemandnote->mrc - $data;
          }
        else
          {
            return 0;
          }
      }

    public function getAdjustData($customerId, $billing_month, $grp_zone_id, $id)
      {

        // $db_Date = $this->adjustableMonth($id);
        $db_Date = $billing_month;

        $Y_M = date("Y-m", strtotime($db_Date));

        $Y = date("Y", strtotime($db_Date));

        $m = date("m", strtotime($db_Date));

        $number = cal_days_in_month(CAL_GREGORIAN, $m, $Y);

        $from = date("Y-m-d", strtotime($Y_M . '-01'));

        $to = date("Y-m-d", strtotime($Y_M . '-' . $number));

        return $getAdjustBill = ColocationBillAdjustment::with('customers','circuit','groups')
        ->where('group_id', $grp_zone_id)
        ->where('customer_id',$customerId)
        ->whereBetween('billing_month', [$from, $to])->get();
      }

    public function cableWiseBillCalculate($customerId, $billing_month, $grp_zone_id)
      {

        $db_Date = $billing_month;

        $Y_M = date("Y-m", strtotime($db_Date));

        $Y = date("Y", strtotime($db_Date));

        $m = date("m", strtotime($db_Date));

        $number = cal_days_in_month(CAL_GREGORIAN, $m, $Y);

        $from = date("Y-m-d", strtotime($Y_M . '-01'));

        $to = date("Y-m-d", strtotime($Y_M . '-' . $number));

        return $billingLise = $this->where('grp_zone_id', $grp_zone_id)->where('customer_id', $customerId)->whereBetween('billing_month', [$from, $to])->get();
      }

    public function getOldMonthNetTotal($customerId, $billing_month, $grp_zone_id, $id)
      {

        $exis = $this->getAdjustData($customerId, $billing_month, $grp_zone_id, $id);

        if (count($exis) > 0)
          {
            $db_Date = $db_Date = $this->adjustableMonth($id);

            $Y_M = date("Y-m", strtotime($db_Date));

            $Y = date("Y", strtotime($db_Date));

            $m = date("m", strtotime($db_Date));

            $number = cal_days_in_month(CAL_GREGORIAN, $m, $Y);

            $from = date("Y-m-d", strtotime($Y_M . '-01'));

            $to = date("Y-m-d", strtotime($Y_M . '-' . $number));

            return $getOldMonthNetTotal = $this->where('grp_zone_id', $grp_zone_id)->where('customer_id', $customerId)->whereBetween('billing_month', [$from, $to])->get();
          }
        else
          {
            return 0;
          }

      }

    public function customerIdWiseDemandnote($customerId, $sub_service_id)
      {
        $customerCircuits = ColocationDemandNote::where('customer_id', $customerId)->where('sub_service_id', $sub_service_id)->get();
        $cData = [];
        foreach ($customerCircuits as $key => $c)
          {
            $cData[] = ['capacity_id' => $c->capacity_id, 'capacity_name' => $c
                ->capacity->capacity_name, 'group_id' => $c->group_id, 'group_name' => $c
                ->groups->group_name, 'service_id' => $c->service_id, 'service_name' => $c
                ->services->service, 'sub_service_id' => $c->sub_service_id, 'sub_service_name' => $c
                ->subservice->sub_service_name, 'remarks' => $c->remarks, 'approved_date' => $c->approved_date, 'charge' => $c->charge, 'max' => $c->max, 'designation' => $c->circuit_designation, 'discount' => $c->discount, 'mrc' => $c->mrc, ];
          }
        return $cData;
      }

    // Ip Transit
    public function customerIdAndCableWiseTotalBandwidthCalculation($customerId, $groupId)
      {

        $colName = 'group_id';
        $var = $groupId;
        return $data = ColocationDemandNote::where('customer_id', $customerId)->where('approval_status', 2)
            ->where($colName, $var)->sum('max');

      }

  }
