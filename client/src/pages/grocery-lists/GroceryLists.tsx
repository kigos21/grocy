import GroceryCard from "@/components/GroceryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyH2 } from "@/components/ui/typography";
import { Grocery } from "@/types";
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

import { GroceryService } from "@/services/GroceryService";

function GroceryLists() {
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["groceries", { sort, q: search }],
    queryFn: () => GroceryService.fetchGroceries(sort, search),
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
                  <DropdownMenuRadioItem value="name">
                    <div className="cursor-pointer bg-white px-2 py-1 hover:bg-gray-100">
                      Name
                    </div>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={() => navigate("/recipes/new")}>
              <Plus />
              <span className="hidden md:inline">New</span>
            </Button>
          </div>
        </div>

        {/* grocery Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isPending
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-3">
                  <Skeleton className="aspect-video w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px] rounded-full" />
                    <Skeleton className="h-4 w-[200px] rounded-full" />
                  </div>
                </div>
              ))
            : data?.data.groceries.data.map((grocery: Grocery) => (
                <GroceryCard key={grocery.id} {...grocery} />
              ))}
          {data?.data.groceries.data.length === 0 && (
            <div className="col-span-full flex h-96 items-center justify-center">
              <p className="text-xs font-bold uppercase text-gray-300">
                No groceries to display
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {data?.data.groceries.data.length !== 0 && (
          <div className="flex justify-between">
            <p className="text-xs font-semibold">6 out of 25 items</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroceryLists;
