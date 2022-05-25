export interface CategoryResponse {
  status: string;
  categories?: Category[];
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
