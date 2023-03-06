<?php

namespace App\Http\Controllers\Customer;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Customer\Group;
use App\Models\Customer\LandingStation;
use App\Http\Controllers\Configuration\ServiceController;

class LandingstationController extends Controller
{

    public function groupZoneOrPop($id){
        // return 'ookk';
        $data = Group::where('service_id',$id)->get();
        return response([
            'msg' =>'success',
            'data' => $data

        ]);
    }

    public function getGroupIdWiseCountry(Request $request)
    {
        $groupZoneInfo = (new ServiceController)->idWiseGroupZoneInfo($request->id);

        $groupInfo = (new ServiceController)->idWiseGroupInfo($groupZoneInfo->grp_or_zone);

        $data = LandingStation::where('group_id',$groupInfo->id)->orderBy('id', 'desc')->get();

        return response([
            'msg' => 'success',
            'data' => $data,

        ]);
    }

    public function getstations()
    {

        $data = LandingStation::with('landgroup')->orderBy('id', 'desc')->get();

        return response([
            'msg' => 'success',
            'data' => $data,

        ]);
    }

    public function storestations(Request $request)
    {

        if ($request->id) {
            $model = LandingStation::find($request->id);
            $model->update($request->all());
        } else {
            $model = LandingStation::updateOrCreate($request->all());
        }

        return response()->json([
            'message' => 'success'
        ], 200);
    }

    public function storeGroup(Request $request){

      //  return $request->toArray();

        if($request->id){

            $group =Group::find($request->id);
            $group->group_name =$request->group_name;
            $group->service_id =$request->service_id;
            $group->sub_service_id =$request->sub_service_id;
            $group->update();
        }
        else{

            $group =new Group();
            $group->group_name =$request->group_name;
            $group->service_id =$request->service_id;
            $group->sub_service_id =$request->sub_service_id;
            $group->save();

        }

        return response([
            'msg' => 'success',

        ],200);


    }

    public function getlandinGroup(){

        $data = Group::with(['services','subservice'])->orderBy('id','desc')->get();

        return response([
            'msg' =>'success',
            'data' => $data

        ],200);
    }

    public function serviceAndSubServiceIdWiseGroupZoneGet(Request $request){

        $data = Group::where('service_id',$request->service_id)->orderBy('id','desc')->get();

        return response([
            'msg' =>'success',
            'data' => $data

        ],200);
    }






}