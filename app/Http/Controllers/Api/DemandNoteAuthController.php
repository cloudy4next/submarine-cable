<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Str;
use App\Models\Bill\IplcBillDetails;
use App\Models\DemandNote;
use PhpOption\None;


class DemandNoteAuthController extends Controller
{
    public function demandNote()
    {
        $demand_data = DemandNote::with('services','customers', 'countries','ports')->where('approval_status',2)->get();
        $demand_data->count();
        $demand_notes = [];

        foreach ($demand_data as $demand) {

            $demand_notes[] = $this->demand_note_collection($demand);

        }
        $nameConvension = $this->fieldName();

        if($demand_data->count() == 0)
        {
            return response([
                    'message' => 'Resource Not Found',
                    ],404);
        }

        return response([
            'message' => 'success',
            'count' => $demand_data->count(),
            'data' => $demand_notes,

        ],200);
    }


    public function fieldName() : array
    {
        return [
            'noteFor'       => 'Service Name',
                'submarineCable'     => 'Submarine Cable Name',
                'companyName'   => 'Company Name',
                'phone'         => 'Company Phone Number',
                'regCharge'     => 'Registration Charge',
                'installation'  => 'Installation Charge',
                'mrcWS'         => 'Monthly Recurring Charge (MRC) for Wet Segment',
                'mscWSAD'       => 'MRC for Wet Segment after Discount	',
                'totalMrc'      => 'Total MRC',
                'vat'           => 'VAT (@ 5 % on all charges)',
                'vatWMrc'       => 'MRC with Vat',
                'subAmount'     => 'Subtotal Amount',
                'seqDeposit'    => 'Security Deposit',
                'totalPayAmount'=> 'Total Payable Amount',
        ];
    }

    public function demand_note_collection($demand) : array
    {
        $calculation = $this->demandNoteCalculation($demand);

        return [
                'DemandNoteType'       => $demand->services->service,
                'IdNo'           =>  $calculation['IdNo'],
                'issueDate'      =>$demand->created_at->format('d-m-Y'),
                'submarineCable'     => $demand->subservice->sub_service_name,
                'companyName'   => $demand->customers->com_name,
                'phone'         => $demand->customers->phone,
                'regCharge'     => $calculation['registration_charge'],
                'installation'  => $calculation['installation_charge'],
                'mrcWS'         => $demand->mrc,
                'mscWSAD'       => $calculation['afterDiscount'],
                'totalMrc'      => $demand->mrc,
                'vat'           => $calculation['vat'],
                'vatWMrc'       => $calculation['vatWMrc'],
                'subAmount'     => $calculation['subAmount'],
                'seqDeposit'    => $calculation['seqDeposit'],
                'totalPayAmount'=> $calculation['totalPayAmount'],
                // 'id'         => $demand->id,

        ];

    }

    public function demandNoteCalculation($demand) : array
    {
        $registration_charge = 0;
        $afterDiscount = 0;

        if ($demand->service_id == 1)
        {
            $installation_charge = $demand->capacity->instl_charge;
        }
        elseif ($demand->service_id != 1) {

            $installation_charge = $demand->ports->port_rate * $demand->portqty ;

        }
        else
        {
            $installation_charge = 0;
        }

        if( $demand->count_demand_note <= 1 )
        {
            if ($demand->service_id == 1)
            {
                $registration_charge = 20000;

            } else{$registration_charge = 10000;}
        }

        $afterDiscount  = $demand->mrc - ($demand->mrc * $demand->discount) / 100;
        $vat =  ($registration_charge +  $installation_charge + $afterDiscount) * .05;
        $vatWMrc =  $afterDiscount + $vat;
        $subAmount = $registration_charge +  $installation_charge + $afterDiscount + $vat;
        $seqDeposit = $afterDiscount * 1.05 ;
        $totalPayAmount = $subAmount + ($afterDiscount * 1.05);


        $iplcTotalDemandNote = DemandNote::where('service_id',$demand->service_id)->count();
        $customerType = $demand->customers->custype->cus_type_name;

        $cableType = $demand->sub_service_id == 105 ? 5 : 4;
        $circuitType = $demand->service_id == 1 ? $demand->circuit->circuit_name : '(N/A)';

        $NoteID = 'DN(' . $cableType . ')/' .  $customerType . '/' . $circuitType . '/000' . $iplcTotalDemandNote;

        return [
        'installation_charge'           => $installation_charge,
        'registration_charge'           => $registration_charge,
        'afterDiscount'                 =>$afterDiscount,
        'vat'                           =>$vat,
        'vatWMrc'                       =>$vatWMrc,
        'subAmount'                     =>$subAmount,
        'seqDeposit'                    =>$seqDeposit,
        'totalPayAmount'                =>$totalPayAmount,
        'IdNo'                          => $NoteID,
    ];
    }

    public function invoice()
    {
        $data = [];
        $invoiceList = IplcBillDetails::with('customers','iplcbill.subservice'
            ,'iplcbill.custype','iplcbill.services','iplcbill.groups')->where('invoice_status',1)->orderBy('id','DESC')->get();

        foreach ($invoiceList as $value) {

            $popWiseTotal =$this->customerIdAndCableWiseTotalBandwidthCalculation($value->customer_id,$value->service_id,$value->sub_service_id,$value->iplcbill->grp_zone_id);
            $mrc_after_discount =$this->popWiseRateAndBandwidthMultiply($value->old_mrc_after_discount, $popWiseTotal, $value->mbc);
            $vat =($mrc_after_discount * 0.05);
            $net_bill = $mrc_after_discount +  $vat;


            $data[] = [
                'customer_name' => $value->customers->com_name,
                'billing_month' => $value->billing_month,
                'billed_for' =>$popWiseTotal,
                'rate' => $value->old_mrc,
                'rate_after_discount' => $value->old_mrc_after_discount,
                'mrc' =>$mrc_after_discount ,
                'vat' => $vat,
                'net_bill' => $net_bill,

            ];
        }
        $response = ["message" => "Services Invoice Details","count"=>$invoiceList->count(),"data" =>$data];

        return response($response, 200);

    }
    public function popWiseRateAndBandwidthMultiply(float $old_mrc_after_discount, float $popWiseTotal, float $mbc) : float
    {

        return ($mbc !=0) ? ($old_mrc_after_discount  *  $popWiseTotal) + $mbc : $old_mrc_after_discount * $popWiseTotal;

    }

      public function customerIdAndCableWiseTotalBandwidthCalculation($customerId, $serviceId, $subServiceId, $groupId)
      {

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
