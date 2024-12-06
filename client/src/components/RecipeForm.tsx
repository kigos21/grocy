import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// import { useToast } from "@/hooks/use-toast";
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

function RecipeForm() {
  // const { toast } = useToast();

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

  // const onSubmit = async (values: LoginFormValues) => {
  //   try {
  //     const { message, data } = await AuthService.login(values);
  //     setValidationErrors(undefined);
  //     login(data.user, data.token);
  //     toast({
  //       description: message,
  //     });
  //   } catch (e: unknown) {
  //     if (e instanceof AxiosError) {
  //       const errors: ValidationErrors = e.response?.data;
  //       setValidationErrors(errors);
  //       toast({
  //         variant: "destructive",
  //         description: errors.message,
  //       });
  //     } else {
  //       toast({
  //         variant: "destructive",
  //         title: "An unexpected error occured.",
  //         description: getErrorMessage(e),
  //       });
  //     }
  //   }
  // };

  const onSubmit = async (values: RecipeFormValues) => {
    console.log(values);
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
                  <Input type="file" {...field} />
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="rounded-bl-none rounded-tl-none"
                        >
                          <span className="text-muted">Unit</span>
                          <ChevronDown />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuRadioGroup>
                          <DropdownMenuRadioItem value="newest">
                            <div>Newest</div>
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="name">
                            <div>Name</div>
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          <span className="text-muted">Category</span>
                          <ChevronDown />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuRadioGroup>
                          <DropdownMenuRadioItem value="newest">
                            <div>Newest</div>
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="name">
                            <div>Name</div>
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div>
                    <Button variant={"secondary"}>
                      <X />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Ingredient button */}
            <div className="mt-2">
              <Button variant={"secondary"} className="w-full">
                <Plus />
                Add Ingredient
              </Button>
            </div>
          </div>

          <div className="pt-4 md:pt-3">
            <Button className="w-full">
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
