import apiClient from "@/lib/apiClient";
import { RecipeFormValues } from "@/types/zod";

export class RecipeService {
  static async fetchRecipes(sort: string, q: string, page: string = "1") {
    const response = await apiClient.get("/api/recipes", {
      params: {
        sort,
        q,
        page,
      },
    });
    return response.data;
  }

  static async fetchRecipeById(id: string) {
    const response = await apiClient.get(`/api/recipes/${id}`);
    return response.data;
  }

  static async createRecipe(recipeData: RecipeFormValues) {
    const processedData = {
      ...recipeData,
      ingredients: recipeData.ingredients.map((ingredient) => ({
        ...ingredient,
        name: ingredient.name.toLowerCase(),
      })),
    };

    const response = await apiClient.post("/api/recipes", processedData);
    return response.data;
  }

  static async updateRecipe(id: string, recipeData: RecipeFormValues) {
    const processedData = {
      ...recipeData,
      ingredients: recipeData.ingredients.map((ingredient) => ({
        ...ingredient,
        name: ingredient.name.toLowerCase(),
      })),
    };

    const response = await apiClient.put(`/api/recipes/${id}`, processedData);
    return response.data;
  }

  static async deleteRecipe(id: string) {
    const response = await apiClient.delete(`/api/recipes/${id}`);
    return response.data;
  }

  static async fetchTrashed(page: string = "1") {
    const response = await apiClient.get("/api/trash/recipes", {
      params: {
        page,
      },
    });
    return response.data;
  }

  static async restoreRecipe(id: string) {
    const response = await apiClient.patch(`/api/trash/recipes/${id}`);
    return response.data;
  }

  static async forceDeleteRecipe(id: string) {
    const response = await apiClient.delete(`/api/trash/recipes/${id}`);
    return response.data;
  }
}
