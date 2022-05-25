import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { VerifyEmailComponent } from './email/verify-email/verify-email.component';
import { VerifyEmailErrorComponent } from './email/verify-email-error/verify-email-error.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recovery-password', component: RecoveryPasswordComponent },
  { path: 'restore-password/:encodeToken', component: RestorePasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'verify-email-error', component: VerifyEmailErrorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
