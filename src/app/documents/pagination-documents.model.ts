import { Documents } from './documents.model';

export interface PaginationDocuments{
  pageSize: number;
  page: number;
  sort: string;
  sortDirection: string;
  pagesQuantity: number;
  data: Documents[];
  filterValue: {};
  totalRows: number;
  }
