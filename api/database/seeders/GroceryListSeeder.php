<?php

namespace Database\Seeders;

use App\Models\GroceryList;
use Illuminate\Database\Seeder;

class GroceryListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        GroceryList::factory()
            ->count(50)
            ->create();
    }
}
