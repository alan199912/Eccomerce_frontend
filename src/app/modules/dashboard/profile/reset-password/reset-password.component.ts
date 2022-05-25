import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { checkPassword } from 'src/app/core/helpers/checkPassword';
import { User } from 'src/app/core/models/user.models';
import { AppState } from 'src/app/state/app.state';
import { selectFeatureUser } from 'src/app/state/selectors/user.selectors';
import { UserService } from '../../../../core/services/service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public user!: User;
  public isLoader = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly toastr: ToastrService,
    private readonly store: Store<AppState>
  ) {
    this.changePasswordForm = fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: checkPassword,
      }
    );
  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.isLoader = true;
    this.store.select(selectFeatureUser).subscribe((user) => {
      this.user = user;
      this.isLoader = false;
    });
  }

  public changePassword(): void {
    if (this.changePasswordForm.invalid) {
      return;
    }

    this.userService.changePassword(this.user.id, this.changePasswordForm.value.password).subscribe({
      next: () => {
        this.toastr.success('Ha cambiado su contraseña exitosamente', 'Constraseña restaurada');
      },
      error: (err) => {
        this.toastr.error(err, 'ERROR');
        this.changePasswordForm.reset();
      },
    });
  }
}
