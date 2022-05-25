import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [ProfileComponent, MyProfileComponent, OrderHistoryComponent, ResetPasswordComponent],
  imports: [CommonModule, ProfileRoutingModule, FormsModule, ReactiveFormsModule],
})
export class ProfileModule {}
