import { Product } from './../../../core/models/product.models';
import { ProductTable } from 'src/app/core/models/product.models';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  public products: any[] = [];
  public columns: string[] = [];
  public isLoading = false;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  public getProductList(): void {
    this.isLoading = true;
    this.productService.getProductList().subscribe({
      next: (res) => {
        console.log(res);
        if (!res.products) {
          this.isLoading = false;
          return;
        }

        this.products = res.products;
        this.products = this.products.map((product: any) => {
          console.log(product.MainProductImage.file);
          return {
            ...product,
            price: product.price.toLocaleString('es-ES', {
              style: 'currency',
              currency: 'USD',
            }),
            image: product.MainProductImage.file,
            images: product.RestProductImage.files,
            category: product.Category.id,
            isFeatured: product.isFeatured ? 'Si' : 'No',
            createdAt: new Date(product.createdAt).toLocaleDateString(),
            updatedAt: new Date(product.updatedAt).toLocaleDateString(),
            deletedAt: product.deletedAt && new Date(product.deletedAt).toLocaleDateString(),
          };
        });
        console.log(this.products);
        this.columns = Object.keys(this.products[0]);
        console.log(this.columns);
        this.columns = this.columns.filter(
          (column) =>
            column !== 'mainProductImageId' &&
            column !== 'restProductImageId' &&
            column !== 'MainProductImage' &&
            column !== 'RestProductImage' &&
            column !== 'Category' &&
            column !== 'categoryId'
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
