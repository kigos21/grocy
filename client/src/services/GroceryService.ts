import apiClient from "@/lib/apiClient";

export class GroceryService {
  static async fetchGroceries(sort: string, q: string) {
    const response = await apiClient.get("/api/grocery-lists", {
      params: {
        sort,
        q,
      },
    });
    return response.data;
  }

  static async fetchGroceryById(id: string) {
    const response = await apiClient.get(`/api/grocery-lists/${id}`);
    return response.data;
  }

  // static async createRecipe(recipeData: any) {
  //   const response = await apiClient.post("/api/recipes", recipeData);
  //   return response.data;
  // }

  // static async updateRecipe(id: string, recipeData: any) {
  //   const response = await apiClient.put(`/api/recipes/${id}`, recipeData);
  //   return response.data;
  // }

  static async deleteGrocery(id: string) {
    const response = await apiClient.delete(`/api/grocery-lists/${id}`);
    return response.data;
  }
}
