import GroceryListRecipeCard from "@/components/GroceryListRecipeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2 } from "@/components/ui/typography";
import { RecipeService } from "@/services/RecipeService";
import { Recipe } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage";
import GroceryListRecipeAdded from "@/components/GroceryListRecipeAdded";

function GroceryListCreate() {
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
  const [addedRecipes, setAddedRecipes] = useState<
    // { id: number; name: string; quantity: number }[]
    (Recipe & { quantity: number })[]
  >([]);

  const { isPending, error, data } = useQuery({
    queryKey: ["recipes", { sort, q: search }],
    queryFn: () => RecipeService.fetchRecipes(sort, search),
    // queryFn: () => new Promise(() => {}),
  });

  // LOG THE DATA, JUST TO CHECK
  useEffect(() => {
    console.log(JSON.stringify(addedRecipes, null, 2));
  }, [addedRecipes]);

  const handleRecipeAdd = (recipe: Recipe) => {
    setAddedRecipes((prev) => {
      if (prev.some((r) => String(r.id) === String(recipe.id))) return prev;
      return [...prev, { ...recipe, quantity: 1 }];
    });
  };

  const incrementQuantity = (id: string) => {
    setAddedRecipes((prev) =>
      prev.map((r) =>
        String(r.id) === String(id) ? { ...r, quantity: r.quantity + 1 } : r,
      ),
    );
  };

  const decrementQuantity = (id: string) => {
    setAddedRecipes(
      (prev) =>
        prev
          .map((r) =>
            String(r.id) === String(id)
              ? { ...r, quantity: Math.max(1, r.quantity - 1) }
              : r,
          )
          .filter((r) => r.quantity > 0), // Remove if quantity is 0
    );
  };

  const removeRecipe = (id: string) => {
    setAddedRecipes((prev) => prev.filter((r) => String(r.id) !== String(id)));
  };

  if (error) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <div className="mx-auto max-w-screen-lg p-4">
      <TypographyH2 className="mb-4">
        Whip up your grocery list from your favorite recipes!
      </TypographyH2>

      <div className="grid min-h-[78vh] grid-cols-1 gap-2 md:h-[86vh] lg:grid-cols-2 lg:gap-4">
        {/* Recipes Index */}
        <div className="flex h-[78vh] flex-col md:h-[86vh]">
          <div className="flex flex-grow flex-col gap-3 overflow-y-auto rounded-t-lg border p-4">
            <div className="flex justify-between gap-2">
              {/* Sort */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <span className="hidden md:inline">Sort By: </span>
                    <span className="font-semibold">
                      {sort.charAt(0).toUpperCase() + sort.substring(1)}
                    </span>
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="top-0 mt-1 w-[6.6875rem] overflow-hidden rounded-md border text-sm shadow-md md:w-[10.1875rem]">
                  <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                    <DropdownMenuRadioItem value="newest">
                      <div className="cursor-pointer bg-white px-2 py-1 hover:bg-gray-100">
                        Newest
                      </div>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="name">
                      <div className="cursor-pointer bg-white px-2 py-1 hover:bg-gray-100">
                        Name
                      </div>
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Search */}
              <Input
                placeholder="Search"
                value={search}
                className="max-w-[15rem]"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2">
              {isPending
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex gap-2">
                      <Skeleton className="aspect-square w-24 rounded-xl" />
                      <div className="flex flex-1 flex-col gap-2">
                        <Skeleton className="h-4 w-full rounded-full" />
                        <Skeleton className="h-4 w-[5rem] rounded-full" />
                        <Skeleton className="h-4 w-[5rem] rounded-full" />
                      </div>
                    </div>
                  ))
                : data.data.recipes.data.map((recipe: Recipe) => (
                    <GroceryListRecipeCard
                      key={recipe.id}
                      {...recipe}
                      onAdd={() => handleRecipeAdd(recipe)}
                    />
                  ))}
            </div>
          </div>

          <div className="flex items-center rounded-b-lg border border-t-0 p-4 py-6">
            Pagination
          </div>
        </div>

        {/* Added Recipes */}
        <div className="relative flex h-[78vh] flex-col md:h-[86vh]">
          <div className="flex flex-grow flex-col gap-3 overflow-y-auto rounded-t-lg border p-4">
            <div className="flex h-10 items-end">
              <p className="text-sm font-semibold">Added Recipes</p>
            </div>

            {/* Added Recipes */}
            <div className="flex flex-col gap-2">
              {addedRecipes.length > 0 ? (
                addedRecipes.map((recipe) => (
                  <GroceryListRecipeAdded
                    key={recipe.id}
                    {...recipe}
                    quantity={recipe.quantity}
                    onRemove={() => removeRecipe(String(recipe.id))}
                    onIncrement={() => incrementQuantity(String(recipe.id))}
                    onDecrement={() => decrementQuantity(String(recipe.id))}
                  />
                ))
              ) : (
                // No recipes holder
                <div className="flex h-[8.375rem] w-full items-center justify-center rounded-md border border-dashed">
                  <p className="text-xs font-bold uppercase text-gray-300">
                    No recipes added yet.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center rounded-b-lg border border-t-0 p-4">
            <Button className="w-full">Save & Generate</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroceryListCreate;
