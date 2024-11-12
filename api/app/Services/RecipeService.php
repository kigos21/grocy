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

        // Base query from current user
        $id = Auth::id();
        $query = Recipe::query()->where('user_id', $id);

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
        $data['user_id'] = Auth::id();
        return Recipe::create($data);
    }

    public function createIngredients($data, $recipe_id)
    {
        $recipe = Recipe::findOrFail($recipe_id);

        foreach ($data as $ingredient) {
            $ingredient = new RecipeIngredient($ingredient);
            $recipe->ingredients()->save($ingredient);
        }

        // Return the ingredients
        return RecipeIngredient::where('recipe_id', $recipe_id)->get();
    }
}
