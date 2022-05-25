import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private CART_KEY = 'cart';
  public cart$: BehaviorSubject<Cart> = new BehaviorSubject(
    JSON.parse(localStorage.getItem(this.CART_KEY)) || []
  );
  public totalPrice$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {}

  get getCart(): Cart {
    const cartJsonString: string = localStorage.getItem(this.CART_KEY);
    const cart: Cart = JSON.parse(cartJsonString);
    return cart;
  }

  get getCartQuantity(): number {
    return JSON.parse(localStorage.getItem(this.CART_KEY)).items.length;
  }

  get getTotalPrice(): number {
    return this.totalPrice$.value;
  }

  public subscriptionCart() {
    return this.cart$.asObservable();
  }

  public initCart(): void {
    const initialCart = {
      items: [],
    };
    localStorage.setItem(this.CART_KEY, JSON.stringify(initialCart));
  }

  public setCartItem(cartItem: CartItem, updateCartItem: boolean = false): Cart {
    const cart: Cart = this.getCart;
    const cartItemExist = cart.items.find((i) => i.id === cartItem.id);

    if (cartItemExist) {
      cart.items.map((item) => {
        if (item.id === cartItem.id) {
          if (updateCartItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity = item.quantity + cartItem.quantity;
          }
        }
        return item;
      });
    } else {
      cart.items.push(cartItem);
    }

    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
    return cart;
  }

  public removeCartItem(id: number): Cart {
    const cart: Cart = this.getCart;
    const cartItemExist = cart.items.find((i) => i.id === id);

    if (cartItemExist) {
      cart.items = cart.items.filter((item) => item.id !== id);
    }

    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
    return cart;
  }

  public clearCart(): Cart {
    const cart: Cart = {
      items: [],
    };
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
    return cart;
  }
}
