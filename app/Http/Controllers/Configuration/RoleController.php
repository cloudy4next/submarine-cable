<?php

namespace App\Http\Controllers\Configuration;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{

    public function getPermissions()
    {

        $data = Permission::orderBy('id', 'asc')->get();
        return response([

            'msg' => 'success',
            'data' => $data
        ], 200);
    }

    public function getRoles()
    {

        $data = Role::orderBy('id', 'desc')->get();

        return response([
            'msg' => 'success',
            'data' => $data
        ], 200);
    }

    public function getUser()
    {

        $id = Auth::user()->id;
        $data = User::findorFail($id);
        $roleId = DB::table('model_has_roles')->where('model_id', $id)->pluck('role_id');
        $roleName = Role::where('id', $roleId)->pluck('name');
        return response([
            'msg' => 'success',
            'data' => $data,
            'role' => $roleName,
        ], 200);
    }

    public function storeRole(Request $request)
    {

        //return $request->toArray();

        $this->validate($request, [
            'name' => 'required|unique:roles,name',
            'permission' => 'required',

        ]);

        $role = Role::create(['name' => $request->input('name')]);
        $role->syncPermissions($request->input('permission'));

        return response([
            'msg' => 'success',

        ], 200);
    }

    public function edit($id)
    {
        $role = Role::find($id);
        $permission = Permission::get();
        $rolePermissions = DB::table("role_has_permissions")->where("role_has_permissions.role_id", $id)
            ->pluck('role_has_permissions.permission_id', 'role_has_permissions.permission_id')
            ->all();

        return response()->json([
            'msg' => 'success',
            'data' => $role, $permission, $rolePermissions,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required',
            'permission' => 'required',
        ]);

        $role = Role::find($id);
        $role->name = $request->input('name');
        $role->save();

        $role->syncPermissions($request->input('permission'));

        return response()->json([
            'msg' => 'success',

        ], 200);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function roleDelete(Request $request)
    {
        DB::table("roles")->where('id', $request->id)->delete();
        return response()->json([
            'msg' => 'success',
        ], 200);
    }
}
