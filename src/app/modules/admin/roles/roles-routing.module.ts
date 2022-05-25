import { UpdateRoleComponent } from './update-role/update-role.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles.component';
import { CreateRoleComponent } from './create-role/create-role.component';

const routes: Routes = [
  { path: '', component: RolesComponent },
  { path: 'create', component: CreateRoleComponent },
  { path: 'update/:id', component: UpdateRoleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
