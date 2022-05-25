import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutCancelComponent } from './checkout-cancel/checkout-cancel.component';
import { CheckoutCompleteComponent } from './checkout-complete/checkout-complete.component';
import { CheckoutErrorComponent } from './checkout-error/checkout-error.component';

@NgModule({
  declarations: [CheckoutCancelComponent, CheckoutCompleteComponent, CheckoutErrorComponent],
  imports: [CommonModule, CheckoutRoutingModule],
})
export class CheckoutModule {}
