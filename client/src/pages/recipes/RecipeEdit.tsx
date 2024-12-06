import RecipeFormEdit from "@/components/RecipeFormEdit";
import { TypographyH2 } from "@/components/ui/typography";

function RecipeEdit() {
  return (
    <div className="mx-auto max-w-screen-md p-4">
      <div className="flex flex-col gap-2">
        <TypographyH2>Edit the magic in your recipe!</TypographyH2>

        <RecipeFormEdit />
      </div>
    </div>
  );
}

export default RecipeEdit;
