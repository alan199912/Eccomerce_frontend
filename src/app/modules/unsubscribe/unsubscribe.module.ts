import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnsubscribeRoutingModule } from './unsubscribe-routing.module';
import { UnsubscribeCompletedComponent } from './unsubscribe-completed/unsubscribe-completed.component';
import { UnsubscribeErrorComponent } from './unsubscribe-error/unsubscribe-error.component';


@NgModule({
  declarations: [
    UnsubscribeCompletedComponent,
    UnsubscribeErrorComponent
  ],
  imports: [
    CommonModule,
    UnsubscribeRoutingModule
  ]
})
export class UnsubscribeModule { }
