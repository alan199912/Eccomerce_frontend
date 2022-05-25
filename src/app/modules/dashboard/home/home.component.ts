import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/core/models/category.models';
import { Product } from 'src/app/core/models/product.models';
import { CategoryService } from '../../../core/services/category/category.service';
import { ProductService } from '../../../core/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public categories: Category[] = [];
  public latestProductsByCategories: Product[] = [];
  public mostPopularProducts: Product[] = [];

  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategoriesList();
    this.getFeaturedProducts('4');
    this.getLatestProductInEachCategoryByLimit();
  }

  private getLatestProductInEachCategoryByLimit(): void {
    this.productService.getLatestProductInEachCategoryByLimit('2').subscribe({
      next: (res) => {
        this.latestProductsByCategories = res.products;
      },
      error: (err) => {
        this.toastr.error(err, 'Error');
      },
    });
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

  private getCategoriesList(): void {
    this.categoryService.getCategoriesList().subscribe({
      next: (res) => {
        this.categories = res.categories;
      },
      error: (error) => {
        this.toastr.error(error, 'ERROR');
      },
    });
  }
}
