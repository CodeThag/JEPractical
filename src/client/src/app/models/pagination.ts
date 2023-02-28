export interface PaginationProps {
  pageNumber: number;
  totalPages: number;
  pageSize?: number; // API return 10 by default
  totalCount: number;
}
