import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'my-profile' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
