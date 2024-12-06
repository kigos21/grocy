import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ValidationErrors } from "@/types";
import { RecipeFormValues } from "@/types/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Check, ChevronDown, Plus, X } from "lucide-react";
import { getErrorMessage } from "@/lib/utils";
import { AxiosError } from "axios";
import { RecipeService } from "@/services/RecipeService";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function RecipeForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>();

  const form = useForm<RecipeFormValues>({
    defaultValues: {
      name: "",
      recipe_image: "",
      servings: "",
      cook_time: "",
      ingredients: [
        {
          quantity: "",
          unit: "",
          name: "",
          category: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const onSubmit = async (values: RecipeFormValues) => {
    console.log(JSON.stringify(values, null, 2));
    try {
      const { message } = await RecipeService.createRecipe(values);
      setValidationErrors(undefined);
      toast({
        description: message,
      });
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      navigate("/recipes");
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof AxiosError) {
        const errors: ValidationErrors = e.response?.data;
        setValidationErrors(errors);
        toast({
          variant: "destructive",
          description: errors.message,
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

  return (
    <div className="rounded-md md:border md:p-4 md:pb-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {validationErrors?.errors.name &&
                  validationErrors?.errors.name.map((error) => (
                    <FormMessage key={error}>{error}</FormMessage>
                  ))}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recipe_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe Image (optional)</FormLabel>
                <FormControl>
                  <Input type="file" {...field} className="border-dashed" />
                </FormControl>
                {validationErrors?.errors.recipe_image &&
                  validationErrors?.errors.recipe_image.map((error) => (
                    <FormMessage key={error}>{error}</FormMessage>
                  ))}
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="servings"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Servings</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  {validationErrors?.errors.servings &&
                    validationErrors?.errors.servings.map((error) => (
                      <FormMessage key={error}>{error}</FormMessage>
                    ))}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cook_time"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Cook Time (minutes)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  {validationErrors?.errors.cook_time &&
                    validationErrors?.errors.cook_time.map((error) => (
                      <FormMessage key={error}>{error}</FormMessage>
                    ))}
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormLabel>Ingredients</FormLabel>

            <div className="flex flex-col gap-2">
              {/* Map each ingredient */}
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-2 md:flex-row">
                  {/* Quantity & unit, and name fields */}
                  <div className="flex flex-1 gap-2">
                    <div className="flex basis-7/12 sm:basis-1/2">
                      <FormField
                        control={form.control}
                        name={`ingredients.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Quantity"
                                className="rounded-br-none rounded-tr-none border-r-0"
                                {...field}
                              />
                            </FormControl>
                            {validationErrors?.errors[
                              `ingredients.${index}.quantity`
                            ] &&
                              validationErrors?.errors[
                                `ingredients.${index}.quantity`
                              ].map((error) => (
                                <FormMessage key={error}>{error}</FormMessage>
                              ))}
                          </FormItem>
                        )}
                      />
                      <div className="flex flex-col gap-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              className="rounded-bl-none rounded-tl-none"
                            >
                              {form.watch(`ingredients.${index}.unit`) ||
                                "Unit"}
                              <ChevronDown />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent>
                            <DropdownMenuRadioGroup
                              value={form.watch(`ingredients.${index}.unit`)}
                              onValueChange={(value) =>
                                form.setValue(
                                  `ingredients.${index}.unit`,
                                  value,
                                )
                              }
                            >
                              {/* g,kg,ml,l,cup,tbsp,tsp,piece */}
                              <DropdownMenuRadioItem value="g">
                                <div>g</div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="kg">
                                <div>kg</div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="ml">
                                <div>ml</div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="l">
                                <div>l</div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="cup">
                                <div>cup</div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="tbsp">
                                <div>tbsp</div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="tsp">
                                <div>tsp</div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="piece">
                                <div>piece</div>
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {validationErrors?.errors[
                          `ingredients.${index}.unit`
                        ] &&
                          validationErrors?.errors[
                            `ingredients.${index}.unit`
                          ].map((error) => (
                            <FormMessage className="pl-1" key={error}>
                              {error}
                            </FormMessage>
                          ))}
                      </div>
                    </div>
                    <div className="flex-1 basis-5/12 sm:basis-1/2">
                      <FormField
                        control={form.control}
                        name={`ingredients.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Ingredient"
                                className=""
                                {...field}
                              />
                            </FormControl>
                            {validationErrors?.errors[
                              `ingredients.${index}.name`
                            ] &&
                              validationErrors?.errors[
                                `ingredients.${index}.name`
                              ].map((error) => (
                                <FormMessage key={error}>{error}</FormMessage>
                              ))}
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  {/* Category and Remove button */}
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="flex flex-col gap-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between"
                            >
                              <span className="capitalize">
                                {form.watch(`ingredients.${index}.category`) ||
                                  "Category"}
                              </span>
                              <ChevronDown />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {/* produce,meat & seafood,dairy & eggs,baking goods,grains pasta & rice,condiments & spices,frozen,snacks & sweets,beverages,canned & jarred,others */}
                            <DropdownMenuRadioGroup
                              value={form.watch(
                                `ingredients.${index}.category`,
                              )}
                              onValueChange={(value) =>
                                form.setValue(
                                  `ingredients.${index}.category`,
                                  value,
                                )
                              }
                            >
                              <DropdownMenuRadioItem value="produce">
                                <div>Produce</div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="meat & seafood">
                                <div>Meat & Seafood</div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="dairy & eggs">
                                <div>Dairy & Eggs</div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="baking goods">
                                <div>Baking Goods</div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="grains pasta & rice">
                                <div>Grains, Pasta, & Rice</div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="condiments & spices">
                                <div>Condiments & Spices</div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="frozen">
                                <div>Frozen</div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="snacks & sweets">
                                <div>Snacks & Sweets</div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="beverages">
                                <div>Beverages</div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="canned & jarred">
                                <div>Canned & Jarred</div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="others">
                                <div>Others</div>
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {validationErrors?.errors[
                          `ingredients.${index}.category`
                        ] &&
                          validationErrors?.errors[
                            `ingredients.${index}.category`
                          ].map((error) => (
                            <FormMessage key={error}>{error}</FormMessage>
                          ))}
                      </div>
                    </div>
                    <div>
                      <Button
                        variant={"secondary"}
                        type="button"
                        onClick={() => remove(index)}
                      >
                        <X />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Ingredient button */}
            <div className="mt-2">
              <Button
                variant={"secondary"}
                className="w-full"
                type="button"
                onClick={() =>
                  append({ quantity: "", unit: "", name: "", category: "" })
                }
              >
                <Plus />
                Add Ingredient
              </Button>
            </div>
          </div>

          <div className="pt-4 md:pt-3">
            <Button className="w-full" type="submit">
              <Check />
              Save Recipe
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default RecipeForm;
