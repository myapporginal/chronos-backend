/**
 * Interface for API responses
 */
export interface ApiResponse<T> {
  status: number;
  detail: string;
  data: T | null;
  errors: { field: string; message: string }[] | null;
}
