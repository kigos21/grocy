<?php

namespace App\Policies;

use App\Models\GroceryList;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class GroceryListPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, GroceryList $groceryList): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, GroceryList $groceryList): Response
    {
        return $user->id === $groceryList->user_id || $user->role === 'ADMIN'
            ? Response::allow()
            : Response::deny('You do not own this recipe.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, GroceryList $groceryList): Response
    {
        return $user->id === $groceryList->user_id || $user->role === 'ADMIN'
            ? Response::allow()
            : Response::deny('You do not own this recipe.');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, GroceryList $groceryList): Response
    {
        return $user->id === $groceryList->user_id || $user->role === 'ADMIN'
            ? Response::allow()
            : Response::deny('You do not own this recipe.');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, GroceryList $groceryList): Response
    {
        return $user->id === $groceryList->user_id || $user->role === 'ADMIN'
            ? Response::allow()
            : Response::deny('You do not own this recipe.');
    }
}
