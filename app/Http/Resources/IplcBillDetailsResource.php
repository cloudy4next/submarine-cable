<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IplcBillDetailsResource extends JsonResource
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
            "id" => $this->id,
            "address" => $this->customers->address,
            "bin" => $this->customers->bin_vat_etc,
            "bill_process_date" => $this->bill_process_date,
            "billing_month" => $this->billing_month,
            "service_id" => $this->service_id,
            "mbc" => $this->mbc,
            "remarks" => $this->remarks,
            "mrc" => $this->mrc,
            "old_mrc" => $this->old_mrc,
            "old_mrc_after_discount" => $this->old_mrc_after_discount,
            "adjust" => $this->adjust,
            "vat" => $this->vat,
            "net_total" => $this->net_total,
            "sub_service_id" => $this->sub_service_id,
            "sub_service_name" => $this->iplcbill->subservice->sub_service_name,
            "group_name" => $this->iplcbill->groups->group_name,
            "adjustableMonth" => $this->adjustableMonth($this->id),
            "oldMonthNetTotal" =>$this->getOldMonthNetTotal($this->customer_id,$this->billing_month,$this->sub_service_id,$this->id),
            "connectionInformation" => $this->getconnectionInformation($this->customer_id,$this->sub_service_id),
            "existingDemandNote" =>$this->checkExistingDemandNote($this->customer_id,$this->billing_month,$this->sub_service_id, $this->id),
            "adjustData" => $this->getAdjustData($this->customer_id,$this->billing_month,$this->sub_service_id, $this->id),
            "cableWiseBill" => $this->cableWiseBillCalculate($this->customer_id, $this->billing_month,$this->sub_service_id),
            'total' => $this->customerIdWiseTotalBandwidthCalculation($this->customer_id),
            'demandnote' => $this->customerIdWiseDemandnote($this->customer_id,$this->sub_service_id),
            'cableWiseTotal' => $this->customerIdAndCableWiseTotalBandwidthCalculation($this->customer_id,$this->service_id,$this->sub_service_id, $this->group_id),

        ];
    }
}