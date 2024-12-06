import { TypographyH2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import FullDisplayListCard from "@/components/FullDisplayListCard";
import AddedRecipes from "@/components/AddedRecipes";
// import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

function FullDisplayList() {
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
  //   const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-screen-lg p-4">
      <TypographyH2 className="mb-4">
        Whip up your grocery list from your favorite recipes!
      </TypographyH2>
      <div className="flex flex-row gap-8">
        <div className="flex w-1/2 flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex gap-12">
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
          </div>
          <FullDisplayListCard
            id={0}
            user_id={0}
            name={"sample"}
            image_path={""}
            servings={0}
            cook_time={0}
            created_at={""}
            updated_at={""}
          />
          <FullDisplayListCard
            id={0}
            user_id={0}
            name={"sample"}
            image_path={""}
            servings={0}
            cook_time={0}
            created_at={""}
            updated_at={""}
          />

          <div className="flex justify-between">
            <p className="text-xs font-semibold">6 out of 25 items</p>
          </div>
        </div>

        {/* division of row */}
        <div className="flex w-1/2 flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex gap-12">
            <span className="py-2 font-semibold">Added Recipes</span>
          </div>
          <AddedRecipes
            id={0}
            user_id={0}
            name={"sample"}
            image_path={""}
            servings={0}
            cook_time={0}
            created_at={""}
            updated_at={""}
          />
          <AddedRecipes
            id={0}
            user_id={0}
            name={"sample"}
            image_path={""}
            servings={0}
            cook_time={0}
            created_at={""}
            updated_at={""}
          />
          <div className="py-4">
            <Button
              variant={"default"}
              className="w-full"
              // onClick={() => navigate(`/`)}
            >
              Save & Generate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullDisplayList;
