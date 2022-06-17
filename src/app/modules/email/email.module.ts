import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email-routing.module';
import { VerifyEmailErrorComponent } from './verify-email-error/verify-email-error.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

@NgModule({
  declarations: [VerifyEmailComponent, VerifyEmailErrorComponent],
  imports: [CommonModule, EmailRoutingModule],
})
export class EmailModule {}
