import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/core/models/cart.model';
import { Product } from 'src/app/core/models/product.models';
import { CartService } from 'src/app/core/services/cart/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() public product: Product;

  constructor(private readonly cartService: CartService, private readonly toastr: ToastrService) {}

  public addProductToCart(product: Product): void {
    const CartItem: CartItem = {
      id: product.id,
      quantity: 1,
    };

    this.toastr.success(`${product.name} agregado al carrito`, 'Producto agregado');

    this.cartService.setCartItem(CartItem);
  }
}
