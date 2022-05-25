import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentAdminComponent } from './content-admin/content-admin.component';
import { ReturnComponent } from './return/return.component';
import { TableAdminComponent } from './table-admin/table-admin.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ContentAdminComponent, ReturnComponent, TableAdminComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [ContentAdminComponent, ReturnComponent, TableAdminComponent],
})
export class AdminComponentsModule {}
