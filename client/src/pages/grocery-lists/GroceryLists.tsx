import GroceryListCard from "@/components/GroceryListCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2 } from "@/components/ui/typography";
import { GroceryListService } from "@/services/GroceryListService";
import { GroceryList } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";

function GroceryLists() {
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState("1");
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["groceryLists", { sort, page }],
    queryFn: () => GroceryListService.fetchGroceryLists(sort, page),
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

            <Button onClick={() => navigate("/app/grocery-lists/new")}>
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
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold">
              Page {data?.data.grocery_lists.current_page} out of{" "}
              {data?.data.grocery_lists.last_page}
            </p>

            <div className="flex items-center gap-1">
              {/* First Page */}
              {data?.data.grocery_lists.current_page !== 1 && (
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
              {data?.data.grocery_lists.prev_page_url && (
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
              {data?.data.grocery_lists.next_page_url && (
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
              {data?.data.grocery_lists.current_page !==
                data?.data.grocery_lists.last_page && (
                <Button
                  variant="outline"
                  size={"sm"}
                  className="h-7 px-2"
                  onClick={() =>
                    setPage(data.data.grocery_lists.last_page.toString())
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
  );
}

export default GroceryLists;
