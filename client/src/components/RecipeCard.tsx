import { Recipe } from "@/types";
import { Clock4, Utensils } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { TypographyMuted } from "./ui/typography";

function RecipeCard({ id, name, image_path, servings, cook_time }: Recipe) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  return (
    <div className="overflow-hidden rounded-md border">
      <div className="border-b">
        {image_path && !imageError ? (
          <img
            src={image_path}
            alt={`Image of ${name}`}
            onError={() => setImageError(true)}
            className="aspect-video bg-gray-100 object-cover"
          />
        ) : (
          <div className="flex aspect-video items-center justify-center bg-gray-100">
            <p className="text-xs font-bold uppercase text-gray-300">
              No image
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <p className="line-clamp-1">{name}</p>
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

        <div>
          <Button
            variant={"secondary"}
            className="w-full"
            onClick={() => navigate(`/app/recipes/${id}`)}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
