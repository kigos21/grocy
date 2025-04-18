import GroceryListItemsCard from "@/components/GroceryListItemsCard";
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
import { TypographyH2 } from "@/components/ui/typography";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";
import { GroceryListService } from "@/services/GroceryListService";
import { GroceryListRecipe } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";

function GroceryListDetail() {
  const { id: groceryListId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["groceryListItems", { groceryListId }],
    queryFn: () => GroceryListService.fetchGroceryListById(groceryListId!),
    enabled: !!groceryListId,
  });

  const handleDelete = async (id: string) => {
    try {
      const { message } = await GroceryListService.deleteGroceryList(id);
      toast({
        description: message,
      });
      queryClient.invalidateQueries({ queryKey: ["groceryLists"] });
      navigate("/app/grocery-lists");
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
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
        <TypographyH2>Ta-da! Here's your grocery list!</TypographyH2>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-6">
          {isPending ? (
            <div className="flex w-full flex-col gap-4 md:col-span-4">
              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-4 w-[250px] rounded-full" />
              <Skeleton className="h-4 w-[200px] rounded-full" />
            </div>
          ) : (
            <GroceryListItemsCard {...data.data.grocery_list} />
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <Button
              variant={"secondary"}
              className="w-full"
              onClick={() =>
                navigate(`/app/grocery-lists/${groceryListId}/edit`)
              }
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
                  <AlertDialogTitle>Move this list to trash?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to move this grocery list to trash?
                    You can restore it later from the trash.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(groceryListId!)}
                  >
                    Move to Trash
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              variant={"outline"}
              className="w-full border-foreground md:mt-5"
              onClick={() => navigate("/app/grocery-lists")}
            >
              Back to Home
            </Button>

            {isPending ? (
              <div>
                <Skeleton className="mt-1 h-20 w-full" />
              </div>
            ) : (
              <div className="mt-1 rounded-md border px-3 py-2">
                {data?.data.grocery_list.grocery_list_recipes.map(
                  (item: GroceryListRecipe, index: number) => (
                    <p key={index} className="line-clamp-1 text-sm text-muted">
                      {item.quantity}x {item.recipe?.name}
                    </p>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroceryListDetail;
