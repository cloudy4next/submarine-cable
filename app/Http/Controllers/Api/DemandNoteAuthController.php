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
            'fieldName' => $nameConvension,
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
                'noteFor'       => $demand->services->service,
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

        return [
        'installation_charge'           => $installation_charge,
        'registration_charge'           => $registration_charge,
        'afterDiscount'                 =>$afterDiscount,
        'vat'                           =>$vat,
        'vatWMrc'                       =>$vatWMrc,
        'subAmount'                     =>$subAmount,
        'seqDeposit'                    =>$seqDeposit,
        'totalPayAmount'                =>$totalPayAmount,
    ];
    }

    public function invoice()
    {
        $invoiceList = IplcBillDetails::with('customers','iplcbill.subservice'
            ,'iplcbill.custype','iplcbill.services','iplcbill.groups')->where('invoice_status',1)->orderBy('id','DESC')->get();

        $response = ["message" => "Services Invoice Details", "result" => $invoiceList];

        return response($response, 422);

    }
}
