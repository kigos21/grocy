import { Clock4, Minus, Plus, Trash, Utensils } from "lucide-react";
import { Button } from "./ui/button";
import { TypographyMuted } from "./ui/typography";
import { Recipe } from "@/types";
import { useState } from "react";

function GroceryListRecipeAdded({
  // id,
  name,
  image_path,
  servings,
  cook_time,
  onRemove,
  onIncrement,
  onDecrement,
  quantity,
}: Recipe & {
  onRemove: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  quantity: number;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex gap-x-2 rounded-md border p-3">
      <div className="aspect-square h-full w-[6.75rem] flex-shrink-0">
        {image_path && !imageError ? (
          <img
            src={`http://localhost:8000/${image_path}`}
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

        <div className="flex flex-row justify-between gap-1">
          <div className="">
            <Button
              variant={"secondary"}
              className="h-7 items-center px-2 text-xs"
              size={"sm"}
              onClick={onRemove}
            >
              <span className="hidden sm:block">Remove</span>
              <span className="block sm:hidden">
                <Trash />
              </span>
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="secondary"
              size="icon"
              className="h-7 w-7"
              onClick={onDecrement}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="h-7 min-w-7 rounded-md border px-2 text-center">
              {quantity}
            </span>
            <Button
              variant="secondary"
              size="icon"
              className="h-7 w-7"
              onClick={onIncrement}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroceryListRecipeAdded;
