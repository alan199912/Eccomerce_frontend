import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsubscribeCompletedComponent } from './unsubscribe-completed/unsubscribe-completed.component';
import { UnsubscribeErrorComponent } from './unsubscribe-error/unsubscribe-error.component';

const routes: Routes = [
  { path: 'completed', component: UnsubscribeCompletedComponent },
  { path: 'error', component: UnsubscribeErrorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnsubscribeRoutingModule {}
