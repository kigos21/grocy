<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('image_path')->nullable();
            $table->integer('servings');
            $table->integer('cook_time')->nullable();
            $table->timestamps();
        });

        Schema::create('recipe_ingredients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recipe_id')->constrained()->cascadeOnDelete();
            $table->decimal('quantity', 10, 2);
            $table->enum('unit', ['g', 'kg', 'ml', 'l', 'cup', 'tbsp', 'tsp', 'piece']);
            $table->string('name');
            $table->enum('category', [
                'produce',
                'meat & seafood',
                'dairy & eggs',
                'baking goods',
                'grains pasta & rice',
                'condiments & spices',
                'frozen',
                'snacks & sweets',
                'beverages',
                'canned & jarred',
                'others',
            ]);
            $table->timestamps();
        });

        Schema::create('grocery_lists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('grocery_list_recipes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('grocery_list_id')->constrained()->cascadeOnDelete();
            $table->foreignId('recipe_id')->constrained()->cascadeOnDelete();
            $table->integer('quantity')->default(1);
            $table->timestamps();

            $table->unique(['grocery_list_id', 'recipe_id']);
        });

        Schema::create('grocery_list_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('grocery_list_id')->constrained()->cascadeOnDelete();
            $table->decimal('quantity', 10, 2);
            $table->enum('unit', ['g', 'kg', 'ml', 'l', 'cup', 'tbsp', 'tsp', 'piece', 'whole']);
            $table->string('name');
            $table->enum('category', ['produce', 'meat', 'dairy', 'pantry', 'spices', 'frozen']);
            $table->boolean('bought')->default(false);
            $table->timestamps();
        });


        // Create indexes
        Schema::table('recipes', function (Blueprint $table) {
            $table->index('user_id');
        });

        Schema::table('grocery_lists', function (Blueprint $table) {
            $table->index('user_id');
        });

        Schema::table('recipe_ingredients', function (Blueprint $table) {
            $table->index('recipe_id');
        });

        Schema::table('grocery_list_recipes', function (Blueprint $table) {
            $table->index('grocery_list_id');
            $table->index('recipe_id');
        });

        Schema::table('grocery_list_items', function (Blueprint $table) {
            $table->index('grocery_list_id');
            $table->index('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
        Schema::dropIfExists('recipe_ingredients');
        Schema::dropIfExists('grocery_lists');
        Schema::dropIfExists('grocery_list_recipes');
        Schema::dropIfExists('grocery_list_items');
    }
};
