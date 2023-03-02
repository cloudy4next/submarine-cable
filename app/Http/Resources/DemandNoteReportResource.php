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
        // dd($this->customer_id);
        return [

        'last_activation_date' => $this->customerIdWiseFirstActivationDateCheck($this->customer_id),
        "customer_name" => $this->customers->name,
        
        ];
    }
}