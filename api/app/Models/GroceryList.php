<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GroceryList extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function groceryListRecipes(): HasMany
    {
        return $this->hasMany(GroceryListRecipe::class);
    }

//    public function groceryListItems(): HasMany
//    {
//        return $this->hasMany(GroceryListItems::class);
//    }
}
