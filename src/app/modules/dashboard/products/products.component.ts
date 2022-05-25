import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter, Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/core/models/product.models';
import { ProductService } from '../../../core/services/product/product.service';

const INITIAL_PRODUCT_LIST = 0;
const NUMBER_PRODUCTS_TO_DISPLAY = 8;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  public isLoadingProducts = false;
  public page = 'page';
  public pageId!: number | string;
  public pagination!: number;
  public paginationFromUrl = 0;
  private onDestroy$: Subject<void> = new Subject();

  get getPagination(): number[] {
    return Array.from(
      { length: Math.ceil(this.pagination / NUMBER_PRODUCTS_TO_DISPLAY) },
      (v, k) => k + 1
    );
  }

  constructor(
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getDataDependingOnUrl();

    this.router.events
      .pipe(
        takeUntil(this.onDestroy$.asObservable()),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe({
        next: (event: NavigationEnd) => {
          const typePage = event.url.split('/')[3];
          this.paginationFromUrl = +event.url.split('/')[5] | 0;

          if (!isNaN(this.paginationFromUrl)) {
            if (typePage === 'category') {
              this.page = typePage;
              this.pageId = +event.url.split('/')[4];
              this.getProductsByCategory(this.pageId, this.paginationFromUrl - 1);
              return;
            }

            if (typePage === 'filter') {
              this.page = 'filter';
              this.pageId = event.url.split('/')[4];
              this.getProductsListSortBy(this.pageId, this.paginationFromUrl - 1);
              return;
            }

            this.paginationFromUrl = +event.url.split('/')[4] | 0;
            this.page = 'page';
            this.pageId = null;
            this.getProductsList(this.paginationFromUrl - 1);
          }
        },
      });
  }

  private getDataDependingOnUrl() {
    if (this.activatedRoute.children.length > 0) {
      this.activatedRoute.children.forEach((child) => {
        if (child.params['_value'].category) {
          this.page = 'category';
          this.pageId = +child.params['_value'].category;
          this.getProductsByCategory(this.pageId, child.params['_value'].page - 1);
          return;
        }

        this.paginationFromUrl = +child.params['_value'].page;
        this.getProductsList(child.params['_value'].page - 1);
      });
      return;
    }
  }

  private getProductsList(page: number): void {
    this.isLoadingProducts = true;
    this.productService.getProductsListPagination(page, NUMBER_PRODUCTS_TO_DISPLAY).subscribe({
      next: (res: any) => {
        this.products = res.products;
        this.pagination = res.totalCountProducts;
        this.isLoadingProducts = false;
      },
      error: (err: any) => {
        this.isLoadingProducts = false;
        this.toastr.error(err, 'ERROR');
      },
    });
  }

  private getProductsByCategory(id: number, page: number): void {
    this.productService
      .getProductsListByCategoryIdPagination(id, page, NUMBER_PRODUCTS_TO_DISPLAY)
      .subscribe({
        next: (res: any) => {
          this.products = res.products;
          this.pagination = res.totalCountProducts;
        },
        error: (err: any) => {
          this.toastr.error(err, 'ERROR');
        },
      });
  }

  public getProductsListSortBy(sortBy: string, page?: number): void {
    if (sortBy === 'INITIAL') {
      this.getProductsList(INITIAL_PRODUCT_LIST);
      return;
    }

    this.productService.getProductsListSortBy(sortBy, page, NUMBER_PRODUCTS_TO_DISPLAY).subscribe({
      next: (res: any) => {
        this.products = res.products;
        this.pagination = res.totalCountProducts;
      },
      error: (err: any) => {
        this.toastr.error(err, 'ERROR');
      },
    });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
