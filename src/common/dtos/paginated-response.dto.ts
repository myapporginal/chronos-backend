export interface PaginationMeta {
  next_url: string | null;
  back_url: string | null;
  page: number;
  max_page: number;
  latest_url: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  metadata?: PaginationMeta | null;
  total?: number;
  limit?: number;
  offset?: number;
}
