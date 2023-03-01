<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Event;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        $data = auth()->user();
        $model = User::orderBy('id', 'DESC')->get();
        return response([
            'msg'=> 'Success',
            'data'=> $data,
            'users'=> $model
        ],200);
    }

    public function eventList()
    {
        $data = auth()->user();
        $model = Event::where('status',1)->orderBy('id', 'DESC')->get();
        return response([
            'msg'=> 'Success',
            'data'=> $data,
            'Event'=> $model
        ],200);
    }


    public function system_user()
    {
        $data = auth()->user();
        $model = User::orderBy('id', 'DESC')->get();
        return view('pages.user-module.system-user-list',[
            'data'=>$data,
            'users'=>$model
        ]);
    }


    public function store(Request $request)
    {

       // return $request->toArray();

        if ($request->id) {
            $model = User::find($request->id);
            DB::table('model_has_roles')->where('model_id',$model)->delete();
            $model->assignRole($request->input('roles'));

            $model->update($request->all());
        } else {
            $model = User::create($request->all());
            $model->assignRole($request->input('roles'));

        }
        return response()->json([
            'message' => 'success'
        ], 200);
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


    public function destroy($id)
    {
        //
    }
}