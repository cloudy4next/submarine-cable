<?php

namespace App\Http\Controllers\calculation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CalculationController extends Controller
{

    public function calculatMRC($data){

        if($data >=10 && $data <= 30){
            return"10 = 30";
        }elseif($data >30 && $data <= 50){
            return"30 == 50";
        }elseif($data >50 && $data <= 80){
            return"50 == 80";
        }else{
            return" 80 +++";
        }
    }
}
