<?php

namespace App\Services;

use App\Models\Recipe;
use App\Models\RecipeIngredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecipeService
{
    public function getRecipes(Request $request)
    {
        // Get query parameters for sorting and search
        $sort = $request->query('sort', 'newest');
        $searchQuery = $request->query('q');

        // If sort is not 'name' or 'newest', set to 'newest'
        if ($sort !== 'name' && $sort !== 'newest') {
            $sort = 'newest';
        }

        // Form base query for USER and ADMIN
        $user = $request->user();
        $query = null;
        if ($user->role === 'USER') {
            $query = Recipe::query()->where('user_id', $user->id);
        } else {
            $query = Recipe::query();
        }

        // Apply search if 'q' parameter is present
        if ($searchQuery) {
            $query->where('name', 'LIKE', "%$searchQuery%");
        }

        // Apply sorting based on 'sort' parameter
        if ($sort === 'newest') {
            $query->orderBy('updated_at', 'desc');
        } elseif ($sort === 'name') {
            $query->orderBy('name');
        }

        // Get the results with pagination
        return $query->paginate(6);
    }

    public function createRecipe($data)
    {
        // Separate the ingredients data to be used later
        $ingredientsData = $data['ingredients'];
        unset($data['ingredients']);

        // Create the recipe record, associated with the user
        $data['user_id'] = Auth::id();
        $createdRecipe = Recipe::create($data);

        // Create the ingredients for the recipe
        foreach ($ingredientsData as $data) {
            $ingredient = new RecipeIngredient($data);
            $createdRecipe->ingredients()->save($ingredient);
        }

        // Query the final recipe with ingredients
        return Recipe::with('ingredients')->findOrFail($createdRecipe->id);
    }

    public function updateRecipe($data, $recipe)
    {
        // Separate the ingredients data to be used later
        $ingredientsData = $data['ingredients'];
        unset($data['ingredients']);

        // Update recipe details
        $recipe->update($data);

        // Remove existing records of recipe's ingredients
        // Then repopulate
        $recipe->ingredients()->delete();
        foreach ($ingredientsData as $data) {
            $ingredient = new RecipeIngredient($data);
            $recipe->ingredients()->save($ingredient);
        }

        // Query the final recipe with ingredients
        return Recipe::with('ingredients')->findOrFail($recipe->id);
    }
}
