<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Recipe extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'image_path',
        'servings',
        'cook_time',
    ];

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($recipe) {
            if ($recipe->isForceDeleting()) {
                // If force deleting, force delete grocery list
                // 1. get the id of the related grocery list records
                // 2. call ->forceDelete();

                $groceryListRecipes = $recipe->groceryListRecipes()->get();

                foreach ($groceryListRecipes as $groceryListRecipe) {
                    $groceryListId = $groceryListRecipe->grocery_list_id;
                    $groceryList = GroceryList::onlyTrashed()->find($groceryListId);
                    if ($groceryList) {
                        $groceryList->forceDelete();
                    }
                }
            } else {
                // Soft delete related grocery lists
                // 1. get the id of the related grocery list records
                // 2. call ->delete();

                $groceryListRecipes = $recipe->groceryListRecipes()->get();

                foreach ($groceryListRecipes as $groceryListRecipe) {
                    $groceryListId = $groceryListRecipe->grocery_list_id;
                    $groceryList = GroceryList::find($groceryListId);
                    if ($groceryList) {
                        $groceryList->delete();
                    }
                }
            }
        });
    }

    public function groceryListRecipes(): HasMany
    {
        return $this->hasMany(GroceryListRecipe::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function recipeIngredients(): HasMany
    {
        return $this->hasMany(RecipeIngredient::class);
    }
}
