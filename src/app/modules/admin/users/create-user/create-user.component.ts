import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { COUNTRIES } from 'src/app/core/helpers/countries';
import { Role } from 'src/app/core/models/role.models';
import { UserService } from 'src/app/core/services/service/user.service';
import { RolesService } from '../../services/roles/roles.service';
import { UserForm } from '../models/user-form.models';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent extends UserForm implements OnInit {
  public countries = COUNTRIES;
  public isPreventClickTwice = false;
  public roles: Role[] = [];

  get getCountry() {
    return this.userForm.get('country');
  }

  constructor(
    protected override fb: FormBuilder,
    private readonly userService: UserService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly rolesService: RolesService
  ) {
    super(fb);
  }

  ngOnInit(): void {
    this.getRolesList();
  }

  public getRolesList(): void {
    this.rolesService.getRolesListEnabled().subscribe({
      next: (res) => {
        this.roles = res;
      },
      error: (err) => {
        this.toastr.error('Ha ocurrido un error al cargar los roles, intente más tarde', 'ERROR');
      },
    });
  }

  public changeCountry(e: any) {
    this.getCountry?.setValue(e.target.value);
  }

  public setUser(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.isPreventClickTwice = true;

    const { role, ...user } = this.userForm.value;

    const newUser = {
      ...user,
      roleId: role,
    };

    this.userService.setUser(newUser).subscribe({
      next: () => {
        this.toastr.success('Usuario creado', 'Éxito');
        this.router.navigate(['/admin/users']);
      },
      error: (err) => {
        this.isPreventClickTwice = false;
        this.toastr.error('Ha ocurrido un error al crear un usuario, intente más tarde', 'ERROR');
        this.userForm.reset();
      },
    });
  }
}
