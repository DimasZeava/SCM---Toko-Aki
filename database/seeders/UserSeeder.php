<?php

namespace Database\Seeders;

use App\Models\User;
use App\RolesEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
           'name' => 'retail',
           'email' => 'retail@example.com'
        ])->assignRole(RolesEnum::Retail->value);

        User::factory()->create([
           'name' => 'supplier',
           'email' => 'supplier@example.com'
        ])->assignRole(RolesEnum::Supplier->value);
        
        User::factory()->create([
           'name' => 'admin',
           'email' => 'admin@example.com'
        ])->assignRole(RolesEnum::Admin->value);
    }
}
