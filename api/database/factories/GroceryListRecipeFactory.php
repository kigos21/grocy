<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GroceryListRecipe>
 */
class GroceryListRecipeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'grocery_list_id' => $this->faker->numberBetween(1, 100),
            'recipe_id' => $this->faker->numberBetween(1, 40),
            'quantity' => $this->faker->numberBetween(1, 4),
        ];
    }
}
