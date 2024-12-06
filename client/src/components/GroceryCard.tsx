import { Button } from "./ui/button";
import { TypographyMuted } from "./ui/typography";
import { Grocery } from "@/types";
import { useNavigate } from "react-router-dom";

function GroceryCard({ id, name, updated_at }: Grocery) {
  const navigate = useNavigate();

  return (
    <div className="w-60 rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-2 space-y-3 p-4">
        <div className="flex flex-col gap-2 space-y-2">
          <div className="">
            <p className="text-lg font-medium text-gray-900">{updated_at}</p>
          </div>
          <TypographyMuted>
            <div className="space-y-1">
              <p>{name}</p>
              <p>{name}</p>
              <p>{name}</p>
              <p>{name}</p>
            </div>
          </TypographyMuted>
        </div>
        <div className="block text-right">
          <Button
            variant="secondary"
            className="w-20"
            onClick={() => navigate(`/grocery-lists/${id}`)}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GroceryCard;
