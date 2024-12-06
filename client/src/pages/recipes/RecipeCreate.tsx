import RecipeForm from "@/components/RecipeForm";
import { TypographyH2 } from "@/components/ui/typography";

function RecipeCreate() {
  return (
    <div className="mx-auto max-w-screen-md p-4">
      <div className="flex flex-col gap-2">
        <TypographyH2>Whip up a recipe!</TypographyH2>

        <RecipeForm />
      </div>
    </div>
  );
}

export default RecipeCreate;
