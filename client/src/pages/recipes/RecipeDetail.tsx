import RecipeIngredientsCard from "@/components/RecipeIngredientsCard";
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";
import { RecipeService } from "@/services/RecipeService";
import useAuthStore from "@/store/authStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";

function RecipeDetail() {
  const { id: recipeId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { isPending, error, data } = useQuery({
    queryKey: ["recipeIngredients", { recipeId }],
    queryFn: () => RecipeService.fetchRecipeById(recipeId!),
    enabled: !!recipeId,
  });

  const [isOwnerOrAdmin, setIsOwnerOrAdmin] = useState(false);

  useEffect(() => {
    setIsOwnerOrAdmin(
      user?.id === data?.data.recipe.user_id || user?.role === "ADMIN",
    );
  }, [data, user]);

  const handleDelete = async (id: string) => {
    try {
      const { message } = await RecipeService.deleteRecipe(id);
      toast({
        description: message,
      });
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      navigate("/app/recipes");
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
            <div className="mb-2 flex items-center gap-1 leading-none md:order-last md:mt-2">
              {!isPending && <UserRound className="h-3 w-3" />}
              <div>
                <TypographyMuted className="text-xs">
                  {data?.data.recipe.user.name}
                </TypographyMuted>
              </div>
            </div>

            {isOwnerOrAdmin && (
              <>
                <Button
                  variant={"secondary"}
                  className="w-full"
                  onClick={() => navigate(`/app/recipes/${recipeId}/edit`)}
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
                        Are you sure you want to move this recipe to trash? You
                        can restore it later from the trash.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(recipeId!)}
                      >
                        Move to Trash
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}

            <Button
              variant={"outline"}
              className={`w-full border-foreground ${isOwnerOrAdmin && "md:mt-5"}`}
              onClick={() => navigate("/app/recipes")}
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
