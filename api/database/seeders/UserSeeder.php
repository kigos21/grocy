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
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => 'Qweszxcda21!',
            'role' => 'ADMIN',
        ]);

        User::create([
            'name' => 'John Daniel De Castro',
            'email' => 'jd@gmail.com',
            'password' => 'Qweszxcda21!',
        ]);

        User::create([
            'name' => 'Justin Valdecanas',
            'email' => 'justin@gmail.com',
            'password' => 'Qweszxcda21!',
        ]);

        User::create([
            'name' => 'Karl Vivar',
            'email' => 'karl@gmail.com',
            'password' => 'Qweszxcda21!',
        ]);

        User::create([
            'name' => 'John Rupert Azarias',
            'email' => 'rupert@gmail.com',
            'password' => 'Qweszxcda21!',
        ]);

//        User::factory()
//            ->unverified()
//            ->count(10)
//            ->create();
    }
}
