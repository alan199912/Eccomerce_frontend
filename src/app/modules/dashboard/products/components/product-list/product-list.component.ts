import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.models';
import { ProductService } from '../../../../../core/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() public products: Product[] = [];

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.watchProductsInSearch();
  }

  private watchProductsInSearch(): void {
    this.productService.searchProductResult$.subscribe((res) => {
      if (res.length > 0) {
        this.products = res;
      }
    });
  }
}
