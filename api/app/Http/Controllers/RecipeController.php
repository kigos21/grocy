<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Services\RecipeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class RecipeController extends Controller
{
    protected RecipeService $recipeService;

    public function __construct(RecipeService $recipeService)
    {
        $this->recipeService = $recipeService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $recipes = $this->recipeService->getRecipes($request);

        return response()->json([
            'status' => 'success',
            'message' => 'Recipe fetch successfully',
            'data' => [
                'recipes' => $recipes,
            ],
            'errors' => [],
            'timestamp' => now(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'image_path' => 'image|max:4096',

            // Making sure that servings and cook_time only accept base-10 digits
            'servings' => 'bail|required|numeric|regex:/^[0-9]+$/',
            'cook_time' => 'bail|numeric|regex:/^[0-9]+$/',

            // Validate each ingredient
            'ingredients' => 'required|array|min:1',
            'ingredients.*.quantity' => 'bail|required|numeric|regex:/^[0-9]+$/',
            'ingredients.*.unit' => 'required|string|in:g,kg,ml,l,cup,tbsp,tsp,piece',
            'ingredients.*.name' => 'required|string|max:255',
            'ingredients.*.category' => 'required|string|in:produce,meat & seafood,dairy & eggs,baking goods,grains pasta & rice,condiments & spices,frozen,snacks & sweets,beverages,canned & jarred,others',
        ], [
            // Custom error message for servings and cook_time
            'servings.numeric' => 'The servings must be a whole number and cannot include letters or special characters.',
            'servings.regex' => 'The servings must be a whole number and cannot include letters or special characters.',
            'cook_time.numeric' => 'The time to cook must be a whole number and cannot include letters or special characters.',
            'cook_time.regex' => 'The time to cook must be a whole number and cannot include letters or special characters.',

            // Custom error message for ingredient.quantity
            'ingredients.*.quantity.numeric' => 'The quantity must be a whole number and cannot include letters or special characters.',
            'ingredients.*.quantity.regex' => 'The quantity must be a whole number and cannot include letters or special characters.'
        ]);

        // Call service to create the recipe
        $recipe = $this->recipeService->createRecipe($validatedData);

        return response()->json([
            'status' => 'success',
            'message' => 'Recipe created successfully',
            'data' => [
                'recipe' => $recipe,
            ],
            'errors' => [],
            'timestamp' => now(),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $recipe = Recipe::with('recipeIngredients')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Recipe fetch successfully',
            'data' => [
                'recipe' => $recipe,
            ],
            'errors' => [],
            'timestamp' => now(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Get the existing recipe
        $existingRecipe = Recipe::findOrFail($id);

        // Check if user is authorized for this action
        Gate::authorize('update', $existingRecipe);

        // Proceed with request validation
        $validatedData = $request->validate([
            'name' => 'required',
            'image_path' => 'image|max:4096',

            // Making sure that servings and cook_time only accept base-10 digits
            'servings' => 'bail|required|numeric|regex:/^[0-9]+$/',
            'cook_time' => 'bail|numeric|regex:/^[0-9]+$/',

            // Validate each ingredient
            'ingredients' => 'required|array|min:1',
            'ingredients.*.quantity' => 'bail|required|numeric|regex:/^[0-9]+$/',
            'ingredients.*.unit' => 'required|string|in:g,kg,ml,l,cup,tbsp,tsp,piece',
            'ingredients.*.name' => 'required|string|max:255',
            'ingredients.*.category' => 'required|string|in:produce,meat & seafood,dairy & eggs,baking goods,grains pasta & rice,condiments & spices,frozen,snacks & sweets,beverages,canned & jarred,others',
        ], [
            // Custom error message for servings and cook_time
            'servings.numeric' => 'The servings must be a whole number and cannot include letters or special characters.',
            'servings.regex' => 'The servings must be a whole number and cannot include letters or special characters.',
            'cook_time.numeric' => 'The time to cook must be a whole number and cannot include letters or special characters.',
            'cook_time.regex' => 'The time to cook must be a whole number and cannot include letters or special characters.',

            // Custom error message for ingredient.quantity
            'ingredients.*.quantity.numeric' => 'The quantity must be a whole number and cannot include letters or special characters.',
            'ingredients.*.quantity.regex' => 'The quantity must be a whole number and cannot include letters or special characters.'
        ]);

        // Call service to update the Recipe model
        $recipe = $this->recipeService->updateRecipe($validatedData, $existingRecipe);

        return response()->json([
            'status' => 'success',
            'message' => 'Recipe updated successfully',
            'data' => [
                'recipe' => $recipe,
            ],
            'errors' => [],
            'timestamp' => now(),
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        // Get the existing recipe
        $recipe = Recipe::findOrFail($id);

        // Check if user is authorized for this action
        Gate::authorize('delete', $recipe);

        // Delete the model (ingredients will cascade on delete)
        $recipe->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Recipe deleted successfully',
            'data' => [
                'recipe' => $recipe,
            ],
            'errors' => [],
            'timestamp' => now(),
        ]);
    }
}
