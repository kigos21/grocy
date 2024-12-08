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
            $createdRecipe->recipeIngredients()->save($ingredient);
        }

        // Query the final recipe with ingredients
        return Recipe::with('recipeIngredients')->findOrFail($createdRecipe->id);
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
        $recipe->recipeIngredients()->delete();
        foreach ($ingredientsData as $data) {
            $ingredient = new RecipeIngredient($data);
            $recipe->recipeIngredients()->save($ingredient);
        }

        // Query the final recipe with ingredients
        return Recipe::with('recipeIngredients')->findOrFail($recipe->id);
    }

    public function getTrashed(Request $request)
    {
        // Form base query for USER and ADMIN
        $user = $request->user();

        // Initialize $query to prevent scoping issues
        $query = Recipe::query(); // Default to fetching all recipes

        if ($user->role === 'USER') {
            // If user role is 'USER', only fetch recipes belonging to that user
            $query->where('user_id', $user->id);
        }

        // Now you can use $query to build the desired query and return results
        return $query->onlyTrashed()->paginate(6);
    }
}
