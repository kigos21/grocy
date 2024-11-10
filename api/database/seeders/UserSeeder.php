<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'John Daniel De Castro',
            'email' => 'jd@gmail.com',
            'password' => 'Qweszxcda21!',
        ]);

        User::factory()
            ->unverified()
            ->count(10)
            ->create();
    }
}
