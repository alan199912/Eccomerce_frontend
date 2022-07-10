import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutCompleteComponent } from './checkout-complete/checkout-complete.component';
import { CheckoutErrorComponent } from './checkout-error/checkout-error.component';
import { CheckoutCancelComponent } from './checkout-cancel/checkout-cancel.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';

const routes: Routes = [
  { path: 'form', component: CheckoutFormComponent },
  { path: 'complete', component: CheckoutCompleteComponent },
  { path: 'error', component: CheckoutErrorComponent },
  { path: 'cancel', component: CheckoutCancelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
