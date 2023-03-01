<?php
namespace App\Http\Controllers;
ini_set('max_execution_time', '0');

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\UserImport;

class FileImportController extends Controller
{
    public function user_import(Request $request)
    {
        $status = false;
        Excel::import(new UserImport, $request->file('file'));
        // return Excel::toArray(new \stdClass, $request->file('file'));
        $status = true;
        if ($status == true) {
            return response()->json([
                'message'=> 'Success'
            ],200);
        }
        return response()->json([
            'message'=> 'Error'
        ],500);

    }
}
