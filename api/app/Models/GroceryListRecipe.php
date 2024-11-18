<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GroceryListRecipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'grocery_list_id',
        'recipe_id',
        'quantity'
    ];

    public function groceryList(): BelongsTo
    {
        return $this->belongsTo(GroceryList::class);
    }

    public function recipe(): BelongsTo
    {
        return $this->belongsTo(Recipe::class);
    }
}
