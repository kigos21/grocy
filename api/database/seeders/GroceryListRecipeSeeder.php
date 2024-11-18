<?php

namespace Database\Seeders;

use App\Models\GroceryListRecipe;
use Illuminate\Database\Seeder;

class GroceryListRecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        GroceryListRecipe::factory()
            ->count(200)
            ->create();
    }
}
