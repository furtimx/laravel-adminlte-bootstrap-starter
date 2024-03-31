<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Renzo Marl Peralta',
            'email' => 'renzomarlp@gmail.com',
            'email_verified_at' => Carbon::now(),
            'role' => 'admin',
            'password' => bcrypt('Pass123!@#')
        ]);
    }
}
