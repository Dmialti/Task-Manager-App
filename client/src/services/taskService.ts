import api from "./api";
import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskFilters,
  TasksResponse,
  TaskStats,
  PriorityStats,
  BulkUpdateRequest,
  BulkDeleteRequest,
} from "./types";

export class TaskService {
  static async getAllTasks(filters: TaskFilters = {}): Promise<TasksResponse> {
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });

      const response = await api.get<TasksResponse>(`/tasks?${params}`);
      return response.data;
    } catch (error) {
      console.error("Error getting all tasks:", error);
      throw error;
    }
  }

  static async getTaskById(id: string): Promise<Task> {
    try {
      const response = await api.get<Task>(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting task with ID ${id}:`, error);
      throw error;
    }
  }

  static async createTask(taskData: CreateTaskRequest): Promise<Task> {
    try {
      const response = await api.post<Task>("/tasks", taskData);
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  static async updateTask(
    id: string,
    taskData: UpdateTaskRequest
  ): Promise<Task> {
    try {
      const response = await api.put<Task>(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error(`Error updating task with ID ${id}:`, error);
      throw error;
    }
  }

  static async patchTask(
    id: string,
    taskData: Partial<UpdateTaskRequest>
  ): Promise<Task> {
    try {
      const response = await api.patch<Task>(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error(`Error patching task with ID ${id}:`, error);
      throw error;
    }
  }

  static async deleteTask(id: string): Promise<void> {
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      console.error(`Error deleting task with ID ${id}:`, error);
      throw error;
    }
  }

  static async toggleTaskComplete(id: string): Promise<Task> {
    try {
      const response = await api.put<Task>(`/tasks/${id}/toggle`);
      return response.data;
    } catch (error) {
      console.error(`Error toggling task completion with ID ${id}:`, error);
      throw error;
    }
  }

  static async completeTask(id: string): Promise<Task> {
    try {
      const response = await api.put<Task>(`/tasks/${id}/complete`);
      return response.data;
    } catch (error) {
      console.error(`Error completing task with ID ${id}:`, error);
      throw error;
    }
  }

  static async incompleteTask(id: string): Promise<Task> {
    try {
      const response = await api.put<Task>(`/tasks/${id}/incomplete`);
      return response.data;
    } catch (error) {
      console.error(`Error marking task as incomplete with ID ${id}:`, error);
      throw error;
    }
  }

  static async duplicateTask(id: string): Promise<Task> {
    try {
      const response = await api.post<Task>(`/tasks/${id}/duplicate`);
      return response.data;
    } catch (error) {
      console.error(`Error duplicating task with ID ${id}:`, error);
      throw error;
    }
  }

  static async bulkCreateTasks(tasks: CreateTaskRequest[]): Promise<Task[]> {
    try {
      const response = await api.post<Task[]>("/tasks/bulk", { tasks });
      return response.data;
    } catch (error) {
      console.error("Error bulk creating tasks:", error);
      throw error;
    }
  }

  static async bulkUpdateTasks(
    bulkUpdate: BulkUpdateRequest
  ): Promise<{ message: string; modifiedCount: number }> {
    try {
      const response = await api.put<{
        message: string;
        modifiedCount: number;
      }>("/tasks/bulk", bulkUpdate);
      return response.data;
    } catch (error) {
      console.error("Error bulk updating tasks:", error);
      throw error;
    }
  }

  static async bulkDeleteTasks(
    bulkDelete: BulkDeleteRequest
  ): Promise<{ message: string; deletedCount: number }> {
    try {
      const response = await api.delete<{
        message: string;
        deletedCount: number;
      }>("/tasks/bulk", { data: bulkDelete });
      return response.data;
    } catch (error) {
      console.error("Error bulk deleting tasks:", error);
      throw error;
    }
  }

  static async getTaskStats(): Promise<TaskStats> {
    try {
      const response = await api.get<TaskStats>("/tasks/stats/overview");
      return response.data;
    } catch (error) {
      console.error("Error getting task stats:", error);
      throw error;
    }
  }

  static async getPriorityStats(): Promise<PriorityStats[]> {
    try {
      const response = await api.get<PriorityStats[]>("/tasks/stats/priority");
      return response.data;
    } catch (error) {
      console.error("Error getting priority stats:", error);
      throw error;
    }
  }

  static async getRecentTasksCount(
    days: number = 7
  ): Promise<{ count: number; days: number }> {
    try {
      const response = await api.get<{ count: number; days: number }>(
        `/tasks/stats/recent?days=${days}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting recent tasks count:", error);
      throw error;
    }
  }

  static async getOverdueTasks(): Promise<Task[]> {
    try {
      const response = await api.get<Task[]>("/tasks/overdue");
      return response.data;
    } catch (error) {
      console.error("Error getting overdue tasks:", error);
      throw error;
    }
  }

  static async getTasksByDateRange(
    start: string,
    end: string
  ): Promise<Task[]> {
    try {
      const response = await api.get<Task[]>(
        `/tasks/due-range?start=${start}&end=${end}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting tasks by date range:", error);
      throw error;
    }
  }

  static async getTasksByPriority(
    priority: "low" | "medium" | "high" | "urgent"
  ): Promise<Task[]> {
    try {
      const response = await api.get<Task[]>(`/tasks/priority/${priority}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting tasks by priority ${priority}:`, error);
      throw error;
    }
  }
}

export default TaskService;
