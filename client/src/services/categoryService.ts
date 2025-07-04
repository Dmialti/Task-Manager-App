import api from "./api";
import type {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "./types";

export class CategoryService {
  static async getAllCategories(): Promise<Category[]> {
    try {
      const response = await api.get<Category[]>("/categories");
      return response.data;
    } catch (error) {
      console.error("Error getting all categories:", error);
      throw error;
    }
  }

  static async getCategoryById(id: string): Promise<Category> {
    try {
      const response = await api.get<Category>(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting category with ID ${id}:`, error);
      throw error;
    }
  }

  static async createCategory(
    categoryData: CreateCategoryRequest
  ): Promise<Category> {
    try {
      const response = await api.post<Category>("/categories", categoryData);
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }

  static async updateCategory(
    id: string,
    categoryData: UpdateCategoryRequest
  ): Promise<Category> {
    try {
      const response = await api.put<Category>(
        `/categories/${id}`,
        categoryData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating category with ID ${id}:`, error);
      throw error;
    }
  }

  static async deleteCategory(id: string): Promise<void> {
    try {
      await api.delete(`/categories/${id}`);
    } catch (error) {
      console.error(`Error deleting category with ID ${id}:`, error);
      throw error;
    }
  }
}

export default CategoryService;
