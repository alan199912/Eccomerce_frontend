import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutCancelComponent } from './checkout-cancel/checkout-cancel.component';
import { CheckoutCompleteComponent } from './checkout-complete/checkout-complete.component';
import { CheckoutErrorComponent } from './checkout-error/checkout-error.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CheckoutCancelComponent,
    CheckoutCompleteComponent,
    CheckoutErrorComponent,
    CheckoutFormComponent,
  ],
  imports: [CommonModule, CheckoutRoutingModule, FormsModule, ReactiveFormsModule],
})
export class CheckoutModule {}
