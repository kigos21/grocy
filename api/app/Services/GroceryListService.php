<?php

namespace App\Services;

use App\Models\GroceryList;
use App\Models\GroceryListRecipe;
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
        $query = null;
        if ($user->role === 'USER') {
            $query = GroceryList::query()->where('user_id', $user->id);
        } else {
            $query = GroceryList::query();
        }

        // Apply sorting based on 'sort' parameter
        if ($sort === 'newest') {
            $query->orderBy('updated_at', 'desc');
        } elseif ($sort === 'name') {
            $query->orderBy('updated_at', 'asc');
        }

        // Get the results with pagination
        return $query->paginate(6);
    }

    public function createGroceryList($data)
    {
        // Create the grocery list record, associated with the user
        $createdGroceryList = GroceryList::create([
            'user_id' => Auth::id()
        ]);

        $recipesData = $data['recipes'];

        foreach ($recipesData as $data) {
            GroceryListRecipe::create([
                'grocery_list_id' => $createdGroceryList->id,
                'recipe_id' => $data['id'],
                'quantity' => $data['quantity'],
            ]);
        }

        return GroceryList::with('groceryListRecipes')->findOrFail($createdGroceryList->id);
    }
}
