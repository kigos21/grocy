<?php

namespace Database\Seeders;

use App\Models\Recipe;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
//        Recipe::factory()
//            ->count(40)
//            ->create();

        // Define the 10 recipes
        $recipes = [
            ['image_path' => 'https://grocy.sgp1.cdn.digitaloceanspaces.com/0001-adobong-manok.jpg', 'name' => 'Adobong Manok', 'servings' => 2, 'cook_time' => 60],
            ['image_path' => 'https://grocy.sgp1.cdn.digitaloceanspaces.com/0002-sinigang-baboy.jpg', 'name' => 'Sinigang na Baboy', 'servings' => 4, 'cook_time' => 90],
            ['image_path' => 'https://grocy.sgp1.cdn.digitaloceanspaces.com/0003-kare-kare.jpg', 'name' => 'Kare-Kare', 'servings' => 6, 'cook_time' => 120],
            ['image_path' => 'https://grocy.sgp1.cdn.digitaloceanspaces.com/0004-bulalo.jpg', 'name' => 'Bulalo', 'servings' => 5, 'cook_time' => 150],
            ['image_path' => 'https://grocy.sgp1.cdn.digitaloceanspaces.com/0005-pancit-canton.jpg', 'name' => 'Pancit Canton', 'servings' => 3, 'cook_time' => 45],
            ['image_path' => 'https://grocy.sgp1.cdn.digitaloceanspaces.com/0006-bicol-express.jpg', 'name' => 'Bicol Express', 'servings' => 4, 'cook_time' => 70],
            ['image_path' => 'https://grocy.sgp1.cdn.digitaloceanspaces.com/0007-tinolang-manok.jpg', 'name' => 'Tinolang Manok', 'servings' => 4, 'cook_time' => 60],
            ['image_path' => 'https://grocy.sgp1.cdn.digitaloceanspaces.com/0008-sisig.jpg', 'name' => 'Sisig', 'servings' => 2, 'cook_time' => 30],
            ['image_path' => 'https://grocy.sgp1.cdn.digitaloceanspaces.com/0009-laing.jpg', 'name' => 'Laing', 'servings' => 3, 'cook_time' => 50],
            ['image_path' => 'https://grocy.sgp1.cdn.digitaloceanspaces.com/0010-caldereta.jpg', 'name' => 'Caldereta', 'servings' => 5, 'cook_time' => 120],
        ];

        // Define the user IDs
        $userIds = [2, 3, 4, 5];

        // Assign each recipe to all users
        foreach ($userIds as $userId) {
            foreach ($recipes as $recipe) {
                Recipe::create([
                    'user_id' => $userId,
                    'image_path' => $recipe['image_path'],
                    'name' => $recipe['name'],
                    'servings' => $recipe['servings'],
                    'cook_time' => $recipe['cook_time'],
                ]);
            }
        }
    }
}
