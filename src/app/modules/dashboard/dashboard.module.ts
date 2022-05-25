import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ComponentsModule } from './../../shared/components/components.module';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { CartComponent } from './cart/cart.component';
import { CategoryBannerComponent } from './home/components/category-banner/category-banner.component';
import { BannerComponent } from './home/components/banner/banner.component';
import { ProductCardModule } from 'src/app/shared/components/product-card/product-card.module';
import { MostPopularProductsModule } from 'src/app/shared/components/most-popular-products/most-popular-products.module';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    CartComponent,
    CategoryBannerComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    ProductCardModule,
    MostPopularProductsModule,
  ],
  providers: [],
})
export class DashboardModule {}
