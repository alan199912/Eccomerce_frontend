import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.models';
import { Product } from 'src/app/core/models/product.models';
import { ProductService } from '../../../../../core/services/product/product.service';

@Component({
  selector: 'app-category-banner',
  templateUrl: './category-banner.component.html',
  styleUrls: ['./category-banner.component.scss'],
})
export class CategoryBannerComponent implements OnInit {
  @Input() categories: Category[] = [];
  public products: Product[] = [];
  public activeCategory = 1;

  constructor(private readonly productService: ProductService, private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.getFeaturedProductByCategoryId(1, '5');
  }

  public getFeaturedProductByCategoryId(id: number, limit: string): void {
    this.activeCategory = id;

    this.productService.getFeaturedProductByCategoryId(id, limit).subscribe({
      next: (res) => {
        this.products = res.products;
      },
      error: (error) => {
        this.toastr.error(error, 'ERROR');
      },
    });
  }
}
