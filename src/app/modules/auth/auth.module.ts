import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';

import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { VerifyEmailErrorComponent } from '../email/verify-email-error/verify-email-error.component';
import { VerifyEmailComponent } from '../email/verify-email/verify-email.component';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoveryPasswordComponent,
    RestorePasswordComponent,
    AuthComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
})
export class AuthModule {}
