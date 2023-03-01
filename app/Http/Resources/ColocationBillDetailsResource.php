<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ColocationBillDetailsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "company" => $this->customers->com_name,
            "customer_id" => $this->customer_id,
            "address" => $this->customers->address,
            "bin" => $this->customers->bin_vat_etc,
            "bill_process_date" => $this->bill_process_date,
            "billing_month" => $this->billing_month,
            "adjustableMonth" => $this->adjustableMonth($this->id),
            "service_id" => $this->service_id,
            "grp_zone_id" => $this->grp_zone_id,
            "grpName" => $this->colocationBill->groups->group_name,
            "remarks" => $this->remarks,
            "licenceId" => $this->customers->customer_type_id,
            'total_power' => $this->getPowers($this->customer_id),
            'total_rack' => $this->getRacks($this->customer_id),
            "oldMonthNetTotal" =>$this->getOldMonthNetTotal($this->customer_id,$this->billing_month,$this->grp_zone_id,$this->id),
            "connectionInformation" => $this->getconnectionInformation($this->customer_id,$this->grp_zone_id),
            // "existingDemandNote" =>$this->checkExistingDemandNote($this->customer_id,$this->billing_month,$this->sub_service_id, $this->id),
            "adjustData" => $this->getAdjustData($this->customer_id,$this->billing_month,$this->grp_zone_id, $this->id),
            "cableWiseBill" => $this->cableWiseBillCalculate($this->customer_id,
            $this->billing_month,$this->grp_zone_id),
            'total' => $this->customerIdWiseTotalBandwidthCalculation($this->customer_id),
            //'demandnote' => $this->customerIdWiseDemandnote($this->customer_id,$this->sub_service_id),
            // 'cableWiseTotal' => $this->customerIdAndCableWiseTotalBandwidthCalculation($this->customer_id,$this->service_id,$this->sub_service_id, $this->group_id),

        ];
    }
}