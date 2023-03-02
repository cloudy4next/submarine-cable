<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\DemandNote;
use Illuminate\Http\Request;
use App\Models\Bill\IplcBill;
use App\Models\BillAdjustment;
use Illuminate\Support\Facades\DB;
use App\Models\Bill\IplcBillDetails;
use Illuminate\Support\Facades\Auth;
use App\Models\ColocationBillDetails;
use App\Models\ColocationBillAdjustment;
use App\Http\Resources\IpTBillDetailsResource;
use App\Http\Resources\IplcBillDetailsResource;
use App\Http\Controllers\Customer\BillingController;

class IplcBillController extends Controller
{

    public function idWiseBillDetailsInfo($id){
        return $data =IplcBillDetails::with('iplcbill.services','iplcbill.subservice','customers','iplcbill.custype')->where('id',$id)->firstOrFail();
    }

    public function idWiseColocationBillDetailsInfo($id){
        return $data
        =ColocationBillDetails::with('colocationBill.services','customers','colocationBill.customers'
        ,'colocationBill.groups')->where('id',$id)->firstOrFail();
    }

    public function serviceIdWiseInvoiceList($serviceId){
      return
      $invoiceList=IplcBillDetails::with('customers','iplcbill.subservice'
      ,'iplcbill.custype','iplcbill.services','iplcbill.groups')->where('service_id',$serviceId)->where('invoice_status',1)->orderBy('id','DESC')->get();
    }


    public function revenuReport(){
         $data = IplcBill::with('groups', 'customers', 'custype', 'services',
         'subservice')->orderBy('id','DESC')->get();

         return response([
         'msg' => 'success',
         'data' =>$data,
         ]);
    }

    public function dateWiseRevenuReport(Request $request){
         $data = IplcBill::with('groups', 'customers', 'custype',
         'services','subservice')->orderBy('id','DESC')->whereBetween('billing_month',[$request->startDate,$request->endDate])->get();

         return response([
         'msg' => 'success',
         'data' =>$data,
         ]);
    }

    public function billProcess( Request $request){


        // return $request->billing_month;
            $netTotal = [];
            $sum_netTotal = 0;
            $adjustAry = [];
            $sum_adjustAry = 0;
            $rateForMbcAry =[];
            $sum_rateForMbcAry = 0;
            $remarks;
            $addOrSubAry =[];
            $discountWiseOldMrcAry =[];
            $sum_discountWiseOldMrcAry = 0;
            $OldMrcAry;
            $sum_OldMrcAry = 0;
            $mrcAry;
            $sum_mrcAry = 0;
            $vatAry = [];
            $sum_vatAry = 0;
            $allCustomer =[];

                if($request->remarks !='' || $request->remarks !=null){

                foreach($request->remarks as $data){
                    if($data != null || $data !=''){
                        $remarks[]= $data;
                    }
                }
            }


            foreach($request->allCustomer as $data){
                if($data != null || $data !=''){
                    $allCustomer[]= $data;
                }
            }
            foreach($request->netAmountAry as $data){
                if($data != null || $data !=''){
                    $netTotal[]= $data;
                    $sum_netTotal+= $data;
                }
            }
            foreach($request->adjustAry as $data){
                if($data != null || $data !=''){
                    $adjustAry[]= $data;
                    $sum_adjustAry+= $data;
                }
            }
            foreach($request->rateForMbcAry as $data){
                if($data != null || $data !=''){
                    $rateForMbcAry[]= $data;
                    $sum_rateForMbcAry+= $data;
                }
            }

            foreach($request->addOrSubAry as $data){
                if($data != null || $data !=''){
                    $addOrSubAry[]= $data;
                }
            }
            foreach($request->discountWiseOldMrcAry as $data){
                if($data != null || $data !=''){
                    $discountWiseOldMrcAry[]= $data;
                    $sum_discountWiseOldMrcAry+= $data;
                }
            }
            foreach($request->OldMrcAry as $data){
                if($data != null || $data !=''){
                    $OldMrcAry[]= $data;
                    $sum_OldMrcAry+= $data;
                }
            }
            foreach($request->mrcAry as $data){
                if($data != null || $data !=''){
                    $mrcAry[]= $data;
                    $sum_mrcAry+= $data;
                }
            }
            foreach($request->vatAry as $data){
                if($data != null || $data !=''){
                    $vatAry[]= $data;
                    $sum_vatAry+= $data;
                }
            }


            try {

                    DB::beginTransaction();

                        $bill = new IplcBill();
                        $bill->service_id =$request->service_id;
                        $bill->sub_service_id =$request->sub_service_id;
                        $bill->cus_type_id = $request->licence_id;
                        $bill->grp_zone_id =$request->grp_or_zone_id;
                        $bill->billing_month = $request->billing_month;
                        $bill->bill_process_date = date('Y-m-d', strtotime(Carbon::now()));
                        $bill->total_custonmer = count($allCustomer);
                        $bill->total_mrc =$sum_OldMrcAry;
                        $bill->total_adjust =$sum_adjustAry;
                        $bill->total_mbc =$sum_rateForMbcAry;
                        $bill->total_vat =$sum_vatAry;
                        $bill->total_mrc_after_discount =$sum_discountWiseOldMrcAry;
                        $bill->net_total =$sum_netTotal;
                        $bill->bill_creator = Auth::user()->id;
                        $bill->save();


                        $articlesCount = count($netTotal);

                        for ($i = 0; $i < $articlesCount; $i++) {

                        $circuitData = DemandNote::where('customer_id',$allCustomer[$i])->where('approval_status',2)->pluck('circuit_id');
                        $approveDate = DemandNote::where('customer_id',$allCustomer[$i])->where('approval_status',2)->pluck( 'approved_date');
                        $circuit =  json_encode($circuitData);
                        $demandApproveDate =  json_encode($approveDate);

                            $billDetails = new IplcBillDetails();
                            $billDetails->customer_id = $allCustomer[$i];
                            $billDetails->bill_id = $bill->id;
                            $billDetails->service_id = $bill->service_id;
                            $billDetails->sub_service_id = $bill->sub_service_id;
                            $billDetails->circuit_id = $circuit;
                            $billDetails->demand_approved_date = $demandApproveDate;
                            $billDetails->billing_month = $bill->billing_month;
                            $billDetails->bill_process_date =  date('Y-m-d', strtotime(Carbon::now()));
                            $billDetails->remarks = $remarks[$i];
                            $billDetails->old_mrc = $OldMrcAry[$i];
                            $billDetails->mrc = $mrcAry[$i];
                            $billDetails->mbc = $rateForMbcAry[$i];
                            $billDetails->vat = $vatAry[$i];
                            $billDetails->adjust = $adjustAry[$i];
                            $billDetails->add_sub = $addOrSubAry[$i];
                            $billDetails->old_mrc_after_discount = $discountWiseOldMrcAry[$i];
                            $billDetails->net_total = $netTotal[$i];
                            $billDetails->bill_creator = Auth::user()->id;
                            $billDetails->save();

                        }

                DB::commit();
                return response([
                    'msg' => 'Success',
                ], 200);

            } catch (\Exception $e) {

                DB::rollBack();
                return response([
                    'status' => false,
                    'message' => 'ops Faild . Please try again!',
                    'error' => $e->getMessage(),
                ], 500);

                echo $e->getMessage();
            }

    }

    public function billProcessIptransit( Request $request){

        $netTotal;
        $sum_netTotal = 0;
        $adjustAry;
        $sum_adjustAry = 0;
        $rateForMbcAry;
        $sum_rateForMbcAry = 0;
        $remarks;
        $addOrSubAry;
        $discountWiseOldMrcAry;
        $sum_discountWiseOldMrcAry = 0;
        $OldMrcAry;
        $sum_OldMrcAry = 0;
        $mrcAry;
        $sum_mrcAry = 0;
        $vatAry;
        $sum_vatAry = 0;
        $allCustomer;

        if($request->remarks !='' || $request->remarks !=null){

            foreach($request->remarks as $data){
                if($data != null || $data !=''){
                    $remarks[]= $data;
                }
            }
        }


        foreach($request->allCustomer as $data){
        if($data != null || $data !=''){
        $allCustomer[]= $data;
        }
        }
        foreach($request->netAmountAry as $data){
        if($data != null || $data !=''){
        $netTotal[]= $data;
        $sum_netTotal+= $data;
        }
        }
        foreach($request->adjustAry as $data){
        if($data != null || $data !=''){
        $adjustAry[]= $data;
        $sum_adjustAry+= $data;
        }
        }
        foreach($request->rateForMbcAry as $data){
        if($data != null || $data !=''){
        $rateForMbcAry[]= $data;
        $sum_rateForMbcAry+= $data;
        }
        }

        foreach($request->addOrSubAry as $data){
        if($data != null || $data !=''){
        $addOrSubAry[]= $data;
        }
        }
        foreach($request->discountWiseOldMrcAry as $data){
        if($data != null || $data !=''){
        $discountWiseOldMrcAry[]= $data;
        $sum_discountWiseOldMrcAry+= $data;
        }
        }
        foreach($request->OldMrcAry as $data){
        if($data != null || $data !=''){
        $OldMrcAry[]= $data;
        $sum_OldMrcAry+= $data;
        }
        }
        foreach($request->mrcAry as $data){
        if($data != null || $data !=''){
        $mrcAry[]= $data;
        $sum_mrcAry+= $data;
        }
        }
        foreach($request->vatAry as $data){
        if($data != null || $data !=''){
        $vatAry[]= $data;
        $sum_vatAry+= $data;
        }
        }


        try {

        DB::beginTransaction();

        $bill = new IplcBill();
        $bill->service_id =$request->service_id;
        $bill->sub_service_id =$request->sub_service_id;
        $bill->cus_type_id = $request->licence_id;
        $bill->grp_zone_id =$request->grp_or_zone_id;
        $bill->billing_month =$request->billing_month;
        // $bill->billing_month = date('Y-m-d', strtotime(Carbon::now()));
        $bill->bill_process_date = date('Y-m-d', strtotime(Carbon::now()));
        $bill->total_custonmer = count($allCustomer);
        $bill->total_mrc =$sum_OldMrcAry;
        $bill->total_adjust =$sum_adjustAry;
        $bill->total_mbc =$sum_rateForMbcAry;
        $bill->total_vat =$sum_vatAry;
        $bill->total_mrc_after_discount =$sum_discountWiseOldMrcAry;
        $bill->net_total =$sum_netTotal;
        $bill->bill_creator = Auth::user()->id;
        $bill->save();


        $articlesCount = count($netTotal);

        for ($i = 0; $i < $articlesCount; $i++) {

            $billDetails = new IplcBillDetails();
            $billDetails->customer_id = $allCustomer[$i];
            $billDetails->bill_id = $bill->id;
            $billDetails->service_id = $bill->service_id;
            $billDetails->sub_service_id = $bill->sub_service_id;
            $billDetails->billing_month = $bill->billing_month;
            $billDetails->demand_approved_date = date('Y-m-d', strtotime(Carbon::now()));
            $billDetails->billing_month = date('Y-m-d', strtotime(Carbon::now()));
            $billDetails->bill_process_date = date('Y-m-d', strtotime(Carbon::now()));
            $billDetails->remarks = $remarks[$i];
            $billDetails->old_mrc = $OldMrcAry[$i];
            $billDetails->mrc = $mrcAry[$i];
            $billDetails->mbc = $rateForMbcAry[$i];
            $billDetails->vat = $vatAry[$i];
            $billDetails->adjust = $adjustAry[$i];
            $billDetails->add_sub = $addOrSubAry[$i];
            $billDetails->old_mrc_after_discount = $discountWiseOldMrcAry[$i];
            $billDetails->net_total = $netTotal[$i];
            $billDetails->bill_creator = Auth::user()->id;
            $billDetails->save();

            }

        DB::commit();
        return response([
        'msg' => 'Success',
        ], 200);

        } catch (\Exception $e) {

        DB::rollBack();
        return response([
        'status' => false,
        'message' => 'ops Faild . Please try again!',
        'error' => $e->getMessage(),
        ], 500);

        echo $e->getMessage();
        }

    }

    public function billUpdate( Request $request){

                $netTotal;
                $sum_netTotal = 0;
                $adjustAry;
                $sum_adjustAry = 0;
                $rateForMbcAry;
                $sum_rateForMbcAry = 0;
                $remarks;
                $bill_id;
                $customerId;
                $addOrSubAry;
                $mrcAry;
                $sum_mrcAry = 0;
                $vatAry;
                $sum_vatAry = 0;
                $allCustomer;

                    foreach($request->remarks as $data){
                        if($data != null || $data !=''){
                            $remarks[]= $data;
                        }
                    }


                foreach($request->netAmountAry as $data){
                    if($data != null || $data !=''){
                        $netTotal[]= $data;
                        $sum_netTotal+= $data;
                    }
                }
                foreach($request->adjustAry as $data){
                    if($data != null || $data !=''){
                        $adjustAry[]= $data;
                        $sum_adjustAry+= $data;
                    }
                }
                foreach($request->rateForMbcAry as $data){
                    if($data != null || $data !=''){
                        $rateForMbcAry[]= $data;
                        $sum_rateForMbcAry+= $data;
                    }
                }

                foreach($request->addOrSubAry as $data){
                    if($data != null || $data !=''){
                        $addOrSubAry[]= $data;
                    }
                }

                foreach($request->mrcAry as $data){
                    if($data != null || $data !=''){
                        $mrcAry[]= $data;
                        $sum_mrcAry+= $data;
                    }
                }
                foreach($request->vatAry as $data){
                    if($data != null || $data !=''){
                        $vatAry[]= $data;
                        $sum_vatAry+= $data;
                    }
                }


                try {

                        DB::beginTransaction();

                        $update = IplcBill::where('id',$request->bill_id[0])->update([
                            'total_adjust' =>$sum_adjustAry,
                            'total_mbc' =>$sum_rateForMbcAry,
                            'total_vat' =>$sum_vatAry,
                            'net_total' =>$sum_netTotal,
                            'bill_creator' => Auth::user()->id,
                        ]);

                            $totalCount = count($netTotal);

                            for ($i = 0; $i < $totalCount; $i++) {

                                $updateDetails = IplcBillDetails::where('bill_id',$request->bill_id[$i])->where('customer_id',$request->customerId[$i])->update([
                                    'remarks' => $remarks[$i],
                                    'mrc' => $mrcAry[$i],
                                    'mbc' => $rateForMbcAry[$i],
                                    'vat' => $vatAry[$i],
                                    'adjust' => $adjustAry[$i],
                                    'add_sub' => $addOrSubAry[$i],
                                    'net_total' => $netTotal[$i],
                                    'bill_creator' => Auth::user()->id,
                                ]);


                            }

                    DB::commit();
                    return response([
                        'msg' => 'Success',
                    ], 200);

                } catch (\Exception $e) {

                    DB::rollBack();
                    return response([
                        'status' => false,
                        'message' => 'Ops Faild . Please try again!',
                        'error' => $e->getMessage(),
                    ], 500);

                    echo $e->getMessage();
                }

    }


    public function billingList($id){
       $data = IplcBill::with('groups', 'customers', 'custype')->where('service_id', $id)->orderBy('id', 'DESC')->get();

       return response([
         'msg' => 'success',
         'data' =>$data,
       ]);
    }


    public function dateWiseBillingList(Request $request){

        $db_Date = $request->date;
        $Y_M = date("Y-m", strtotime($db_Date));

        $Y = date("Y", strtotime($db_Date));

        $m = date("m", strtotime($db_Date));

        $number = cal_days_in_month(CAL_GREGORIAN, $m, $Y);

        $from = date("Y-m-d", strtotime($Y_M.'-01'));

        $to = date("Y-m-d", strtotime($Y_M.'-'.$number));


       $data = IplcBill::with('groups', 'customers',
       'custype')->where('service_id',$request->serId)->orderBy('id','DESC')->whereBetween('billing_month',[$from,$to])->get();

       return response([
         'msg' => 'success',
         'data' =>$data,
       ]);
    }


    public function billCalculationFrAdjustment(Request $request){
        // return $request->all();


        //   $data = (new BillingController)->mrcCalculate($maxWithMulti10, $request->circuitId,
        //   $request->groupId, $request->max);

        $totalCircuit = $request->max;

        $MrcCalculateConObj = new MrcCalculateController();

      if ($request->circuitId == 5){
         $totalCircuitWithMulti10 = $totalCircuit*2.5;
           $data = $MrcCalculateConObj->mrcCalculateForStm16($totalCircuitWithMulti10, $request->circuitId, $request->groupId);
           $data*=$request->stationCircuit;

      }elseif ($request->circuitId == 6){
           $totalCircuitWithMulti10 = $totalCircuit*10;
          $data = $MrcCalculateConObj->mrcCalculateFor10G($totalCircuitWithMulti10, $request->circuitId,
          $request->groupId,$totalCircuit);
          $data = ($data/$totalCircuit)*$request->stationCircuit;

      }elseif ($request->circuitId == 7){
            $totalCircuitWithMulti10 = $totalCircuit*10;
          $data = $MrcCalculateConObj->mrcCalculateFor100G($totalCircuitWithMulti10, $request->circuitId, $request->groupId);
             $data*=$request->stationCircuit;

        }else{
         $data = $MrcCalculateConObj->mrcCalculateForNonMrcCircuit($request->circuitId, $request->groupId);
      }

       return response([
         'msg' => 'success',
         'data' =>$data,
       ]);
    }

    public function portBillCalculationFrAdjustment(Request $request){
        $totalCircuit = $request->max;
        $totalCircuitWithMulti10 = 0;
        $MrcCalculateConObj = new BillingController();

      if ($request->circuitId == 6){
          $totalCircuitWithMulti10 = $totalCircuit*10;
          $data = $MrcCalculateConObj->colocationMrcCalculate($totalCircuitWithMulti10, $request->circuitId, $request->groupId,$totalCircuit);
          $data = ($data/$totalCircuit)*$request->stationCircuit;

      }elseif ($request->circuitId == 7){
          $totalCircuitWithMulti10 = $totalCircuit*10;
          $data = $MrcCalculateConObj->colocationMrcCalculate($totalCircuitWithMulti10, $request->circuitId,$request->groupId,$totalCircuit);
          $data*=$request->stationCircuit;
        }else{
         $data = $MrcCalculateConObj->colocationMrcCalculate( $request->circuitId, $request->groupId, $totalCircuit, $totalCircuitWithMulti10);
      }

       return response([
         'msg' => 'success',
         'data' =>$data,
       ]);
    }

    public function iptBillCalculationForAdjustment(Request $request){
        // return $request->all();


        $data = (new BillingController)->iptransitMrcCalculate($request->max,
       $request->licenceId,$request->groupId);



       return response([
         'msg' => 'success',
         'data' =>$data,
       ]);
    }

    public function invoiceList($id){
        $data = $this->serviceIdWiseInvoiceList($id);
        return response([
            'msg' => 'success',
            'data' =>$data,
        ]);
    }



    public function singleBillInfo(Request $request){

        $data = IplcBillDetails::with('customers','iplcbill.subservice','iplcbill.custype','iplcbill.services','iplcbill.groups')
                ->where('bill_id',$request->id)->orderBy('id','DESC')->get();
        // dd($data);
        return response([
            'msg' => 'success',
            'data' =>$data,
        ]);
    }

    public function singleBillReport(Request $request){

        if($request->id != null){
            $data = IplcBillDetails::with('customers','iplcbill.subservice','iplcbill.custype','iplcbill.services','iplcbill.groups')
                ->where('bill_id',$request->id)->orderBy('id','DESC')->get();
        }else{

            $db_Date = $request->date;
            $Y_M = date("Y-m", strtotime($db_Date));

            $Y = date("Y", strtotime($db_Date));

            $m = date("m", strtotime($db_Date));

            $number = cal_days_in_month(CAL_GREGORIAN, $m, $Y);

            $from = date("Y-m-d", strtotime($Y_M.'-01'));

            $to = date("Y-m-d", strtotime($Y_M.'-'.$number));

            $data =IplcBillDetails::with('customers','iplcbill.subservice','iplcbill.custype','iplcbill.services','iplcbill.groups')
                                    ->where('service_id',$request->serviceId)->orderBy('id','DESC')
                                        ->whereBetween('billing_month',[$from,$to])->get();
        }

        return IplcBillDetailsResource::collection($data);
        return response([
            'msg' => 'success',
            'data' =>$data,
        ]);
    }

    public function invoiceGanaretePermission(Request $request){

        try{
            DB::beginTransaction();

            $bill = IplcBill::where('id', $request->id)->update([
                'invoice_status' => 1,
            ]);

            $data = IplcBillDetails::where('bill_id',$request->id)->update([
                'invoice_status' => 1,
                 'approved_date' =>  date('Y-m-d', strtotime(Carbon::now())),
            ]);


            DB::commit();
            return response([
                'msg' => 'Success',
            ], 200);

        }catch (\Exception $e) {

            DB::rollBack();
            return response([
                'status' => false,
                'message' => 'Ops Faild . Please try again!',
                'error' => $e->getMessage(),
            ], 500);

            echo $e->getMessage();
        }


    }

    public function invoiceGanarete(Request $request){

        try{
            // $data = IplcBillDetails::where('id',$request->id)->update([
            //     'invoice_ganarete' => 1,
            // ]);

            $data = $this->idWiseBillDetailsInfo($request->id);

            return new IplcBillDetailsResource($data);
            return response([
                'msg' => 'Success',
                'data' =>$data,
            ], 200);

        }catch (\Exception $e) {

            return response([
                'status' => false,
                'message' => 'Ops Faild . Please try again!',
                'error' => $e->getMessage(),
            ], 500);

        }


    }



    public function iptInvoiceGanarete(Request $request){
        try{
            // $data = IplcBillDetails::where('id',$request->id)->update([
            //     'invoice_ganarete' => 1,
            // ]);
            $data = $this->idWiseBillDetailsInfo($request->id);



        //    $customer = (new CustomerController)->findCustomer($data->customer_id);

        return new IpTBillDetailsResource($data);

            return response([
                'msg' => 'Success',
                // 'data' =>$billingLise,
                'data' =>$data,
            ], 200);

        }catch (\Exception $e) {

            return response([
                'status' => false,
                'message' => 'Ops Faild . Please try again!',
                'error' => $e->getMessage(),
            ], 500);

        }


    }


    public function idWiseBillDetails($id){
        $data = $this->idWiseBillDetailsInfo($id);

         return response([
         'msg' => 'Success',
         'data' =>$data,
         ], 200);
    }


    public function getIplcAdjustList($id){
        $data = BillAdjustment::with('customers','circuit','groups')->where('invoice_id',$id)->orderBy('id','ASC')->get();
        // dd($data);
        return response([
        'msg' => 'Success',
        'data' =>$data,
        ], 200);
    }

    public function deleteIplcAdjust($id){
        $data = BillAdjustment::where('id',$id)->delete();
        return response([
        'msg' => 'Success',
        ], 200);
    }


    public function billAdjust(Request $request){
        // return $request->all();
        $invoiceId = $request->invoiceId;
        $data = $this->idWiseBillDetailsInfo($invoiceId);
        $subServiceId =  $data->iplcbill->sub_service_id;

            foreach ($request['adjustList'] as $value) {
                 $sub_model = BillAdjustment::create([
                 'invoice_id' => $data->id,
                 'sub_service_id' => $subServiceId,
                 'billing_month' => $data->billing_month,
                 'bill_adjust_month'=> $request->date['monthIndex'],
                 'adjust_month_name'=> $request->date['month'],
                 'customer_id' => $data->customer_id,
                 'circuit_id' => $value['circuit_id'],
                 'group_id' => $value['group_id'],
                 'tot_circuit' => $value['tot_circuit'],
                 'this_group_circuit' => $value['this_group_circuit'],
                 'discount' => $value['discount'],
                 'rate' => $value['rate'],
                 'amount' => $value['amount'],
                 'remarks' => $value['remarks'],
                 'rate_after_discount' => $value['afterDiscount'],
                 'add_sub' => $value['add_sub'],
                 'dif_days' => $value['diffDays'],
                 'tot_days' => $request->date['days'],
                 'sdate' => $value['sdate'],
                 'edate' => $value['edate'],
                ]);
            }


    }

    public function portBillAdjust(Request $request){
        // return $request->all();
        $invoiceId = $request->invoiceId;
        $data = $this->idWiseColocationBillDetailsInfo($invoiceId);

            foreach ($request['adjustList'] as $value) {
                 $sub_model = ColocationBillAdjustment::create([
                 'invoice_id' => $data->id,
                 'billing_month' => $data->billing_month,
                 'bill_adjust_month'=> $request->date['monthIndex'],
                 'adjust_month_name'=> $request->date['month'],
                 'customer_id' => $data->customer_id,
                 'circuit_id' => $value['circuit_id'],
                 'group_id' => $value['group_id'],
                 'tot_circuit' => $value['tot_circuit'],
                 'this_group_circuit' => $value['this_group_circuit'],
                 'discount' => $value['discount'],
                 'rate' => $value['rate'],
                 'amount' => $value['amount'],
                 'rate_after_discount' => $value['afterDiscount'],
                 'add_sub' => $value['add_sub'],
                 'dif_days' => $value['diffDays'],
                 'tot_days' => $request->date['days'],
                 'sdate' => $value['sdate'],
                 'edate' => $value['edate'],
                ]);
            }


    }

    public function iptBillAdjust(Request $request){
        // return $request->all();
        $id = $request->invoiceId;
        $data = $this->idWiseBillDetailsInfo($id);
        $subServiceId =  $data->iplcbill->sub_service_id;

            foreach ($request['adjustList'] as $value) {
                 $sub_model = BillAdjustment::create([
                 'invoice_id' => $data->id,
                 'sub_service_id' => $subServiceId,
                 'billing_month' => $data->billing_month,
                 'bill_adjust_month'=> $request->date['monthIndex'],
                 'adjust_month_name'=> $request->date['month'],
                 'customer_id' => $data->customer_id,
                 'circuit_id' => $value['licence'],
                 'group_id' => $value['group_id'],
                 'tot_circuit' => $value['tot_bandwith'],
                 'this_group_circuit' => $value['this_group_bandwith'],
                 'discount' => $value['discount'],
                 'rate' => $value['rate'],
                 'urate' => $value['urate'],
                 'amount' => $value['amount'],
                 'remarks' => $value['remarks'],
                 'rate_after_discount' => $value['afterDiscount'],
                 'add_sub' => $value['add_sub'],
                 'dif_days' => $value['diffDays'],
                 'tot_days' => $request->date['days'],
                 'sdate' => $value['sdate'],
                 'edate' => $value['edate'],
                ]);
            }


    }

    public function approvePermission($id){
        try{

            $data = IplcBillDetails::where('id',$id)->update([
                'invoice_status' => 1,
            ]);

            return response([
                'msg' => 'Success',
                'data' =>$data
            ], 200);

        }catch (\Exception $e) {

            return response([
                'status' => false,
                'message' => 'Ops Faild . Please try again!',
                'error' => $e->getMessage(),
            ], 500);

        }


    }


}