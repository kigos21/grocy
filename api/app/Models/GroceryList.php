<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class GroceryList extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
    ];

    public static function boot()
    {
        parent::boot();

        static::restoring(function ($groceryList) {
            $groceryListRecipes = $groceryList->groceryListRecipes()->get();

            foreach ($groceryListRecipes as $groceryListRecipe) {
                $recipeId = $groceryListRecipe->recipe_id;
                $recipe = Recipe::onlyTrashed()->find($recipeId);
                if ($recipe) {
                    $recipe->restore();
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

    public function groceryListItems(): HasMany
    {
        return $this->hasMany(GroceryListItem::class);
    }
}
