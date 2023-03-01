<?php

namespace App\Imports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UserImport implements ToModel,WithHeadingRow
{
    public function model(array $row)
    {
        User::create([
            'name'=>$row['name'],
            'email'=>$row['email'],
            'phone'=>$row['phone'],
            'password'=>$row['password'],
            'address'=>$row['address']
        ]);
    }
}
