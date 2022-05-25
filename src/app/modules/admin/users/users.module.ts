import { AdminComponentsModule } from './../../../shared/components/admin-components/admin-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, CreateUserComponent, UpdateUserComponent],
  imports: [CommonModule, UsersRoutingModule, AdminComponentsModule, FormsModule, ReactiveFormsModule],
})
export class UsersModule {}
