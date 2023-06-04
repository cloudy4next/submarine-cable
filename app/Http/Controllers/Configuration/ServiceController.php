<?php

namespace App\Http\Controllers\Configuration;

use App\Models\DemandNote;
use Illuminate\Http\Request;
use App\Models\Customer\Group;
use App\Models\Customer\Customer;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Configuration\Service;
use App\Models\Configuration\SubService;
use App\Models\Configuration\GroupOrZone;
use App\Models\Configuration\TariffCapacity;
use App\Http\Controllers\Customer\DemandNoteController;
use App\Models\MaxService;

class ServiceController extends Controller
{

    public function idWiseGroupZoneInfo($id)
    {
        // return $id;
        return $data = GroupOrZone::where('id', $id)->first();
    }

    public function idWiseGroupInfo($id)
    {
        return $data = Group::where('id', $id)->first();
    }

    public function index()
    {
        $models = Service::with('sub_services.capacity', 'subservices')->orderBy('id', 'DESC')->get();
        return response([
            'msg' => 'Success',
            'data' => $models
        ], 200);
    }

    public function get_service()
    {
        // return "ookk";
        $models = Service::with('sub_services.capacity', 'subservices')->orderBy('id', 'DESC')->get();
        return response([
            'msg' => 'Success',
            'data' => $models
        ], 200);
    }

    public function get_sub_service(Request $request)
    {
        // return 'ok';

        $models = SubService::with('service', 'capacity', 'zone.groups', 'capacity.zone')->where('service_id', $request->service_id)->orderBy('id', 'DESC')->get();

        return response([
            'msg' => 'Success',
            'data' => $models
        ], 200);
    }



    public function get_capacity(Request $request)
    {
        $models = TariffCapacity::with('zone.groups', 'subservice', 'subservice.service')->where('sub_service_id', $request->sub_service_id)->orderBy('id', 'ASC')->get();
        return response([
            'msg' => 'Success',
            'data' => $models
        ], 200);
    }

    public function circuitWiseCapacity($subServiceId, $circuitId, $max)
    {
        //   return $max.'==='.$circuitId.'==='.$subServiceId;
        // dd($max,$subServiceId,$circuitId);
        $capacity = TariffCapacity::where('circuit_id', $circuitId)->where('sub_service_id', $subServiceId)->where('max', $max)->first();
        // dd($capacity);

        return $model = GroupOrZone::with('groups')->where('capacity_id', $capacity->id)->get();
    }

    public function getZone(Request $request)
    {
        $circuitId = $request->circuit_id;
        $customerId = $request->customer_id;
        $subServiceId = $request->sub_service_id;
        $existingDemandNote = (new DemandNoteController)->existingDemandNoteCheck($customerId, $circuitId);

        $max = 0;
        if ($circuitId == 5) {
            $max = 2.5;
        } elseif ($circuitId == 6) {
            $max = 10;
        } elseif ($circuitId == 7) {
            $max = 100;
        }

        if ($existingDemandNote != null) {
            $oldMax = (new DemandNoteController)->existingData($customerId, $circuitId);
            $max = $max + $oldMax;  // New Demand note + Existing Demand note
        }
        if ($circuitId == 5) { // 5 == STM 16
            if ($max > 0 && $max <= 30) {
                $max = 30;
            } elseif ($max > 30 && $max <= 50) {
                $max = 50;
            } elseif ($max > 50 && $max <= 100) {
                $max = 100;
            } elseif ($max > 100 && $max <= 150) {
                $max = 150;
            } elseif ($max > 15 && $max <= 200) {
                $max = 200;
            } else {
                $max = 220;
            }
            $model = $this->circuitWiseCapacity($subServiceId, $circuitId, $max);
        } elseif ($circuitId == 6) { //6 == 10G

            if ($max > 0 && $max <= 10) {
                $max = 10;
            } elseif ($max > 10 && $max <= 20) {
                $max = 20;
            } elseif ($max > 20 && $max <= 30) {
                $max = 30;
            } elseif ($max > 30 && $max <= 50) {
                $max = 50;
            } elseif ($max > 50 && $max <= 100) {
                $max = 100;
            } elseif ($max > 100 && $max <= 150) {
                $max = 150;
            } elseif ($max > 150 && $max <= 200) {
                $max = 200;
            } elseif ($max > 200 && $max <= 250) {
                $max = 250;
            } elseif ($max > 250 && $max <= 300) {
                $max = 300;
            } elseif ($max > 300 && $max <= 350) {
                $max = 350;
            } else {
                $max = 400;
            }

            //    if($max >0 && $max <= 1){
            //         $max = 1;
            //     }elseif($max >1 && $max <= 2){
            //         $max = 2;
            //     }elseif($max >2 && $max <= 3){
            //         $max = 3;
            //     }elseif($max >3 && $max <= 4){
            //         $max = 4;
            //     }elseif($max >4 && $max <= 5){
            //         $max = 5;
            //     }elseif($max >5 && $max <= 6){
            //         $max = 6;
            //     }elseif($max >6 && $max <= 7){
            //         $max = 7;
            //     }elseif($max >7 && $max <= 8){
            //         $max = 8;
            //     }elseif($max >8 && $max <= 9){
            //         $max = 9;
            //     }else{
            //         $max = 10;
            //     }
            $model = $this->circuitWiseCapacity($subServiceId, $circuitId, $max);
        } elseif ($circuitId == 7) { //100 g
            // $max = 200;
            // dd($max);
            if ($max < 200) {
                $max = 200;
            } elseif ($max >= 200 && $max < 300) {
                $max = 300;
            } elseif ($max >= 300 && $max < 400) {
                $max = 400;
            } elseif ($max >= 400 && $max < 500) {
                $max = 500;
            } elseif ($max >= 500 && $max < 600) {
                $max = 600;
            } elseif ($max >= 600 && $max < 700) {
                $max = 700;
            } elseif ($max >= 700 && $max < 800) {
                $max = 800;
            } elseif ($max >= 800 && $max < 900) {
                $max = 900;
            } elseif ($max >= 900 && $max < 1000) {
                $max = 1000;
            } elseif ($max >= 1000 && $max < 1100) {
                $max = 1100;
            } else {
                $max = 1200;
            }
            $model = $this->circuitWiseCapacity($subServiceId, $circuitId, $max);
        } elseif ($circuitId == 8 || $circuitId == 9) {    //ip transit isp or iig

            $max = $request->qty;
            if ($existingDemandNote != '') {
                $oldMax = (new DemandNoteController)->existingData($customerId, $circuitId);
                $max = $max + $oldMax;  // New Demand note + Existing Demand note
            }
            if ($max > 1 && $max < 5000) {
                $max = 5000;
            } elseif ($max >= 5000 && $max < 10000) {
                $max = 10000;
            } elseif ($max >= 10000 && $max < 20000) {
                $max = 20000;
            } elseif ($max >= 20000 && $max < 30000) {
                $max = 30000;
            } elseif ($max >= 30000 && $max < 40000) {
                $max = 40000;
            } elseif ($max >= 40000 && $max < 50000) {
                $max = 50000;
            } elseif ($max >= 50000 && $max < 65000) {
                $max = 65000;
            } elseif ($max >= 65000 && $max < 80000) {
                $max = 80000;
            } elseif ($max >= 80000 && $max < 100000) {
                $max = 100000;
            } elseif ($max >= 100000 && $max < 130000) {
                $max = 130000;
            } elseif ($max >= 130000 && $max < 160000) {
                $max = 160000;
            } elseif ($max >= 160000 && $max < 200000) {
                $max = 200000;
            } else {
                $max = 300000;
            }
            $model = $this->circuitWiseCapacity($subServiceId, $circuitId, $max);
            // dd('this->',$model);
        } else {
            $model = $this->circuitWiseCapacity($subServiceId, $circuitId, 0);
        }
        // dd($model);
        return response([
            'msg' => 'success',
            'data' => $model

        ]);

        // $model = GroupOrZone::where('circuit_id', $request->circuit_id)->orderBy('id', 'desc')->get();
        // return response([
        //     'msg' => 'Success',
        //     'data' => $model

        // ]);
    }


    public function getColocationCharge(Request $request)
    {
        $circuitId = $request->circuit_id;
        $customerId = $request->customer_id;
        $subServiceId = $request->sub_service_id;

        $existingDemandNote = (new DemandNoteController)->colocationExistingDemandNoteCheck($customerId, $circuitId);

        $max = 0;
        if ($circuitId == 6) {
            $max = 10;
        } elseif ($circuitId == 7) {
            $max = 100;
        }


        if ($existingDemandNote != '') {
            $oldMax = (new DemandNoteController)->colocationExistingData($customerId, $circuitId);
            $max = $max + $oldMax;  // New Demand note + Existing Demand note
        }

        if ($circuitId  > 5) { // 5 == STM 16
            if ($max > 100 && $max <= 200) {
                $max = 200;
            } elseif ($max > 200 && $max <= 300) {
                $max = 300;
            } elseif ($max > 300) {
                $max = 400;
            }
            $model = $this->circuitWiseCapacity($subServiceId, $circuitId, $max);
        } else {
            $model = $this->circuitWiseCapacity($subServiceId, $circuitId, 0);
        }

        return response([
            'msg' => 'success',
            'data' => $model

        ]);
    }




    public function getcharge(Request $request)
    {
        // dd($request->grp_or_zone);
        $data = $this->idWiseGroupZoneInfo($request->grp_or_zone);
        return response([
            'msg' => 'Success',
            'data' => $data

        ]);
    }

    public function iplc_list()
    {
        $models = Service::leftJoin('sub_services', 'sub_services.service_id', 'services.id')
            ->leftJoin('tariff_capacities', 'tariff_capacities.sub_service_id', 'sub_services.id')
            ->select(
                'services.id',
                'services.service',
                'sub_services.id as sub_service_id',
                'sub_services.sub_service_name',
                'tariff_capacities.id as tariff_id',
                'tariff_capacities.capacity_name',
            )->orderBy('id', 'DESC')->get();
        return response([
            'msg' => 'Success',
            'data' => $models
        ], 200);
    }

    public function update_capacity(Request $request)
    {



        if ($request->tariff_id) {
            TariffCapacity::where('id', $request->tariff_id)->update([
                'capacity_name' => $request->capacity_name,
                'charge' => $request->charge
            ]);
        } else {
            TariffCapacity::updateOrCreate([
                'sub_service_id' => $request->sub_service_id,
                'capacity_name' => $request->capacity_name,
                'charge' => $request->charge
            ]);
        }
        return response([
            'msg' => 'Success'
        ], 200);
    }



    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            if ($request->id) {
                $item = Service::find($request->id);
                if ($item) {
                    $model = Service::where('id', $item->id)->update([
                        'service' => $request->service
                    ]);
                }
            } else {
                $model = Service::updateOrCreate($request->all());
            }
            // $model->create_sub_service()->delete();
            // $model->create_sub_service()->createMany($request->sub_service);

            DB::commit();
            return response([
                'msg' => 'Success',
            ], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'msg' => 'ERROR',
            ], 500);
        }
    }
    public function subStore(Request $request)
    {
        //    return $request->all();
        try {
            DB::beginTransaction();

            if ($request->id) {
                // dd($request->all());

                $item = Service::find($request->id);
                if ($item) {
                    $model = Service::where('id', $item->id)->update([
                        'service' => $request->service
                    ]);

                    // $sub_model = SubService::where('service_id', $item->id)->get();
                    // if(count($sub_model)!= 0){
                    //     foreach ($sub_model as $key => $value) {
                    //         // $value->create_capacity()->delete();
                    //          $allTarif = TariffCapacity::where('sub_service_id',$value->id)->get();
                    //          if(count($allTarif)!= 0){
                    //              foreach($allTarif as $tarif){
                    //                  GroupOrZone::where('capacity_id', $tarif->id)->delete();
                    //              }
                    //          }
                    //          TariffCapacity::where('sub_service_id',$value->id)->delete();
                    //         // $value->delete();
                    //         SubService::where('id',$value->id)->delete();
                    //         // return 'ookk';
                    //     }
                    // }


                    foreach ($request->sub_service as $value) {
                        // return $value;
                        $sub_model = SubService::updateOrCreate([
                            'service_id' => $request->id,
                            'sub_service_name' => $value['sub_service_name'],
                        ]);
                        // return $sub_model;

                        foreach ($value['capacity'] as $key => $item) {
                            $tarifId = TariffCapacity::updateOrCreate([
                                'sub_service_id' => $sub_model->id,
                                'capacity_name' => $item['capacity_name'],
                                'circuit_id' => $item['circuit_id'],
                                'max' => $item['max'],
                            ]);
                            // return $tarifId;

                            foreach ($item['zone'] as $key => $grpAndCharge) {
                                GroupOrZone::updateOrCreate([
                                    'sub_service_id' => $sub_model->id,
                                    'capacity_id' => $tarifId->id,
                                    'circuit_id' => $tarifId->circuit_id,
                                    'max' => $tarifId->max,
                                    'charge' => 0,
                                    'grp_or_zone' => $grpAndCharge['grp_or_zone'],
                                ]);
                            }
                        }
                    }
                }
            }
            // $model->create_sub_service()->delete();
            // $model->create_sub_service()->createMany($request->sub_service);

            DB::commit();
            return response([
                'msg' => 'Successfull Created Sub Service & Capacity',
            ], 200);
        } catch (\Throwable $th) {
            // dd($th);
            DB::rollBack();
            return response([
                'status' => false,
                'message' => 'your custom message',
                'error' => $th->getMessage(),
            ], 500);
        }
    }


    public function subServUpdate(Request $request)
    {

        try {
            DB::beginTransaction();

            if ($request->id) {
                $item = Service::find($request->id);
                if ($item) {
                    $model = Service::where('id', $item->id)->update([
                        'service' => $request->service
                    ]);

                    $sub_model = SubService::where('id', $request->subServiceId)->firstOrFail();
                    if ($sub_model != '') {
                        // $value->create_capacity()->delete();
                        $allTarif = TariffCapacity::where('sub_service_id', $sub_model->id)->get();

                        if (count($allTarif) != 0) {
                            // return 'if condition';
                            foreach ($allTarif as $tarif) {
                                GroupOrZone::where('capacity_id', $tarif->id)->delete();
                            }
                        }

                        TariffCapacity::where('sub_service_id', $sub_model->id)->delete();
                        // $value->delete();
                    }

                    // return $request->sub_service;
                    $sub_model = SubService::where('id', $request->subServiceId)->update([
                        'sub_service_name' => $request->subService['sub_service_name'],
                    ]);
                    // dd( $request->all());

                    foreach ($request->subService['capacity'] as $key => $item) {
                        $tarifId = TariffCapacity::updateOrCreate([
                            'sub_service_id' => $request->subServiceId,
                            'capacity_name' => $item['capacity_name'],
                            'instl_charge' => $item['instl_charge'],
                            'circuit_id' => $item['circuit_id'],
                            'max' => $item['max'],
                        ]);

                        foreach ($item['zone'] as $key => $grpAndCharge) {
                            GroupOrZone::updateOrCreate([
                                'sub_service_id' => $request->subServiceId,
                                'capacity_id' => $tarifId->id,
                                'charge' => 0,
                                'grp_or_zone' => $grpAndCharge['grp_or_zone'],
                                'circuit_id' => $tarifId->circuit_id,
                                'instl_charge' => $tarifId->instl_charge,
                                'max' => $tarifId->max,
                            ]);
                        }
                    }
                }
            }
            // $model->create_sub_service()->delete();
            // $model->create_sub_service()->createMany($request->sub_service);

            DB::commit();
            return response([
                'msg' => 'Successfull Update Sub Service & Capacity',
            ], 200);
        } catch (\Throwable $th) {
            // dd($th);
            DB::rollBack();
            return response([
                'status' => false,
                'message' => 'your custom message',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function destroyGroup(Request $request)
    {
        // dd($request->all());
        $zoneCapacity = $request->params['capacity']['zone'];
        $delZoneArrayID = $request->zone;

        foreach ($zoneCapacity as $key => $value) {
            if ($key == $delZoneArrayID) {

                GroupOrZone::where('id', $value['id'])->delete();
                return response([
                    'msg' => 'Successfully Sub Removed Group Or Zone',
                ], 200);
            } else {
                return response([
                    'msg' => 'Data Not found!',
                ], 401);
            }
        }
    }

    public function tariffUpdate(Request $request)
    {
        try {
            $item = Service::find($request->id);
            $tarrif_id = '';
            if ($item) {
                $model = Service::where('id', $item->id)->update([
                    'service' => $request->service
                ]);
                // $sub_model = SubService::where('id', $request->subServiceId)->firstOrFail();
                // if ($sub_model != '') {
                //     // $value->create_capacity()->delete();
                //     $allTarif = TariffCapacity::where('sub_service_id', $sub_model->id)->get();

                //     if (count($allTarif) != 0) {
                //         dd("here");

                //         // return 'if condition';
                //         foreach ($allTarif as $tarif) {
                //             GroupOrZone::where('capacity_id', $tarif->id)->delete();
                //         }
                //     }

                //     TariffCapacity::where('sub_service_id', $sub_model->id)->delete();
                //     // $value->delete();
                // }
                $sub_model = SubService::where('id', $request->subServiceId)->update([
                    'sub_service_name' => $request->subService['sub_service_name'],
                ]);

                foreach ($request->subService['capacity'] as $key => $item) {

                    if (TariffCapacity::where('id', $item['id'])->exists()) {
                        $tarifId = TariffCapacity::where('id', $item['id'])->update([
                            'sub_service_id' => $request->subServiceId,
                            'capacity_name' => $item['capacity_name'],
                            'instl_charge' => $item['instl_charge'],
                            'circuit_id' => $item['circuit_id'],
                            'max' => $item['max'],
                        ]);
                        $tarrif_id = $item['id'];
                    } else {
                        $tarifId = TariffCapacity::create([
                            'sub_service_id' => $request->subServiceId,
                            'capacity_name' => $item['capacity_name'],
                            'instl_charge' => $item['instl_charge'],
                            'circuit_id' => $item['circuit_id'],
                            'max' => $item['max'],
                        ]);
                        $tarrif_id = $tarifId->id;
                    }
                    foreach ($item['zone'] as $key => $grpAndCharge) {
                        $keyExists = isset($grpAndCharge['id']);
                        if ($keyExists) {
                            GroupOrZone::where('id', $grpAndCharge['id'])->update([
                                'sub_service_id' => $request->subServiceId,
                                'charge' => $grpAndCharge['charge'],
                                'vat' => $grpAndCharge['vat'],
                                'grp_or_zone' => $grpAndCharge['grp_or_zone'],
                            ]);
                        } else {
                            $tarrif = TariffCapacity::where('id', $tarrif_id)->first();

                            GroupOrZone::create([
                                'sub_service_id' => $request->subServiceId,
                                'capacity_id' => $tarrif->id,
                                'charge' => $grpAndCharge['charge'],
                                'vat' => $grpAndCharge['vat'],
                                'grp_or_zone' => $grpAndCharge['grp_or_zone'],
                                'circuit_id' => $tarrif->circuit_id,
                                'instl_charge' => $tarrif->instl_charge,
                                'max' => $tarrif->max,
                            ]);
                        }
                    }
                }
            }
            // $model->create_sub_service()->delete();
            // $model->create_sub_service()->createMany($request->sub_service);
            return response([
                'msg' => 'Successfull Update Sub Service & Capacity',
            ], 200);
        } catch (\Throwable $th) {
            return response([
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
    }


    public function destroy(Request $request)
    {
        Service::where('id', $request->id)->update([
            'status' => 0
        ]);

        return response([
            'msg' => 'Success',
        ], 200);
    }

    public function  getIplc()
    {

        $data = SubService::with('service', 'capacity', 'zone.groups', 'capacity.zone')->where('service_id', 1)->orderBy('id', 'desc')->get();
        return response([
            'msg' => 'success',
            'data' => $data

        ], 200);
    }

    public function  getIptransit()
    {
        $data = SubService::with('service', 'capacity', 'zone.groups', 'capacity.zone')->where('service_id', 7)->orderBy('id', 'desc')->get();
        return response([

            'msg' => 'success',
            'data' => $data

        ], 200);
    }

    public function  getColocation()
    {
        $data = SubService::with('service', 'capacity', 'zone.groups', 'capacity.zone')->where('service_id', 13)->orderBy('id', 'desc')->get();
        return response([
            'msg' => 'success',
            'data' => $data
        ], 200);
    }

    public function  getColocationIplc()
    {
    }
}
