import { Product } from './product.models';

export interface Order {
  id: number;
  status: string;
  totalPrice: number;
  userId: number;
  OrderItems: OrderItems[];
  transactionId?: number;
  payerId?: number;
  payerEmail?: string;
  orderPaypal?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface BodySetOrder {
  orderItems: Product[] | Product;
  userId: number;
}

export interface ResponseOrder {
  status: string;
  link?: string;
  orders?: Order[];
}

export interface OrderItems {
  id: number;
  Product: Product;
  productId: number;
  quantity: number;
  orderOrderItems: OrderOrderItems;
}

export interface OrderOrderItems {
  OrderId: number;
  OrderItemId: number;
}
