<?php

namespace App\Http\Controllers;

use App\Models\GroceryList;
use App\Services\GroceryListService;
use Illuminate\Http\Request;

class GroceryListController extends Controller
{
    protected GroceryListService $groceryListService;

    public function __construct(GroceryListService $groceryListService)
    {
        $this->groceryListService = $groceryListService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $grocery_lists = $this->groceryListService->getGroceryLists($request);

        return response()->json([
            'status' => 'success',
            'message' => 'Grocery lists fetch successfully',
            'data' => [
                'grocery_lists' => $grocery_lists,
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
            'recipes' => 'required|array|min:1',
            'recipes.*.id' => 'required|exists:recipes,id',
            'recipes.*.quantity' => 'required|integer|min:1'
        ], [
            'recipes' => 'There should be at least 1 recipe for the list.'
        ]);

        $grocery_list = $this->groceryListService->createGroceryList($validatedData);

        return response()->json([
            'status' => 'success',
            'message' => 'Grocery list created successfully',
            'data' => [
                'grocery_list' => $grocery_list,
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
        $grocery_list = GroceryList::with(['groceryListRecipes.recipe'])->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Grocery list fetch successfully',
            'data' => [
                'grocery_list' => $grocery_list,
            ],
            'errors' => [],
            'timestamp' => now(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGroceryListRequest $request, GroceryList $groceryList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GroceryList $groceryList)
    {
        //
    }
}
