export interface RepoResponse<T> {
    success: boolean;
    errors: string;
    data: T;
  }