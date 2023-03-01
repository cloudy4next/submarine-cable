<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IpTBillDetailsResource extends JsonResource
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
         "group_id" => $this->iplcbill->grp_zone_id,
         "group_name" => $this->iplcbill->groups->group_name,
         "mbc" => $this->mbc,
         "old_mrc" => $this->old_mrc,
         "old_mrc_after_discount" => $this->old_mrc_after_discount,
         "remarks" => $this->remarks,
         "oldMonthNetTotal" =>
         $this->getOldMonthNetTotal($this->customer_id,$this->billing_month,$this->sub_service_id,$this->id),
         "connectionInformation" => $this->getconnectionInformation($this->customer_id,$this->sub_service_id),
         "existingDemandNote"
         =>$this->checkExistingDemandNote($this->customer_id,$this->billing_month,$this->sub_service_id, $this->id),
         "adjustData" => $this->getAdjustData($this->customer_id, $this->billing_month,$this->sub_service_id,$this->id),
         "mrc" => $this->mrc,
         "adjust" => $this->adjust,
         "vat" => $this->vat,
         "net_total" => $this->net_total,
         "service_id" => $this->service_id,
         "sub_service_id" => $this->sub_service_id,
         "cableWiseBill" => $this->cableWiseBillCalculate($this->customer_id,$this->billing_month,$this->sub_service_id),
         "sub_service_name" => $this->iplcbill->subservice->sub_service_name,
         'demandnote' => $this->customerIdWiseDemandnote($this->customer_id,$this->sub_service_id),
         'totalBandwith' => $this->customerIdWiseTotalBandwidthCalculation($this->customer_id),
         'popWiseTotal'
         =>$this->customerIdAndCableWiseTotalBandwidthCalculation($this->customer_id,$this->service_id,$this->sub_service_id,$this->iplcbill->grp_zone_id),


         ];
    }
}