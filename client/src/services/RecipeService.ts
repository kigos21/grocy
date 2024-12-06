import apiClient from "@/lib/apiClient";
import { RecipeFormValues } from "@/types/zod";

export class RecipeService {
  static async fetchRecipes(sort: string, q: string) {
    const response = await apiClient.get("/api/recipes", {
      params: {
        sort,
        q,
      },
    });
    return response.data;
  }

  static async fetchRecipeById(id: string) {
    const response = await apiClient.get(`/api/recipes/${id}`);
    return response.data;
  }

  static async createRecipe(recipeData: RecipeFormValues) {
    const response = await apiClient.post("/api/recipes", recipeData);
    return response.data;
  }

  // static async updateRecipe(id: string, recipeData: any) {
  //   const response = await apiClient.put(`/api/recipes/${id}`, recipeData);
  //   return response.data;
  // }

  static async deleteRecipe(id: string) {
    const response = await apiClient.delete(`/api/recipes/${id}`);
    return response.data;
  }
}
