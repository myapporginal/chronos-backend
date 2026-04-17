/**
 * Represents a single field-level validation error returned in API responses.
 */
export interface FieldError {
  field: string;
  message: string;
}

/**
 * Metadata attached to paginated list responses.
 */
export interface PaginationMetadata {
  next_url: string | null;
  back_url: string | null;
  latest_url: string | null;
  page: number;
  max_page: number;
}

/**
 * Standard envelope for every API response produced by the ResponseInterceptor.
 */
export interface ApiResponse<T> {
  status: number;
  detail: string;
  data: T | null;
  metadata: PaginationMetadata | null;
  errors: FieldError[] | null;
}

/**
 * Shape that service / controller handlers may return so the interceptor
 * can detect paginated payloads vs. plain data.
 *
 * When `total`, `limit` and `offset` are all present the interceptor will
 * build the full pagination metadata automatically.
 */
export interface ServicePayload<T> {
  detail?: string;
  data?: T;
  metadata?: PaginationMetadata | null;
  total?: number;
  limit?: number;
  offset?: number;
}
