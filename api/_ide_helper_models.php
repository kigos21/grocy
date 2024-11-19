<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GroceryListItem> $groceryListItems
 * @property-read int|null $grocery_list_items_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GroceryListRecipe> $groceryListRecipes
 * @property-read int|null $grocery_list_recipes_count
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\GroceryListFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryList newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryList newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryList query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryList whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryList whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryList whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryList whereUserId($value)
 */
	class GroceryList extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $grocery_list_id
 * @property string $quantity
 * @property string $unit
 * @property string $name
 * @property string $category
 * @property int $bought
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\GroceryList $groceryList
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListItem query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListItem whereBought($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListItem whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListItem whereGroceryListId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListItem whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListItem whereUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListItem whereUpdatedAt($value)
 */
	class GroceryListItem extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $grocery_list_id
 * @property int $recipe_id
 * @property int $quantity
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\GroceryList $groceryList
 * @property-read \App\Models\Recipe $recipe
 * @method static \Database\Factories\GroceryListRecipeFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListRecipe newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListRecipe newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListRecipe query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListRecipe whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListRecipe whereGroceryListId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListRecipe whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListRecipe whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListRecipe whereRecipeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GroceryListRecipe whereUpdatedAt($value)
 */
	class GroceryListRecipe extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string|null $image_path
 * @property int $servings
 * @property int|null $cook_time
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GroceryListRecipe> $groceryListRecipes
 * @property-read int|null $grocery_list_recipes_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RecipeIngredient> $recipeIngredients
 * @property-read int|null $recipe_ingredients_count
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\RecipeFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereCookTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereServings($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereUserId($value)
 */
	class Recipe extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $recipe_id
 * @property string $quantity
 * @property string $unit
 * @property string $name
 * @property string $category
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Recipe $recipe
 * @method static \Database\Factories\RecipeIngredientFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeIngredient newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeIngredient newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeIngredient query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeIngredient whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeIngredient whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeIngredient whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeIngredient whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeIngredient whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeIngredient whereRecipeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeIngredient whereUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeIngredient whereUpdatedAt($value)
 */
	class RecipeIngredient extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string $role
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GroceryList> $groceryLists
 * @property-read int|null $grocery_lists_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Recipe> $recipes
 * @property-read int|null $recipes_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

