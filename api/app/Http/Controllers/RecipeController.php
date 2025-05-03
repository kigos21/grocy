<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Services\RecipeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

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
            'message' => 'Recipe fetch successfully.',
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
            'image_path' => 'nullable|string',

            // Making sure that servings and cook_time only accept base-10 digits
            'servings' => 'bail|required|numeric|regex:/^[0-9]+(\.[0-9]+)?$/',
            'cook_time' => 'bail|numeric|regex:/^[0-9]+(\.[0-9]+)?$/',

            // Validate each ingredient
            'ingredients' => 'required|array|min:1',
            'ingredients.*.quantity' => 'bail|required|numeric|regex:/^[0-9]+(\.[0-9]+)?$/',
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
            'ingredients.*.quantity.regex' => 'The quantity must be a whole number and cannot include letters or special characters.',

            // Custom error message for other ingredients fields
            'ingredients.*.quantity.required' => 'Quantity is required.',
            'ingredients.*.unit.required' => 'Unit is required.',
            'ingredients.*.name.required' => 'Ingredient name is required.',
            'ingredients.*.category.required' => 'Category is required.'
        ]);

        /**
         * If there is an image, process it, then store in the public storage
         */
        if ($validatedData['image_path']) {
            try {
                // Extract the image data from the Base64 string
                $imageData = $request->input('image_path');
                $imageData = explode(',', $imageData)[1]; // Remove the header part (data:image/*;base64,)
                $image = base64_decode($imageData);

                // Generate a unique filename
                $filename = time() . '_' . Str::random(10) . '.png'; // You can determine the extension from the Base64 header if needed

                // Create a temporary file
                $tempPath = sys_get_temp_dir() . '/' . $filename;
                file_put_contents($tempPath, $image);

                // Resize the image while it's strill local
                Image::read($tempPath)->scaleDown(height: 400)->save($tempPath);

                // Define the path in DigitalOcean space
                $spacesPath = 'images/' . $filename;

                // Store the file in DitigalOcean Space
                Storage::disk('s3')->put($spacesPath, file_get_contents($tempPath), 'public');

                // Generate the URL for the image
                $imageUrl = Storage::disk('s3')->url($spacesPath);
                $validatedData['image_path'] = $imageUrl;

            } catch (\Exception $e) {
                return response()->json([
                    'status' => 'fail',
                    'message' => 'Error processing image: ' . $e->getMessage(),
                    'data' => [],
                    'errors' => [],
                    'timestamp' => now(),
                ], 500);
            }
        }

        // Call service to create the recipe
        $recipe = $this->recipeService->createRecipe($validatedData);

        return response()->json([
            'status' => 'success',
            'message' => 'Recipe created successfully.',
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
        $recipe = Recipe::with(['recipeIngredients', 'user'])->findOrFail($id);

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
            'image_path' => 'nullable|string',

            // Making sure that servings and cook_time only accept base-10 digits
            'servings' => 'bail|required|numeric|regex:/^[0-9]+(\.[0-9]+)?$/',
            'cook_time' => 'bail|numeric|regex:/^[0-9]+(\.[0-9]+)?$/',

            // Validate each ingredient
            'ingredients' => 'required|array|min:1',
            'ingredients.*.quantity' => 'bail|required|numeric|regex:/^[0-9]+(\.[0-9]+)?$/',
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
            'ingredients.*.quantity.regex' => 'The quantity must be a whole number and cannot include letters or special characters.',

            // Custom error message for other ingredients fields
            'ingredients.*.quantity.required' => 'Quantity is required.',
            'ingredients.*.unit.required' => 'Unit is required.',
            'ingredients.*.name.required' => 'Ingredient name is required.',
            'ingredients.*.category.required' => 'Category is required.'
        ]);

        /**
         * Different handling if there is no image
         */
        $prevImagePath = $existingRecipe->image_path;

        if ($validatedData['image_path']) {
            try {
                // Extract the image data from the Base64 string
                $imageData = $request->input('image_path');
                $imageData = explode(',', $imageData)[1]; // Remove the header part (data:image/*;base64,)
                $image = base64_decode($imageData);

                // Generate a unique filename
                $filename = time() . '_' . Str::random(10) . '.png'; // You can determine the extension from the Base64 header if needed

                // Create a temporary file
                $tempPath = sys_get_temp_dir() . '/' . $filename;
                file_put_contents($tempPath, $image);

                // Resize the image while it's strill local
                Image::read($tempPath)->scaleDown(height: 400)->save($tempPath);

                // Define the path in DigitalOcean space
                $spacesPath = 'images/' . $filename;

                // Store the file in DitigalOcean Space
                Storage::disk('s3')->put($spacesPath, file_get_contents($tempPath), 'public');

                // Generate the URL for the image
                $imageUrl = Storage::disk('s3')->url($spacesPath);
                $validatedData['image_path'] = $imageUrl;

            } catch (\Exception $e) {
                return response()->json([
                    'status' => 'fail',
                    'message' => 'Error processing image: ' . $e->getMessage(),
                    'data' => [],
                    'errors' => [],
                    'timestamp' => now(),
                ], 500);
            }


        } else {
            $validatedData['image_path'] = $prevImagePath;
        }

        // Call service to update the Recipe model
        $recipe = $this->recipeService->updateRecipe($validatedData, $existingRecipe);

        // After updating the record, and upload is successful, delete the previous file, ONLY IF it was changed
        if ($prevImagePath && $validatedData['image_path'] != $prevImagePath) {
            try {
                // Extract path from the URL
                $parsedUrl = parse_url($prevImagePath);
                
                // Check if we have a valid path to delete
                if (isset($parsedUrl['path'])) {
                    $pathToDelete = ltrim($parsedUrl['path'], '/');
                    
                    // Delete the file from DigitalOcean Spaces
                    Storage::disk('s3')->delete($pathToDelete);
                }
            } catch (\Exception $e) {
                // Log the error but don't fail the request
                \Log::error('Failed to delete previous image from DO Spaces: ' . $e->getMessage());
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Recipe updated successfully.',
            'data' => [
                'recipe' => $recipe,
            ],
            'errors' => [],
            'timestamp' => now(),
        ]);
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
            'message' => 'Recipe deleted successfully.',
            'data' => [
                'recipe' => $recipe,
            ],
            'errors' => [],
            'timestamp' => now(),
        ]);
    }

    public function restore(Request $request, $id)
    {
        // Get the existing recipe
        $recipe = Recipe::withTrashed()->findOrFail($id);

        // Check if user is authorized for this action
        Gate::authorize('restore', $recipe);

        // Check if it's soft-deleted
        if ($recipe->trashed()) {
            // Perform force delete
            $recipe->restore();

            return response()->json([
                'status' => 'success',
                'message' => 'Recipe restored successfully.',
                'data' => [
                    'recipe' => $recipe,
                ],
                'errors' => [],
                'timestamp' => now(),
            ]);
        }

        return response()->json([
            'status' => 'fail',
            'message' => 'Recipe is not soft-deleted.',
            'data' => [
                'recipe' => $recipe,
            ],
            'errors' => [],
            'timestamp' => now(),
        ], 400);
    }

    public function trashed(Request $request)
    {
        $recipes = $this->recipeService->getTrashed($request);

        return response()->json([
            'status' => 'success',
            'message' => 'Trashed recipes fetch successfully.',
            'data' => [
                'recipes' => $recipes,
            ],
            'errors' => [],
            'timestamp' => now(),
        ]);
    }

    public function forceDelete(Request $request, $id)
    {
        // Get the existing recipe
        $recipe = Recipe::withTrashed()->findOrFail($id);

        // Check if user is authorized for this action
        Gate::authorize('forceDelete', $recipe);

        // Check if it's soft-deleted
        if ($recipe->trashed()) {
            // Perform force delete
            $recipe->forceDelete();

            // Delete the image in the DigitalOcean Spaces
            if ($recipe->image_path) {
                try {
                    $parsedUrl = parse_url($recipe->image_path);
                    if (isset($parsedUrl['path'])) {
                        $pathToDelete = ltrim($parsedUrl['path'], '/');
                        Storage::disk('s3')->delete($pathToDelete);
                    }
                } catch (\Exception $e) {
                    \Log::error('Failed to delete image during forceDelete: ' . $e->getMessage());
                }
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Recipe deleted permanently.',
                'data' => [
                    'recipe' => $recipe,
                ],
                'errors' => [],
                'timestamp' => now(),
            ]);
        }

        return response()->json([
            'status' => 'fail',
            'message' => 'Recipe is not soft-deleted.',
            'data' => [
                'recipe' => $recipe,
            ],
            'errors' => [],
            'timestamp' => now(),
        ], 400);
    }
}
