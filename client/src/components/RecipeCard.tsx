import { Clock4, Utensils } from "lucide-react";
import { Button } from "./ui/button";
import { TypographyMuted } from "./ui/typography";

interface Props {
  imageUrl?: string;
}

function RecipeCard({ imageUrl }: Props) {
  return (
    <div className="overflow-hidden rounded-md border">
      <div className="border-b">
        {imageUrl ? (
          <img
            src={"http://localhost:8000/storage/tiger.jpg"}
            alt=""
            className="aspect-video object-cover"
          />
        ) : (
          <div className="flex aspect-video items-center justify-center bg-gray-100">
            <p className="text-xs font-bold uppercase text-gray-300">
              No image uploaded
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <p className="line-clamp-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
            velit.
          </p>
          <div className="flex justify-between">
            <TypographyMuted className="flex items-center gap-1 md:text-xs">
              <Utensils className="h-3 w-3" /> 2 servings
            </TypographyMuted>
            <TypographyMuted className="flex items-center gap-1 md:text-xs">
              <Clock4 className="h-3 w-3" />
              45 mins
            </TypographyMuted>
          </div>
        </div>

        <div>
          <Button variant={"secondary"} className="w-full">
            View
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
