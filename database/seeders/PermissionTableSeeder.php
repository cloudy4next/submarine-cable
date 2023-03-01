<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;


class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions =[

            'user-add',
            'user-view',
            'user-edit',
            'user-delete',
            'customer-add',
            'customer-view',
            'customer-edit',
            'customer-delete',
            'service-add',
            'service-view',
            'service-edit',
            'role-add',
            'role-view',
            'role-edit',
            'role-delete',
            'tariff-add',
            'tariff-view',
            'tariff-edit',
            'Iplc-demandNote-Add',
            'Iplc-demandNote-View',
            'Iptransit-demandNote-Add',
            'Iptransit-demandNote-View',
            'coloc-iplc-demand-note-Add',
            'coloc-iplc-demand-note-View',
            'colocation-demandnote-Add',
            'colocation-demandnote-View',
            'Iplc-billing-view',
            'Iplc-billing-process',
            'Iplc-billing-invoice',
            'Iplc-billing-invoice-list',
            'Iplc-billing-invoice-generate',
            'Iptransit-billing-view',
            'Iptransit-billing-process',
            'Iptransit-billing-invoice',
            'Iptransit-billing-invoice-list',
            'Iptransit-billing-invoice-generate',
            'Cocol-billing-view',
            'Coloc-billing-process',
            'Coloc-billing-invoice',
            'Coloc-billing-invoice-list',
            'Coloc-billing-invoice-generate',
            'Coloc-Iplc-billing-view',
            'Coloc-Iplc-billing-process',
            'Coloc-Iplc-billing-invoice',
            'Coloc-Iplc-billing-invoice-list',
            'Coloc-Iplc-billing-invoice-generate',
        ];
        foreach($permissions as $permission){
            Permission::create(['name'=> $permission]);

        };

    }
}
