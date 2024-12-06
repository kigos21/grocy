import RecipeIngredientsCard from "@/components/RecipeIngredientsCard";
import { TypographyH2 } from "@/components/ui/typography";
import { RecipeService } from "@/services/RecipeService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function RecipeDetail() {
  const { id: recipeId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["recipeIngredients", { recipeId }],
    queryFn: () => RecipeService.fetchRecipeById(recipeId!),
    enabled: !!recipeId,
  });

  const handleDelete = async (id: string) => {
    try {
      const { message } = await RecipeService.deleteRecipe(id);
      toast({
        description: message,
      });
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      navigate("/recipes");
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        // console.error(JSON.stringify(e, null, 2));
        // const error = e.response?.data;
        toast({
          variant: "destructive",
          description: JSON.stringify(e),
        });
      } else {
        toast({
          variant: "destructive",
          title: "An unexpected error occured.",
          description: getErrorMessage(e),
        });
      }
    }
  };

  if (error) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <div className="mx-auto max-w-screen-md p-4">
      <div className="flex flex-col gap-4">
        <TypographyH2>Kitchen Catalog: Your recipe index</TypographyH2>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-6">
          {isPending ? (
            <div className="flex w-full flex-col gap-4 md:col-span-4">
              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-4 w-[250px] rounded-full" />
              <Skeleton className="h-4 w-[200px] rounded-full" />
            </div>
          ) : (
            <RecipeIngredientsCard {...data.data.recipe} />
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <Button
              variant={"secondary"}
              className="w-full"
              onClick={() => navigate(`/recipes/${recipeId}/edit`)}
            >
              Edit
            </Button>

            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant={"secondary"} className="w-full">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Move {data?.data.recipe.name} to trash?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to move this recipe to trash? You can
                    restore it later from the trash.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(recipeId!)}>
                    Move to Trash
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              variant={"outline"}
              className="w-full border-foreground md:mt-5"
              onClick={() => navigate("/recipes")}
            >
              Back to Recipes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
