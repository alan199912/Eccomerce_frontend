import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MostPopularProductsComponent } from './most-popular-products.component';
import { ProductCardModule } from '../product-card/product-card.module';

@NgModule({
  declarations: [MostPopularProductsComponent],
  imports: [CommonModule, RouterModule, HttpClientModule, ProductCardModule],
  exports: [MostPopularProductsComponent],
})
export class MostPopularProductsModule {}
