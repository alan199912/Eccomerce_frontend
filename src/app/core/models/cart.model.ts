export interface Cart {
  items: CartItem[];
}

export interface CartItem {
  id: number;
  quantity: number;
}
