import apiClient from "@/lib/apiClient";

export class GroceryListService {
  static async fetchGroceryLists(sort: string) {
    const response = await apiClient.get("/api/grocery-lists", {
      params: {
        sort,
      },
    });
    return response.data;
  }

  static async fetchGroceryListById(id: string) {
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

  static async deleteGroceryList(id: string) {
    const response = await apiClient.delete(`/api/grocery-lists/${id}`);
    return response.data;
  }
}
