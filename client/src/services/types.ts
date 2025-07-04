export interface Tag {
  _id: string;
  name: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTagRequest {
  name: string;
  color?: string;
}

export interface UpdateTagRequest {
  name?: string;
  color?: string;
}

export interface Category {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest {
  name?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high" | "urgent";
  category?: Category;
  tags?: Tag[];
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
  completedAt?: string;
  subtasks?: Subtask[];
  recurrence?: TaskRecurrence;
  notes?: TaskNote[];
  isArchived?: boolean;
  isDeleted?: boolean;
  isOverdue?: boolean;
  daysUntilDue?: number;
}

export interface Subtask {
  _id?: string;
  title: string;
  completed: boolean;
  createdAt?: string;
}

export interface TaskRecurrence {
  enabled: boolean;
  pattern?: "daily" | "weekly" | "monthly" | "yearly";
  interval?: number;
  endDate?: string;
}

export interface TaskNote {
  _id?: string;
  content: string;
  createdAt?: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  category?: string;
  tags?: string[];
  dueDate?: string;
  subtasks?: Omit<Subtask, "_id" | "createdAt">[];
  recurrence?: TaskRecurrence;
  notes?: Omit<TaskNote, "_id" | "createdAt">[];
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: "low" | "medium" | "high" | "urgent";
  category?: string;
  tags?: string[];
  dueDate?: string;
  subtasks?: Subtask[];
  recurrence?: TaskRecurrence;
  notes?: TaskNote[];
  isArchived?: boolean;
}

export interface TaskFilters {
  filter?: "active" | "completed";
  page?: number;
  limit?: number;
  sort?: "createdAt" | "updatedAt" | "dueDate" | "priority" | "title";
  order?: "asc" | "desc";
  search?: string;
}

export interface TasksResponse {
  tasks: Task[];
  pagination: {
    current: number;
    total: number;
    count: number;
    totalItems: number;
  };
}

export interface TaskStats {
  total: number;
  completed: number;
  active: number;
}

export interface PriorityStats {
  _id: string;
  count: number;
}

export interface BulkUpdateRequest {
  ids: string[];
  update: Partial<UpdateTaskRequest>;
}

export interface BulkDeleteRequest {
  ids: string[];
}
