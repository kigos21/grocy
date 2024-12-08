<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GroceryListController;
use App\Http\Controllers\RecipeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Recipes
Route::get('/recipes', [RecipeController::class, 'index'])->middleware('auth:sanctum');
Route::post('/recipes', [RecipeController::class, 'store'])->middleware('auth:sanctum');
Route::get('/recipes/{id}', [RecipeController::class, 'show'])->middleware('auth:sanctum')->whereNumber('id');
Route::put('/recipes/{id}', [RecipeController::class, 'update'])->middleware('auth:sanctum')->whereNumber('id');
Route::delete('/recipes/{id}', [RecipeController::class, 'destroy'])->middleware('auth:sanctum')->whereNumber('id');

Route::get('/trash/recipes', [RecipeController::class, 'trashed'])->middleware('auth:sanctum');
Route::patch('/trash/recipes/{id}', [RecipeController::class, 'restore'])->middleware('auth:sanctum')->whereNumber('id');
Route::delete('/trash/recipes/{id}', [RecipeController::class, 'forceDelete'])->middleware('auth:sanctum')->whereNumber('id');


// Grocery List
Route::get('/grocery-lists', [GroceryListController::class, 'index'])->middleware('auth:sanctum');
Route::post('/grocery-lists', [GroceryListController::class, 'store'])->middleware('auth:sanctum');
Route::get('/grocery-lists/{id}', [GroceryListController::class, 'show'])->middleware('auth:sanctum')->whereNumber('id');
Route::put('/grocery-lists/{id}', [GroceryListController::class, 'update'])->middleware('auth:sanctum')->whereNumber('id');
Route::delete('/grocery-lists/{id}', [GroceryListController::class, 'destroy'])->middleware('auth:sanctum')->whereNumber('id');
Route::put('/grocery-lists/{id}/items/{itemId}', [GroceryListController::class, 'updateItem'])->middleware('auth:sanctum')->whereNumber(['id', 'itemId']);

Route::get('/trash/grocery-lists', [GroceryListController::class, 'trashed'])->middleware('auth:sanctum');
Route::patch('/trash/grocery-lists/{id}', [GroceryListController::class, 'restore'])->middleware('auth:sanctum')->whereNumber('id');
Route::delete('/trash/grocery-lists/{id}', [GroceryListController::class, 'forceDelete'])->middleware('auth:sanctum')->whereNumber('id');
