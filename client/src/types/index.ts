// Response Types
export interface ValidationErrors {
  message: string;
  errors: {
    [key: string]: string[];
  };
}

export interface ApiResponse<T> {
  status: "success" | "fail";
  message: string;
  data: T;
  errors: string[];
  timestamp: string;
}

export interface LoginResponseData {
  user: User;
  token: string;
}

// Data Types
export interface User {
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface Recipe {
  id: number;
  user_id: number;
  name: string;
  image_path: string;
  servings: number;
  cook_time: number;
  created_at: string;
  updated_at: string;
}

export interface DeleteRecipe {
  id: number;
  user_id: number;
  name: string;
  image_path: string;
  servings: number;
  cook_time: number;
  deleted_at: string;
}

export interface Grocery {
  id: number;
  user_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface RecipeIngredient {
  id: number;
  recipe_id: number;
  quantity: number;
  unit: string;
  name: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface RecipeWithIngredients extends Recipe {
  recipe_ingredients: RecipeIngredient[];
}
