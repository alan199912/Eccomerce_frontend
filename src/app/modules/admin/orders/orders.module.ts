import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponentsModule } from 'src/app/shared/components/admin-components/admin-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';

@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, OrdersRoutingModule, AdminComponentsModule, FormsModule, ReactiveFormsModule],
})
export class OrdersModule {}
