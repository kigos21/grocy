<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RecipeIngredient>
 */
class RecipeIngredientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'recipe_id' => $this->faker->numberBetween(1, 40),
            'quantity' => $this->faker->randomFloat(2, 1, 10),
            'unit' => $this->faker->randomElement(['g', 'kg', 'ml', 'l', 'cup', 'tbsp', 'tsp', 'piece']),
            'name' => $this->faker->sentence($this->faker->numberBetween(1, 2)),
            'category' => $this->faker->randomElement([
                'produce',
                'meat & seafood',
                'dairy & eggs',
                'baking goods',
                'grains pasta & rice',
                'condiments & spices',
                'frozen',
                'snacks & sweets',
                'beverages',
                'canned & jarred',
                'others',
            ])
        ];
    }
}
