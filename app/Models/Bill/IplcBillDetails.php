<?php

namespace App\Models\Bill;

use App\Models\DemandNote;
use App\Models\BillAdjustment;
use App\Models\CircuitCategory;
use App\Models\Customer\Customer;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Http\Controllers\Customer\DemandNoteController;

class IplcBillDetails extends Model
{
    use HasFactory, LogsActivity;
    protected $guarded = [];

    protected $table = 'iplc_bill_details';

     protected $fillable = [
        'bill_id',
        'customer_id',
        'circuit_id',
        'approved_date',
        'billing_month',
        'bill_process_date',
        'mrc',
        'mbc',
        'vat',
        'adjust',
        'add_sub',
        'mrc_after_discount',
        'net_total',
        'bill_creator',
        'bill_status'
    ];

    protected static $logAttributes =[
        'bill_id',
        'customer_id',
        'circuit_id',
        'approved_date',
        'billing_month',
        'bill_process_date',
        'mrc',
        'mbc',
        'vat',
        'adjust',
        'add_sub',
        'mrc_after_discount',
        'net_total',
        'bill_creator',
        'bill_status'
    ];




    public function customers(){

        return $this->belongsTo(Customer::class,'customer_id');
    }

    public function iplcbill(){

        return $this->belongsTo(IplcBill::class,'bill_id')->withDefault(['bill_id' => 'Not Find Capacity']);
    }


    public function circuits(){

        return $this->belongsTo(CircuitCategory::class,'circuit_id');
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
            'qty' => DemandNote::where('circuit_id',$c->circuit_id)
                            ->where('approval_status',2)
                            ->where('sub_service_id',$sub_service_id)
                            ->where('customer_id',$customerId)->count(),

            'initial_date' => DemandNote::where('circuit_id',$c->circuit_id)
                            ->where('approval_status',2)
                            ->where('sub_service_id',$sub_service_id)
                            ->where('customer_id',$customerId)->first('approved_date'),
         ];
        }
        // dd($data);
        return $data;


    }



    public function customerIdWiseTotalBandwidthCalculation($customerId){
      return (new DemandNoteController)->customerIdWiseTotalBandwidthCalculation($customerId);

    }

    public function adjustableMonth($invoice_id){
        $data = BillAdjustment::where('invoice_id', $invoice_id)->first();
        if($data){
            return $data->sdate;
        }else{
            return null;
        }

    //   return $newDate = date('Y-m-d', strtotime($data. ' - 1 months'));
    }


    public function checkExistingDemandNote($customerId, $billing_month, $sub_service_id, $id){

               $db_Date = $this->adjustableMonth($id);
               $Y_M = date("Y-m", strtotime($db_Date));

               $Y = date("Y", strtotime($db_Date));

               $m = date("m", strtotime($db_Date));

               $number = cal_days_in_month(CAL_GREGORIAN, $m, $Y);

               $from = date("Y-m-d", strtotime($Y_M.'-01'));

               $to = date("Y-m-d", strtotime($Y_M.'-'.$number));


                $getExistingDemandnote=DemandNote::where('sub_service_id',$sub_service_id)
                            ->where('customer_id',$customerId)
                            ->where('approval_status',2)
                            ->whereBetween('approved_date',[$from,$to])->first();

               if($getExistingDemandnote != null){
               $data = $getExistingDemandnote->mrc/100*10;
                return $getExistingDemandnote->mrc - $data;
               }else{
                return 0;
               }
    }

    public function getAdjustData($customerId, $billing_month, $sub_service_id, $id){

            //    $db_Date = $this->adjustableMonth($id);
              $db_Date = $billing_month;

               $Y_M = date("Y-m", strtotime($db_Date));

               $Y = date("Y", strtotime($db_Date));

               $m = date("m", strtotime($db_Date));

               $number = cal_days_in_month(CAL_GREGORIAN, $m, $Y);

               $from = date("Y-m-d", strtotime($Y_M.'-01'));

               $to = date("Y-m-d", strtotime($Y_M.'-'.$number));


               return
               $getAdjustBill=BillAdjustment::with('customers','circuit','groups')
               ->where('sub_service_id',$sub_service_id)
               ->where('customer_id',$customerId)
               ->whereBetween('billing_month',[$from,$to])->get();
    }

    public function cableWiseBillCalculate($customerId, $billing_month, $sub_service_id){

               $db_Date = $billing_month;

              $Y_M = date("Y-m", strtotime($db_Date));

               $Y = date("Y", strtotime($db_Date));

               $m = date("m", strtotime($db_Date));

              $number = cal_days_in_month(CAL_GREGORIAN, $m, $Y);

              $from = date("Y-m-d", strtotime($Y_M.'-01'));

             $to = date("Y-m-d", strtotime($Y_M.'-'.$number));


              return $billingLise=$this->where('sub_service_id',$sub_service_id)
               ->where('customer_id',$customerId)
               ->whereBetween('billing_month',[$from,$to])->get();
    }




    public function getOldMonthNetTotal($customerId, $billing_month, $sub_service_id, $id){

        $exis = $this->getAdjustData($customerId, $billing_month, $sub_service_id,$id);

        if(count($exis)>0){
             $db_Date = $db_Date = $this->adjustableMonth($id);

             $Y_M = date("Y-m", strtotime($db_Date));

             $Y = date("Y", strtotime($db_Date));

             $m = date("m", strtotime($db_Date));

             $number = cal_days_in_month(CAL_GREGORIAN, $m, $Y);

             $from = date("Y-m-d", strtotime($Y_M.'-01'));

             $to = date("Y-m-d", strtotime($Y_M.'-'.$number));


            return $getOldMonthNetTotal=$this->where('sub_service_id',$sub_service_id)
             ->where('customer_id',$customerId)
             ->whereBetween('billing_month',[$from,$to])->get();
        }else{
              return 0;
        }

    }

    public function customerIdWiseDemandnote($customerId, $sub_service_id){
        $customerCircuits =DemandNote::where('customer_id',$customerId)->where('sub_service_id',$sub_service_id)->get();
        $cData = [];
       foreach ($customerCircuits as $key => $c)
       {
       $cData[] = [
       'capacity_id' => $c->capacity_id,
       'capacity_name' => $c->capacity->capacity_name,
       'group_id' => $c->group_id,
       'group_name' => $c->groups->group_name,
       'service_id' => $c->service_id,
       'service_name' => $c->services->service,
       'sub_service_id' => $c->sub_service_id,
       'sub_service_name' => $c->subservice->sub_service_name,
       'remarks' => $c->remarks,
       'approved_date' => $c->approved_date,
       'charge' => $c->charge,
       'max' => $c->max,
       'designation' => $c->circuit_designation,
       'discount' => $c->discount,
       'mrc' => $c->mrc,
        ];
       }
       return $cData;
    }


    // Ip Transit

      public function customerIdAndCableWiseTotalBandwidthCalculation($customerId, $serviceId, $subServiceId, $groupId)
      {

        // if ($serviceId == 1)
        // {
        // $var = $subServiceId;
        // $colName = 'sub_service_id';
        // }
        // else
        // {
        // $colName = 'group_id';
        // $var = $groupId;
        // }
        // return $data = DemandNote::where('customer_id', $customerId)->where('approval_status', 2)
        // ->where($colName, $var)->sum('max');


         if ($serviceId == 1)
         {
         $var = $subServiceId;
         $colName = 'sub_service_id';

         return $data = DemandNote::where('customer_id', $customerId)->where('approval_status', 2)
         ->where($colName, $var)->sum('max');
         }
         else
         {
         $colName = 'group_id';
         $var = $groupId;

         $total = DemandNote::where('customer_id', $customerId)->where($colName, $var)->where('approval_status',
         2)->sum('max');
         $data = DemandNote::where('customer_id', $customerId)->where($colName, $var)->where('approval_status',
         2)->sum('downgrade');
         return $total - $data;
         }




      }






}
