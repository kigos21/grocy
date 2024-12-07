import { z } from "zod";

// Login Form
export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

// Register Form
export const registerFormSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8),
  password_confirmation: z.string().min(8),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

// Recipe Form
export const ingredientSchema = z.object({
  quantity: z.string(),
  unit: z.string(),
  name: z.string(),
  category: z.string(),
});

export const recipeFormSchema = z.object({
  name: z.string(),
  image_path: z.string(),
  servings: z.string(),
  cook_time: z.string(),
  ingredients: z.array(ingredientSchema),
});

export type RecipeFormValues = z.infer<typeof recipeFormSchema>;
