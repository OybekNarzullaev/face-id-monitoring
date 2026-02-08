export interface APIResponse<T> {
  success: boolean;
  message: string;
  result: {
    data: T;
  };
}

export interface ListAPIResponse<T> {
  success: boolean;
  message: string;
  result: {
    data: T[];
  };
  meta: {
    currentPage: number;
    perPage: number;
    total: number;
    lastPage: number;
  };
}
