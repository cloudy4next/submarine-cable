<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Configuration\GroupOrZone;

class MrcCalculateController extends Controller
{

    public function calculate($max, $circuitId, $grp_or_zone)
    {
        $val = GroupOrZone::where('max', $max)->where('circuit_id', $circuitId)->where('grp_or_zone', $grp_or_zone)->first();
        if (is_null($val))
        {
            $price = 0;
        }
        else
        {
            $price = intval($val->charge);
        }
        return (int)$price;
    }

    public function mrcCalculateForStm16($max, $circuitId, $grp_or_zone)
    {
        if ($max >= 0 && $max <= 30)
        {
            return $price = $this->calculate(30, $circuitId, $grp_or_zone);
        }
        elseif ($max > 30 && $max <= 50)
        {
            return $price = $this->calculate(50, $circuitId, $grp_or_zone);
        }
        elseif ($max > 50 && $max <= 100)
        {
            return $price = $this->calculate(100, $circuitId, $grp_or_zone);
        }
        elseif ($max > 100 && $max <= 150)
        {
            return $price = $this->calculate(150, $circuitId, $grp_or_zone);
        }
        elseif ($max > 150 && $max <= 200)
        {
            return $price = $this->calculate(200, $circuitId, $grp_or_zone);
        }
        else
        {
            return $price = $this->calculate(220, $circuitId, $grp_or_zone);
        }
    }

    public function mrcCalculateFor10G($max, $circuitId, $grp_or_zone, $countCircuit6)
    {

        $val5 = $this->calculate(50, $circuitId, $grp_or_zone);
        $val10 = $this->calculate(100, $circuitId, $grp_or_zone);
        $val15 = $this->calculate(150, $circuitId, $grp_or_zone);
        $val20 = $this->calculate(200, $circuitId, $grp_or_zone);
        $val25 = $this->calculate(250, $circuitId, $grp_or_zone);
        $val30 = $this->calculate(300, $circuitId, $grp_or_zone);
        $val35 = $this->calculate(350, $circuitId, $grp_or_zone);
        $val40 = $this->calculate(400, $circuitId, $grp_or_zone);


        if ($max >= 0 && $max <= 50)
        {
             $price = $val5 * $countCircuit6;
        }
        elseif ($max > 50 && $max <= 100)
        {
            $maxCalculat = $countCircuit6 - 5;
             $price = ($val5 * 5) + ($val10 * $maxCalculat);
        }
        elseif ($max > 100 && $max <= 150)
        {
            $maxCalculat = $countCircuit6 - 10;

             $price = ($val5 * 5) + ($val10 * 5) + ($val15 * $maxCalculat);
        }
        elseif ($max > 150 && $max <= 200)
        {
            $maxCalculat = $countCircuit6 - 15;

             $price = ($val5 * 5) + ($val10 * 5) + ($val15 * 5) + ($val20 * $maxCalculat);
        }
        elseif ($max > 200 && $max <= 250)
        {
            $maxCalculat = $countCircuit6 - 20;

             $price = ($val5 * 5) + ($val10 * 5) + ($val15 * 5) + ($val20 * 5) + ($val25 * $maxCalculat);
        }
        elseif ($max > 250 && $max <= 300)
        {
            $maxCalculat = $countCircuit6 - 25;

             $price = ($val5 * 5) + ($val10 * 5) + ($val15 * 5) + ($val20 * 5) + ($val25 * 5) + ($val30 * $maxCalculat);
        }
        elseif ($max > 300 && $max <= 350)
        {
            $maxCalculat = $countCircuit6 - 30;

             $price = ($val5 * 5) + ($val10 * 5) + ($val15 * 5) + ($val20 * 5) + ($val25 * 5) + ($val30 * 5) + ($val35 * $maxCalculat);
        }
        else
        {
            $maxCalculat = $countCircuit6 - 35;

             $price = ($val5 * 5) + ($val10 * 5) + ($val15 * 5) + ($val20 * 5) + ($val25 * 5) + ($val30 * 5) + ($val35 * 5) + ($val40 * $maxCalculat);
        }

        return $price;
    }

    public function mrcCalculateFor100G($max, $circuitId, $grp_or_zone)
    {
        if ($max < 200)
        {
            return $price = $this->calculate(200, $circuitId, $grp_or_zone);
        }
        elseif ($max >= 200 && $max < 300)
        {
            return $price = $this->calculate(200, $circuitId, $grp_or_zone);
        }
        elseif ($max >= 300 && $max < 400)
        {
            return $price = $this->calculate(300, $circuitId, $grp_or_zone);
        }
        elseif ($max >= 400 && $max < 500)
        {
            $price = $this->calculate(400, $circuitId, $grp_or_zone);
        }
        elseif ($max >= 500 && $max < 600)
        {
            $price = $this->calculate(500, $circuitId, $grp_or_zone);
        }
        elseif ($max >=600  && $max < 700)
        {
            $price = $this->calculate(600, $circuitId, $grp_or_zone);
        }
        elseif ($max >=700  && $max < 800)
        {
            $price = $this->calculate(700, $circuitId, $grp_or_zone);
        }
        elseif ($max >=800  && $max < 900)
        {
            $price = $this->calculate(800, $circuitId, $grp_or_zone);
        }
        elseif ($max >=900  && $max < 1000)
        {
            $price = $this->calculate(900, $circuitId, $grp_or_zone);
        }
        elseif ($max >=1000  && $max < 1100)
        {
            $price = $this->calculate(1000, $circuitId, $grp_or_zone);
        }
        else
        {
            $price = $this->calculate(1100, $circuitId, $grp_or_zone);
        }
    }

    public function mrcCalculateForNonMrcCircuit($circuitId, $grp_or_zone)
    {
        $val = GroupOrZone::where('circuit_id', $circuitId)->where('grp_or_zone', $grp_or_zone)->first();

        if (is_null($val))
        {
            $price = 0;
        }
        else
        {
            return $price = intval($val->charge);
        }
    }
}