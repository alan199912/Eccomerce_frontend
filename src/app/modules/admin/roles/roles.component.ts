import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/core/models/role.models';
import { RolesService } from 'src/app/modules/admin/services/roles/roles.service';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  public roles: Role[] = [];
  public columns: string[] = [];
  public isLoading = false;

  constructor(private readonly roleService: RolesService, private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  public getProductList(): void {
    this.isLoading = true;
    this.roleService.getRolesList().subscribe({
      next: (res) => {
        this.roles = res;
        this.roles = this.roles.map((role) => {
          return {
            ...role,
            createdAt: new Date(role.createdAt).toLocaleDateString(),
            updatedAt: new Date(role.updatedAt).toLocaleDateString(),
            deletedAt: role.deletedAt && new Date(role.deletedAt).toLocaleDateString(),
          };
        });
        this.columns = Object.keys(this.roles[0]);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  public deleteRole(id: string): void {
    this.isLoading = true;
    this.roleService.deleteRole(id).subscribe({
      next: () => {
        this.toastr.success('El rol se elimino correctamente', 'Eliminado');
        this.getProductList();
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('No se pudo eliminar el rol', 'Error');
        this.isLoading = false;
      },
    });
  }

  public restoreRole(id: string): void {
    this.isLoading = true;
    this.roleService.restoreRole(id).subscribe({
      next: () => {
        this.getProductList();
        this.toastr.success('El rol se restauro correctamente', 'Restaurado');
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('No se pudo restaurar el rol', 'Error');
        this.isLoading = false;
      },
    });
  }
}
