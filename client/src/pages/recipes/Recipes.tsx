import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

function Recipes() {
  const [sort, setSort] = useState("newest");

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between">
        <TypographyH2>Kitchen Catalog: Your recipe index</TypographyH2>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Sort by:{" "}
                <span className="font-semibold">
                  {sort.charAt(0).toUpperCase() + sort.substring(1)}
                </span>
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="top-0 mt-1 w-[10.1875rem] rounded-md border text-sm shadow-md">
              <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenuRadioItem value="newest">
                  <div className="cursor-pointer px-2 py-1 hover:bg-gray-100">
                    Newest
                  </div>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name">
                  <div className="cursor-pointer px-2 py-1 hover:bg-gray-100">
                    Name
                  </div>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default Recipes;
