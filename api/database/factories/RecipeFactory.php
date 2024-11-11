<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Recipe>
 */
class RecipeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => $this->faker->numberBetween(1, 10),
            'name' => $this->faker->sentence($this->faker->numberBetween(1, 4)),
            'image_path' => $this->faker->imageUrl(640, 480, 'food'),
            'servings' => $this->faker->numberBetween(1, 3),
            'cook_time' => $this->faker->numberBetween(1, 120),
        ];
    }
}
