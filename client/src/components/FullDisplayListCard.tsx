import { Clock4, Utensils } from "lucide-react";
import { Button } from "./ui/button";
import { TypographyMuted } from "./ui/typography";
import { Recipe } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FullDisplayListCard({
  id,
  name,
  image_path,
  servings,
  cook_time,
}: Recipe) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-row items-center overflow-hidden rounded-md border px-3">
      <div className="w-1/4 border-b">
        {image_path && !imageError ? (
          <img
            src={image_path}
            alt={`Image of ${name}`}
            onError={() => setImageError(true)}
            className="aspect-square bg-gray-100 object-cover"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center bg-gray-100">
            <p className="text-xs font-bold uppercase text-gray-300">
              No image
            </p>
          </div>
        )}
      </div>

      <div className="flex w-3/4 flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <p className="line-clamp-1">{name}</p>
          <div className="flex flex-col">
            <TypographyMuted className="flex items-center gap-1">
              <Utensils className="h-3 w-3" /> {servings} servings
            </TypographyMuted>
            <TypographyMuted className="flex items-center gap-1">
              <Clock4 className="h-3 w-3" />
              {cook_time} mins
            </TypographyMuted>
          </div>
        </div>

        <div className="block text-right">
          <Button
            variant={"secondary"}
            className="h-7 w-12 items-center text-xs"
            size={"sm"}
            onClick={() => navigate(`/`)}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FullDisplayListCard;
