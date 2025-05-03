import { Recipe } from "@/types";
import { Clock4, Utensils } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { TypographyMuted } from "./ui/typography";

function GroceryListRecipeCard({
  // id,
  name,
  image_path,
  servings,
  cook_time,
  onAdd,
  isAdded,
}: Recipe & {
  onAdd: () => void;
  isAdded: boolean;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex gap-x-2 rounded-md border p-3">
      <div className="aspect-square h-full w-[6.75rem] flex-shrink-0">
        {image_path && !imageError ? (
          <img
            src={image_path}
            alt={`Image of ${name}`}
            onError={() => setImageError(true)}
            className="aspect-square h-full bg-gray-100 object-cover"
          />
        ) : (
          <div className="flex aspect-square h-full items-center justify-center bg-gray-100">
            <p className="text-xs font-bold uppercase text-gray-300">
              No image
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="line-clamp-1">{name}</p>
          <div className="flex flex-col">
            <TypographyMuted className="flex items-center gap-1">
              <Utensils className="h-3 w-3" /> {servings}&nbsp;servings
            </TypographyMuted>
            <TypographyMuted className="flex items-center gap-1">
              <Clock4 className="h-3 w-3" />
              {cook_time}&nbsp;mins
            </TypographyMuted>
          </div>
        </div>

        <div className="block text-right">
          {!isAdded ? (
            <Button
              variant={"secondary"}
              className="h-7 w-12 items-center text-xs"
              size={"sm"}
              onClick={onAdd}
            >
              Add
            </Button>
          ) : (
            <Button
              variant={"outline"}
              size={"sm"}
              className="h-7 items-center text-xs"
            >
              Added
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroceryListRecipeCard;
