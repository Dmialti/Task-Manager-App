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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
