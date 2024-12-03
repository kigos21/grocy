import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyH2 } from "@/components/ui/typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";

function Recipes() {
  const [sort, setSort] = useState("newest");

  return (
    <div className="mx-auto max-w-screen-lg p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap justify-between gap-x-4">
          <TypographyH2>Kitchen Catalog: Your recipe index</TypographyH2>
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
            <Input placeholder="Search" />
            <Button>
              <Plus />
              <span className="hidden md:inline">New</span>
            </Button>
          </div>
        </div>

        {/* Recipe Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>

        {/* Pagination */}
        <div>
          <p className="text-xs font-semibold">6 out of 25 items</p>
        </div>
      </div>
    </div>
  );
}

export default Recipes;
