<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;

use App\Models\DemandNote;
use App\Models\UpDownRecord;
use Illuminate\Http\Request;
use App\Models\Customer\Customer;
use Illuminate\Support\Facades\DB;
use App\Models\Configuration\Service;
use App\Models\Customer\CustomerType;
use App\Models\Configuration\GroupOrZone;
use App\Models\Configuration\TariffCapacity;
use App\Http\Controllers\Customer\DemandNoteController;


class CustomerController extends Controller
{


    public function findCustomer($id)
    {
        return  $findCustomer = Customer::where('id', $id)->first();
    }

    public function serviceIdWiseCustomerType($id)
    {
        return  $findCustomer = CustomerType::where('service_id', $id)->with('customer.custype', 'service')->orderBy('id', 'desc')->get();
    }



    public function serviceWiseCustomer(Request $request)
    {
        $result = $this->serviceIdWiseCustomerType($request->id);

        $item = array();
        foreach ($result as $type) {
            foreach ($type->customer as $customer) {
                $item[] = $customer;
            }
        }

        $data = auth()->user();
        return response([
            'msg' => 'Success',
            'data' => $data,
            'users' => $item
        ], 200);
    }



    public function customer($id)
    {

        $data = auth()->user();

        // $model = Customer::with('custype')->orderBy('id', 'DESC')->get();

        $result = $this->serviceIdWiseCustomerType($id);

        $item = array();
        foreach ($result as $type) {
            foreach ($type->customer as $customer) {
                $item[] = $customer;
            }
        }


        return response([
            'msg' => 'Success',
            'data' => $data,
            'users' => $item
        ], 200);
    }

    public function customerStore(Request $request)
    {
        // dd($request->id);
        $request->validate([
            // 'name' => 'required'
        ]);

        try {
            DB::beginTransaction();


            $findCustomer = $this->findCustomer($request->id);
            // dd($findCustomer->name);
            if ($findCustomer != '') {
                Customer::where('id', $findCustomer->id)->update([
                    'name' => $request['name'] ?? $findCustomer->name,
                    'com_name' => $request['com_name'] ?? $findCustomer->com_name,
                    'address' => $request['address'] ?? $findCustomer->address,
                    'bin_vat_etc' => $request['bin_vat_etc'] ?? $findCustomer->bin_vat_etc,
                    'tin' => $request['tin'] ?? $findCustomer->tin,
                    'customer_type_id' => $request['customer_type_id'] ?? $findCustomer->customer_type_id,
                    'email' => $request['email'] ?? $findCustomer->email,
                    'phone' => $request['phone'] ?? $findCustomer->phone,
                ]);

                // return response(['msg' => 'Successfull Updated Customer Information',], 200);
            } else {

                Customer::create([
                    'name' => $request['name'],
                    'com_name' => $request['com_name'],
                    'address' => $request['address'],
                    'bin_vat_etc' => $request['bin_vat_etc'],
                    'tin' => $request['tin'],
                    'customer_type_id' => $request['customer_type_id'],
                    'email' => $request['email'],
                    'phone' => $request['phone'],
                ]);
            }

            DB::commit();
            return response(['msg' => 'Successfully Created New Customer Information',], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'status' => false,
                'message' => 'your custom message',
                'error' => $th->getMessage(),
            ], 500);
        }
    }


    public function customerIdWiseCircuit(Request $request)
    {

        //   $data = DemandNote::with(['groups', 'circuit', 'subservice', 'customers'])->where('customer_id',
        // $request->id)->where('approval_status',2)->orderBy('id', 'desc')
        //     ->get();
        $data = (new DemandNoteController)->customerIdWiseDemandNote($request->id);

        $total = (new DemandNoteController)->customerIdWiseTotalBandwidthCalculation($request->id);

        $comName = $data[0]->customers->com_name;
        $customer_id = $data[0]->customer_id;
        $serviceId = $data[0]->service_id;
        $demndId = $data[0]->id;


        $groupData = DemandNote::with('groups')->Where('approval_status', 2)
            ->Where('service_id', $serviceId)
            ->Where('customer_id', $customer_id)
            ->select([DB::raw("sum(max) as max_total, sum(downgrade) as down_total, (sum(max)-sum(downgrade)) as active, group_id")])
            ->groupBy('group_id')
            ->get();

        $upDownRecord = UpDownRecord::with('groups')->Where('customer_id', $customer_id)->orderBy('id', 'DESC')->get();

        $groupByGropupId = UpDownRecord::with('groups')
            ->Where('customer_id', $customer_id)
            ->select('group_id')
            ->groupBy('group_id')
            ->get();

        return response()->json([
            'msg' => 'success',
            'comName' => $comName,
            'customer_id' => $customer_id,
            'demndId' => $demndId,
            'data' => $data,
            'groupData' => $groupData,
            'total' => $total,
            'upDownRecord' => $upDownRecord,
            'groupByGropupId' => $groupByGropupId,

        ]);
    }

    public function popOrUpDownWiseBHSearch(Request $request)
    {
        $data = (new DemandNoteController)->customerIdWiseDemandNote($request->id);

        $total = (new DemandNoteController)->customerIdWiseTotalBandwidthCalculation($request->id);

        $comName = $data[0]->customers->com_name;
        $customer_id = $data[0]->customer_id;
        $serviceId = $data[0]->service_id;
        $demndId = $data[0]->id;


        $groupData = DemandNote::with('groups')->Where('approval_status', 2)
            ->Where('service_id', $serviceId)
            ->Where('customer_id', $customer_id)
            ->select([DB::raw("sum(max) as max_total, sum(downgrade) as down_total, (sum(max)-sum(downgrade)) as active, group_id")])
            ->groupBy('group_id')
            ->get();

        if ($request->upDownSearch != 0 && $request->popWiseSearch != 0) {
            $upDownRecord = UpDownRecord::with('groups')
                ->Where('up_down', $request->upDownSearch)
                ->Where('group_id', $request->popWiseSearch)
                ->Where('customer_id', $customer_id)->get();
        } elseif ($request->upDownSearch != 0 && $request->popWiseSearch == 0) {
            $upDownRecord = UpDownRecord::with('groups')
                ->Where('up_down', $request->upDownSearch)
                ->Where('customer_id', $customer_id)->get();
        } elseif ($request->upDownSearch == 0 && $request->popWiseSearch != 0) {
            $upDownRecord = UpDownRecord::with('groups')
                ->Where('group_id', $request->popWiseSearch)
                ->Where('customer_id', $customer_id)->get();
        } else {
            $upDownRecord = UpDownRecord::with('groups')->Where('customer_id', $customer_id)->get();
        }




        return response()->json([
            'msg' => 'success',
            'comName' => $comName,
            'customer_id' => $customer_id,
            'demndId' => $demndId,
            'data' => $data,
            'groupData' => $groupData,
            'total' => $total,
            'upDownRecord' => $upDownRecord,

        ]);
    }

    public function customerIdWiseCircuitDeactive(Request $request)
    {
        // return $request->all();

        // if($request->date != null){
        //     $request->date;
        // }else{
        //     $request->date = Carbon::now();
        // }

        $request->validate([
            'date' => 'required',
        ], [
            'date.required' => 'Please enter date'
        ]);


        try {
            $activation = DemandNote::find($request->id);
            $activation->downgrade_date = $request->date;
            $activation->approval_status = 4;
            $activation->save();

            return response([
                'msg' => 'Success'

            ], 200);
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }


    public function customerIdWiseBandwithDowngrade(Request $request)
    {

        $update = DemandNote::where('customer_id', $request->customer_id)
            ->where('approval_status', 2)
            ->where('group_id', $request->group_id)
            ->orderBy('id', 'desc')->first();

        if ($request->add_sub == 1) {
            $bandwidth = 'max';
            $amount = $update->max + $request->inputBandwidth;
            $date = 'approved_date';
        } elseif ($request->add_sub == 2) {
            $bandwidth = 'downgrade';
            $date = 'downgrade_date';
            $amount = $update->downgrade + $request->inputBandwidth;
        } else {
            $bandwidth = 'downgrade';
            $date = 'downgrade_date';
            $amount = $update->downgrade + $request->inputBandwidth;

            $max = $request->inputBandwidth;
            $subServiceId = $request->singleItemInListData['sub_service_id'];
            $circuitId = $request->singleItemInListData['circuit_id'];

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
            } else {
                $max = 110000;
            }

            $capacity = TariffCapacity::where('circuit_id', $circuitId)
                ->where('sub_service_id', $subServiceId)
                ->where('max', $max)->first();

            $grp_or_zone = GroupOrZone::where('grp_or_zone', $request->migrateGroupId)
                ->where('capacity_id', $capacity->id)->first();

            $mrc = $grp_or_zone->charge * $request->inputBandwidth;
        }

        try {


            if ($request->add_sub == 3) {
                $data = new DemandNote();
                $data->customer_id = $request->singleItemInListData['customer_id'];
                $data->service_id = $request->singleItemInListData['service_id'];
                $data->sub_service_id = $request->singleItemInListData['sub_service_id'];
                $data->circuit_id = $request->singleItemInListData['circuit_id'];
                $data->discount = $request->singleItemInListData['discount'];
                $data->specialDiscount = $request->singleItemInListData['specialDiscount'];
                $data->add_sub = $request->singleItemInListData['add_sub'];
                $data->circuit_designation = $request->singleItemInListData['circuit_designation'];

                $data->deposit = 0;
                $data->migrate_status = 1;
                $data->approval_status = 2;
                $data->approved_date = $request->date;
                $data->qty = $request->inputBandwidth;
                $data->max = $request->inputBandwidth;
                $data->group_id = $request->migrateGroupId;

                $data->capacity_id = $capacity->id;
                $data->grp_or_zone = $grp_or_zone->id;
                $data->charge = $grp_or_zone->charge;
                $data->mrc = $mrc;
                $data->save();
            }

            UpDownRecord::insertGetId([
                'customer_id' => $request->customer_id,
                'group_id' => $request->group_id,
                'up_down' => $request->add_sub,
                'demandnote_id' => $update->id,
                'service_id' => $update->service_id,
                'sub_service_id' => $update->sub_service_id,
                $date => $request->date,
                $bandwidth => $request->inputBandwidth,
                'created_at' => Carbon::now()->toDateTimeString(),
            ]);


            $update->update([
                $date => $request->date,
                $bandwidth => $amount,
            ]);

            return response([
                'msg' => 'Success'

            ], 200);
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }


    public function customerType()
    {
        $data = CustomerType::with('service')->orderBy('id', 'desc')->get();
        return response([
            'msg' => 'success',
            'data' => $data

        ]);
    }
    public function customerServWiseType()
    {
        $data = $this->serviceIdWiseCustomerType(7);
        return response([
            'msg' => 'success',
            'data' => $data

        ]);
    }

    public function storeCustomerType(Request $request)
    {
        // $request->validate([
        //     'cus_type_name' => 'required',
        //     'service_id ' => 'required',
        // ]);

        //  dd($request->toArray());

        if ($request->id) {
            $model = CustomerType::find($request->id);
            $model->update($request->all());
        } else {
            $model = CustomerType::create($request->all());
        }

        return response()->json([
            'message' => 'success'
        ], 200);



        // try {
        //     DB::beginTransaction();

        //     $findCustomer = $this->findCustomer($request->id);
        //     if ($findCustomer != '') {
        //         Customer::where('id', $findCustomer->id)->update([
        //             'cus_type_name' => $request['cus_type_name'],
        //             'service_id' => $request['service_id'],
        //         ]);
        //     } else {
        //         Customer::create([
        //             'cus_type_name' => $request['cus_type_name'],
        //             'service_id' => $request['service_id'],
        //         ]);
        //     }

        //     DB::commit();
        //     return response([
        //         'msg' => 'Successfull Created Customer Type',
        //     ], 200);
        // } catch (\Throwable $th) {
        //     DB::rollBack();
        //     return response([
        //         'status' => false,
        //         'message' => 'your custom message',
        //         'error' => $th->getMessage(),
        //     ], 500);
        // }


    }

    public function getLicense(Request $request)
    {
        //    dd($request->all());
        $data = CustomerType::where('service_id', $request->service_id)->orderBy('id', 'desc')->get();

        return response([
            'msg' => 'success',
            'data' => $data

        ]);
    }
}
