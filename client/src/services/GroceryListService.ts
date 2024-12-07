import apiClient from "@/lib/apiClient";
import { GroceryListFormValues } from "@/types/zod";

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

  static async createGroceryList(groceryListData: GroceryListFormValues) {
    const response = await apiClient.post(
      "/api/grocery-lists",
      groceryListData,
    );
    return response.data;
  }

  static async updateGroceryList(
    id: string,
    groceryListData: GroceryListFormValues,
  ) {
    const response = await apiClient.put(
      `/api/grocery-lists/${id}`,
      groceryListData,
    );
    return response.data;
  }

  static async deleteGroceryList(id: string) {
    const response = await apiClient.delete(`/api/grocery-lists/${id}`);
    return response.data;
  }
}
