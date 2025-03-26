export interface RepoResponse<T> {
    success: boolean;
    errors: string;
    message?:string;
    data: T;
  }