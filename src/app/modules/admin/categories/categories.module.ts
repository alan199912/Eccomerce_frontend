import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { AdminComponentsModule } from 'src/app/shared/components/admin-components/admin-components.module';

@NgModule({
  declarations: [CategoriesComponent, CreateCategoryComponent, UpdateCategoryComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    AdminComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CategoriesModule {}
