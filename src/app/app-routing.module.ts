import { AdminGuard } from './core/guard/admin/admin.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth/auth.guard';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthComponent } from './modules/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'email',
    loadChildren: () => import('./modules/email/email.module').then((m) => m.EmailModule),
  },
  {
    path: 'unsubscribe',
    loadChildren: () =>
      import('./modules/unsubscribe/unsubscribe.module').then((m) => m.UnsubscribeModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canLoad: [AuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'admin',
    canLoad: [AdminGuard],
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
