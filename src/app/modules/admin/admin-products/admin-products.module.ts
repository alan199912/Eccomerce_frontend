import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProductsRoutingModule } from './admin-products-routing.module';
import { AdminProductsComponent } from './admin-products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AdminComponentsModule } from 'src/app/shared/components/admin-components/admin-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminProductsComponent, CreateProductComponent, UpdateProductComponent],
  imports: [
    CommonModule,
    AdminProductsRoutingModule,
    AdminComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminProductsModule {}
