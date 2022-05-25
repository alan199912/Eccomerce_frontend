import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/modules/admin/services/roles/roles.service';
import { RoleForm } from '../models/role-form.models';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss'],
})
export class UpdateRoleComponent extends RoleForm implements OnInit {
  public isPreventClickTwice = false;
  private roleId: string;

  constructor(
    protected override fb: FormBuilder,
    private readonly rolesService: RolesService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super(fb);
  }

  ngOnInit(): void {
    this.roleId = this.activatedRoute.snapshot.params['id'];
    this.getRole();
  }

  public getRole(): void {
    this.rolesService.getRoleById(this.roleId).subscribe({
      next: (res) => {
        this.roleForm.patchValue({
          name: res.name,
        });
      },
      error: () => {
        this.toastr.error('Ha ocurrido un error al obtener el rol', 'Error');
      },
    });
  }

  public updateRole(): void {
    if (this.roleForm.invalid) return;

    this.isPreventClickTwice = true;

    this.rolesService.updateRole(this.roleForm.getRawValue(), this.roleId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.roleForm.reset();
        }
        this.toastr.success('Se ha editado con éxito', 'Éxito');

        this.router.navigate(['/admin/roles']);
      },
      error: () => {
        this.isPreventClickTwice = false;
        this.toastr.error('Ha ocurrido un error al editar rol', 'Error');
      },
    });
  }
}
