<?php

namespace App\Services;

use App\Models\GroceryList;
use App\Models\GroceryListItem;
use App\Models\GroceryListRecipe;
use App\Models\RecipeIngredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroceryListService
{
    public function getGroceryLists(Request $request)
    {
        // Get query parameters for sorting
        $sort = $request->query('sort', 'newest');

        // If sort is not 'name' or 'newest', set to 'newest'
        if ($sort !== 'newest' && $sort !== 'oldest') {
            $sort = 'newest';
        }

        // Form base query for USER and ADMIN
        $user = $request->user();
        $query = GroceryList::query()->with(['groceryListRecipes.recipe', 'groceryListItems']);

        if ($user->role === 'USER') {
            $query->where('user_id', $user->id);
        }

        // Apply sorting based on 'sort' parameter
        if ($sort === 'newest') {
            $query->orderBy('updated_at', 'desc');
        } elseif ($sort === 'oldest') {
            $query->orderBy('updated_at');
        }

        // Get the results with pagination
        return $query->paginate(8);
    }

    public function createGroceryList($data)
    {
        // Create the grocery list record, associated with the user
        $createdGroceryList = GroceryList::create([
            'user_id' => Auth::id()
        ]);

        $recipesData = $data['recipes'];

        /**
         * So a grocery list recipe has been created, and it has 'recipe_id'
         * and 'quantity' fields.
         *
         * We need to get hold of the 'recipe_id', make a query to 'recipe_ingredients'
         * table where 'recipe_id' = 'recipe_id' from this model.
         *
         * We then store those ingredients somewhere. We would also want to standardize
         * units for now, so VOLUME would be ml, WEIGHT would be grams. Other units
         * will be retained. All quantities will then be multiplied based on the recipe 'quantity'
         * defined here.
         *
         * After that, we will proceed to the other recipes created, do the same,
         * then aggregate the total based on their 'name' key. However, we want to
         * make sure that items based on their 'name' share the same category and unit
         * of quantity. Otherwise, there will be problems.
         *
         * After getting the aggregated items, we can then insert each associative array
         * to the 'grocery_list_items' table.
         */

        $unitConversions = [
            'kg' => 1000, // 1 kg = 1000 g
            'g' => 1,
            'l' => 1000,  // 1 l = 1000 ml
            'ml' => 1,
        ];

        $ingredientTotals = []; // {quantity, unit, name, category}[]

        foreach ($recipesData as $data) {
            GroceryListRecipe::create([
                'grocery_list_id' => $createdGroceryList->id,
                'recipe_id' => $data['id'],
                'quantity' => $data['quantity'],
            ]);

            // assuming that this query returns {quantity, unit, name, category}[]
            $ingredients = RecipeIngredient::where('recipe_id', $data['id'])->get();

            // loop through each ingredient, aggregate it with the ingredientTotals array
            foreach ($ingredients as $ingredient) {
                $name = $ingredient['name'];
                $category = $ingredient['category'];
                $unit = $ingredient['unit'];
                $quantity = $ingredient['quantity'];

                // Standardize to smallest unit (g or ml)
                if (isset($unitConversions[$unit])) {
                    $quantity *= $unitConversions[$unit];
                    $unit = in_array($unit, ['kg', 'g']) ? 'g' : 'ml';
                }

                /**
                 * Generate unique key by combining name+category+unit here.
                 *
                 * Basically, what we want to achieve is to separate ingredients with
                 * the same name, but didn't have matching category, or unit.
                 *
                 * We want to prevent any errors by adding 'g' to 'cups', and the like.
                 * So we generate uniqueKeys, aggregating items that share these
                 * three fields.
                 */

                $uniqueKey = $name . '|' . $category . '|' . $unit;

                // Aggregate quantities
                if (!isset($ingredientTotals[$uniqueKey])) {
                    $ingredientTotals[$uniqueKey] = [
                        'quantity' => 0,
                        'unit' => $unit,
                        'name' => $name,
                        'category' => $category
                    ];
                }

                $ingredientTotals[$uniqueKey]['quantity'] += $quantity * $data['quantity'];
            }
        }

        foreach ($ingredientTotals as $total) {
            $quantity = $total['quantity'];
            $unit = $total['unit'];

            // Convert back to larger units if quantity > 1000
            if ($unit === 'g' && $quantity >= 1000) {
                $quantity = $quantity / 1000;
                $unit = 'kg';
            } elseif ($unit === 'ml' && $quantity >= 1000) {
                $quantity = $quantity / 1000;
                $unit = 'l';
            }

            GroceryListItem::create([
                'grocery_list_id' => $createdGroceryList->id,
                'quantity' => $quantity,
                'unit' => $unit,
                'name' => $total['name'],
                'category' => $total['category'],
            ]);
        }

        return GroceryList::with('groceryListRecipes.recipe', 'groceryListItems')->findOrFail($createdGroceryList->id);
    }

    public function updateGroceryList($data, $groceryList)
    {
        $recipesData = $data['recipes'];

        $unitConversions = [
            'kg' => 1000, // 1 kg = 1000 g
            'g' => 1,
            'l' => 1000,  // 1 l = 1000 ml
            'ml' => 1,
        ];

        $ingredientTotals = []; // {quantity, unit, name, category}[]

        // Delete related rows associated with the grocery list
        $groceryList->groceryListRecipes()->delete();
        $groceryList->groceryListItems()->delete();

        // Create records based on the request again
        foreach ($recipesData as $data) {
            GroceryListRecipe::create([
                'grocery_list_id' => $groceryList->id,
                'recipe_id' => $data['id'],
                'quantity' => $data['quantity'],
            ]);

            // assuming that this query returns {quantity, unit, name, category}[]
            $ingredients = RecipeIngredient::where('recipe_id', $data['id'])->get();

            // loop through each ingredient, aggregate it with the ingredientTotals array
            foreach ($ingredients as $ingredient) {
                $name = $ingredient['name'];
                $category = $ingredient['category'];
                $unit = $ingredient['unit'];
                $quantity = $ingredient['quantity'];

                // Standardize to smallest unit (g or ml)
                if (isset($unitConversions[$unit])) {
                    $quantity *= $unitConversions[$unit];
                    $unit = in_array($unit, ['kg', 'g']) ? 'g' : 'ml';
                }

                /**
                 * Generate unique key by combining name+category+unit here.
                 *
                 * Basically, what we want to achieve is to separate ingredients with
                 * the same name, but didn't have matching category, or unit.
                 *
                 * We want to prevent any errors by adding 'g' to 'cups', and the like.
                 * So we generate uniqueKeys, aggregating items that share these
                 * three fields.
                 */

                $uniqueKey = $name . '|' . $category . '|' . $unit;

                // Aggregate quantities
                if (!isset($ingredientTotals[$uniqueKey])) {
                    $ingredientTotals[$uniqueKey] = [
                        'quantity' => 0,
                        'unit' => $unit,
                        'name' => $name,
                        'category' => $category
                    ];
                }

                $ingredientTotals[$uniqueKey]['quantity'] += $quantity * $data['quantity'];
            }
        }

        foreach ($ingredientTotals as $total) {
            $quantity = $total['quantity'];
            $unit = $total['unit'];

            // Convert back to larger units if quantity > 1000
            if ($unit === 'g' && $quantity >= 1000) {
                $quantity = $quantity / 1000;
                $unit = 'kg';
            } elseif ($unit === 'ml' && $quantity >= 1000) {
                $quantity = $quantity / 1000;
                $unit = 'l';
            }

            GroceryListItem::create([
                'grocery_list_id' => $groceryList->id,
                'quantity' => $quantity,
                'unit' => $unit,
                'name' => $total['name'],
                'category' => $total['category'],
            ]);
        }

        return GroceryList::with('groceryListRecipes', 'groceryListItems')->findOrFail($groceryList->id);
    }

    public function getTrashed(Request $request)
    {
        // Form base query for USER and ADMIN
        $user = $request->user();
        $query = GroceryList::query()->with(['groceryListRecipes.recipe', 'groceryListItems'])->orderBy('deleted_at', 'desc');

        if ($user->role === 'USER') {
            $query->where('user_id', $user->id);
        }

        // Get the results with pagination
        return $query->onlyTrashed()->paginate(6);
    }
}
