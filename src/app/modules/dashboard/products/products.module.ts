import { ProductCardModule } from './../../../shared/components/product-card/product-card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MostPopularProductsModule } from 'src/app/shared/components/most-popular-products/most-popular-products.module';
import { ProductPaginatorComponent } from './components/product-paginator/product-paginator.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';

@NgModule({
  declarations: [ProductsComponent, ProductListComponent, ProductDetailComponent, ProductPaginatorComponent, ProductFilterComponent],
  imports: [CommonModule, ProductsRoutingModule, ProductCardModule, MostPopularProductsModule],
})
export class ProductsModule {}
