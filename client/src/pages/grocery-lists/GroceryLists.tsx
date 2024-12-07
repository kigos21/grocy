import GroceryListCard from "@/components/GroceryListCard";
import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import { GroceryList } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import ErrorPage from "../ErrorPage";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { GroceryListService } from "@/services/GroceryListService";

function GroceryLists() {
  const [sort, setSort] = useState("newest");
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["groceryLists", { sort }],
    queryFn: () => GroceryListService.fetchGroceryLists(sort),
    // queryFn: () => new Promise(() => {}),
  });

  if (error) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <div className="mx-auto max-w-screen-lg p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap justify-between gap-x-4">
          <TypographyH2> Groceries at a glance</TypographyH2>
          <div className="flex gap-2">
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
                  <DropdownMenuRadioItem value="oldest">
                    <div className="cursor-pointer bg-white px-2 py-1 hover:bg-gray-100">
                      Oldest
                    </div>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={() => navigate("/grocery-lists/new")}>
              <Plus />
              <span className="">New</span>
            </Button>
          </div>
        </div>

        {/* Grocery Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isPending
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-3">
                  <Skeleton className="aspect-video w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="ml-auto h-4 w-1/3 rounded-full" />
                  </div>
                </div>
              ))
            : data?.data.grocery_lists.data.map((grocery: GroceryList) => (
                <GroceryListCard key={grocery.id} {...grocery} />
              ))}

          {data?.data.grocery_lists.data.length === 0 && (
            <div className="col-span-full flex h-96 items-center justify-center">
              <p className="text-xs font-bold uppercase text-gray-300">
                No grocery list to display
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {data?.data.grocery_lists.data.length !== 0 && (
          <div className="flex justify-between">
            <p className="text-xs font-semibold">6 out of 25 items</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroceryLists;
