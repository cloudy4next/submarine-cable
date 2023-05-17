<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Event;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    public function index()
    {
        return view('pages.registration');
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {

        if ($request->id) {
            $user = User::find($request->id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->address = $request->address;
            $user->designation = $request->designation;
            $user->phone = $request->phone;
            $user->password = Hash::make($request->password);
            $user->update();
            DB::table('model_has_roles')->where('model_id', $request->id)->delete();
            $user->assignRole($request->input('roles'));
        } else {
            // $user = User::create($request->all());
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'address' => $request->address,
                'phone' => $request->phone,
                'designation' => $request->designation,
                'password' => Hash::make($request->password),
            ]);
            $user->assignRole($request->input('roles'));
        }
        return response()->json([
            'message' => 'success'
        ], 200);
    }

    public function resetPass(Request $request)
    {

        $user = Auth::user();

        // Update the password
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'message' => 'success'
        ], 200);
    }


    public function signImgInfoUpdate(Request $request)
    {
        return $request->all();
        // return $request->imageTest;



        if ($request->hasFile('imageTest')) {
            // return 'ookk';
            $image = $request->file('imageTest');
            return $image;
            $imageName = 'user_' . '_' . time() . '.' . $image->getClientOriginalExtension();
            Image::make($image)->resize(250, 250)->save(base_path('public/uploads/users/' . $imageName));

            //  User::where('id',$insert)->update([
            //     'photo'=>$imageName,
            //     'updated_at'=>Carbon::now()->toDateTimeString(),
            //     ]);
        }
        return 'nnoo';



        //   $fileUpload = new User;

        //   if($request->file()) {
        //     $file_name = time().'_'.$request->file->getClientOriginalName();
        //     $file_path = $request->file('file')->storeAs('uploads', $file_name, 'public');

        //     $fileUpload->name = time().'_'.$request->file->getClientOriginalName();
        //     $fileUpload->path = '/storage/' . $file_path;
        //     $fileUpload->save();

        //     return response()->json(['success'=>'File uploaded successfully.']);
        //   }





        // $position = strpos($request->imageTest, ';');
        // $sub = substr($request->imageTest, 0, $position);
        // $ext = explode('/', $sub)[1];

        // $name = time().".".$ext;

        // $img = Image::make($request->imageTest)->resize(240,200);
        // $upload_path = 'uploads/';
        // $image_url = $upload_path.$name;
        // $img->save($image_url);
    }


    public function signInfoUpdate(Request $request)
    {

        if (
            $request->iplcSignDemandNote == 1 || $request->iptSignDemandNote == 1 ||
            $request->iplcSignInvoice == 1 || $request->iptSignInvoice == 1 ||
            $request->iplcSignReport == 1 || $request->iptSignReport == 1
        ) {
            $sign_status = 1;
        } else {
            $sign_status = 0;
        }

        // if($request->iplcSign == 1){
        //     $iplcSign = 1;
        // }else{
        //     $iplcSign = 0;
        // }

        // if($request->iptSign == 1){
        //     $iptSign = 1;
        // }else{
        //     $iptSign = 0;
        // }

        $user = User::find($request->id);
        $user->sign_iplc_demandnote = $request->iplcSignDemandNote;
        $user->sign_ipt_demandnote = $request->iptSignDemandNote;

        $user->sign_iplc_invoice = $request->iplcSignInvoice;
        $user->sign_ipt_invoice = $request->iptSignInvoice;

        $user->sign_iplc_report = $request->iplcSignReport;
        $user->sign_ipt_report = $request->iptSignReport;
        $user->sign_status = $sign_status;
        $user->update();


        return response()->json([
            'message' => 'success'
        ], 200);
    }

    public function mailInfoUpdate(Request $request)
    {
        // return $request->all();

        $user = User::find($request->id);
        $user->mail_iplc_demandnote = $request->iplcMailDemandNote;
        $user->mail_ipt_demandnote = $request->iptMailDemandNote;

        $user->mail_iplc_invoice = $request->iplcMailInvoice;
        $user->mail_ipt_invoice = $request->iptMailInvoice;

        $user->mail_iplc_report = $request->iplcMailReport;
        $user->mail_ipt_report = $request->iptMailReport;
        $user->update();


        return response()->json([
            'message' => 'success'
        ], 200);
    }


    public function eventStore(Request $request)
    {
        // return $request->all();

        $data = new Event();
        $data->title = $request->title;
        $data->date = $request->date;
        $data->desc = $request->desc;
        $data->save();


        return response()->json([
            'message' => 'success'
        ], 200);
    }


    public function login(Request $request)
    {

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            // if (Auth::attempt([
            //     'email' => $request->email,
            //     'password' => $request->password
            // ])) {
            return response()->json([
                'msg' => "success"
            ], 200);
        } else {
            return response()->json([
                'msg' => "Cridential not match!"
            ], 404);
        };
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
        //  dd('ok');

        Auth::logout();

        Session::flush();
        return redirect('/login');

        $request->session()->invalidate();
        return response([
            'msg' => "Logout"
        ], 200);
    }


    public function getallroles()
    {

        $data = Role::orderBy('id', 'desc')->get();
        return response([
            'msg' => 'success',
            'data' => $data
        ]);
    }

    public function getroleName()
    {
    }
}
