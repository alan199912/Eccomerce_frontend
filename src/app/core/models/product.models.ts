import { Category } from './category.models';

export interface ProductResponse {
  status: string;
  products: Product[];
  product?: Product;
  totalCountProducts?: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  richDescription: string;
  code: string;
  MainProductImage: MainProductImage;
  RestProductImage: RestProductImage;
  brand: string;
  price: number;
  countInStock: number;
  rating: number;
  isFeatured: boolean;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  Category: Category;
  quantity?: number;
}

export interface ProductTable {
  id: number;
  name: string;
  description: string;
  richDescription: string;
  code: string;
  image: string;
  images: string;
  brand: string;
  price: number | string;
  category: number;
  countInStock: number;
  rating: number;
  isFeatured: boolean | string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  quantity?: number;
}

export interface MainProductImage {
  createdAt: string;
  deletedAt: string;
  file: string;
  id: number;
  updatedAt: string;
}
export interface RestProductImage {
  createdAt: string;
  deletedAt: string;
  files: string;
  id: number;
  updatedAt: string;
}
