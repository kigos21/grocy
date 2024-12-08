import GroceryListRecipeCard from "@/components/GroceryListRecipeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2 } from "@/components/ui/typography";
import { RecipeService } from "@/services/RecipeService";
import { Recipe, ValidationErrors } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage";
import GroceryListRecipeAdded from "@/components/GroceryListRecipeAdded";
import { GroceryListService } from "@/services/GroceryListService";
import { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

function GroceryListCreate() {
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [page, setPage] = useState("1");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Debounce the search state
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);

    return () => {
      clearTimeout(handler); // Clear timeout on cleanup
    };
  }, [search]);

  const [addedRecipes, setAddedRecipes] = useState<
    (Recipe & { quantity: number })[]
  >([]);

  const { isPending, error, data } = useQuery({
    queryKey: ["recipes", { sort, q: debouncedSearch, page }],
    queryFn: () => RecipeService.fetchRecipes(sort, debouncedSearch, page),
    // queryFn: () => new Promise(() => {}),
  });

  const handleSubmit = async () => {
    const payload = addedRecipes.map(({ id, quantity }) => ({
      id: String(id),
      quantity: String(quantity),
    }));

    try {
      const { message } = await GroceryListService.createGroceryList({
        recipes: payload,
      });
      toast({
        description: message,
      });
      queryClient.invalidateQueries({ queryKey: ["groceryLists"] });
      navigate("/grocery-lists");
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof AxiosError) {
        const errors: ValidationErrors = e.response?.data;
        toast({
          variant: "destructive",
          description: errors.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "An unexpected error occured.",
          description: getErrorMessage(e),
        });
      }
    }

    console.log(data);
  };

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
                      isAdded={addedRecipes.some(
                        (r) => String(r.id) === String(recipe.id),
                      )}
                      onAdd={() => handleRecipeAdd(recipe)}
                    />
                  ))}
            </div>
          </div>

          <div className="flex items-center rounded-b-lg border border-t-0 p-4 py-6">
            {/* Pagination */}
            {data?.data.recipes.data.length !== 0 && (
              <div className="flex flex-1 items-center justify-between">
                <p className="text-xs font-semibold">
                  Page {data?.data.recipes.current_page} out of{" "}
                  {data?.data.recipes.last_page}
                </p>

                <div className="flex items-center gap-1">
                  {/* First Page */}
                  {data?.data.recipes.current_page !== 1 && (
                    <Button
                      variant="outline"
                      size={"sm"}
                      className="h-7 px-2"
                      onClick={() => setPage("1")}
                    >
                      <ChevronFirst className="h-2 w-2" />
                    </Button>
                  )}

                  {/* Previous Page */}
                  {data?.data.recipes.prev_page_url && (
                    <Button
                      variant="outline"
                      size={"sm"}
                      className="h-7 px-2"
                      onClick={() =>
                        setPage((prev) => (parseInt(prev) - 1).toString())
                      }
                    >
                      <ChevronLeft className="h-2 w-2" />
                    </Button>
                  )}

                  {/* Next Page */}
                  {data?.data.recipes.next_page_url && (
                    <Button
                      variant="outline"
                      size={"sm"}
                      className="h-7 px-2"
                      onClick={() =>
                        setPage((prev) => (parseInt(prev) + 1).toString())
                      }
                    >
                      <ChevronRight className="h-2 w-2" />
                    </Button>
                  )}

                  {/* Last Page */}
                  {data?.data.recipes.current_page !==
                    data?.data.recipes.last_page && (
                    <Button
                      variant="outline"
                      size={"sm"}
                      className="h-7 px-2"
                      onClick={() =>
                        setPage(data.data.recipes.last_page.toString())
                      }
                    >
                      <ChevronLast className="h-2 w-2" />
                    </Button>
                  )}
                </div>
              </div>
            )}
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
            <Button className="w-full" onClick={handleSubmit}>
              Save & Generate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroceryListCreate;
