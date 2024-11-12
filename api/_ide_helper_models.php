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
 * @property string $name
 * @property string|null $image_path
 * @property int $servings
 * @property int|null $cook_time
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RecipeIngredient> $ingredients
 * @property-read int|null $ingredients_count
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
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
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
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

