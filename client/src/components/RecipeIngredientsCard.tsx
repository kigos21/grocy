import { RecipeWithIngredients } from "@/types";
import { Fragment, useState } from "react";
import { TypographyMuted } from "./ui/typography";
import { Clock4, Utensils } from "lucide-react";

function RecipeIngredientsCard({
  // id,
  name,
  image_path,
  servings,
  cook_time,
  recipe_ingredients,
}: RecipeWithIngredients) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="overflow-hidden rounded-md border md:col-span-4">
      <div className="flex flex-col gap-4 px-4 py-4 pt-3">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">{name}</p>

          <div className="flex flex-col gap-1">
            {image_path && !imageError ? (
              <img
                src={image_path}
                alt={`Image of ${name}`}
                onError={() => setImageError(true)}
                className="aspect-video rounded-sm bg-gray-100 object-cover"
              />
            ) : (
              <div className="flex aspect-video items-center justify-center bg-gray-100">
                <p className="text-xs font-bold uppercase text-gray-300">
                  No image
                </p>
              </div>
            )}
            <div className="flex justify-between">
              <TypographyMuted className="flex items-center gap-1">
                <Utensils className="h-3 w-3" /> {servings} servings
              </TypographyMuted>
              <TypographyMuted className="flex items-center gap-1">
                <Clock4 className="h-3 w-3" />
                {cook_time} mins
              </TypographyMuted>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">Ingredients</p>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-muted">
            {recipe_ingredients.map((ingredient) => (
              <Fragment key={ingredient.id}>
                <p>
                  {ingredient.quantity}
                  {ingredient.unit}
                </p>
                <p>{ingredient.name}</p>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeIngredientsCard;
