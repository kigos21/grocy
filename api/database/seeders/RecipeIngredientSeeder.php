<?php

namespace Database\Seeders;

use App\Models\RecipeIngredient;
use Illuminate\Database\Seeder;

class RecipeIngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
//        RecipeIngredient::factory()
//            ->count(160)
//            ->create();

        $ingredients = [
            // Ingredients for recipe_id = 1 (Adobong Manok)
            ['recipe_id' => 1, 'quantity' => 500, 'unit' => 'g', 'name' => 'Chicken', 'category' => 'meat & seafood'],
            ['recipe_id' => 1, 'quantity' => 2, 'unit' => 'tbsp', 'name' => 'Soy Sauce', 'category' => 'condiments & spices'],
            ['recipe_id' => 1, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Vinegar', 'category' => 'condiments & spices'],
            ['recipe_id' => 1, 'quantity' => 3, 'unit' => 'piece', 'name' => 'Garlic', 'category' => 'produce'],
            ['recipe_id' => 1, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Bay Leaf', 'category' => 'condiments & spices'],

            // Ingredients for recipe_id = 2 (Sinigang na Baboy)
            ['recipe_id' => 2, 'quantity' => 500, 'unit' => 'g', 'name' => 'Pork Belly', 'category' => 'meat & seafood'],
            ['recipe_id' => 2, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Tamarind Soup Mix', 'category' => 'condiments & spices'],
            ['recipe_id' => 2, 'quantity' => 200, 'unit' => 'g', 'name' => 'Kangkong', 'category' => 'produce'],
            ['recipe_id' => 2, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Radish', 'category' => 'produce'],
            ['recipe_id' => 2, 'quantity' => 2, 'unit' => 'piece', 'name' => 'Tomatoes', 'category' => 'produce'],

            // Ingredients for recipe_id = 3 (Kare-Kare)
            ['recipe_id' => 3, 'quantity' => 1, 'unit' => 'kg', 'name' => 'Oxtail', 'category' => 'meat & seafood'],
            ['recipe_id' => 3, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Peanut Butter', 'category' => 'condiments & spices'],
            ['recipe_id' => 3, 'quantity' => 200, 'unit' => 'g', 'name' => 'Eggplant', 'category' => 'produce'],
            ['recipe_id' => 3, 'quantity' => 100, 'unit' => 'g', 'name' => 'String Beans', 'category' => 'produce'],
            ['recipe_id' => 3, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Banana Heart', 'category' => 'produce'],

            // Ingredients for recipe_id = 4 (Bulalo)
            ['recipe_id' => 4, 'quantity' => 1, 'unit' => 'kg', 'name' => 'Beef Shank', 'category' => 'meat & seafood'],
            ['recipe_id' => 4, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Corn', 'category' => 'produce'],
            ['recipe_id' => 4, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Onion', 'category' => 'produce'],
            ['recipe_id' => 4, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Peppercorns', 'category' => 'condiments & spices'],
            ['recipe_id' => 4, 'quantity' => 200, 'unit' => 'g', 'name' => 'Cabbage', 'category' => 'produce'],

            // Ingredients for recipe_id = 5 (Pancit Canton)
            ['recipe_id' => 5, 'quantity' => 500, 'unit' => 'g', 'name' => 'Canton Noodles', 'category' => 'grains pasta & rice'],
            ['recipe_id' => 5, 'quantity' => 100, 'unit' => 'g', 'name' => 'Chicken Breast', 'category' => 'meat & seafood'],
            ['recipe_id' => 5, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Carrot', 'category' => 'produce'],
            ['recipe_id' => 5, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Bell Pepper', 'category' => 'produce'],
            ['recipe_id' => 5, 'quantity' => 2, 'unit' => 'tbsp', 'name' => 'Soy Sauce', 'category' => 'condiments & spices'],

            // Ingredients for recipe_id = 6 (Bicol Express)
            ['recipe_id' => 6, 'quantity' => 500, 'unit' => 'g', 'name' => 'Pork Belly', 'category' => 'meat & seafood'],
            ['recipe_id' => 6, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Coconut Milk', 'category' => 'dairy & eggs'],
            ['recipe_id' => 6, 'quantity' => 3, 'unit' => 'piece', 'name' => 'Red Chili Peppers', 'category' => 'produce'],
            ['recipe_id' => 6, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Shrimp Paste', 'category' => 'condiments & spices'],
            ['recipe_id' => 6, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Garlic', 'category' => 'produce'],

            // Ingredients for recipe_id = 7 (Tinolang Manok)
            ['recipe_id' => 7, 'quantity' => 500, 'unit' => 'g', 'name' => 'Chicken', 'category' => 'meat & seafood'],
            ['recipe_id' => 7, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Green Papaya', 'category' => 'produce'],
            ['recipe_id' => 7, 'quantity' => 2, 'unit' => 'piece', 'name' => 'Ginger', 'category' => 'produce'],
            ['recipe_id' => 7, 'quantity' => 2, 'unit' => 'tbsp', 'name' => 'Fish Sauce', 'category' => 'condiments & spices'],
            ['recipe_id' => 7, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Malunggay Leaves', 'category' => 'produce'],

            // Ingredients for recipe_id = 8 (Sisig)
            ['recipe_id' => 8, 'quantity' => 500, 'unit' => 'g', 'name' => 'Pork Ear', 'category' => 'meat & seafood'],
            ['recipe_id' => 8, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Onion', 'category' => 'produce'],
            ['recipe_id' => 8, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Chili', 'category' => 'produce'],
            ['recipe_id' => 8, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Soy Sauce', 'category' => 'condiments & spices'],
            ['recipe_id' => 8, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Mayonnaise', 'category' => 'condiments & spices'],

            // Ingredients for recipe_id = 9 (Laing)
            ['recipe_id' => 9, 'quantity' => 200, 'unit' => 'g', 'name' => 'Dried Taro Leaves', 'category' => 'produce'],
            ['recipe_id' => 9, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Coconut Milk', 'category' => 'dairy & eggs'],
            ['recipe_id' => 9, 'quantity' => 3, 'unit' => 'piece', 'name' => 'Red Chili Peppers', 'category' => 'produce'],
            ['recipe_id' => 9, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Shrimp Paste', 'category' => 'condiments & spices'],
            ['recipe_id' => 9, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Garlic', 'category' => 'produce'],

            // Ingredients for recipe_id = 10 (Caldereta)
            ['recipe_id' => 10, 'quantity' => 1, 'unit' => 'kg', 'name' => 'Beef Chuck', 'category' => 'meat & seafood'],
            ['recipe_id' => 10, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Tomato Sauce', 'category' => 'condiments & spices'],
            ['recipe_id' => 10, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Carrot', 'category' => 'produce'],
            ['recipe_id' => 10, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Potato', 'category' => 'produce'],
            ['recipe_id' => 10, 'quantity' => 2, 'unit' => 'tbsp', 'name' => 'Cheese', 'category' => 'dairy & eggs'],

            // Ingredients for recipe_id = 1 (Adobong Manok)
            ['recipe_id' => 11, 'quantity' => 500, 'unit' => 'g', 'name' => 'Chicken', 'category' => 'meat & seafood'],
            ['recipe_id' => 11, 'quantity' => 2, 'unit' => 'tbsp', 'name' => 'Soy Sauce', 'category' => 'condiments & spices'],
            ['recipe_id' => 11, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Vinegar', 'category' => 'condiments & spices'],
            ['recipe_id' => 11, 'quantity' => 3, 'unit' => 'piece', 'name' => 'Garlic', 'category' => 'produce'],
            ['recipe_id' => 11, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Bay Leaf', 'category' => 'condiments & spices'],

            // Ingredients for recipe_id = 2 (Sinigang na Baboy)
            ['recipe_id' => 12, 'quantity' => 500, 'unit' => 'g', 'name' => 'Pork Belly', 'category' => 'meat & seafood'],
            ['recipe_id' => 12, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Tamarind Soup Mix', 'category' => 'condiments & spices'],
            ['recipe_id' => 12, 'quantity' => 200, 'unit' => 'g', 'name' => 'Kangkong', 'category' => 'produce'],
            ['recipe_id' => 12, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Radish', 'category' => 'produce'],
            ['recipe_id' => 12, 'quantity' => 2, 'unit' => 'piece', 'name' => 'Tomatoes', 'category' => 'produce'],

            // Ingredients for recipe_id = 3 (Kare-Kare)
            ['recipe_id' => 13, 'quantity' => 1, 'unit' => 'kg', 'name' => 'Oxtail', 'category' => 'meat & seafood'],
            ['recipe_id' => 13, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Peanut Butter', 'category' => 'condiments & spices'],
            ['recipe_id' => 13, 'quantity' => 200, 'unit' => 'g', 'name' => 'Eggplant', 'category' => 'produce'],
            ['recipe_id' => 13, 'quantity' => 100, 'unit' => 'g', 'name' => 'String Beans', 'category' => 'produce'],
            ['recipe_id' => 13, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Banana Heart', 'category' => 'produce'],

            // Ingredients for recipe_id = 4 (Bulalo)
            ['recipe_id' => 14, 'quantity' => 1, 'unit' => 'kg', 'name' => 'Beef Shank', 'category' => 'meat & seafood'],
            ['recipe_id' => 14, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Corn', 'category' => 'produce'],
            ['recipe_id' => 14, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Onion', 'category' => 'produce'],
            ['recipe_id' => 14, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Peppercorns', 'category' => 'condiments & spices'],
            ['recipe_id' => 14, 'quantity' => 200, 'unit' => 'g', 'name' => 'Cabbage', 'category' => 'produce'],

            // Ingredients for recipe_id = 5 (Pancit Canton)
            ['recipe_id' => 15, 'quantity' => 500, 'unit' => 'g', 'name' => 'Canton Noodles', 'category' => 'grains pasta & rice'],
            ['recipe_id' => 15, 'quantity' => 100, 'unit' => 'g', 'name' => 'Chicken Breast', 'category' => 'meat & seafood'],
            ['recipe_id' => 15, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Carrot', 'category' => 'produce'],
            ['recipe_id' => 15, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Bell Pepper', 'category' => 'produce'],
            ['recipe_id' => 15, 'quantity' => 2, 'unit' => 'tbsp', 'name' => 'Soy Sauce', 'category' => 'condiments & spices'],

            // Ingredients for recipe_id = 6 (Bicol Express)
            ['recipe_id' => 16, 'quantity' => 500, 'unit' => 'g', 'name' => 'Pork Belly', 'category' => 'meat & seafood'],
            ['recipe_id' => 16, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Coconut Milk', 'category' => 'dairy & eggs'],
            ['recipe_id' => 16, 'quantity' => 3, 'unit' => 'piece', 'name' => 'Red Chili Peppers', 'category' => 'produce'],
            ['recipe_id' => 16, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Shrimp Paste', 'category' => 'condiments & spices'],
            ['recipe_id' => 16, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Garlic', 'category' => 'produce'],

            // Ingredients for recipe_id = 7 (Tinolang Manok)
            ['recipe_id' => 17, 'quantity' => 500, 'unit' => 'g', 'name' => 'Chicken', 'category' => 'meat & seafood'],
            ['recipe_id' => 17, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Green Papaya', 'category' => 'produce'],
            ['recipe_id' => 17, 'quantity' => 2, 'unit' => 'piece', 'name' => 'Ginger', 'category' => 'produce'],
            ['recipe_id' => 17, 'quantity' => 2, 'unit' => 'tbsp', 'name' => 'Fish Sauce', 'category' => 'condiments & spices'],
            ['recipe_id' => 17, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Malunggay Leaves', 'category' => 'produce'],

            // Ingredients for recipe_id = 8 (Sisig)
            ['recipe_id' => 18, 'quantity' => 500, 'unit' => 'g', 'name' => 'Pork Ear', 'category' => 'meat & seafood'],
            ['recipe_id' => 18, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Onion', 'category' => 'produce'],
            ['recipe_id' => 18, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Chili', 'category' => 'produce'],
            ['recipe_id' => 18, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Soy Sauce', 'category' => 'condiments & spices'],
            ['recipe_id' => 18, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Mayonnaise', 'category' => 'condiments & spices'],

            // Ingredients for recipe_id = 9 (Laing)
            ['recipe_id' => 19, 'quantity' => 200, 'unit' => 'g', 'name' => 'Dried Taro Leaves', 'category' => 'produce'],
            ['recipe_id' => 19, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Coconut Milk', 'category' => 'dairy & eggs'],
            ['recipe_id' => 19, 'quantity' => 3, 'unit' => 'piece', 'name' => 'Red Chili Peppers', 'category' => 'produce'],
            ['recipe_id' => 19, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Shrimp Paste', 'category' => 'condiments & spices'],
            ['recipe_id' => 19, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Garlic', 'category' => 'produce'],

            // Ingredients for recipe_id = 10 (Caldereta)
            ['recipe_id' => 20, 'quantity' => 1, 'unit' => 'kg', 'name' => 'Beef Chuck', 'category' => 'meat & seafood'],
            ['recipe_id' => 20, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Tomato Sauce', 'category' => 'condiments & spices'],
            ['recipe_id' => 20, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Carrot', 'category' => 'produce'],
            ['recipe_id' => 20, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Potato', 'category' => 'produce'],
            ['recipe_id' => 20, 'quantity' => 2, 'unit' => 'tbsp', 'name' => 'Cheese', 'category' => 'dairy & eggs'],

            // Ingredients for recipe_id = 1 (Adobong Manok)
            ['recipe_id' => 21, 'quantity' => 500, 'unit' => 'g', 'name' => 'Chicken', 'category' => 'meat & seafood'],
            ['recipe_id' => 21, 'quantity' => 2, 'unit' => 'tbsp', 'name' => 'Soy Sauce', 'category' => 'condiments & spices'],
            ['recipe_id' => 21, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Vinegar', 'category' => 'condiments & spices'],
            ['recipe_id' => 21, 'quantity' => 3, 'unit' => 'piece', 'name' => 'Garlic', 'category' => 'produce'],
            ['recipe_id' => 21, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Bay Leaf', 'category' => 'condiments & spices'],

            // Ingredients for recipe_id = 2 (Sinigang na Baboy)
            ['recipe_id' => 22, 'quantity' => 500, 'unit' => 'g', 'name' => 'Pork Belly', 'category' => 'meat & seafood'],
            ['recipe_id' => 22, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Tamarind Soup Mix', 'category' => 'condiments & spices'],
            ['recipe_id' => 22, 'quantity' => 200, 'unit' => 'g', 'name' => 'Kangkong', 'category' => 'produce'],
            ['recipe_id' => 22, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Radish', 'category' => 'produce'],
            ['recipe_id' => 22, 'quantity' => 2, 'unit' => 'piece', 'name' => 'Tomatoes', 'category' => 'produce'],

            // Ingredients for recipe_id = 3 (Kare-Kare)
            ['recipe_id' => 23, 'quantity' => 1, 'unit' => 'kg', 'name' => 'Oxtail', 'category' => 'meat & seafood'],
            ['recipe_id' => 23, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Peanut Butter', 'category' => 'condiments & spices'],
            ['recipe_id' => 23, 'quantity' => 200, 'unit' => 'g', 'name' => 'Eggplant', 'category' => 'produce'],
            ['recipe_id' => 23, 'quantity' => 100, 'unit' => 'g', 'name' => 'String Beans', 'category' => 'produce'],
            ['recipe_id' => 23, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Banana Heart', 'category' => 'produce'],

            // Ingredients for recipe_id = 4 (Bulalo)
            ['recipe_id' => 24, 'quantity' => 1, 'unit' => 'kg', 'name' => 'Beef Shank', 'category' => 'meat & seafood'],
            ['recipe_id' => 24, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Corn', 'category' => 'produce'],
            ['recipe_id' => 24, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Onion', 'category' => 'produce'],
            ['recipe_id' => 24, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Peppercorns', 'category' => 'condiments & spices'],
            ['recipe_id' => 24, 'quantity' => 200, 'unit' => 'g', 'name' => 'Cabbage', 'category' => 'produce'],

            // Ingredients for recipe_id = 5 (Pancit Canton)
            ['recipe_id' => 25, 'quantity' => 500, 'unit' => 'g', 'name' => 'Canton Noodles', 'category' => 'grains pasta & rice'],
            ['recipe_id' => 25, 'quantity' => 100, 'unit' => 'g', 'name' => 'Chicken Breast', 'category' => 'meat & seafood'],
            ['recipe_id' => 25, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Carrot', 'category' => 'produce'],
            ['recipe_id' => 25, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Bell Pepper', 'category' => 'produce'],
            ['recipe_id' => 25, 'quantity' => 2, 'unit' => 'tbsp', 'name' => 'Soy Sauce', 'category' => 'condiments & spices'],

            // Ingredients for recipe_id = 6 (Bicol Express)
            ['recipe_id' => 26, 'quantity' => 500, 'unit' => 'g', 'name' => 'Pork Belly', 'category' => 'meat & seafood'],
            ['recipe_id' => 26, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Coconut Milk', 'category' => 'dairy & eggs'],
            ['recipe_id' => 26, 'quantity' => 3, 'unit' => 'piece', 'name' => 'Red Chili Peppers', 'category' => 'produce'],
            ['recipe_id' => 26, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Shrimp Paste', 'category' => 'condiments & spices'],
            ['recipe_id' => 26, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Garlic', 'category' => 'produce'],

            // Ingredients for recipe_id = 7 (Tinolang Manok)
            ['recipe_id' => 27, 'quantity' => 500, 'unit' => 'g', 'name' => 'Chicken', 'category' => 'meat & seafood'],
            ['recipe_id' => 27, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Green Papaya', 'category' => 'produce'],
            ['recipe_id' => 27, 'quantity' => 2, 'unit' => 'piece', 'name' => 'Ginger', 'category' => 'produce'],
            ['recipe_id' => 27, 'quantity' => 2, 'unit' => 'tbsp', 'name' => 'Fish Sauce', 'category' => 'condiments & spices'],
            ['recipe_id' => 27, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Malunggay Leaves', 'category' => 'produce'],

            // Ingredients for recipe_id = 8 (Sisig)
            ['recipe_id' => 28, 'quantity' => 500, 'unit' => 'g', 'name' => 'Pork Ear', 'category' => 'meat & seafood'],
            ['recipe_id' => 28, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Onion', 'category' => 'produce'],
            ['recipe_id' => 28, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Chili', 'category' => 'produce'],
            ['recipe_id' => 28, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Soy Sauce', 'category' => 'condiments & spices'],
            ['recipe_id' => 28, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Mayonnaise', 'category' => 'condiments & spices'],

            // Ingredients for recipe_id = 9 (Laing)
            ['recipe_id' => 29, 'quantity' => 200, 'unit' => 'g', 'name' => 'Dried Taro Leaves', 'category' => 'produce'],
            ['recipe_id' => 29, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Coconut Milk', 'category' => 'dairy & eggs'],
            ['recipe_id' => 29, 'quantity' => 3, 'unit' => 'piece', 'name' => 'Red Chili Peppers', 'category' => 'produce'],
            ['recipe_id' => 29, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Shrimp Paste', 'category' => 'condiments & spices'],
            ['recipe_id' => 29, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Garlic', 'category' => 'produce'],

            // Ingredients for recipe_id = 10 (Caldereta)
            ['recipe_id' => 30, 'quantity' => 1, 'unit' => 'kg', 'name' => 'Beef Chuck', 'category' => 'meat & seafood'],
            ['recipe_id' => 30, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Tomato Sauce', 'category' => 'condiments & spices'],
            ['recipe_id' => 30, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Carrot', 'category' => 'produce'],
            ['recipe_id' => 30, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Potato', 'category' => 'produce'],
            ['recipe_id' => 30, 'quantity' => 2, 'unit' => 'tbsp', 'name' => 'Cheese', 'category' => 'dairy & eggs'],

            // Ingredients for recipe_id = 1 (Adobong Manok)
            ['recipe_id' => 31, 'quantity' => 500, 'unit' => 'g', 'name' => 'Chicken', 'category' => 'meat & seafood'],
            ['recipe_id' => 31, 'quantity' => 2, 'unit' => 'tbsp', 'name' => 'Soy Sauce', 'category' => 'condiments & spices'],
            ['recipe_id' => 31, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Vinegar', 'category' => 'condiments & spices'],
            ['recipe_id' => 31, 'quantity' => 3, 'unit' => 'piece', 'name' => 'Garlic', 'category' => 'produce'],
            ['recipe_id' => 31, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Bay Leaf', 'category' => 'condiments & spices'],

            // Ingredients for recipe_id = 2 (Sinigang na Baboy)
            ['recipe_id' => 32, 'quantity' => 500, 'unit' => 'g', 'name' => 'Pork Belly', 'category' => 'meat & seafood'],
            ['recipe_id' => 32, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Tamarind Soup Mix', 'category' => 'condiments & spices'],
            ['recipe_id' => 32, 'quantity' => 200, 'unit' => 'g', 'name' => 'Kangkong', 'category' => 'produce'],
            ['recipe_id' => 32, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Radish', 'category' => 'produce'],
            ['recipe_id' => 32, 'quantity' => 2, 'unit' => 'piece', 'name' => 'Tomatoes', 'category' => 'produce'],

            // Ingredients for recipe_id = 3 (Kare-Kare)
            ['recipe_id' => 33, 'quantity' => 1, 'unit' => 'kg', 'name' => 'Oxtail', 'category' => 'meat & seafood'],
            ['recipe_id' => 33, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Peanut Butter', 'category' => 'condiments & spices'],
            ['recipe_id' => 33, 'quantity' => 200, 'unit' => 'g', 'name' => 'Eggplant', 'category' => 'produce'],
            ['recipe_id' => 33, 'quantity' => 100, 'unit' => 'g', 'name' => 'String Beans', 'category' => 'produce'],
            ['recipe_id' => 33, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Banana Heart', 'category' => 'produce'],

            // Ingredients for recipe_id = 4 (Bulalo)
            ['recipe_id' => 34, 'quantity' => 1, 'unit' => 'kg', 'name' => 'Beef Shank', 'category' => 'meat & seafood'],
            ['recipe_id' => 34, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Corn', 'category' => 'produce'],
            ['recipe_id' => 34, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Onion', 'category' => 'produce'],
            ['recipe_id' => 34, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Peppercorns', 'category' => 'condiments & spices'],
            ['recipe_id' => 34, 'quantity' => 200, 'unit' => 'g', 'name' => 'Cabbage', 'category' => 'produce'],

            // Ingredients for recipe_id = 5 (Pancit Canton)
            ['recipe_id' => 35, 'quantity' => 500, 'unit' => 'g', 'name' => 'Canton Noodles', 'category' => 'grains pasta & rice'],
            ['recipe_id' => 35, 'quantity' => 100, 'unit' => 'g', 'name' => 'Chicken Breast', 'category' => 'meat & seafood'],
            ['recipe_id' => 35, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Carrot', 'category' => 'produce'],
            ['recipe_id' => 35, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Bell Pepper', 'category' => 'produce'],
            ['recipe_id' => 35, 'quantity' => 2, 'unit' => 'tbsp', 'name' => 'Soy Sauce', 'category' => 'condiments & spices'],

            // Ingredients for recipe_id = 6 (Bicol Express)
            ['recipe_id' => 36, 'quantity' => 500, 'unit' => 'g', 'name' => 'Pork Belly', 'category' => 'meat & seafood'],
            ['recipe_id' => 36, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Coconut Milk', 'category' => 'dairy & eggs'],
            ['recipe_id' => 36, 'quantity' => 3, 'unit' => 'piece', 'name' => 'Red Chili Peppers', 'category' => 'produce'],
            ['recipe_id' => 36, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Shrimp Paste', 'category' => 'condiments & spices'],
            ['recipe_id' => 36, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Garlic', 'category' => 'produce'],

            // Ingredients for recipe_id = 7 (Tinolang Manok)
            ['recipe_id' => 37, 'quantity' => 500, 'unit' => 'g', 'name' => 'Chicken', 'category' => 'meat & seafood'],
            ['recipe_id' => 37, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Green Papaya', 'category' => 'produce'],
            ['recipe_id' => 37, 'quantity' => 2, 'unit' => 'piece', 'name' => 'Ginger', 'category' => 'produce'],
            ['recipe_id' => 37, 'quantity' => 2, 'unit' => 'tbsp', 'name' => 'Fish Sauce', 'category' => 'condiments & spices'],
            ['recipe_id' => 37, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Malunggay Leaves', 'category' => 'produce'],

            // Ingredients for recipe_id = 8 (Sisig)
            ['recipe_id' => 38, 'quantity' => 500, 'unit' => 'g', 'name' => 'Pork Ear', 'category' => 'meat & seafood'],
            ['recipe_id' => 38, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Onion', 'category' => 'produce'],
            ['recipe_id' => 38, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Chili', 'category' => 'produce'],
            ['recipe_id' => 38, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Soy Sauce', 'category' => 'condiments & spices'],
            ['recipe_id' => 38, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Mayonnaise', 'category' => 'condiments & spices'],

            // Ingredients for recipe_id = 9 (Laing)
            ['recipe_id' => 39, 'quantity' => 200, 'unit' => 'g', 'name' => 'Dried Taro Leaves', 'category' => 'produce'],
            ['recipe_id' => 39, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Coconut Milk', 'category' => 'dairy & eggs'],
            ['recipe_id' => 39, 'quantity' => 3, 'unit' => 'piece', 'name' => 'Red Chili Peppers', 'category' => 'produce'],
            ['recipe_id' => 39, 'quantity' => 1, 'unit' => 'tbsp', 'name' => 'Shrimp Paste', 'category' => 'condiments & spices'],
            ['recipe_id' => 39, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Garlic', 'category' => 'produce'],

            // Ingredients for recipe_id = 10 (Caldereta)
            ['recipe_id' => 40, 'quantity' => 1, 'unit' => 'kg', 'name' => 'Beef Chuck', 'category' => 'meat & seafood'],
            ['recipe_id' => 40, 'quantity' => 1, 'unit' => 'cup', 'name' => 'Tomato Sauce', 'category' => 'condiments & spices'],
            ['recipe_id' => 40, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Carrot', 'category' => 'produce'],
            ['recipe_id' => 40, 'quantity' => 1, 'unit' => 'piece', 'name' => 'Potato', 'category' => 'produce'],
            ['recipe_id' => 40, 'quantity' => 2, 'unit' => 'tbsp', 'name' => 'Cheese', 'category' => 'dairy & eggs'],
        ];

        foreach ($ingredients as $ingredient) {
            RecipeIngredient::create($ingredient);
        }
    }
}
