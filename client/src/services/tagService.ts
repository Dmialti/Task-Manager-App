import api from "./api";
import type { Tag, CreateTagRequest, UpdateTagRequest } from "./types";

export class TagService {
  static async getAllTags(): Promise<Tag[]> {
    try {
      const response = await api.get<Tag[]>("/tags");
      return response.data;
    } catch (error) {
      console.error("Error getting all tags:", error);
      throw error;
    }
  }

  static async getTagById(id: string): Promise<Tag> {
    try {
      const response = await api.get<Tag>(`/tags/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting tag with ID ${id}:`, error);
      throw error;
    }
  }

  static async createTag(tagData: CreateTagRequest): Promise<Tag> {
    try {
      const response = await api.post<Tag>("/tags", tagData);
      return response.data;
    } catch (error) {
      console.error("Error creating tag:", error);
      throw error;
    }
  }

  static async updateTag(id: string, tagData: UpdateTagRequest): Promise<Tag> {
    try {
      const response = await api.put<Tag>(`/tags/${id}`, tagData);
      return response.data;
    } catch (error) {
      console.error(`Error updating tag with ID ${id}:`, error);
      throw error;
    }
  }

  static async deleteTag(id: string): Promise<void> {
    try {
      await api.delete(`/tags/${id}`);
    } catch (error) {
      console.error(`Error deleting tag with ID ${id}:`, error);
      throw error;
    }
  }
}

export default TagService;
