<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GroceryListItem extends Model
{
    protected $fillable = [
        'grocery_list_id',
        'quantity',
        'bought',
        'unit',
        'name',
        'category'
    ];

    public function groceryList(): BelongsTo
    {
        return $this->belongsTo(GroceryList::class);
    }
}
