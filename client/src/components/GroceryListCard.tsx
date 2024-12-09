import { formatIsoDateToLocale, timeDiffForHumans } from "@/lib/utils";
import { Button } from "./ui/button";
import { GroceryList } from "@/types";
import { useNavigate } from "react-router-dom";

function GroceryListCard({
  id,
  updated_at,
  grocery_list_recipes,
}: GroceryList) {
  const navigate = useNavigate();

  return (
    <div className="w-full rounded-lg border px-3 py-2 pb-3">
      <div className="flex h-full flex-col gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <div>
            <p className="line-clamp-1">{formatIsoDateToLocale(updated_at)}</p>
          </div>

          <div className="flex h-[5.75rem] flex-col gap-1 text-sm text-muted">
            {grocery_list_recipes.slice(0, 3).map((recipe) => (
              <p key={recipe.id} className="line-clamp-1">
                {recipe.recipe?.name}
              </p>
            ))}
            {grocery_list_recipes.length > 4 ? (
              <p>And more...</p>
            ) : (
              grocery_list_recipes[3] && (
                <p className="line-clamp-1">
                  {grocery_list_recipes[3]?.recipe?.name}
                </p>
              )
            )}
          </div>
        </div>

        <div className="flex items-end justify-between">
          <p className="line-clamp-1 text-xs text-gray-400">
            {timeDiffForHumans(updated_at)}
          </p>

          <Button
            variant="secondary"
            className="px-4"
            size={"sm"}
            onClick={() => navigate(`/grocery-lists/${id}`)}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GroceryListCard;
