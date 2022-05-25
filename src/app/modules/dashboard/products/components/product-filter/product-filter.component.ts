import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CategoryService } from '../../../../../core/services/category/category.service';
import { Category } from 'src/app/core/models/category.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  public categories: Category[] = [];
  public toggler = false;
  @Output() public getProductsListSortBy = new EventEmitter<string>();

  constructor(
    private readonly categoryService: CategoryService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getCategoriesList();
  }

  private getCategoriesList(): void {
    this.categoryService.getCategoriesList().subscribe({
      next: (res: any) => {
        this.categories = res.categories;
      },
      error: (err: any) => {
        this.toastr.error(err, 'ERROR');
      },
    });
  }

  public filterSort(event): void {
    if (event.value !== 'INITIAL') {
      this.router.navigateByUrl('/dashboard/products/filter/' + event.value.toLowerCase() + '/1');
    }

    switch (event.value) {
      case 'featured':
        this.getProductsListSortBy.emit('featured');
        break;
      case 'ASC':
        this.getProductsListSortBy.emit('ASC');
        break;
      case 'DESC':
        this.getProductsListSortBy.emit('DESC');
        break;
      default:
        this.getProductsListSortBy.emit('INITIAL');
        this.router.navigateByUrl('/dashboard/products/page/1');
        break;
    }
  }
}
