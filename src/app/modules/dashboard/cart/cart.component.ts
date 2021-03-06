import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/core/models/cart.model';
import { Product } from 'src/app/core/models/product.models';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { ProductService } from '../../../core/services/product/product.service';
import { OrderService } from '../services/order/order.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectFeatureUser } from 'src/app/state/selectors/user.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public cartItems: CartItem[] = [];
  public products: Product[] = [];
  public quantity: number[] = [];
  public userId!: number;

  get totalPrice(): number {
    return this.cartItems.reduce((acc, item) => {
      return acc + this.quantity[item.id];
    }, 0);
  }

  constructor(
    public readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.getCartItems();
    this.getUser();
  }

  private getCartItems(): void {
    this.cartService.subscriptionCart().subscribe({
      next: (cart) => {
        this.cartItems = cart?.items ?? [];
      },
      error: (err) => {
        this.toastr.error('Error al cargar el carrito', 'ERROR');
      },
    });

    const ids = this.cartItems.map((item) => item.id);

    if (ids.length === 0) {
      this.products = [];
      return;
    }

    this.getProductById(ids.toString(), this.cartItems);
  }

  private getUser(): void {
    this.store.select(selectFeatureUser).subscribe((user) => {
      this.userId = user.id;
    });
  }

  public trackByIndex(index: number, obj: any): any {
    return index;
  }

  private getProductById(id: string, arr: CartItem[]): void {
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.products = res.products || [res.product];
        this.products.forEach((product) => {
          product.quantity = arr.find((item) => item.id === product.id).quantity;
          this.quantity[product.id] = product.price * product.quantity;
        });
      },
      error: (err) => {
        this.toastr.error('Error al obtener productos', 'ERROR');
      },
    });
  }

  public productQuantity(event, product: Product): void {
    if (+event.value < 0) {
      event.value = product.quantity;
    }

    product.quantity = +event.value;
    this.quantity[product.id] = product.price * +event.value;

    const total = this.cartItems.reduce((acc, item) => {
      return acc + this.quantity[item.id];
    }, 0);

    this.cartService.totalPrice$.next(total);

    const CartItem: CartItem = {
      id: product.id,
      quantity: product.quantity,
    };

    this.cartService.setCartItem(CartItem, true);
  }

  public removeItem(id: number): void {
    this.cartService.removeCartItem(id);
    this.getCartItems();
  }

  public goToPayment(): void {
    //todo: add STRIPE
    const order = {
      orderItems: this.products,
      userId: this.userId,
    };

    this.orderService.order$.next(order);
    this.router.navigate(['/dashboard/checkout/form']);
    // this.orderService.setOrder(order).subscribe({
    //   next: (res) => {
    //     window.location.href = res.link;
    //     this.cartService.clearCart();
    //   },
    //   error: (err) => {
    //     this.toastr.error('Error al crear el pedido', 'ERROR');
    //   },
    // });
  }
}
