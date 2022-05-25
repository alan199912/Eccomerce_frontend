import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/core/models/cart.model';
import { Product } from 'src/app/core/models/product.models';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-cart-menu',
  templateUrl: './cart-menu.component.html',
  styleUrls: ['./cart-menu.component.scss'],
})
export class CartMenuComponent implements OnChanges {
  @Input() public cartQuantity: number;
  @Input() public cartItems: CartItem[];
  public products: Product[] = [];

  constructor(
    private readonly productService: ProductService,
    public readonly cartService: CartService,
    private readonly toastr: ToastrService
  ) {}

  public ngOnChanges(changes: SimpleChanges) {
    const ids = changes['cartItems'].currentValue.map((item) => item.id);

    if (ids.length === 0) {
      this.products = [];
      return;
    }

    this.getProductById(ids.toString(), changes['cartItems'].currentValue);
  }

  private getProductById(id: string, arr: CartItem[]): void {
    let total = 0;
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.products = res.products || [res.product];
        this.products.forEach((product) => {
          product.quantity = arr.find((item) => item.id === product.id).quantity;
          this.cartService.totalPrice$.next((total += product.price * product.quantity));
        });
      },
      error: (err) => {
        this.toastr.error('Error al obtener productos', 'ERROR');
      },
    });
  }

  public removeItem(id: number): void {
    this.cartService.removeCartItem(id);
  }
}
