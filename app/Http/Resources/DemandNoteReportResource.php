<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DemandNoteReportResource extends JsonResource
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
        "service_id" => $this->service_id,
        "sub_service_id" => $this->sub_service_id,
        "sub_service_name" => $this->subservice->sub_service_name,
        'total' => $this->customerIdWiseTotalBandwidthCalculation($this->customer_id),
        'cableWiseTotal' => $this->customerIdAndCableWiseTotalBandwidthCalculation($this->customer_id,$this->service_id,
        $this->sub_service_id, $this->group_id),
        'last_activation_date' => $this->customerIdWiseFirstActivationDateCheck($this->customer_id),
        "customer_name" => $this->customers ->name,
        "customer_id" => $this->customer_id,
        "group_id" => $this->group_id,
        'type' => $this->customers->custype->cus_type_name,
        "circuit_id" => $this->circuit_id,
        'circuits' => $this->getCircuits($this->customer_id),
        'checkPrevMonthDemandNoteActiveInactive'=>$this->checkPrevMonthDemandNoteInActiveInactive($this->customer_id),
        'cableWiseCircuits' => $this->getCablWiseCircuits($this->customer_id, $this->sub_service_id),
        'CablAndGroupWiseCircuits'=>$this->getCablAndGroupWiseCircuits($this->customer_id,$this->sub_service_id,$this->group_id),
        'bill' =>$this->getCircuitsWiseBill($this->customer_id,$this->sub_service_id,$this->group_id,$this->service_id,$this->circuit_id,$this->service_id),
        ];
    }
}