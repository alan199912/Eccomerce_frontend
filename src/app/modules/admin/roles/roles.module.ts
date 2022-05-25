import { AdminComponentsModule } from './../../../shared/components/admin-components/admin-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RolesComponent, CreateRoleComponent, UpdateRoleComponent],
  imports: [CommonModule, RolesRoutingModule, AdminComponentsModule, FormsModule, ReactiveFormsModule],
})
export class RolesModule {}
