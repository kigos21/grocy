import { TypographyH2 } from "@/components/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RecipeService } from "@/services/RecipeService";
import ErrorPage from "./ErrorPage";
import { GroceryList, Recipe } from "@/types";
import { formatIsoDateToLocale, timeDiffForHumans } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { GroceryListService } from "@/services/GroceryListService";

function TrashPage() {
  const [recipePage, setRecipePage] = useState("1");
  const [groceryListPage, setGroceryListPage] = useState("1");

  const {
    isPending: recipeIsPending,
    error: recipeError,
    data: recipeData,
  } = useQuery({
    queryKey: ["trashedRecipes", { recipePage }],
    queryFn: () => RecipeService.fetchTrashed(recipePage),
    // queryFn: () => new Promise(() => {}),
  });

  const {
    isPending: groceryListIsPending,
    error: groceryListError,
    data: groceryListData,
  } = useQuery({
    queryKey: ["trashedGroceryLists", { groceryListPage }],
    queryFn: () => GroceryListService.fetchTrashed(groceryListPage),
    // queryFn: () => new Promise(() => {}),
  });

  if (recipeError) {
    return <ErrorPage message={recipeError.message} />;
  }

  if (groceryListError) {
    return <ErrorPage message={groceryListError.message} />;
  }

  if (groceryListData) console.log(groceryListData);

  return (
    <div className="mx-auto max-w-screen-md p-4">
      <div className="flex flex-col gap-4">
        <Tabs defaultValue="recipes">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="groceryLists">Grocery Lists</TabsTrigger>
          </TabsList>

          {/* Trashed Recipes */}
          <TabsContent value="recipes">
            <TypographyH2>Recently Deleted: Recipes</TypographyH2>

            <div className="mb-4 mt-4 grid gap-2 md:grid-cols-2">
              {!recipeIsPending
                ? recipeData.data.recipes.data.map((recipe: Recipe) => (
                    <div
                      key={recipe.id}
                      className="flex flex-col gap-4 rounded-md border px-4 py-3"
                    >
                      <div>
                        <p>{recipe.name}</p>{" "}
                        <p className="text-xs text-muted">
                          {timeDiffForHumans(recipe.deleted_at)}
                        </p>
                      </div>

                      <div className="ml-auto flex gap-1">
                        <Button variant={"secondary"} size={"sm"}>
                          Restore
                        </Button>
                        <Button variant={"destructive"} size={"sm"}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                : Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <Skeleton className="h-20 w-full" />

                      <div className="ml-auto flex gap-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                    </div>
                  ))}

              {!recipeIsPending &&
                recipeData.data.recipes.data.length === 0 && (
                  <div className="col-span-full flex h-96 items-center justify-center">
                    <p className="text-xs font-bold uppercase text-gray-300">
                      No recently deleted recipes
                    </p>
                  </div>
                )}
            </div>

            {/* Pagination */}
            {recipeData?.data.recipes.data.length !== 0 && (
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold">
                  Page {recipeData?.data.recipes.current_page} out of{" "}
                  {recipeData?.data.recipes.last_page}
                </p>

                <div className="flex items-center gap-1">
                  {/* First Page */}
                  {recipeData?.data.recipes.current_page !== 1 && (
                    <Button
                      variant="outline"
                      size={"sm"}
                      className="h-7 px-2"
                      onClick={() => setRecipePage("1")}
                    >
                      <ChevronFirst className="h-2 w-2" />
                    </Button>
                  )}

                  {/* Previous Page */}
                  {recipeData?.data.recipes.prev_page_url && (
                    <Button
                      variant="outline"
                      size={"sm"}
                      className="h-7 px-2"
                      onClick={() =>
                        setRecipePage((prev) => (parseInt(prev) - 1).toString())
                      }
                    >
                      <ChevronLeft className="h-2 w-2" />
                    </Button>
                  )}

                  {/* Next Page */}
                  {recipeData?.data.recipes.next_page_url && (
                    <Button
                      variant="outline"
                      size={"sm"}
                      className="h-7 px-2"
                      onClick={() =>
                        setRecipePage((prev) => (parseInt(prev) + 1).toString())
                      }
                    >
                      <ChevronRight className="h-2 w-2" />
                    </Button>
                  )}

                  {/* Last Page */}
                  {recipeData?.data.recipes.current_page !==
                    recipeData?.data.recipes.last_page && (
                    <Button
                      variant="outline"
                      size={"sm"}
                      className="h-7 px-2"
                      onClick={() =>
                        setRecipePage(
                          recipeData.data.recipes.last_page.toString(),
                        )
                      }
                    >
                      <ChevronLast className="h-2 w-2" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Trashed Grocery Lists */}
          <TabsContent value="groceryLists">
            <TypographyH2>Recently Deleted: Grocery Lists</TypographyH2>

            <div className="mb-4 mt-4 grid gap-2 md:grid-cols-2">
              {!groceryListIsPending
                ? groceryListData.data.grocery_lists.data.map(
                    (groceryList: GroceryList) => (
                      <div className="flex flex-col gap-4 rounded-md border px-4 py-3">
                        <div>
                          <p>{formatIsoDateToLocale(groceryList.updated_at)}</p>{" "}
                          <p className="text-xs text-muted">
                            {timeDiffForHumans(groceryList.deleted_at)}
                          </p>
                        </div>

                        <div className="ml-auto flex gap-1">
                          <Button variant={"secondary"} size={"sm"}>
                            Restore
                          </Button>
                          <Button variant={"destructive"} size={"sm"}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    ),
                  )
                : Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <Skeleton className="h-20 w-full" />

                      <div className="ml-auto flex gap-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                    </div>
                  ))}

              {!groceryListIsPending &&
                groceryListData.data.grocery_lists.data.length === 0 && (
                  <div className="col-span-full flex h-96 items-center justify-center">
                    <p className="text-xs font-bold uppercase text-gray-300">
                      No recently deleted grocery lists
                    </p>
                  </div>
                )}
            </div>

            {/* Pagination */}
            {groceryListData?.data.grocery_lists.data.length !== 0 && (
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold">
                  Page {groceryListData?.data.grocery_lists.current_page} out of{" "}
                  {groceryListData?.data.grocery_lists.last_page}
                </p>

                <div className="flex items-center gap-1">
                  {/* First Page */}
                  {groceryListData?.data.grocery_lists.current_page !== 1 && (
                    <Button
                      variant="outline"
                      size={"sm"}
                      className="h-7 px-2"
                      onClick={() => setGroceryListPage("1")}
                    >
                      <ChevronFirst className="h-2 w-2" />
                    </Button>
                  )}

                  {/* Previous Page */}
                  {groceryListData?.data.grocery_lists.prev_page_url && (
                    <Button
                      variant="outline"
                      size={"sm"}
                      className="h-7 px-2"
                      onClick={() =>
                        setGroceryListPage((prev) =>
                          (parseInt(prev) - 1).toString(),
                        )
                      }
                    >
                      <ChevronLeft className="h-2 w-2" />
                    </Button>
                  )}

                  {/* Next Page */}
                  {groceryListData?.data.grocery_lists.next_page_url && (
                    <Button
                      variant="outline"
                      size={"sm"}
                      className="h-7 px-2"
                      onClick={() =>
                        setGroceryListPage((prev) =>
                          (parseInt(prev) + 1).toString(),
                        )
                      }
                    >
                      <ChevronRight className="h-2 w-2" />
                    </Button>
                  )}

                  {/* Last Page */}
                  {groceryListData?.data.grocery_lists.current_page !==
                    groceryListData?.data.grocery_lists.last_page && (
                    <Button
                      variant="outline"
                      size={"sm"}
                      className="h-7 px-2"
                      onClick={() =>
                        setGroceryListPage(
                          groceryListData.data.grocery_lists.last_page.toString(),
                        )
                      }
                    >
                      <ChevronLast className="h-2 w-2" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default TrashPage;
