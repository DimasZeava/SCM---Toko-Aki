<?php

namespace Database\Seeders;

use App\PermissionEnum;
use App\RolesEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $retailRole = Role::create(['name' => RolesEnum::Retail->value]);
        $supplierRole = Role::create(['name' => RolesEnum::Supplier->value]);
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);

        $createOrders = Permission::create([
            'name' => PermissionEnum::CreateOrders->value,
        ]);

        $editOrders = Permission::create([
            'name' => PermissionEnum::EditOrders->value,
        ]);

        $viewOrders = Permission::create([
            'name' => PermissionEnum::ViewOrders->value,
        ]);

        $cancelOrders = Permission::create([
            'name' => PermissionEnum::CancelOrders->value,
        ]);

        $viewProducts = Permission::create([
            'name' => PermissionEnum::ViewProducts->value,
        ]);

        $createProducts = Permission::create([
            'name' => PermissionEnum::CreateProducts->value,
        ]);

        $editProducts = Permission::create([
            'name' => PermissionEnum::EditProducts->value,
        ]);

        $deleteProducts = Permission::create([
            'name' => PermissionEnum::DeleteProducts->value,
        ]);

        $viewUsers = Permission::create([
            'name' => PermissionEnum::ViewUsers->value,
        ]);

        $retailRole->syncPermissions([
            $viewOrders, 
            $createOrders, 
            $editOrders, 
            $cancelOrders, 
            $viewProducts]);
        $supplierRole->syncPermissions([
            $viewOrders, 
            $createOrders, 
            $editOrders, 
            $cancelOrders, 
            $viewProducts, 
            $createProducts, 
            $editProducts]);
        $adminRole->syncPermissions([
            $viewOrders,
            $createOrders,
            $editOrders,
            $cancelOrders,
            $viewProducts,
            $createProducts,
            $editProducts,
            $deleteProducts,
            $viewUsers
        ]);
    }
}
