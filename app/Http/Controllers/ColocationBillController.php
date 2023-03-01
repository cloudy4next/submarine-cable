<?php
namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\ColocationBill;
use Illuminate\Support\Facades\DB;
use App\Models\ColocationDemandNote;
use Illuminate\Support\Facades\Auth;
use App\Models\ColocationBillDetails;
use App\Http\Resources\ColocationBillDetailsResource;

class ColocationBillController extends Controller
{

    public function billingList($id)
    {
        $data = ColocationBill::with('groups', 'customers')->where('service_id', $id)->orderBy('id', 'DESC')->get();

        return response(['msg' => 'success', 'data' => $data, ]);
    }

    public function dateWiseBillingList(Request $request){

        $db_Date = $request->date;
        $Y_M = date("Y-m", strtotime($db_Date));

        $Y = date("Y", strtotime($db_Date));

        $m = date("m", strtotime($db_Date));

        $number = cal_days_in_month(CAL_GREGORIAN, $m, $Y);

        $from = date("Y-m-d", strtotime($Y_M.'-01'));

        $to = date("Y-m-d", strtotime($Y_M.'-'.$number));


        $data = ColocationBill::with('groups', 'customers')->where('service_id',$request->serId)->orderBy('id','DESC')->whereBetween('billing_month',[$from,$to])->get();

        return response([
        'msg' => 'success',
        'data' =>$data,
        ]);
    }

    public function billProcessColocationPort(Request $request)
    {

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

        if ($request->remarks != '' || $request->remarks != null)
        {

            foreach ($request->remarks as $data)
            {
                if ($data != null || $data != '')
                {
                    $remarks[] = $data;
                }
            }
        }

        foreach ($request->allCustomer as $data)
        {
            if ($data != null || $data != '')
            {
                $allCustomer[] = $data;
            }
        }
        foreach ($request->netAmountAry as $data)
        {
            if ($data != null || $data != '')
            {
                $netTotal[] = $data;
                $sum_netTotal += $data;
            }
        }
        foreach ($request->adjustAry as $data)
        {
            if ($data != null || $data != '')
            {
                $adjustAry[] = $data;
                $sum_adjustAry += $data;
            }
        }
        foreach ($request->rateForMbcAry as $data)
        {
            if ($data != null || $data != '')
            {
                $rateForMbcAry[] = $data;
                $sum_rateForMbcAry += $data;
            }
        }

        foreach ($request->addOrSubAry as $data)
        {
            if ($data != null || $data != '')
            {
                $addOrSubAry[] = $data;
            }
        }
        foreach ($request->discountWiseOldMrcAry as $data)
        {
            if ($data != null || $data != '')
            {
                $discountWiseOldMrcAry[] = $data;
                $sum_discountWiseOldMrcAry += $data;
            }
        }
        foreach ($request->OldMrcAry as $data)
        {
            if ($data != null || $data != '')
            {
                $OldMrcAry[] = $data;
                $sum_OldMrcAry += $data;
            }
        }
        foreach ($request->mrcAry as $data)
        {
            if ($data != null || $data != '')
            {
                $mrcAry[] = $data;
                $sum_mrcAry += $data;
            }
        }
        foreach ($request->vatAry as $data)
        {
            if ($data != null || $data != '')
            {
                $vatAry[] = $data;
                $sum_vatAry += $data;
            }
        }

        try
        {

            DB::beginTransaction();

            $bill = new ColocationBill();
            $bill->service_id = $request->service_id;
            // $bill->cus_type_id = $request->licence_id;
            $bill->grp_zone_id = $request->grp_or_zone_id;
            $bill->billing_month = $request->billing_month;
            $bill->bill_process_date = date('Y-m-d', strtotime(Carbon::now()));
            $bill->total_custonmer = count($allCustomer);
            $bill->total_mrc = $sum_OldMrcAry;
            $bill->total_adjust = $sum_adjustAry;
            $bill->total_mbc = $sum_rateForMbcAry;
            $bill->total_vat = $sum_vatAry;
            $bill->total_mrc_after_discount = $sum_discountWiseOldMrcAry;
            $bill->net_total = $sum_netTotal;
            $bill->bill_creator = Auth::user()->id;
            $bill->save();

            $articlesCount = count($netTotal);

            for ($i = 0;$i < $articlesCount;$i++)
            {
                $circuitData = ColocationDemandNote::where('customer_id', $allCustomer[$i])->where('approval_status', 2)
                    ->pluck('circuit_id');
                $approveDate = ColocationDemandNote::where('customer_id', $allCustomer[$i])->where('approval_status', 2)
                    ->pluck('approved_date');
                $circuit = json_encode($circuitData);
                $demandApproveDate = json_encode($approveDate);

                $billDetails = new ColocationBillDetails();
                $billDetails->customer_id = $allCustomer[$i];
                $billDetails->bill_id = $bill->id;
                $billDetails->grp_zone_id = $bill->grp_zone_id;
                $billDetails->service_id = $bill->service_id;
                $billDetails->circuit_id = $circuit;
                $billDetails->demand_approved_date = $demandApproveDate;
                $billDetails->billing_month = $bill->billing_month;
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
            return response(['msg' => 'Success', ], 200);

        }
        catch(\Exception $e)
        {

            DB::rollBack();
            return response(['status' => false, 'message' => 'ops Faild . Please try again!', 'error' => $e->getMessage() , ], 500);

            echo $e->getMessage();
        }

    }

    public function singleBillInfo(Request $request)
    {
        $data = ColocationBillDetails::with('customers.custype', 'colocationBill.services', 'colocationBill.groups')->where('bill_id', $request->id)
            ->orderBy('id', 'DESC')
            ->get();

        return response(['msg' => 'success', 'data' => $data, ]);
    }

    public function approvePermission($id)
    {
        try
        {

            $data = ColocationBillDetails::where('id', $id)->update(['invoice_status' => 1, ]);

            return response(['msg' => 'Success', 'data' => $data], 200);

        }
        catch(\Exception $e)
        {

            return response(['status' => false, 'message' => 'Ops Faild . Please try again!', 'error' => $e->getMessage() , ], 500);

        }

    }

    public function idWiseBillDetailsInfo($id)
    {
        return $data = ColocationBillDetails::with('colocationBill.services', 'customers.custype')->where('id', $id)->firstOrFail();
    }

    public function invoiceGanarete(Request $request)
    {

        try
        {
            // $data = IplcBillDetails::where('id',$request->id)->update([
            // 'invoice_ganarete' => 1,
            // ]);
            $data = $this->idWiseBillDetailsInfo($request->id);

            return new ColocationBillDetailsResource($data);

            // return IplcBillDetailsResource::collection($billingLise);
            return response(['msg' => 'Success', 'data' => $data, ], 200);

        }
        catch(\Exception $e)
        {

            return response(['status' => false, 'message' => 'Ops Faild . Please try again!', 'error' => $e->getMessage() , ], 500);

        }

    }


    public function powerInvoiceGanarete(Request $request)
    {

        try
        {
            // $data = IplcBillDetails::where('id',$request->id)->update([
            // 'invoice_ganarete' => 1,
            // ]);
            $data = $this->idWiseBillDetailsInfo($request->id);

            return new ColocationBillDetailsResource($data);

            // return IplcBillDetailsResource::collection($billingLise);
            return response(['msg' => 'Success', 'data' => $data, ], 200);

        }
        catch(\Exception $e)
        {

            return response(['status' => false, 'message' => 'Ops Faild . Please try again!', 'error' => $e->getMessage() , ], 500);

        }

    }

    public function billProcessColocationPower(Request $request)
    {

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

        if ($request->remarks != '' || $request->remarks != null)
        {

            foreach ($request->remarks as $data)
            {
                if ($data != null || $data != '')
                {
                    $remarks[] = $data;
                }
            }
        }

        foreach ($request->allCustomer as $data)
        {
            if ($data != null || $data != '')
            {
                $allCustomer[] = $data;
            }
        }
        foreach ($request->netAmountAry as $data)
        {
            if ($data != null || $data != '')
            {
                $netTotal[] = $data;
                $sum_netTotal += $data;
            }
        }
        foreach ($request->adjustAry as $data)
        {
            if ($data != null || $data != '')
            {
                $adjustAry[] = $data;
                $sum_adjustAry += $data;
            }
        }
        foreach ($request->rateForMbcAry as $data)
        {
            if ($data != null || $data != '')
            {
                $rateForMbcAry[] = $data;
                $sum_rateForMbcAry += $data;
            }
        }

        foreach ($request->addOrSubAry as $data)
        {
            if ($data != null || $data != '')
            {
                $addOrSubAry[] = $data;
            }
        }
        foreach ($request->discountWiseOldMrcAry as $data)
        {
            if ($data != null || $data != '')
            {
                $discountWiseOldMrcAry[] = $data;
                $sum_discountWiseOldMrcAry += $data;
            }
        }
        foreach ($request->OldMrcAry as $data)
        {
            if ($data != null || $data != '')
            {
                $OldMrcAry[] = $data;
                $sum_OldMrcAry += $data;
            }
        }
        foreach ($request->mrcAry as $data)
        {
            if ($data != null || $data != '')
            {
                $mrcAry[] = $data;
                $sum_mrcAry += $data;
            }
        }
        foreach ($request->vatAry as $data)
        {
            if ($data != null || $data != '')
            {
                $vatAry[] = $data;
                $sum_vatAry += $data;
            }
        }

        try
        {

            DB::beginTransaction();

            $bill = new ColocationBill();
            $bill->service_id = $request->service_id;
            // $bill->cus_type_id = $request->licence_id;
            $bill->grp_zone_id = $request->grp_or_zone_id;
            $bill->billing_month = $request->billing_month;
            $bill->bill_process_date = date('Y-m-d', strtotime(Carbon::now()));
            $bill->total_custonmer = count($allCustomer);
            $bill->total_mrc = $sum_OldMrcAry;
            $bill->total_adjust = $sum_adjustAry;
            $bill->total_mbc = $sum_rateForMbcAry;
            $bill->total_vat = $sum_vatAry;
            $bill->total_mrc_after_discount = $sum_discountWiseOldMrcAry;
            $bill->net_total = $sum_netTotal;
            $bill->bill_creator = Auth::user()->id;
            $bill->save();

            $articlesCount = count($netTotal);

            for ($i = 0;$i < $articlesCount;$i++)
            {

                // $circuitData=ColocationDemandNote::where('customer_id', $allCustomer[$i])->where('approval_status', 2)->pluck('circuit_id');
                $approveDate = ColocationDemandNote::where('customer_id', $allCustomer[$i])->where('approval_status', 2)
                    ->pluck('approved_date');
                // $circuit = json_encode($circuitData);
                $demandApproveDate = json_encode($approveDate);

                $billDetails = new ColocationBillDetails();
                $billDetails->customer_id = $allCustomer[$i];
                $billDetails->bill_id = $bill->id;
                $billDetails->grp_zone_id = $bill->grp_zone_id;
                $billDetails->service_id = $bill->service_id;
                // $billDetails->circuit_id = $circuit;
                $billDetails->demand_approved_date = $demandApproveDate;
                $billDetails->billing_month = $bill->billing_month;
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
            return response(['msg' => 'Success', ], 200);

        }
        catch(\Exception $e)
        {

            DB::rollBack();
            return response(['status' => false, 'message' => 'ops Faild . Please try again!', 'error' => $e->getMessage() , ], 500);

            echo $e->getMessage();
        }

    }
}