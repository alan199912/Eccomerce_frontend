import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/core/models/cart.model';
import { Product } from 'src/app/core/models/product.models';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { ProductService } from '../../../../core/services/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  public product!: Product;
  public mostPopularProducts: Product[] = [];
  public isLoader = false;
  public imageSelected!: string;

  get getImages(): string[] {
    const arrImg = [];
    arrImg.push(this.product.MainProductImage.file);

    this.product.RestProductImage.files.split(',').forEach((img) => {
      arrImg.push(img);
    });
    return arrImg;
  }

  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProductById(this.activatedRoute.snapshot.params['id']);
    this.getFeaturedProducts('4');
  }

  private getProductById(id: string): void {
    this.isLoader = true;
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res.product;
        this.imageSelected = this.product.MainProductImage.file;
        this.isLoader = false;
      },
      error: () => {
        this.isLoader = false;
        this.toastr.error('Ocurrio un error!', 'Error');
      },
    });
  }

  public selectImage(image: string): void {
    this.imageSelected = image;
  }

  public addToCart(product: Product): void {
    const CartItem: CartItem = {
      id: product.id,
      quantity: 1,
    };

    this.toastr.success(`${product.name} agregado al carrito`, 'Producto agregado');

    this.cartService.setCartItem(CartItem);
  }

  private getFeaturedProducts(limit: string): void {
    this.productService.getFeaturedProducts(limit).subscribe({
      next: (data) => {
        this.mostPopularProducts = data.products;
      },
      error: (err) => {
        this.toastr.error(err, 'Error');
      },
    });
  }
}
