import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/modules/admin/services/roles/roles.service';
import { RoleForm } from '../models/role-form.models';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss'],
})
export class CreateRoleComponent extends RoleForm {
  public isPreventClickTwice = false;

  constructor(
    protected override fb: FormBuilder,
    private readonly rolesService: RolesService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {
    super(fb);
  }

  public setRole(): void {
    if (this.roleForm.invalid) return;

    this.isPreventClickTwice = true;

    this.rolesService.setRole(this.roleForm.getRawValue()).subscribe({
      next: () => {
        this.toastr.success('Se ha agregado un nuevo rol con éxito', 'Éxito');

        this.router.navigate(['/admin/roles']);
      },
      error: () => {
        this.isPreventClickTwice = false;
        this.toastr.error('Ha ocurrido un error al agregar un nuevo rol', 'Error');
      },
    });
  }
}
